import "server-only";
import { Types, type ClientSession } from "mongoose";
import { Resend } from "resend";
import { database, repository } from "@/lib/database";
import { getConfig } from "@/lib/config";
import { decrypt, encrypt, equal, hashToken, randomToken } from "./crypto";

export type AccountMessage = { from: string; to: string[]; subject: string; text: string };
export type MailSender = (message: AccountMessage, idempotencyKey: string) => Promise<string>;

export async function queueAccountEmail(
  input: {
    userId: Types.ObjectId;
    email: string;
    tokenId: Types.ObjectId;
    token: string;
    purpose: "RESET_PASSWORD";
  },
  session: ClientSession,
) {
  const config = getConfig();
  const { Job, Batch } = await repository();
  const jobId = new Types.ObjectId(),
    batchId = new Types.ObjectId();
  const url = new URL("/reset-password", config.APP_URL);
  url.hash = new URLSearchParams({ token: input.token }).toString();
  const message: AccountMessage = {
    from: config.RESEND_FROM,
    to: [input.email],
    subject: "Reset your PlanBridge password",
    text: `We received a request to reset your PlanBridge password.\n\nChoose a new password:\n${url.href}\n\nThis link expires in ${Math.round(config.AUTH_RESET_SECONDS / 60)} minutes and works once. If you didn’t request this, your password has not changed.`,
  };
  const payload = JSON.stringify(message);
  const now = new Date();
  await Job.create(
    [
      {
        _id: jobId,
        recipient: { emailNormalized: input.email, userId: input.userId },
        tokenId: input.tokenId,
        emailBatchId: batchId,
        dedupeKey: `account/${input.tokenId}`,
        templateCode: input.purpose,
        dueAt: now,
        availableAt: now,
      },
    ],
    { session },
  );
  await Batch.create(
    [
      {
        _id: batchId,
        jobIds: [jobId],
        payloadCiphertext: encrypt(payload),
        payloadHash: hashToken(payload),
        providerIdempotencyKey: `account/${batchId}`,
        availableAt: now,
      },
    ],
    { session },
  );
}

const sendWithResend: MailSender = async (message, idempotencyKey) => {
  const resend = new Resend(getConfig().RESEND_API_KEY);
  const { data, error } = await resend.emails.send(message, {
    idempotencyKey,
    signal: AbortSignal.timeout(10000),
  });
  if (error || !data?.id) throw new Error("EMAIL_PROVIDER_UNAVAILABLE");
  return data.id;
};

// One message per frozen batch. A lease fence and stable provider key protect retries and crashes.
export async function dispatchAccountEmails(sender: MailSender = sendWithResend, limit = 5) {
  await database();
  const { Batch, Job, Token, User } = await repository();
  const results = { accepted: 0, deferred: 0, cancelled: 0, unknown: 0 };
  for (let i = 0; i < Math.min(Math.max(limit, 1), 10); i++) {
    const now = new Date(),
      owner = randomToken();
    const batch = await Batch.findOneAndUpdate(
      {
        state: { $in: ["PREPARED", "RETRYABLE", "SENDING"] },
        availableAt: { $lte: now },
        $or: [{ leaseUntil: { $exists: false } }, { leaseUntil: { $lt: now } }],
      },
      {
        $set: { state: "SENDING", leaseOwner: owner, leaseUntil: new Date(now.getTime() + 120000) },
        $inc: { leaseVersion: 1, attempts: 1 },
      },
      { sort: { availableAt: 1 }, returnDocument: "after" },
    );
    if (!batch) break;
    const fence = { _id: batch._id, leaseOwner: owner, leaseVersion: batch.leaseVersion };
    const job = await Job.findById(batch.jobIds[0]);
    const token = job
      ? await Token.findOne({
          _id: job.tokenId,
          consumedAt: { $exists: false },
          expiresAt: { $gt: now },
        })
      : null;
    const user = token
      ? await User.findOne({ _id: token.userId, status: "ACTIVE", authVersion: token.authVersion })
      : null;
    if (!job || !token || !user || token.purpose !== "RESET_PASSWORD") {
      await Batch.updateOne(fence, {
        $set: { state: "FAILED" },
        $unset: { payloadCiphertext: 1, leaseUntil: 1 },
      });
      if (job) await Job.updateOne({ _id: job._id }, { $set: { state: "CANCELLED" } });
      results.cancelled++;
      continue;
    }
    if (batch.safeRetryUntil && batch.safeRetryUntil <= now) {
      await Batch.updateOne(fence, {
        $set: { state: "UNKNOWN" },
        $unset: { payloadCiphertext: 1, leaseUntil: 1 },
      });
      await Job.updateOne(
        { _id: job._id },
        { $set: { state: "UNKNOWN", lastErrorCode: "EMAIL_RECONCILIATION_REQUIRED" } },
      );
      results.unknown++;
      continue;
    }
    if (!batch.firstAttemptAt) {
      await Batch.updateOne(fence, {
        $set: { firstAttemptAt: now, safeRetryUntil: new Date(now.getTime() + 23 * 3600000) },
      });
    }
    try {
      const payload = decrypt(batch.payloadCiphertext ?? "");
      if (!equal(hashToken(payload), batch.payloadHash)) throw new Error("EMAIL_PAYLOAD_INVALID");
      const message = JSON.parse(payload) as AccountMessage;
      const providerMessageId = await sender(message, batch.providerIdempotencyKey);
      const connection = await database();
      await connection.transaction(async (session) => {
        const result = await Batch.updateOne(
          fence,
          {
            $set: { state: "ACCEPTED", providerMessageId },
            $unset: { payloadCiphertext: 1, leaseUntil: 1 },
          },
          { session },
        );
        if (result.modifiedCount)
          await Job.updateOne(
            { _id: job._id },
            { $set: { state: "ACCEPTED", acceptedAt: new Date(), providerMessageId } },
            { session },
          );
      });
      results.accepted++;
    } catch {
      await Batch.updateOne(fence, {
        $set: {
          state: "RETRYABLE",
          availableAt: new Date(
            Date.now() + Math.min(3600, 30 * 2 ** Math.min(batch.attempts, 7)) * 1000,
          ),
        },
        $unset: { leaseUntil: 1 },
      });
      await Job.updateOne(
        { _id: job._id },
        { $set: { lastErrorCode: "EMAIL_PROVIDER_UNAVAILABLE" } },
      );
      results.deferred++;
    }
  }
  return results;
}
