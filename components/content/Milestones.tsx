import type { ReactNode } from "react";

export type Milestone = {
  year: string;
  title: string;
  description: ReactNode;
};

type MilestonesProps = {
  items: Milestone[];
};

/**
 * Chronological list. The ordering carries real information here — it is a
 * company timeline — so the years are the structural markers rather than
 * decorative numbering.
 */
export function Milestones({ items }: MilestonesProps) {
  return (
    <ol className="border-t border-line">
      {items.map((item) => (
        <li
          key={item.year}
          className="grid gap-2 border-b border-line py-7 sm:grid-cols-12 sm:gap-8"
        >
          <div className="sm:col-span-3 lg:col-span-2">
            <span className="text-xl font-medium tracking-tight text-brand tabular-nums">
              {item.year}
            </span>
          </div>

          <div className="sm:col-span-9 lg:col-span-10">
            <h3 className="text-base font-medium text-ink">{item.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted lg:text-base">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
