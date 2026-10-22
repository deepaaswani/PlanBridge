import "server-only";
import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
  createCipheriv,
  createDecipheriv,
} from "node:crypto";
import { hash, verify } from "@node-rs/argon2";
import { getConfig } from "@/lib/config";

export const randomToken = () => randomBytes(32).toString("base64url");
export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");
export const sign = (value: string) =>
  createHmac("sha256", getConfig().AUTH_SECRET).update(value).digest("base64url");
export function equal(a: string, b: string) {
  const left = Buffer.from(a),
    right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

// The library's Algorithm.Argon2id const enum is 2; use its literal with isolatedModules.
export const hashPassword = (password: string) =>
  hash(password, { algorithm: 2, memoryCost: 19456, timeCost: 2, parallelism: 1, outputLen: 32 });
let dummyHash: Promise<string> | undefined;
export async function checkPassword(password: string, storedHash?: string) {
  dummyHash ??= hashPassword(randomToken());
  return verify(storedHash ?? (await dummyHash), password);
}

export function encrypt(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv(
    "aes-256-gcm",
    Buffer.from(getConfig().AUTH_EMAIL_ENCRYPTION_KEY, "hex"),
    iv,
  );
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), ciphertext].map((part) => part.toString("base64url")).join(".");
}
export function decrypt(value: string) {
  const [iv, tag, ciphertext] = value.split(".").map((part) => Buffer.from(part, "base64url"));
  const decipher = createDecipheriv(
    "aes-256-gcm",
    Buffer.from(getConfig().AUTH_EMAIL_ENCRYPTION_KEY, "hex"),
    iv,
  );
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}
