import { authPost } from "@/modules/auth/http";
export const runtime = "nodejs";
export const POST = authPost("resend-verification");
