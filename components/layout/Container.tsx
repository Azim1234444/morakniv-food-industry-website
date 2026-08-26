import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** `wide` for full-bleed bands, `narrow` for running prose. */
  width?: "default" | "wide" | "narrow";
  className?: string;
};

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
} as const;

export function Container({
  children,
  width = "default",
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 md:px-8 lg:px-12 ${widths[width]} ${className}`}
    >
      {children}
    </div>
  );
}
