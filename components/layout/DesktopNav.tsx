"use client";

/**
 * Client component: active-link state needs the current pathname.
 * Nothing else in the header requires client JavaScript.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNav } from "@/lib/navigation";

/*
 * The bar carries eight destinations, two of them long ("Quality & Compliance",
 * "How to Order"). Alongside the brand lockup and the quotation button that no
 * longer fits at the 1024px `lg` stop, so the horizontal bar starts at `xl` and
 * everything below it uses the mobile panel — which must stay in step, see
 * `MobileNav`. Item padding opens up again at `2xl`, where there is room.
 */
export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden xl:block">
      <ul className="flex items-center gap-0.5 2xl:gap-1">
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
                className={`relative inline-flex h-16 items-center px-2.5 text-[0.9375rem] whitespace-nowrap transition-colors duration-150 after:absolute after:inset-x-2.5 after:bottom-0 after:h-[2px] after:transition-colors 2xl:px-3 2xl:after:inset-x-3 ${
                  isActive
                    ? "font-medium text-ink after:bg-brand"
                    : "text-ink-muted after:bg-transparent hover:text-ink hover:after:bg-line-strong"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
