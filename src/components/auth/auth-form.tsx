"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

export type FormMode = "signup" | "login" | "forgot-password" | "reset-password";
const labels: Record<FormMode, string> = {
  signup: "Create account",
  login: "Log in",
  "forgot-password": "Send reset link",
  "reset-password": "Save new password",
};

type ApiFailure = { error?: { message?: string; fields?: { path: string; message: string }[] } };
export async function accountRequest(action: string, body: object) {
  const context = await fetch("/api/v1/auth/csrf", {
    credentials: "same-origin",
    cache: "no-store",
  });
  const csrf = await context.json().catch(() => ({}));
  if (!context.ok || !csrf.data?.csrfToken)
    throw new Error(csrf.error?.message ?? "Account services are temporarily unavailable.");
  const response = await fetch(`/api/v1/auth/${action}`, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf.data.csrfToken },
    body: JSON.stringify(body),
  });
  if (response.status === 204) return {};
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(
      result.error?.message ?? "We couldn’t complete this request. Please try again.",
    );
    Object.assign(error, { fields: (result as ApiFailure).error?.fields });
    throw error;
  }
  return result.data;
}

export function AuthForm({
  mode,
  passwordMinimum = 15,
}: {
  mode: FormMode;
  passwordMinimum?: number;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const linkToken = useRef("");
  const [busy, setBusy] = useState(false),
    [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState(false);
  const tokenMode = mode === "reset-password";
  useEffect(() => {
    if (tokenMode) {
      linkToken.current = new URLSearchParams(window.location.hash.slice(1)).get("token") ?? "";
      if (window.location.hash)
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, [tokenMode]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setFields({});
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");
    if ((mode === "signup" || mode === "reset-password") && password !== data.get("confirmation")) {
      setFields({ confirmation: "The passwords don’t match." });
      setBusy(false);
      formRef.current?.querySelector<HTMLInputElement>('[name="confirmation"]')?.focus();
      return;
    }
    const email = String(data.get("email") ?? "");
    const payload =
      mode === "signup"
        ? { displayName: String(data.get("displayName") ?? ""), email, password }
        : mode === "login"
          ? { email, password }
          : mode === "reset-password"
            ? { token: linkToken.current, newPassword: password }
            : { email };
    try {
      await accountRequest(mode === "signup" ? "register" : mode, payload);
      if (mode === "login") {
        router.replace("/account");
        router.refresh();
      } else if (mode === "forgot-password" && window.location.pathname === "/check-email")
        setComplete(true);
      else if (mode === "signup") router.replace("/login?registered=1");
      else if (mode === "forgot-password") router.replace("/check-email");
      else setComplete(true);
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "We couldn’t confirm your request. Check your inbox or try again.";
      setError(message);
      const errors =
        typeof caught === "object" && caught !== null && "fields" in caught
          ? (caught.fields as { path: string; message: string }[] | undefined)
          : undefined;
      const mapped = Object.fromEntries(
        (errors ?? []).map((field) => [
          field.path === "newPassword" ? "password" : field.path,
          field.message,
        ]),
      );
      setFields(mapped);
      const first = Object.keys(mapped)[0];
      const input = first
        ? formRef.current?.querySelector<HTMLInputElement>(
            `[name="${first.replace(/[^a-zA-Z]/g, "")}"]`,
          )
        : null;
      input?.focus();
    } finally {
      setBusy(false);
    }
  }

  if (complete)
    return (
      <div className="auth-success" role="status">
        <h2>{mode === "reset-password" ? "Your password is updated." : "Check your inbox."}</h2>
        <p>
          {mode === "forgot-password"
            ? "If this address is eligible, we’ll send a link. Check your inbox and spam folder."
            : "You can now log in securely to your PlanBridge account."}
        </p>
        <Link className="auth-primary" href="/login">
          Back to log in
        </Link>
      </div>
    );

  const emailNeeded = !tokenMode;
  const passwordNeeded = mode === "signup" || mode === "login" || mode === "reset-password";
  const newPassword = mode === "signup" || mode === "reset-password";
  function field(name: string, label: string, type: string, autoComplete: string, required = true) {
    return (
      <div className="auth-field">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          maxLength={name === "displayName" ? 100 : 254}
          aria-invalid={!!fields[name]}
          aria-describedby={fields[name] ? `${name}-error` : undefined}
        />
        {fields[name] && (
          <p className="auth-field-error" id={`${name}-error`}>
            {fields[name]}
          </p>
        )}
      </div>
    );
  }
  return (
    <form ref={formRef} onSubmit={submit} className="auth-form" aria-busy={busy}>
      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}
      {mode === "signup" && field("displayName", "Your name", "text", "name")}
      {emailNeeded && field("email", "Email address", "email", "email")}
      {passwordNeeded && (
        <div className="auth-field">
          <label htmlFor="password">{newPassword ? "Create a password" : "Password"}</label>
          <div className="auth-password">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={newPassword ? "new-password" : "current-password"}
              required
              minLength={newPassword ? passwordMinimum : 1}
              maxLength={128}
              aria-invalid={!!fields.password}
              aria-describedby="password-help"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <p id="password-help" className={fields.password ? "auth-field-error" : "auth-hint"}>
            {fields.password ??
              (newPassword
                ? `Use at least ${passwordMinimum} characters. A memorable passphrase works well.`
                : "Your password is case-sensitive.")}
          </p>
        </div>
      )}
      {newPassword && field("confirmation", "Confirm password", "password", "new-password")}
      {mode === "login" && (
        <Link className="auth-forgot" href="/forgot-password">
          Forgot your password?
        </Link>
      )}
      <button type="submit" className="auth-primary" disabled={busy}>
        {busy ? "Please wait…" : labels[mode]}
      </button>
      {mode === "signup" && (
        <p className="auth-hint">
          After creating your account, log in with your email and password. Each family member uses
          their own account.
        </p>
      )}
    </form>
  );
}

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  return (
    <div>
      <button
        className="auth-secondary"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError("");
          try {
            await accountRequest("logout", {});
            router.replace("/login");
            router.refresh();
          } catch {
            setError("We couldn’t log you out. Please try again.");
            setBusy(false);
          }
        }}
      >
        {busy ? "Logging out…" : "Log out"}
      </button>
      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
