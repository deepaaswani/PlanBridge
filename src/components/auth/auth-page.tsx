import Link from "next/link";
import { AuthForm, type FormMode } from "./auth-form";

export function AuthPage({
  mode,
  title,
  description,
}: {
  mode: FormMode;
  title: string;
  description: string;
}) {
  const configured = Number(process.env.AUTH_PASSWORD_MIN_LENGTH ?? 15);
  const minimum =
    configured >= 12 && configured <= 64 && Number.isInteger(configured) ? configured : 15;
  return (
    <div className="auth-card">
      <p className="auth-eyebrow">ONE WEDDING. EVERYONE IN SYNC.</p>
      <h1>{title}</h1>
      <p className="auth-description">{description}</p>
      <AuthForm mode={mode} passwordMinimum={minimum} />
      <p className="auth-switch">
        {mode === "signup" ? (
          <>
            Already have an account? <Link href="/login">Log in</Link>
          </>
        ) : mode === "login" ? (
          <>
            New to PlanBridge? <Link href="/signup">Create an account</Link>
          </>
        ) : (
          <Link href="/login">Back to log in</Link>
        )}
      </p>
    </div>
  );
}
