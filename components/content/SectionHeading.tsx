import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start"
      } ${className}`}
    >
      {eyebrow && (
        <p
          className={`label-eyebrow mb-5 flex items-center gap-3 ${
            isDark ? "text-white/60" : "text-ink-subtle"
          }`}
        >
          <span aria-hidden="true" className="inline-block h-px w-6 bg-brand" />
          {eyebrow}
        </p>
      )}

      <Tag
        className={`max-w-2xl text-[1.75rem] leading-[1.14] font-medium tracking-tight sm:text-3xl lg:text-[2.125rem] ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </Tag>

      {lede && (
        <div
          className={`mt-5 max-w-2xl text-base leading-relaxed lg:text-lg ${
            isDark ? "text-white/70" : "text-ink-muted"
          }`}
        >
          {lede}
        </div>
      )}
    </div>
  );
}
