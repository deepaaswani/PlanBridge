import "server-only";
import type { Types } from "mongoose";
import { ApiError, unavailableLink } from "@/lib/api/errors";
import { getConfig } from "@/lib/config";
import { checkPassword, hashPassword, hashToken, randomToken } from "./crypto";
import { authRepository, authTransaction, isDuplicate } from "./repository";
import { queueAccountEmail } from "./mail";
import type { UserRecord } from "./models";

type User = UserRecord & { _id: Types.ObjectId };
export function userDto(user: User) {
  return {
    id: user._id.toString(),
    displayName: user.displayName,
    email: user.email,
    emailVerified: !!user.emailVerifiedAt,
    notificationPreferences: user.notificationPreferences,
    version: user.version,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export const genericEmailMessage =
  "If this address is eligible, we’ll send an email with your next step. Check your inbox and spam folder.";

export async function registerAccount(input: {
  displayName: string;
  email: string;
  password: string;
}) {
  const passwordHash = await hashPassword(input.password);
  try {
    await authTransaction(async (repo) => {
      if (await repo.findUserByEmail(input.email)) return;
      await repo.createUser({
        displayName: input.displayName,
        email: input.email,
        normalizedEmail: input.email,
        passwordHash,
      });
    });
  } catch (error) {
    if (!isDuplicate(error)) throw error;
  }
  return {
    message:
      "You can now log in with your email and password. If you already have an account, use your existing password.",
  };
}

export async function requestAccountEmail(email: string) {
  const purpose = "RESET_PASSWORD";
  await authTransaction(async (repo, session) => {
    const found = await repo.findUserByEmail(email);
    if (!found || found.status !== "ACTIVE") return;
    const user = await repo.touchUser(found._id, found.authVersion);
    if (!user) return;
    await repo.invalidateTokens(user._id, purpose);
    const token = randomToken();
    const seconds = getConfig().AUTH_RESET_SECONDS;
    const record = await repo.createToken({
      userId: user._id,
      tokenHash: hashToken(token),
      purpose,
      authVersion: user.authVersion,
      expiresAt: new Date(Date.now() + seconds * 1000),
    });
    await queueAccountEmail(
      { userId: user._id, email: user.normalizedEmail, tokenId: record._id, token, purpose },
      session,
    );
  });
  return { message: genericEmailMessage };
}

export async function loginAccount(email: string, password: string, oldSessionToken?: string) {
  const repo = await authRepository();
  const found = await repo.findUserByEmail(email);
  const valid = await checkPassword(password, found?.passwordHash);
  const invalid = () =>
    new ApiError(401, "INVALID_CREDENTIALS", "The email or password is incorrect.");
  if (!found || !valid || found.status !== "ACTIVE") throw invalid();
  const token = randomToken(),
    expiresAt = new Date(Date.now() + getConfig().AUTH_SESSION_SECONDS * 1000);
  return authTransaction(async (transaction) => {
    const user = await transaction.touchUser(found._id, found.authVersion, found.passwordHash);
    if (!user) throw invalid();
    if (oldSessionToken) await transaction.revokeSession(hashToken(oldSessionToken));
    await transaction.createSession({
      userId: user._id,
      tokenHash: hashToken(token),
      authVersion: user.authVersion,
      expiresAt,
    });
    return { user: userDto(user), token, expiresAt };
  });
}

export async function currentAccount(token?: string) {
  if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) return null;
  const repo = await authRepository();
  const session = await repo.findSession(hashToken(token));
  if (!session) return null;
  const user = await repo.findUserById(session.userId);
  if (!user || user.status !== "ACTIVE" || user.authVersion !== session.authVersion) return null;
  return userDto(user);
}

export async function logoutAccount(token?: string) {
  if (token) await (await authRepository()).revokeSession(hashToken(token));
}

export async function resetAccountPassword(token: string, newPassword: string) {
  const passwordHash = await hashPassword(newPassword);
  await authTransaction(async (repo) => {
    const record = await repo.consumeToken(hashToken(token), "RESET_PASSWORD");
    if (!record || !(await repo.changePassword(record.userId, record.authVersion, passwordHash)))
      throw unavailableLink();
    await repo.revokeAllSessions(record.userId);
    await repo.invalidateTokens(record.userId);
  });
  return { reset: true };
}
