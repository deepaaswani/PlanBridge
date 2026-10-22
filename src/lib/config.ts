import "server-only";
import { z } from "zod";

const integer = (fallback: number, minimum: number, maximum: number) =>
  z.coerce.number().int().min(minimum).max(maximum).default(fallback);

const configSchema = z.object({
  APP_URL: z.url().refine((value) => {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash &&
      !url.username &&
      !url.password
    );
  }),
  MONGODB_URI: z.string().regex(/^mongodb(?:\+srv)?:\/\//),
  AUTH_SECRET: z.string().min(32),
  AUTH_EMAIL_ENCRYPTION_KEY: z.string().regex(/^[a-fA-F0-9]{64}$/),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM: z
    .string()
    .min(3)
    .max(254)
    .refine((value) => !/[\r\n]/.test(value)),
  AUTH_PASSWORD_MIN_LENGTH: integer(15, 12, 64),
  AUTH_SESSION_SECONDS: integer(604800, 300, 2592000),
  AUTH_RESET_SECONDS: integer(1800, 300, 3600),
  CRON_SECRET: z.string().min(32).optional(),
});

export class ConfigurationError extends Error {
  constructor() {
    super("Account services are not configured.");
  }
}

export function getConfig() {
  const result = configSchema.safeParse(process.env);
  if (!result.success) throw new ConfigurationError();
  return result.data;
}
