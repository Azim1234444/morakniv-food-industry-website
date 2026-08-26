import Link from "next/link";

type CategoryCardProps = {
  label: string;
  href: string;
  /** Distinct article numbers counted in the 2026 catalogue. */
  count: number;
};

export function CategoryCard({ label, href, count }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between border border-line bg-surface p-6 transition-colors duration-150 hover:border-ink focus-visible:border-ink"
    >
      <span className="flex items-start justify-between gap-4">
        <span className="text-lg leading-snug font-medium text-ink">
          {label}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="mt-1.5 h-3.5 w-3.5 shrink-0 text-line-strong transition-colors group-hover:text-brand"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M3 13 13 3M6 3h7v7" strokeLinecap="square" />
        </svg>
      </span>

      <span className="mt-10 flex items-baseline gap-1.5 text-ink-subtle">
        <span className="text-sm font-medium tabular-nums text-ink-muted">
          {count}
        </span>
        <span className="text-xs">
          article {count === 1 ? "number" : "numbers"}
        </span>
      </span>
    </Link>
  );
}
