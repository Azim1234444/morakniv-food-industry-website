import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/content/PageHeader";
import { SourceNote } from "@/components/content/SourceNote";
import { CatalogueBrowser } from "@/components/product/CatalogueBrowser";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { catalogue } from "@/lib/documents";
import {
  getCategories,
  getCategory,
  getCounts,
  getFacets,
  getProductsByCategory,
} from "@/lib/products";
import type { CategorySlug } from "@/lib/products/types";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) return {};

  return {
    title: category.seo.title,
    description: category.seo.description,
    alternates: { canonical: `/products/${category.slug}` },
    openGraph: {
      title: `${category.seo.title} — Morakniv Food Industry`,
      description: category.seo.description,
      url: `/products/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const products = getProductsByCategory(category.slug as CategorySlug);
  const facets = getFacets(products);
  const counts = getCounts(products);

  return (
    <>
      <PageHeader
        eyebrow="Products"
        title={category.name}
        lede={category.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="flex items-baseline gap-2">
            <span className="text-2xl font-medium text-brand tabular-nums">
              {category.articleCount}
            </span>
            <span className="text-sm text-ink-muted">
              article {category.articleCount === 1 ? "number" : "numbers"}
            </span>
          </p>
          <p className="text-sm text-ink-subtle">
            Catalogue {category.cataloguePages}
          </p>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <CatalogueBrowser
            products={products}
            facets={facets}
            searchLabel={`Search ${category.name}`}
          />

          {counts.verified === 0 && (
            <SourceNote variant="caution" className="mt-10">
              None of the{" "}
              <span className="tabular-nums">{counts.total}</span> articles in
              this category currently publish specifications. Handle, colour,
              blade length, stiffness and NSF status are being verified against
              the manufacturer&rsquo;s product data first. Attribute filters
              will appear here once that data is loaded.
            </SourceNote>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/contact" className="w-full sm:w-auto">
              Request a quotation
            </Button>
            <Button
              href={catalogue.href}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Open the 2026 catalogue
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
