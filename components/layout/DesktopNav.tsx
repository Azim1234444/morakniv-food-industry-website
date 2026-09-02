"use client";

/**
 * Client component: active-link state needs the current pathname, and the
 * submenus need open/closed state.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FocusEvent, KeyboardEvent } from "react";
import { useState } from "react";
import { flushSync } from "react-dom";

import type { NavChild, NavItem } from "@/lib/navigation";
import { isRouteActive, primaryNav } from "@/lib/navigation";

/*
 * The bar carries eight destinations, two of them long ("Quality & Compliance",
 * "How to Order"). Alongside the brand lockup and the quotation button that no
 * longer fits at the 1024px `lg` stop, so the horizontal bar starts at `xl` and
 * everything below it uses the mobile panel — which must stay in step, see
 * `MobileNav`. Item padding is a notch tighter than the icon-free bar needed,
 * buying back the width the submenu chevrons cost; it opens up again at
 * `2xl`, where there is room.
 *
 * DOM ids for the submenus and their triggers: `MobileNav` sits in the tree at
 * the same time — only hidden by a media query — so its ids carry a different
 * prefix and the two can never collide.
 */
const slug = (href: string) =>
  href.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
const submenuId = (href: string) => `desktop-nav-${slug(href)}-submenu`;
const triggerId = (href: string) => `desktop-nav-${slug(href)}-trigger`;

/** The exact page, an ancestor of it, or neither. */
function ariaCurrent(pathname: string, item: NavChild) {
  if (pathname === item.href) return "page" as const;
  return isRouteActive(pathname, item) ? ("true" as const) : undefined;
}

function submenuLinks(href: string) {
  const panel = document.getElementById(submenuId(href));
  return panel ? Array.from(panel.querySelectorAll("a")) : [];
}

export function DesktopNav() {
  const pathname = usePathname();
  const [openHref, setOpenHref] = useState<string | null>(null);

  /*
   * Close when the route changes — adjusted during render rather than in an
   * effect, which covers submenu clicks and browser back/forward alike.
   * https://react.dev/learn/you-might-not-need-an-effect
   */
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setOpenHref(null);
  }

  /* Escape closes and hands focus back to the parent link. */
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !openHref) return;
    event.preventDefault();
    document.getElementById(triggerId(openHref))?.focus();
    setOpenHref(null);
  };

  /* Focus leaving the bar altogether closes whatever is open. */
  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpenHref(null);
  };

  /*
   * Arrow-key entry into a submenu. The panel stays in the DOM but carries
   * `hidden` while closed, so its links cannot take focus until the render
   * that opens it has landed — hence the flush before reaching for one.
   */
  const handleTriggerKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
    item: NavItem,
  ) => {
    if (!item.children?.length) return;
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();

    flushSync(() => setOpenHref(item.href));
    const links = submenuLinks(item.href);
    (event.key === "ArrowDown" ? links.at(0) : links.at(-1))?.focus();
  };

  const handleSubmenuKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    item: NavItem,
  ) => {
    const { key } = event;
    if (
      key !== "ArrowDown" &&
      key !== "ArrowUp" &&
      key !== "Home" &&
      key !== "End"
    ) {
      return;
    }

    const links = submenuLinks(item.href);
    const index = links.indexOf(event.target as HTMLAnchorElement);
    if (index === -1) return;

    event.preventDefault();
    const next =
      key === "ArrowDown"
        ? links[(index + 1) % links.length]
        : key === "ArrowUp"
          ? links[(index - 1 + links.length) % links.length]
          : key === "Home"
            ? links[0]
            : links[links.length - 1];
    next?.focus();
  };

  return (
    <nav
      aria-label="Primary"
      className="hidden xl:block"
      onMouseLeave={() => setOpenHref(null)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <ul className="flex items-center gap-0.5 2xl:gap-1">
        {primaryNav.map((item) => {
          const isActive = isRouteActive(pathname, item);
          const hasChildren = Boolean(item.children?.length);
          const isOpen = hasChildren && openHref === item.href;

          return (
            <li
              key={item.href}
              className="relative"
              onMouseEnter={() => setOpenHref(hasChildren ? item.href : null)}
            >
              <Link
                id={hasChildren ? triggerId(item.href) : undefined}
                href={item.href}
                aria-current={ariaCurrent(pathname, item)}
                aria-expanded={hasChildren ? isOpen : undefined}
                aria-controls={hasChildren ? submenuId(item.href) : undefined}
                onFocus={() => setOpenHref(hasChildren ? item.href : null)}
                onKeyDown={(event) => handleTriggerKeyDown(event, item)}
                className={`relative inline-flex h-16 items-center px-2 text-[0.9375rem] whitespace-nowrap transition-colors duration-150 after:absolute after:inset-x-2 after:bottom-0 after:h-[2px] after:transition-colors 2xl:px-3 2xl:after:inset-x-3 ${
                  isActive
                    ? "font-medium text-ink after:bg-brand"
                    : "text-ink-muted after:bg-transparent hover:text-ink hover:after:bg-line-strong"
                }`}
              >
                {item.label}
                {hasChildren && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className={`ml-1 h-2.5 w-2.5 shrink-0 transition-transform duration-150 ease-[var(--ease-out-quiet)] ${
                      isOpen ? "-scale-y-100" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="M3 6l5 5 5-5" strokeLinecap="square" />
                  </svg>
                )}
              </Link>

              {item.children?.length ? (
                <div
                  id={submenuId(item.href)}
                  hidden={!isOpen}
                  onKeyDown={(event) => handleSubmenuKeyDown(event, item)}
                  className="absolute top-full left-0 z-50 mt-px border border-line bg-surface shadow-lg"
                >
                  <Submenu item={item} pathname={pathname} />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * Panel contents.
 *
 * A section index entry — "All Products", "News" — is the child whose href is
 * the parent's own route; it leads the panel above a hairline. More than six
 * remaining entries would make an absurdly tall column, so anything longer
 * splits into two, filled column by column so the catalogue order still reads
 * top to bottom. The six current product categories fit one column.
 */
function Submenu({ item, pathname }: { item: NavItem; pathname: string }) {
  const children = item.children ?? [];
  const index = children.find((child) => child.href === item.href);
  const rest = children.filter((child) => child.href !== item.href);
  const twoColumn = rest.length > 6;

  return (
    <div
      className={`max-w-[calc(100vw-3rem)] ${twoColumn ? "w-[30rem]" : "w-60"}`}
    >
      {index && (
        <ul className="border-b border-line">
          <li>
            <SubmenuLink child={index} pathname={pathname} />
          </li>
        </ul>
      )}

      <ul
        className={
          twoColumn ? "grid grid-flow-col grid-cols-2 grid-rows-4" : undefined
        }
      >
        {rest.map((child) => (
          <li key={child.href}>
            <SubmenuLink child={child} pathname={pathname} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubmenuLink({
  child,
  pathname,
}: {
  child: NavChild;
  pathname: string;
}) {
  const isActive = isRouteActive(pathname, child);

  return (
    <Link
      href={child.href}
      aria-current={ariaCurrent(pathname, child)}
      className={`block px-4 py-2.5 text-sm leading-snug transition-colors duration-150 ${
        isActive
          ? "border-l-2 border-brand bg-surface-alt pl-[0.875rem] font-medium text-ink"
          : "text-ink-muted hover:bg-surface-alt hover:text-ink"
      }`}
    >
      {child.label}
    </Link>
  );
}
