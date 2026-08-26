import type { ReactNode } from "react";

type SourceNoteProps = {
  children: ReactNode;
  /** `attribution` for "who said this"; `caution` for scope warnings. */
  variant?: "source" | "attribution" | "caution";
  className?: string;
};

const variants = {
  source: "border-line text-ink-subtle",
  attribution: "border-line-strong text-ink-muted",
  caution: "border-brand text-ink-muted",
} as const;

/**
 * Small bordered note used to keep provenance visible: which document a claim
 * came from, who is asserting it, or where a document's scope ends.
 */
export function SourceNote({
  children,
  variant = "source",
  className = "",
}: SourceNoteProps) {
  return (
    <div
      className={`border-l-2 pl-4 text-sm leading-relaxed ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
