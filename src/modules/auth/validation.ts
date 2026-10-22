import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .max(254)
  .email("Enter a valid email address.")
  .transform((value) => value.toLowerCase());
export function authSchemas(minimumPasswordLength = 15) {
  const password = z
    .string()
    .min(minimumPasswordLength, `Use at least ${minimumPasswordLength} characters.`)
    .max(128, "Use no more than 128 characters.");
  const token = z
    .string()
    .regex(/^[A-Za-z0-9_-]{43}$/, "This link is unavailable. Request a new one.");
  return {
    register: z.strictObject({
      displayName: z.string().trim().min(1, "Enter your name.").max(100),
      email: emailSchema,
      password,
    }),
    login: z.strictObject({
      email: emailSchema,
      password: z.string().min(1, "Enter your password.").max(128),
    }),
    "forgot-password": z.strictObject({ email: emailSchema }),
    "reset-password": z.strictObject({ token, newPassword: password }),
    logout: z.strictObject({}),
  };
}
export type AuthAction =
  keyof ReturnType<typeof authSchemas> | "verify-email" | "resend-verification";
