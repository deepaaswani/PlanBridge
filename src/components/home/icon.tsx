import type { ReactNode } from "react";

type IconName = "bridge" | "calendar" | "people" | "check" | "heart" | "arrow" | "info";

export function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    bridge: (
      <>
        <path d="M3 19V6m18 13V6M3 16h18M3 9c4 0 4 5 9 5s5-5 9-5M7 13v3m5-2v2m5-3v3" />
        <path d="M1 19h4m14 0h4" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="16" rx="3" />
        <path d="M8 3v4m8-4v4M4 11h16m-12 4h3m3 0h2m-8 3h3" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3m1-16a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v3" />
      </>
    ),
    check: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    heart: (
      <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 7l-1-1.2a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6m0-10v.1" />
      </>
    ),
  };
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
