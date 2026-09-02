"use client";

import { useFormStatus } from "react-dom";

export function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center rounded-sm border border-line-strong bg-surface px-6 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Signing out…" : "Log out"}
    </button>
  );
}
