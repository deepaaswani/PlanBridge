"use client";
import Link from "next/link";
export default function AccountError({ reset }: { reset: () => void }) {
  return (
    <div className="auth-card">
      <h1>We couldn’t load your account.</h1>
      <p className="auth-description">
        Account services are temporarily unavailable. Please try again.
      </p>
      <button className="auth-primary" onClick={reset}>
        Try again
      </button>
      <p className="auth-switch">
        <Link href="/">Back to home</Link>
      </p>
    </div>
  );
}
