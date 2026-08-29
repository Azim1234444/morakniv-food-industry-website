"use client";

/**
 * Client component: owns the open/closed state of the mobile panel and of the
 * per-section disclosures, plus Escape-to-close, scroll locking and focus
 * return.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { NavChild } from "@/lib/navigation";
import { isRouteActive, primaryNav } from "@/lib/navigation";
import { distributor, siteConfig } from "@/lib/site";

/*
 * `DesktopNav` sits in the tree at the same time — only hidden by a media
 * query — so the disclosure ids carry their own prefix.
 */
const disclosureId = (href: string) =>
  `mobile-nav-${href.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}-submenu`;

/** The exact page, an ancestor of it, or neither. */
function ariaCurrent(pathname: string, item: NavChild) {
  if (pathname === item.href) return "page" as const;
  return isRouteActive(pathname, item) ? ("true" as const) : undefined;
}

/** The section the current route belongs to, so it opens already expanded. */
function activeSection(pathname: string) {
  const match = primaryNav.find(
    (item) => item.children?.length && isRouteActive(pathname, item),
  );
  return match?.href ?? null;
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expandedHref, setExpandedHref] = useState<string | null>(null);
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

  const toggleMenu = () => {
    /* Opening on a child route reveals that section straight away. */
    if (!open) setExpandedHref(activeSection(pathname));
    setOpen(!open);
  };

  /* Must stay the exact inverse of `DesktopNav`'s `xl:block`. */
  return (
    <div className="xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleMenu}
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

      {/*
        Portalled to the body. The header carries `backdrop-blur-sm`, and an
        element with a backdrop-filter becomes the containing block for its
        fixed-position descendants — left inside the header, this overlay
        resolves against the 64px-tall bar rather than the viewport, collapsing
        to zero height, taking no pointer events and never scrolling.
      */}
      {open &&
        createPortal(
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
                    const isActive = isRouteActive(pathname, item);
                    const children = item.children ?? [];
                    const hasChildren = children.length > 0;
                    const isExpanded = hasChildren && expandedHref === item.href;

                    return (
                      <li key={item.href}>
                        {/*
                          The label stays a link so the section landing page is
                          one tap away; the chevron beside it is a real button
                          that expands the children. Two targets, so neither
                          behaviour has to be guessed at.
                        */}
                        <div className="flex items-stretch">
                          <Link
                            href={item.href}
                            aria-current={ariaCurrent(pathname, item)}
                            className={`flex flex-1 items-center justify-between px-6 py-4 text-base transition-colors ${
                              isActive
                                ? "border-l-2 border-brand bg-surface-alt pl-[1.375rem] font-medium text-ink"
                                : "text-ink-muted hover:bg-surface-alt hover:text-ink"
                            }`}
                          >
                            {item.label}
                            {!hasChildren && (
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 8 12"
                                className="h-3 w-2 text-line-strong"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                <path
                                  d="M1.5 1 6.5 6l-5 5"
                                  strokeLinecap="square"
                                />
                              </svg>
                            )}
                          </Link>

                          {hasChildren && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedHref(isExpanded ? null : item.href)
                              }
                              aria-expanded={isExpanded}
                              aria-controls={disclosureId(item.href)}
                              className="flex w-14 shrink-0 items-center justify-center border-l border-line text-ink-muted transition-colors hover:bg-surface-alt hover:text-ink"
                            >
                              <span className="sr-only">
                                {isExpanded ? "Collapse" : "Expand"}{" "}
                                {item.label}
                              </span>
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                className={`h-3 w-3 transition-transform duration-150 ease-[var(--ease-out-quiet)] ${
                                  isExpanded ? "-scale-y-100" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.75"
                              >
                                <path d="M3 6l5 5 5-5" strokeLinecap="square" />
                              </svg>
                            </button>
                          )}
                        </div>

                        {hasChildren && (
                          <ul
                            id={disclosureId(item.href)}
                            hidden={!isExpanded}
                            className="divide-y divide-line border-t border-line bg-surface-alt"
                          >
                            {children.map((child) => {
                              const childActive = isRouteActive(
                                pathname,
                                child,
                              );

                              return (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    aria-current={ariaCurrent(pathname, child)}
                                    className={`block py-3 pr-6 pl-10 text-sm transition-colors ${
                                      childActive
                                        ? "border-l-2 border-brand pl-[2.375rem] font-medium text-ink"
                                        : "text-ink-muted hover:text-ink"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* The header's brand lockup is hidden at this width, so the
                  same identification is repeated here rather than lost. */}
              <div className="border-t border-line px-6 py-5">
                <p className="label-eyebrow text-ink-subtle">
                  {siteConfig.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {distributor.attribution}.
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
