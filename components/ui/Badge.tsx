import type { ReactNode } from "react";

type Variant = "neutral" | "brand" | "outline" | "inverse";

const variants: Record<Variant, string> = {
  neutral: "bg-surface-sunk text-ink-muted",
  brand: "bg-brand-tint text-brand border border-brand-edge",
  outline: "border border-line-strong text-ink-muted",
  inverse: "border border-white/25 text-white/80",
};

type BadgeProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`label-eyebrow inline-flex items-center rounded-sm px-2.5 py-1 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
