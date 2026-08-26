import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { documents, primaryNav, productCategories } from "@/lib/navigation";
import { manufacturer, siteConfig } from "@/lib/site";

const resourceLinks = [
  { label: "Download centre", href: "/downloads", internal: true },
  { label: "How to order", href: "/how-to-order", internal: true },
  { label: "News", href: "/news", internal: true },
  { label: "Product catalogue 2026 (PDF)", href: documents.catalogue },
  { label: "B2B portal user manual (PDF)", href: documents.b2bManual },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-alt">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo height={24} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              Professional knives for the food industry — made in Mora, Sweden
              since 1891.
            </p>
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

          {/* Company */}
          <nav aria-label="Company" className="lg:col-span-2">
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

          {/* Resources + manufacturer */}
          <div className="lg:col-span-3">
            <h2 className="label-eyebrow text-ink-subtle">Resources</h2>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((link) =>
                link.internal ? (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </ul>

            <h2 className="label-eyebrow mt-8 text-ink-subtle">Manufacturer</h2>
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

        {/* Build note — Malaysian entity details are not in any supplied document. */}
        <div className="border-t border-line py-5">
          <p className="text-xs leading-relaxed text-ink-subtle">
            Malaysian office address, registration and contact details are
            pending client confirmation and have not been published.
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <p>© {year} {siteConfig.name}</p>
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
