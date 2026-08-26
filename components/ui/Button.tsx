import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium " +
  "transition-colors duration-150 ease-[var(--ease-out-quiet)] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover active:bg-brand-active",
  secondary:
    "border border-line-strong bg-surface text-ink hover:border-ink hover:bg-surface-alt",
  ghost: "text-ink hover:bg-surface-alt",
  inverse:
    "border border-white/25 bg-transparent text-white hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-13 px-8 text-base",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = BaseProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;

type ButtonAsButton = BaseProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (rest.href !== undefined) {
    const { href, ...linkProps } = rest as ButtonAsLink;
    const isPdf = href.endsWith(".pdf");
    const external = href.startsWith("http") || isPdf;

    /*
     * PDFs open in a new tab as well as off-site links — a 21.9 MB catalogue
     * replacing the current page is a hostile way to lose someone's place.
     * The new-tab behaviour is announced for assistive tech.
     */
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          <span className="sr-only">
            {isPdf ? " (PDF, opens in a new tab)" : " (opens in a new tab)"}
          </span>
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { ...buttonProps } = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
