import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  robots: { index: false, follow: false },
  referrer: "no-referrer" as const,
};
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-shell">
      <header className="auth-header">
        <Link href="/" className="auth-brand">
          <Image src="/images/home/logo.png" alt="" width={32} height={32} unoptimized />
          PlanBridge
        </Link>
        <Link href="/">Back to home</Link>
      </header>
      <main id="auth-main" className="auth-main">
        <aside className="auth-story">
          <p className="auth-eyebrow">FOR YOU AND YOUR PEOPLE</p>
          <h2>
            A shared plan.
            <br />
            <em>A little more celebration.</em>
          </h2>
          <p>Bring your family, functions and little decisions together in one calm space.</p>
          <Image
            src="/images/home/photo-2.png"
            alt="An Indian couple celebrating with their family"
            width={512}
            height={384}
            className="auth-photo"
            unoptimized
          />
          <p className="auth-story-note">Your own account. One shared wedding.</p>
        </aside>
        <section className="auth-content">{children}</section>
      </main>
      <footer className="auth-footer">
        PlanBridge · Made for couples and the people helping them plan.
      </footer>
    </div>
  );
}
