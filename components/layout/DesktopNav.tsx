"use client";

/**
 * Client component: active-link state needs the current pathname.
 * Nothing else in the header requires client JavaScript.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNav } from "@/lib/navigation";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
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
                className={`relative inline-flex h-16 items-center px-3 text-[0.9375rem] transition-colors duration-150 after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:transition-colors ${
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
