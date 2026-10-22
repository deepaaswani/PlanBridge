import assert from "node:assert/strict";
import { before, after, beforeEach, test } from "node:test";
import { randomBytes } from "node:crypto";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import { closeDatabase, database, repository } from "../src/lib/database";
import { authPost, csrfGet, meGet } from "../src/modules/auth/http";
import type { AuthAction } from "../src/modules/auth/validation";
import { dispatchAccountEmails, type AccountMessage } from "../src/modules/auth/mail";
import { decrypt, hashToken } from "../src/modules/auth/crypto";
import { CSRF_COOKIE, SESSION_COOKIE, rateLimit } from "../src/modules/auth/security";

const origin = "https://planbridge.test";
const password = "A long family wedding passphrase!";
let replica: MongoMemoryReplSet;

before(
  async () => {
    replica = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
    Object.assign(process.env, {
      APP_URL: origin,
      MONGODB_URI: replica.getUri("auth_tests"),
      AUTH_SECRET: randomBytes(32).toString("hex"),
      AUTH_EMAIL_ENCRYPTION_KEY: randomBytes(32).toString("hex"),
      RESEND_API_KEY: "test-unused-provider-key",
      RESEND_FROM: "PlanBridge <accounts@example.test>",
      CRON_SECRET: randomBytes(32).toString("hex"),
      AUTH_PASSWORD_MIN_LENGTH: "15",
      AUTH_SESSION_SECONDS: "604800",
      AUTH_RESET_SECONDS: "1800",
    });
    await database();
  },
  { timeout: 180000 },
);
after(async () => {
  await closeDatabase();
  await replica?.stop();
});
beforeEach(async () => {
  const connection = await database();
  assert.ok(connection.db);
  for (const collection of await connection.db.collections()) await collection.deleteMany({});
});

function browser() {
  const cookies = new Map<string, string>();
  const header = () => [...cookies].map(([key, value]) => `${key}=${value}`).join("; ");
  function apply(response: Response) {
    for (const value of response.headers.getSetCookie()) {
      const [pair] = value.split(";");
      const index = pair.indexOf("=");
      const name = pair.slice(0, index),
        content = pair.slice(index + 1);
      if (!content) cookies.delete(name);
      else cookies.set(name, content);
    }
    return response;
  }
  async function csrf() {
    const response = apply(
      await csrfGet(new Request(origin + "/api/v1/auth/csrf", { headers: { cookie: header() } })),
    );
    assert.equal(response.status, 200);
    return (await response.json()).data.csrfToken as string;
  }
  return {
    cookies,
    header,
    csrf,
    async post(
      action: AuthAction,
      body: unknown,
      options: { origin?: string; csrf?: string; raw?: string } = {},
    ) {
      const token = options.csrf ?? (await csrf());
      return apply(
        await authPost(action)(
          new Request(origin + "/api/v1/auth/" + action, {
            method: "POST",
            headers: {
              cookie: header(),
              origin: options.origin ?? origin,
              "Content-Type": "application/json",
              "X-CSRF-Token": token,
            },
            body: options.raw ?? JSON.stringify(body),
          }),
        ),
      );
    },
    me: () => meGet(new Request(origin + "/api/v1/me", { headers: { cookie: header() } })),
  };
}

async function signup(client = browser(), email = "couple@example.test") {
  const response = await client.post("register", { displayName: "Ananya", email, password });
  assert.equal(response.status, 202, await response.text());
  return client;
}
async function emails() {
  const messages: AccountMessage[] = [];
  await dispatchAccountEmails(async (message) => {
    messages.push(message);
    return `provider-${messages.length}`;
  }, 10);
  return messages;
}
function tokenIn(message: AccountMessage) {
  const match = message.text.match(/https:\/\/planbridge\.test\/[^\s]+/);
  assert.ok(match);
  assert.equal(new URL(match[0]).search, "");
  return new URLSearchParams(new URL(match[0]).hash.slice(1)).get("token")!;
}

test("registration is normalized and duplicate-safe without verification mail or auto-login", async () => {
  const client = await signup(browser(), " Couple@Example.Test ");
  const { User, Token, Batch } = await repository();
  const user = await User.findOne();
  assert.ok(user);
  assert.equal(user.normalizedEmail, "couple@example.test");
  assert.match(user.passwordHash, /^\$argon2id\$/);
  assert.notEqual(user.passwordHash, password);
  const duplicate = await client.post("register", {
    displayName: "Different name",
    email: "couple@example.test",
    password: "A different long password",
  });
  assert.equal(duplicate.status, 202);
  assert.equal(await User.countDocuments(), 1);
  assert.equal((await User.findOne())?.displayName, "Ananya");
  assert.equal(await Batch.countDocuments(), 0);
  assert.equal(await Token.countDocuments(), 0);
  assert.equal(user.emailVerifiedAt, undefined);
  assert.equal((await client.me()).status, 401);
  assert.equal(client.cookies.has(SESSION_COOKIE), false);
});

