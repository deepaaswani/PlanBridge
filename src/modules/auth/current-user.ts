import "server-only";
import { cookies } from "next/headers";
import { currentAccount } from "./service";
import { SESSION_COOKIE } from "./security";

export async function getCurrentUser() {
  return currentAccount((await cookies()).get(SESSION_COOKIE)?.value);
}
