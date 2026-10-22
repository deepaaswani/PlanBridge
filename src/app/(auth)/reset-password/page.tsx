import { AuthPage } from "@/components/auth/auth-page";
export const metadata = { title: "A fresh start. | PlanBridge" };
export default function Page() {
  return (
    <AuthPage
      mode="reset-password"
      title="A fresh start."
      description="Choose a new password for your PlanBridge account."
    />
  );
}