test("legacy verification endpoints cannot verify accounts or queue mail", async () => {
  const client = await signup();
  for (const action of ["verify-email", "resend-verification"] as const) {
    const response = await client.post(action, { email: "couple@example.test", token: "old-link" });
    assert.equal(response.status, 410);
    assert.equal((await response.json()).error.code, "EMAIL_VERIFICATION_DISABLED");
  }
  const { User, Token, Batch } = await repository();
  assert.equal((await User.findOne())?.emailVerifiedAt, undefined);
  assert.equal(await Token.countDocuments(), 0);
  assert.equal(await Batch.countDocuments(), 0);
});

test("login rotates opaque sessions; logout and live user status/authVersion checks deny stale access", async () => {
  const client = await signup();
  const login = await client.post("login", { email: "couple@example.test", password });
  assert.equal(login.status, 200);
  const loginBody = await login.json();
  assert.equal(loginBody.data.user.emailVerified, false);
  assert.equal(loginBody.data.token, undefined);
  const cookie = login.headers
    .getSetCookie()
    .find((value) => value.startsWith(SESSION_COOKIE + "="));
  assert.ok(
    cookie?.includes("Secure") &&
      cookie.includes("HttpOnly") &&
      cookie.includes("SameSite=lax") &&
      cookie.includes("Path=/"),
  );
  const old = client.cookies.get(SESSION_COOKIE)!;
  assert.equal((await client.me()).status, 200);
  assert.equal(
    (await client.post("login", { email: "couple@example.test", password })).status,
    200,
  );
  const { Session, User } = await repository();
  assert.ok((await Session.findOne({ tokenHash: hashToken(old) }))?.revokedAt);
  assert.notEqual(client.cookies.get(SESSION_COOKIE), old);
  assert.equal((await client.post("logout", {})).status, 204);
  assert.equal((await client.me()).status, 401);
  assert.equal(client.cookies.has(SESSION_COOKIE), false);
  assert.equal((await client.post("logout", {})).status, 204);
  await client.post("login", { email: "couple@example.test", password });
  await User.updateOne({}, { $set: { status: "DISABLED" } });
  assert.equal((await client.me()).status, 401);
  await User.updateOne({}, { $set: { status: "ACTIVE" }, $inc: { authVersion: 1 } });
  assert.equal((await client.me()).status, 401);
});

test("password recovery is generic and reset revokes every session and consumes the token", async () => {
  const client = await signup(),
    second = browser();
  await emails();
  await client.post("login", { email: "couple@example.test", password });
  await second.post("login", { email: "couple@example.test", password });
  const known = await client.post("forgot-password", { email: "couple@example.test" });
  const missing = await browser().post("forgot-password", { email: "missing@example.test" });
  assert.equal(known.status, missing.status);
  assert.deepEqual((await known.json()).data, (await missing.json()).data);
  const token = tokenIn((await emails())[0]);
  const updated = "Another memorable family passphrase!";
  assert.equal((await client.post("reset-password", { token, newPassword: updated })).status, 200);
  assert.equal((await second.me()).status, 401);
  assert.equal((await client.me()).status, 401);
  assert.equal((await client.post("reset-password", { token, newPassword: updated })).status, 410);
  const invalid = await client.post("login", { email: "couple@example.test", password });
  const nonexistent = await browser().post("login", { email: "missing@example.test", password });
  assert.equal(invalid.status, 401);
  assert.equal(nonexistent.status, 401);
  assert.deepEqual((await invalid.json()).error, (await nonexistent.json()).error);
  assert.equal(
    (await client.post("login", { email: "couple@example.test", password: updated })).status,
    200,
  );
});

test("requesting another password reset invalidates old links and suppresses stale queued mail", async () => {
  const client = await signup();
  await client.post("forgot-password", { email: "couple@example.test" });
  const { Batch } = await repository();
  const original = await Batch.findOne();
  assert.ok(original?.payloadCiphertext);
  const old = tokenIn(JSON.parse(decrypt(original.payloadCiphertext)) as AccountMessage);
  assert.equal(
    (await client.post("forgot-password", { email: "couple@example.test" })).status,
    202,
  );
  const messages = await emails();
  assert.equal(messages.length, 1);
  assert.equal(
    (await client.post("reset-password", { token: old, newPassword: password })).status,
    410,
  );
  assert.equal(
    (await client.post("reset-password", { token: tokenIn(messages[0]), newPassword: password }))
      .status,
    200,
  );
});

