import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/content/PageHeader";
import { SourceNote } from "@/components/content/SourceNote";
import { CatalogueBrowser } from "@/components/product/CatalogueBrowser";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { articleCount, modelCount } from "@/lib/products/all";
import { getAllProducts, getCategories, getFacets } from "@/lib/products";

/* Counts come from the data so the copy cannot drift from the catalogue. */
export const metadata: Metadata = {
  title: "Products",
  description: `The Morakniv PUG professional food industry range: boning, butcher, filleting, trimming and chef's knives plus special knives — ${modelCount} models across ${articleCount} article numbers, made in Mora, Sweden.`,
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products — Morakniv Food Industry",
    description:
      "Six categories of professional food industry knives on the PUG handle, made in Mora, Sweden.",
    url: "/products",
  },
};

export default function ProductsPage() {
  const categories = getCategories();
  const products = getAllProducts();
  const facets = getFacets(products);

  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="The professional food industry range."
        lede={`Six categories covering the fabrication process, from primal breakdown through to final trimming, slicing and dicing. ${modelCount} models · ${articleCount} article numbers, all built on the PUG handle — Performance Universal Grip.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      {/* ---------------- Categories ---------------- */}
      <Section>
        <Container>
          <h2 className="label-eyebrow flex items-center gap-3 text-ink-subtle">
            <span
              aria-hidden="true"
              className="inline-block h-px w-6 bg-brand"
            />
            Browse by category
          </h2>

          <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
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

                {/* Models, because a category card links to a list of product
                    pages and there is one page per model. The article-number
                    total follows, explicitly labelled. */}
                <span className="mt-8 flex flex-wrap items-baseline gap-x-1.5">
                  <span className="text-sm font-medium text-ink-muted tabular-nums">
                    {category.modelCount}
                  </span>
                  <span className="text-xs text-ink-subtle">
                    {category.modelCount === 1 ? "model" : "models"}
                  </span>
                  <span aria-hidden="true" className="text-xs text-line-strong">
                    ·
                  </span>
                  <span className="text-xs text-ink-subtle tabular-nums">
                    {category.articleCount} article{" "}
                    {category.articleCount === 1 ? "number" : "numbers"}
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
            Search the full range
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            Search across every model code, product name and article number in
            the range, and filter by handle colour and flex grade. Searching a
            full article number takes you to the model that carries it, with
            that colour already selected.
          </p>

          <div className="mt-10">
            <CatalogueBrowser
              products={products}
              facets={facets}
              showCategory
              searchLabel="Search the full range"
            />
          </div>

          <SourceNote className="mt-10">
            Source: <em>Morakniv Professional Food Industry Knives &mdash;
            PUG</em>.
          </SourceNote>
        </Container>
      </Section>
    </>
  );
}
