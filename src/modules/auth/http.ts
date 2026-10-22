import "server-only";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ApiError, unavailableLink } from "@/lib/api/errors";
import { ConfigurationError, getConfig } from "@/lib/config";
import { authSchemas, type AuthAction } from "./validation";
import {
  currentAccount,
  loginAccount,
  logoutAccount,
  registerAccount,
  requestAccountEmail,
  resetAccountPassword,
} from "./service";
import {
  clearAuthCookies,
  cookieOptions,
  establishCsrf,
  rateLimit,
  readCookie,
  requestClientKey,
  requireCsrf,
  SESSION_COOKIE,
} from "./security";

function headers(requestId: string) {
  return {
    "X-Request-Id": requestId,
    "Cache-Control": "private, no-store",
    "Referrer-Policy": "no-referrer",
  };
}
function success(data: unknown, requestId: string, status = 200) {
  return NextResponse.json({ data, meta: { requestId } }, { status, headers: headers(requestId) });
}
function failure(error: unknown, requestId: string) {
  if (error instanceof ZodError && error.issues.some((issue) => issue.path[0] === "token"))
    error = unavailableLink();
  if (error instanceof ZodError)
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Check the highlighted fields.",
          fields: error.issues.map((issue) => ({
            path: issue.path.join("."),
            code: "INVALID",
            message: issue.message,
          })),
        },
        meta: { requestId },
      },
      { status: 400, headers: headers(requestId) },
    );
  const known = error instanceof ApiError ? error : undefined;
  const configuration = error instanceof ConfigurationError;
  return NextResponse.json(
    {
      error: {
        code: known ? known.code : "DEPENDENCY_UNAVAILABLE",
        message: known
          ? known.message
          : configuration
            ? "Account services are not configured yet. Please try again later."
            : "Account services are temporarily unavailable. Please try again later.",
      },
      meta: { requestId },
    },
    {
      status: known ? known.status : 503,
      headers: {
        ...headers(requestId),
        ...(known?.retryAfter ? { "Retry-After": String(known.retryAfter) } : {}),
      },
    },
  );
}

async function jsonBody(request: Request): Promise<unknown> {
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json")
    throw new ApiError(415, "UNSUPPORTED_MEDIA_TYPE", "Send a JSON request.");
  const reader = request.body?.getReader();
  if (!reader) throw new ApiError(400, "INVALID_JSON", "Send a valid JSON request.");
  const decoder = new TextDecoder();
  let text = "",
    size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16384) {
      await reader.cancel();
      throw new ApiError(413, "PAYLOAD_TOO_LARGE", "This request is too large.");
    }
    text += decoder.decode(value, { stream: true });
  }
  text += decoder.decode();
  try {
    return JSON.parse(text);
  } catch {
    throw new ApiError(400, "INVALID_JSON", "Send a valid JSON request.");
  }
}

export async function csrfGet(request: Request) {
  const requestId = randomUUID();
  try {
    getConfig();
    await rateLimit("csrf", requestClientKey(request), 120);
    const response = success({}, requestId);
    const csrfToken = establishCsrf(request, response);
    // Preserve Set-Cookie while replacing the response body.
    return new NextResponse(JSON.stringify({ data: { csrfToken }, meta: { requestId } }), {
      headers: { ...Object.fromEntries(response.headers), "Content-Type": "application/json" },
    });
  } catch (error) {
    return failure(error, requestId);
  }
}

export function authPost(action: AuthAction) {
  return async (request: Request) => {
    const requestId = randomUUID();
    try {
      if (action === "verify-email" || action === "resend-verification")
        throw new ApiError(
          410,
          "EMAIL_VERIFICATION_DISABLED",
          "Email verification is not required for v1. You can log in with your email and password.",
        );
      const config = getConfig();
      requireCsrf(request);
      await rateLimit("auth-ip", requestClientKey(request), 60);
      const body = await jsonBody(request),
        schemas = authSchemas(config.AUTH_PASSWORD_MIN_LENGTH);
      const oldToken = readCookie(request, SESSION_COOKIE);
      switch (action) {
        case "register": {
          const input = schemas.register.parse(body);
          await rateLimit("register", input.email, 3, 3600);
          return success(await registerAccount(input), requestId, 202);
        }
        case "login": {
          const input = schemas.login.parse(body);
          await rateLimit("login", input.email, 10);
          const result = await loginAccount(input.email, input.password, oldToken);
          const response = success({ user: result.user }, requestId);
          clearAuthCookies(response, false);
          response.cookies.set(SESSION_COOKIE, result.token, {
            ...cookieOptions,
            expires: result.expiresAt,
          });
          return response;
        }
        case "logout": {
          schemas.logout.parse(body);
          await logoutAccount(oldToken);
          const response = new NextResponse(null, { status: 204, headers: headers(requestId) });
          clearAuthCookies(response);
          return response;
        }
        case "forgot-password": {
          const { email } = schemas[action].parse(body);
          await rateLimit(action, email, 3);
          return success(await requestAccountEmail(email), requestId, 202);
        }
        case "reset-password": {
          const { token, newPassword } = schemas[action].parse(body);
          const result = await resetAccountPassword(token, newPassword);
          const response = success(result, requestId);
          clearAuthCookies(response);
          return response;
        }
      }
    } catch (error) {
      return failure(error, requestId);
    }
  };
}

export async function meGet(request: Request) {
  const requestId = randomUUID();
  try {
    const user = await currentAccount(readCookie(request, SESSION_COOKIE));
    if (!user) throw new ApiError(401, "AUTH_REQUIRED", "Please log in to continue.");
    return success({ user }, requestId);
  } catch (error) {
    return failure(error, requestId);
  }
}
