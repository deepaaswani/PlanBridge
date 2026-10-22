import { AuthPage } from "@/components/auth/auth-page";
export const metadata = { title: "Create your account. | PlanBridge" };
export default function Page() {
  return (
    <AuthPage
      mode="signup"
      title="Create your account."
      description="A shared home for your wedding plans starts with you."
    />
  );
}
