import Link from "next/link";
import { Fragment } from "react";

export type Crumb = {
  label: string;
  /** Omit on the final crumb — the current page is not a link. */
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

function Separator() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 8 12"
      className="h-2.5 w-2 shrink-0 text-line-strong"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M1.5 1 6.5 6l-5 5" strokeLinecap="square" />
    </svg>
  );
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              <li className="flex items-center">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-ink-subtle underline-offset-4 transition-colors hover:text-brand hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="font-medium text-ink"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="flex items-center">
                  <Separator />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
