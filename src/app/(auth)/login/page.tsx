import { AuthPage } from "@/components/auth/auth-page";
export const metadata = { title: "Welcome back. | PlanBridge" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const registered = (await searchParams).registered === "1";
  return (
    <AuthPage
      mode="login"
      title="Welcome back."
      description={
        registered
          ? "You can now log in with your email and password. If you already have an account, use your existing password."
          : "Your people. Your plans. Everything coming together."
      }
    />
  );
}
