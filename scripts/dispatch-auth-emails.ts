import { existsSync } from "node:fs";
import { dispatchAccountEmails } from "../src/modules/auth/mail";
import { closeDatabase } from "../src/lib/database";
async function main() {
  if (existsSync(".env.local")) process.loadEnvFile(".env.local");
  try {
    console.log(await dispatchAccountEmails());
  } catch {
    console.error("Email dispatch failed. Check the server configuration and connectivity.");
    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
}
void main();
