import { redirect } from "next/navigation";
import { getCurrentUser } from "@/modules/auth/current-user";
import { LogoutButton } from "@/components/auth/auth-form";
export const runtime = "nodejs";
export const metadata = { title: "Your account | PlanBridge" };
export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <div className="auth-card">
      <p className="auth-eyebrow">YOUR ACCOUNT</p>
      <h1>Hello, {user.displayName}.</h1>
      <p className="auth-description">You’re signed in as {user.email}.</p>
      <div className="auth-success">
        <h2>Your account is ready.</h2>
        <p>Wedding setup is the next feature coming to your shared planning space.</p>
      </div>
      <LogoutButton />
    </div>
  );
}
