import type { ReactNode } from "react";

type ProseProps = {
  children: ReactNode;
  size?: "base" | "lg";
  className?: string;
};

/**
 * Running text column. Kept near 65–70 characters for readability rather than
 * filling the full grid width.
 */
export function Prose({
  children,
  size = "base",
  className = "",
}: ProseProps) {
  return (
    <div
      className={`max-w-2xl space-y-5 leading-relaxed text-ink-muted ${
        size === "lg" ? "text-base lg:text-lg" : "text-base"
      } ${className}`}
    >
      {children}
    </div>
  );
}
