import { AuthPage } from "@/components/auth/auth-page";
export const metadata = { title: "Let’s get you back in. | PlanBridge" };
export default function Page() {
  return (
    <AuthPage
      mode="forgot-password"
      title="Let’s get you back in."
      description="Enter your email address and we’ll send a password reset link if the account is eligible."
    />
  );
}
