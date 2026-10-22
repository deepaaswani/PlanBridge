"use client";

import { useId, useRef, type ReactNode } from "react";
import Link from "next/link";

type AvailabilityKind = "signup" | "login" | "information";

export function AvailabilityLink({
  children,
  className,
  kind,
}: {
  children: ReactNode;
  className?: string;
  kind: AvailabilityKind;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  if (kind === "signup" || kind === "login") {
    return (
      <Link className={className} href={kind === "signup" ? "/signup" : "/login"}>
        {children}
      </Link>
    );
  }
  return (
    <>
      <button
        type="button"
        className={className}
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        {children}
      </button>
      <dialog ref={dialog} className="notice-dialog" aria-labelledby={titleId}>
        <h2 id={titleId}>More details are on the way.</h2>
        <p>
          We’re preparing this information for launch. You can explore how PlanBridge works on this
          page.
        </p>
        <form method="dialog">
          <button type="submit" autoFocus>
            Back to exploring
          </button>
        </form>
      </dialog>
    </>
  );
}

export function MenuToggle() {
  return (
    <button
      type="button"
      aria-label="Toggle navigation menu"
      aria-controls="mobile-navigation"
      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-primary rounded-lg transition-colors hover:bg-surface-container"
      onClick={() => {
        const navigation = document.getElementById("mobile-navigation");
        if (navigation instanceof HTMLDetailsElement) navigation.open = !navigation.open;
      }}
    >
      <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
        menu
      </span>
    </button>
  );
}
