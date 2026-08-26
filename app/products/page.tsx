import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/content/PageHeader";
import { SourceNote } from "@/components/content/SourceNote";
import { CatalogueBrowser } from "@/components/product/CatalogueBrowser";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { catalogue } from "@/lib/documents";
import {
  getAllProducts,
  getCategories,
  getCounts,
  getFacets,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The Morakniv professional food industry range: boning, butcher, filleting, trimming and chef's knives, sharpeners, special knives and the Classic 1891 collection.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products — Morakniv Food Industry",
    description:
      "Eight categories of professional food industry knives, made in Mora, Sweden.",
    url: "/products",
  },
};

export default function ProductsPage() {
  const categories = getCategories();
  const products = getAllProducts();
  const counts = getCounts(products);
  const facets = getFacets(products);

  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="The professional food industry range."
        lede={`Eight categories covering the fabrication process, from primal breakdown through to final trimming, slicing and dicing. ${counts.total} article numbers are listed in the 2026 catalogue.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      >
        <Button href={catalogue.href} variant="secondary">
          Open the 2026 catalogue (PDF)
        </Button>
      </PageHeader>

      {/* ---------------- Categories ---------------- */}
      <Section>
        <Container>
          <h2 className="label-eyebrow flex items-center gap-3 text-ink-subtle">
            <span aria-hidden="true" className="inline-block h-px w-6 bg-brand" />
            Browse by category
          </h2>

          <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="group flex flex-col justify-between bg-surface p-6 transition-colors duration-150 hover:bg-surface-alt"
              >
                <span>
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-lg leading-snug font-medium text-ink">
                      {category.name}
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="mt-1.5 h-3.5 w-3.5 shrink-0 text-line-strong transition-colors group-hover:text-brand"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      <path d="M3 13 13 3M6 3h7v7" strokeLinecap="square" />
                    </svg>
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-ink-muted">
                    {category.tagline}
                  </span>
                </span>

                <span className="mt-8 flex items-baseline gap-1.5">
                  <span className="text-sm font-medium text-ink-muted tabular-nums">
                    {category.articleCount}
                  </span>
                  <span className="text-xs text-ink-subtle">
                    article {category.articleCount === 1 ? "number" : "numbers"}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------- Full catalogue search ---------------- */}
      <Section tone="alt" divided>
        <Container>
          <h2 className="text-[1.75rem] leading-tight font-medium tracking-tight text-ink sm:text-3xl">
            Search the full catalogue
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            Search across every article number and product name in the range.
          </p>

          <div className="mt-10">
            <CatalogueBrowser
              products={products}
              facets={facets}
              showCategory
              searchLabel="Search the full catalogue"
            />
          </div>

          <SourceNote variant="caution" className="mt-10">
            Article numbers and product names are taken from{" "}
            <em>Morakniv Professional Food Industry Knives 2026</em>. Detailed
            specifications — handle, colour, blade length, stiffness and NSF
            status — are being verified against the manufacturer&rsquo;s product
            data before publication, so{" "}
            <span className="tabular-nums">{counts.needsVerification}</span> of{" "}
            <span className="tabular-nums">{counts.total}</span> articles
            currently show no specifications. Filters activate as verified data
            is loaded.
          </SourceNote>
        </Container>
      </Section>
    </>
  );
}
