import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { primaryNav, productCategories } from "@/lib/navigation";
import { distributor, manufacturer, siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-alt">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/*
            Brand + Malaysian business.

            The Morakniv mark is the brand; Akmal Station is named underneath
            as the company that distributes and imports it here. The two are
            kept visually separate — same column, different blocks — so the
            footer never reads as though Akmal Station were Morakniv AB.
          */}
          <div className="lg:col-span-4">
            <Logo height={24} />
            <p className="label-eyebrow mt-2.5 text-ink-subtle">
              Food Industry
            </p>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              Professional knives for the food industry — made in Mora, Sweden
              since 1891.
            </p>

            <div className="mt-8 border-t border-line pt-6">
              <p className="text-sm font-medium text-ink">{siteConfig.name}</p>

              <p className="mt-4 text-xs leading-relaxed tracking-wide text-ink-subtle uppercase">
                Distributed &amp; imported by
              </p>
              <p className="mt-1 text-sm font-medium text-ink">
                {distributor.legalName}
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {distributor.registrationNumber}
              </p>

              <address className="mt-4 text-sm leading-relaxed text-ink-muted not-italic">
                {distributor.addressCompact.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </address>

              <p className="mt-4 text-sm">
                <a
                  href={`mailto:${distributor.enquiryEmail}`}
                  className="text-ink-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
                >
                  {distributor.enquiryEmail}
                </a>
              </p>
            </div>
          </div>

          {/* Products */}
          <nav aria-label="Products" className="lg:col-span-3">
            <h2 className="label-eyebrow text-ink-subtle">Products</h2>
            <ul className="mt-4 space-y-2.5">
              {productCategories.slice(0, 5).map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-sm text-ink-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-sm font-medium text-ink underline-offset-4 transition-colors hover:text-brand hover:underline"
                >
                  All categories
                </Link>
              </li>
            </ul>
          </nav>

          {/*
            Company — the primary nav minus Home, so the footer can never
            advertise a route the header does not. With Resources gone this
            column carries the full set, and takes the width the old Resources
            column used to occupy rather than leaving a hole in the grid.
          */}
          <nav aria-label="Company" className="lg:col-span-3">
            <h2 className="label-eyebrow text-ink-subtle">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {primaryNav
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Manufacturer */}
          <div className="lg:col-span-2">
            <h2 className="label-eyebrow text-ink-subtle">Manufacturer</h2>
            <address className="mt-4 text-sm not-italic leading-relaxed text-ink-muted">
              {manufacturer.legalName}
              <br />
              {manufacturer.postalAddress.join(", ")}
              <br />
              <a
                href={`tel:${manufacturer.telephone.replace(/[\s-]/g, "")}`}
                className="underline-offset-4 transition-colors hover:text-brand hover:underline"
              >
                {manufacturer.telephone}
              </a>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <p>© {year} {distributor.legalName}</p>
            <Link
              href="/legal/privacy-policy"
              className="underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              Privacy policy
            </Link>
          </div>
          <p>
            Morakniv® is a registered trademark of {manufacturer.legalName},
            Sweden.
          </p>
        </div>
      </Container>
    </footer>
  );
}
