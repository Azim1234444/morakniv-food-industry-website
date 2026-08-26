import type { ReactNode } from "react";

export type Definition = {
  term: string;
  /** Optional short qualifier shown beside the term. */
  meta?: string;
  description: ReactNode;
};

type DefinitionGridProps = {
  items: Definition[];
  columns?: 1 | 2;
  className?: string;
};

/**
 * Bordered definition list used for handle variants, blade grades and similar
 * enumerations lifted from the catalogue.
 */
export function DefinitionGrid({
  items,
  columns = 2,
  className = "",
}: DefinitionGridProps) {
  return (
    <dl
      className={`grid gap-px border border-line bg-line ${
        columns === 2 ? "sm:grid-cols-2" : ""
      } ${className}`}
    >
      {items.map((item) => (
        <div key={item.term} className="flex flex-col bg-surface p-6">
          <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-base font-medium text-ink">{item.term}</span>
            {item.meta && (
              <span className="label-eyebrow text-ink-subtle">{item.meta}</span>
            )}
          </dt>
          <dd className="mt-3 text-sm leading-relaxed text-ink-muted">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
