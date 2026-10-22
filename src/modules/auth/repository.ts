import "server-only";
import type { ClientSession, Types } from "mongoose";
import { database, repository } from "@/lib/database";

export async function authRepository(session?: ClientSession) {
  const models = await repository();
  const options = { session };
  return {
    findUserByEmail: (normalizedEmail: string) =>
      models.User.findOne({ normalizedEmail }, null, options),
    findUserById: (id: Types.ObjectId) => models.User.findById(id, null, options),
    createUser: async (data: {
      email: string;
      normalizedEmail: string;
      displayName: string;
      passwordHash: string;
    }) => (await models.User.create([data], options))[0],
    touchUser: (id: Types.ObjectId, authVersion: number, passwordHash?: string) =>
      models.User.findOneAndUpdate(
        { _id: id, status: "ACTIVE", authVersion, ...(passwordHash ? { passwordHash } : {}) },
        { $inc: { version: 1 } },
        { ...options, returnDocument: "after" },
      ),
    changePassword: (id: Types.ObjectId, authVersion: number, passwordHash: string) =>
      models.User.findOneAndUpdate(
        { _id: id, status: "ACTIVE", authVersion },
        {
          $set: { passwordHash, passwordChangedAt: new Date() },
          $inc: { authVersion: 1, version: 1 },
        },
        { ...options, returnDocument: "after" },
      ),
    createSession: async (data: {
      userId: Types.ObjectId;
      tokenHash: string;
      authVersion: number;
      expiresAt: Date;
    }) => (await models.Session.create([data], options))[0],
    findSession: (tokenHash: string) =>
      models.Session.findOne(
        { tokenHash, expiresAt: { $gt: new Date() }, revokedAt: { $exists: false } },
        null,
        options,
      ),
    revokeSession: (tokenHash: string) =>
      models.Session.updateOne(
        { tokenHash, revokedAt: { $exists: false } },
        { $set: { revokedAt: new Date() }, $inc: { version: 1 } },
        options,
      ),
    revokeAllSessions: (userId: Types.ObjectId) =>
      models.Session.updateMany(
        { userId, revokedAt: { $exists: false } },
        { $set: { revokedAt: new Date() }, $inc: { version: 1 } },
        options,
      ),
    invalidateTokens: (userId: Types.ObjectId, purpose?: string) =>
      models.Token.updateMany(
        { userId, ...(purpose ? { purpose } : {}), consumedAt: { $exists: false } },
        { $set: { consumedAt: new Date() }, $inc: { version: 1 } },
        options,
      ),
    createToken: async (data: {
      userId: Types.ObjectId;
      tokenHash: string;
      authVersion: number;
      expiresAt: Date;
      purpose: "RESET_PASSWORD";
    }) => (await models.Token.create([data], options))[0],
    consumeToken: (tokenHash: string, purpose: string) =>
      models.Token.findOneAndUpdate(
        { tokenHash, purpose, consumedAt: { $exists: false }, expiresAt: { $gt: new Date() } },
        { $set: { consumedAt: new Date() }, $inc: { version: 1 } },
        { ...options, returnDocument: "after" },
      ),
  };
}

export async function authTransaction<T>(
  work: (
    repository: Awaited<ReturnType<typeof authRepository>>,
    session: ClientSession,
  ) => Promise<T>,
) {
  const connection = await database();
  return connection.transaction(async (session) => work(await authRepository(session), session));
}

export function isDuplicate(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}
