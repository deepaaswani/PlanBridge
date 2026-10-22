import "server-only";
import type { NextResponse } from "next/server";
import { ApiError } from "@/lib/api/errors";
import { getConfig } from "@/lib/config";
import { repository } from "@/lib/database";
import { equal, hashToken, randomToken, sign } from "./crypto";
import { isDuplicate } from "./repository";

export const SESSION_COOKIE = "__Host-planbridge-session";
export const CSRF_COOKIE = "__Host-planbridge-csrf";
export const cookieOptions = { secure: true, httpOnly: true, sameSite: "lax", path: "/" } as const;

export function readCookie(request: Request, name: string) {
  const values = (request.headers.get("cookie") ?? "")
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part.startsWith(name + "="));
  return values.length === 1 ? values[0].slice(name.length + 1) : undefined;
}

function validContext(context: string | undefined, session?: string) {
  if (!context || context.length > 256) return false;
  const [nonce, expires, binding, signature, extra] = context.split(".");
  if (extra || !nonce || !/^\d+$/.test(expires ?? "") || !binding || !signature) return false;
  return (
    Number(expires) > Date.now() &&
    binding === (session ? hashToken(session) : "anonymous") &&
    equal(signature, sign(`csrf-context:${nonce}.${expires}.${binding}`))
  );
}

export function establishCsrf(request: Request, response: NextResponse) {
  const session = readCookie(request, SESSION_COOKIE);
  let context = readCookie(request, CSRF_COOKIE);
  if (!validContext(context, session)) {
    const data = `${randomToken()}.${Date.now() + 3600000}.${session ? hashToken(session) : "anonymous"}`;
    context = `${data}.${sign(`csrf-context:${data}`)}`;
    response.cookies.set(CSRF_COOKIE, context, { ...cookieOptions, maxAge: 3600 });
  }
  return sign(`csrf-header:${context}`);
}

export function requireCsrf(request: Request) {
  const context = readCookie(request, CSRF_COOKIE);
  const token = request.headers.get("x-csrf-token") ?? "";
  if (
    request.headers.get("origin") !== new URL(getConfig().APP_URL).origin ||
    !validContext(context, readCookie(request, SESSION_COOKIE)) ||
    !equal(token, sign(`csrf-header:${context}`))
  ) {
    throw new ApiError(403, "CSRF_INVALID", "Refresh the page and try again.");
  }
}

export function clearAuthCookies(response: NextResponse, clearSession = true) {
  response.cookies.set(CSRF_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  if (clearSession) response.cookies.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
}

export async function rateLimit(policy: string, key: string, maximum: number, windowSeconds = 900) {
  const { Rate } = await repository();
  const now = Date.now(),
    window = windowSeconds * 1000;
  const start = Math.floor(now / window) * window;
  const filter = { keyHash: sign(`rate:${key}`), policy, windowStart: new Date(start) };
  let counter;
  try {
    counter = await Rate.findOneAndUpdate(
      filter,
      { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(start + window + 3600000) } },
      { upsert: true, returnDocument: "after" },
    );
  } catch (error) {
    if (!isDuplicate(error)) throw error;
    counter = await Rate.findOneAndUpdate(
      filter,
      { $inc: { count: 1 } },
      { returnDocument: "after" },
    );
  }
  if (!counter || counter.count > maximum)
    throw new ApiError(
      429,
      "RATE_LIMITED",
      "Too many attempts. Please try again later.",
      Math.max(1, Math.ceil((start + window - now) / 1000)),
    );
}

export function requestClientKey(request: Request) {
  // Trust the proxy IP header only on the supported Vercel deployment. Local traffic shares a bucket.
  return process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    : "local";
}
