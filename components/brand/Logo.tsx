import Image from "next/image";
import Link from "next/link";

import logo from "@/public/images/morakniv-logo-red-rgb.png";

type LogoProps = {
  /** Rendered height in px; width follows the mark's 2153×443 ratio. */
  height?: number;
  /** Wrap in a link to the home page. */
  href?: string;
  priority?: boolean;
  className?: string;
};

const RATIO = 2153 / 443;

export function Logo({
  height = 30,
  href,
  priority = false,
  className = "",
}: LogoProps) {
  const width = Math.round(height * RATIO);

  const mark = (
    <Image
      src={logo}
      alt="Morakniv"
      width={width}
      height={height}
      priority={priority}
      quality={90}
      sizes={`${width}px`}
      className={`h-auto w-auto ${className}`}
      style={{ height, width: "auto" }}
    />
  );

  if (!href) return mark;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center rounded-sm"
      aria-label="Morakniv Food Industry Malaysia — home"
    >
      {mark}
    </Link>
  );
}
