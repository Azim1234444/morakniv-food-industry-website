import type { ElementType, ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  /** Ground colour. `dark` is the charcoal band used sparingly for contrast. */
  tone?: "default" | "alt" | "sunk" | "dark";
  /** Vertical rhythm. One scale, used consistently across the page. */
  size?: "xs" | "sm" | "md" | "lg";
  /** Hairline above the section. */
  divided?: boolean;
  as?: ElementType;
  id?: string;
  className?: string;
};

const tones = {
  default: "bg-surface text-ink",
  alt: "bg-surface-alt text-ink",
  sunk: "bg-surface-sunk text-ink",
  dark: "bg-surface-dark text-ink-inverse",
} as const;

const sizes = {
  xs: "py-10 md:py-12",
  sm: "py-14 md:py-16",
  md: "py-20 md:py-24",
  lg: "py-24 md:py-32",
} as const;

export function Section({
  children,
  tone = "default",
  size = "md",
  divided = false,
  as: Tag = "section",
  id,
  className = "",
}: SectionProps) {
  const border = divided
    ? tone === "dark"
      ? "border-t border-line-dark"
      : "border-t border-line"
    : "";

  return (
    <Tag id={id} className={`${tones[tone]} ${sizes[size]} ${border} ${className}`}>
      {children}
    </Tag>
  );
}
