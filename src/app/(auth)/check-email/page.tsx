import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
export const metadata = { title: "Check your inbox | PlanBridge" };
export default function Page() {
  return (
    <div className="auth-card">
      <p className="auth-eyebrow">YOUR NEXT STEP</p>
      <h1>Check your inbox.</h1>
      <p className="auth-description">
        If this address is eligible, we’ll send a password reset link. Check your spam folder too.
      </p>
      <p className="auth-hint">
        Email can take a few minutes. Need another link? Enter your email address below.
      </p>
      <AuthForm mode="forgot-password" />
      <p className="auth-switch">
        <Link href="/login">Back to log in</Link>
      </p>
    </div>
  );
}
