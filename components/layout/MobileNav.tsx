"use client";

/**
 * Client component: owns the open/closed state of the mobile panel,
 * plus Escape-to-close, scroll locking and focus return.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { primaryNav } from "@/lib/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /*
   * Close when the route changes — adjusted during render rather than in an
   * effect, which covers link clicks and browser back/forward alike.
   * https://react.dev/learn/you-might-not-need-an-effect
   */
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setOpen(false);
  }

  /* Escape to close, and lock background scroll while open. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm text-ink transition-colors hover:bg-surface-alt"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="square"
        >
          {open ? (
            <path d="M5 5l14 14M19 5L5 19" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 top-16 z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 w-full cursor-default bg-ink/25"
          />

          <div
            ref={panelRef}
            tabIndex={-1}
            id="mobile-menu"
            className="relative max-h-full overflow-y-auto border-t border-line bg-surface shadow-lg outline-none"
          >
            <nav aria-label="Primary">
              <ul className="divide-y divide-line">
                {primaryNav.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center justify-between px-6 py-4 text-base transition-colors ${
                          isActive
                            ? "border-l-2 border-brand bg-surface-alt pl-[1.375rem] font-medium text-ink"
                            : "text-ink-muted hover:bg-surface-alt hover:text-ink"
                        }`}
                      >
                        {item.label}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 8 12"
                          className="h-3 w-2 text-line-strong"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M1.5 1 6.5 6l-5 5" strokeLinecap="square" />
                        </svg>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
