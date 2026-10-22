import "server-only";
import { Schema, type Connection, type InferSchemaType, type Model } from "mongoose";

const options = { timestamps: true, versionKey: false } as const;
const common = {
  schemaVersion: { type: Number, default: 1 },
  version: { type: Number, default: 1 },
};
const objectId = Schema.Types.ObjectId;
const userSchema = new Schema(
  {
    ...common,
    email: { type: String, required: true },
    normalizedEmail: { type: String, required: true },
    displayName: { type: String, required: true },
    passwordHash: { type: String, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "DISABLED", "DELETION_PENDING"],
      default: "ACTIVE",
      required: true,
    },
    emailVerifiedAt: Date,
    passwordChangedAt: Date,
    authVersion: { type: Number, default: 1, required: true },
    notificationPreferences: {
      taskEmailEnabled: { type: Boolean, default: false },
      paymentEmailEnabled: { type: Boolean, default: false },
    },
  },
  options,
);
userSchema.index({ normalizedEmail: 1 }, { unique: true });

const sessionSchema = new Schema(
  {
    ...common,
    userId: { type: objectId, required: true },
    tokenHash: { type: String, required: true },
    authVersion: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    revokedAt: Date,
  },
  options,
);
sessionSchema.index({ tokenHash: 1 }, { unique: true });
sessionSchema.index({ userId: 1, expiresAt: 1 });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const tokenSchema = new Schema(
  {
    ...common,
    userId: { type: objectId, required: true },
    tokenHash: { type: String, required: true },
    purpose: { type: String, enum: ["VERIFY_EMAIL", "RESET_PASSWORD"], required: true },
    authVersion: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    consumedAt: Date,
  },
  options,
);
tokenSchema.index({ tokenHash: 1 }, { unique: true });
tokenSchema.index({ userId: 1, purpose: 1 });
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const rateSchema = new Schema(
  {
    keyHash: { type: String, required: true },
    policy: { type: String, required: true },
    windowStart: { type: Date, required: true },
    count: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
  },
  options,
);
rateSchema.index({ keyHash: 1, policy: 1, windowStart: 1 }, { unique: true });
rateSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const jobSchema = new Schema(
  {
    ...common,
    kind: { type: String, default: "ACCOUNT", required: true },
    recipient: {
      emailNormalized: { type: String, required: true },
      userId: { type: objectId, required: true },
    },
    templateCode: { type: String, required: true },
    templateVersion: { type: Number, default: 1 },
    tokenId: { type: objectId, required: true },
    emailBatchId: { type: objectId, required: true },
    dedupeKey: { type: String, required: true },
    state: { type: String, default: "BATCHED", required: true },
    deliveryStatus: { type: String, default: "UNKNOWN" },
    dueAt: { type: Date, required: true },
    availableAt: { type: Date, required: true },
    providerMessageId: String,
    acceptedAt: Date,
    lastErrorCode: String,
  },
  options,
);
jobSchema.index({ dedupeKey: 1 }, { unique: true });
jobSchema.index({ emailBatchId: 1 });

const batchSchema = new Schema(
  {
    ...common,
    provider: { type: String, default: "RESEND" },
    jobIds: [{ type: objectId, required: true }],
    payloadCiphertext: String,
    payloadHash: { type: String, required: true },
    providerIdempotencyKey: { type: String, required: true },
    state: {
      type: String,
      enum: ["PREPARED", "SENDING", "ACCEPTED", "RETRYABLE", "UNKNOWN", "FAILED"],
      default: "PREPARED",
      required: true,
    },
    availableAt: { type: Date, required: true },
    firstAttemptAt: Date,
    safeRetryUntil: Date,
    attempts: { type: Number, default: 0, required: true },
    leaseOwner: String,
    leaseUntil: Date,
    leaseVersion: { type: Number, default: 0, required: true },
    providerMessageId: String,
  },
  options,
);
batchSchema.index({ providerIdempotencyKey: 1 }, { unique: true });
batchSchema.index({ state: 1, availableAt: 1, leaseUntil: 1 });

function model<T>(
  connection: Connection,
  name: string,
  schema: Schema<T>,
  collection: string,
): Model<T> {
  return (
    (connection.models[name] as Model<T> | undefined) ??
    connection.model<T>(name, schema, collection)
  );
}
export type UserRecord = InferSchemaType<typeof userSchema>;
export function getModels(connection: Connection) {
  return {
    User: model(connection, "AccountUser", userSchema, "users"),
    Session: model(connection, "AccountSession", sessionSchema, "sessions"),
    Token: model(connection, "AccountToken", tokenSchema, "authTokens"),
    Rate: model(connection, "AuthRateCounter", rateSchema, "rateCounters"),
    Job: model(connection, "AccountEmailJob", jobSchema, "notificationJobs"),
    Batch: model(connection, "AccountEmailBatch", batchSchema, "emailBatches"),
  };
}
