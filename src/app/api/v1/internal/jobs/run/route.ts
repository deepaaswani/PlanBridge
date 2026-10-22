import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getConfig } from "@/lib/config";
import { equal } from "@/modules/auth/crypto";
import { dispatchAccountEmails } from "@/modules/auth/mail";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function GET(request: Request) {
  const requestId = randomUUID();
  const headers = { "Cache-Control": "no-store", "X-Request-Id": requestId };
  try {
    const secret = getConfig().CRON_SECRET;
    if (!secret || !equal(request.headers.get("authorization") ?? "", `Bearer ${secret}`))
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Access denied." }, meta: { requestId } },
        { status: 403, headers },
      );
    return NextResponse.json(
      { data: await dispatchAccountEmails(), meta: { requestId } },
      { headers },
    );
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "DEPENDENCY_UNAVAILABLE",
          message: "Email processing is temporarily unavailable.",
        },
        meta: { requestId },
      },
      { status: 503, headers },
    );
  }
}