test("CSRF requires exact origin, signed context and session binding; input is strictly validated", async () => {
  const client = await signup();
  assert.equal(
    (
      await client.post(
        "login",
        { email: "couple@example.test", password },
        { origin: "https://attacker.test" },
      )
    ).status,
    403,
  );
  assert.equal(
    (await client.post("login", { email: "couple@example.test", password }, { csrf: "forged" }))
      .status,
    403,
  );
  const anonymousCsrf = await client.csrf();
  assert.ok(client.cookies.has(CSRF_COOKIE));
  await client.post("login", { email: "couple@example.test", password });
  assert.equal((await client.post("logout", {}, { csrf: anonymousCsrf })).status, 403);
  assert.equal(
    (
      await client.post("register", {
        displayName: "A",
        email: "other@example.test",
        password,
        role: "ADMIN",
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await client.post("register", {
        displayName: "A",
        email: "other@example.test",
        password: "short",
      })
    ).status,
    400,
  );
  assert.equal((await client.post("login", {}, { raw: "{" })).status, 400);
  assert.equal(
    (await client.post("login", {}, { raw: JSON.stringify({ email: "x".repeat(17000) }) })).status,
    413,
  );
});

test("the dispatcher cancels legacy verification mail without sending it", async () => {
  const client = await signup();
  await client.post("forgot-password", { email: "couple@example.test" });
  const { Token, Batch, Job } = await repository();
  // Represent an unexpired verification batch queued before the v1 scope change.
  await Token.updateOne({}, { $set: { purpose: "VERIFY_EMAIL" } });
  await Job.updateOne({}, { $set: { templateCode: "VERIFY_EMAIL" } });
  let sends = 0;
  const outcome = await dispatchAccountEmails(async () => {
    sends++;
    return "must-not-send";
  });
  assert.equal(sends, 0);
  assert.equal(outcome.cancelled, 1);
  assert.equal((await Batch.findOne())?.state, "FAILED");
  assert.equal((await Batch.findOne())?.payloadCiphertext, undefined);
  assert.equal((await Job.findOne())?.state, "CANCELLED");
});

test("shared counters enforce account limits atomically across parallel callers", async () => {
  const result = await Promise.allSettled(
    Array.from({ length: 8 }, () => rateLimit("test-policy", "same-account", 3)),
  );
  assert.equal(result.filter((value) => value.status === "fulfilled").length, 3);
  const client = browser();
  for (let i = 0; i < 10; i++)
    assert.equal(
      (await client.post("login", { email: "missing@example.test", password })).status,
      401,
    );
  const limited = await client.post("login", { email: "missing@example.test", password });
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get("retry-after")) > 0);
});

test("email retries keep the frozen payload/key, expire safely, and erase accepted token payloads", async () => {
  const client = await signup();
  await client.post("forgot-password", { email: "couple@example.test" });
  const initial = await (await repository()).Batch.findOne();
  assert.ok(initial?.payloadCiphertext);
  assert.ok(!initial.payloadCiphertext.includes("https://"));
  const message = JSON.parse(decrypt(initial.payloadCiphertext)) as AccountMessage;
  assert.equal(new URL(message.text.match(/https:\/\/[^\s]+/)![0]).pathname, "/reset-password");
  const record = await (await repository()).Token.findOne();
  assert.equal(record?.tokenHash, hashToken(tokenIn(message)));
  const sent: { message: AccountMessage; key: string }[] = [];
  await dispatchAccountEmails(async (message, key) => {
    sent.push({ message, key });
    throw new Error("temporary failure");
  });
  const { Batch } = await repository();
  await Batch.updateMany({}, { $set: { availableAt: new Date(0) } });
  await dispatchAccountEmails(async (message, key) => {
    sent.push({ message, key });
    return "provider-recovered";
  });
  assert.deepEqual(sent[0], sent[1]);
  assert.equal((await Batch.findOne())?.state, "ACCEPTED");
  assert.equal((await Batch.findOne())?.payloadCiphertext, undefined);
  await signup(browser(), "uncertain@example.test");
  await client.post("forgot-password", { email: "uncertain@example.test" });
  await dispatchAccountEmails(async () => {
    throw new Error("uncertain network outcome");
  });
  await Batch.updateOne(
    { state: "RETRYABLE" },
    { $set: { availableAt: new Date(0), safeRetryUntil: new Date(0) } },
  );
  let sends = 0;
  const outcome = await dispatchAccountEmails(async () => {
    sends++;
    return "must-not-send";
  });
  assert.equal(sends, 0);
  assert.equal(outcome.unknown, 1);
});
