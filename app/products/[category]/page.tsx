import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CTASection } from "@/components/content/CTASection";
import { PageHeader } from "@/components/content/PageHeader";
import { SourceNote } from "@/components/content/SourceNote";
import { CatalogueBrowser } from "@/components/product/CatalogueBrowser";
import { CategoryFigures } from "@/components/product/CategoryFigures";
import { CategoryHero } from "@/components/product/CategoryHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getCategoryVisuals } from "@/lib/images/catalogue";
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
  const visuals = getCategoryVisuals(category.slug);

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
          {/* Models lead: this page lists one card per model. The article
              total follows, explicitly labelled so the two are never
              confused. */}
          <p className="flex items-baseline gap-2">
            <span className="text-2xl font-medium text-brand tabular-nums">
              {category.modelCount}
            </span>
            <span className="text-sm text-ink-muted">
              {category.modelCount === 1 ? "model" : "models"}
            </span>
          </p>
          <p className="flex items-baseline gap-2">
            <span className="text-sm text-ink-muted tabular-nums">
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

      {visuals?.hero && <CategoryHero visual={visuals.hero} />}

      {/* The assortment comes before the catalogue figures: a buyer arriving
          on this page is looking for an article number, not for reading. */}
      <Section size="sm">
        <Container>
          <CatalogueBrowser
            products={products}
            facets={facets}
            searchLabel={`Search ${category.name}`}
          />

          {counts.total > 0 && (
            <SourceNote className="mt-10">
              Source: <em>Morakniv Professional Food Industry Knives &mdash;
              PUG</em>, {category.cataloguePages}.
            </SourceNote>
          )}
        </Container>
      </Section>

      {visuals && visuals.figures.length > 0 && (
        <CategoryFigures
          figures={visuals.figures}
          categoryName={category.name}
        />
      )}


      <CTASection
        eyebrow="Enquiries"
        title="Send us the article numbers."
        lede={`Quoting an article number from the ${category.name.toLowerCase()} list above saves a round of emails. Tell us the quantities you need and we will come back to you.`}
        primary={{ label: "Request a quotation", href: "/contact" }}
        secondary={{ label: "All product categories", href: "/products" }}
      />
    </>
  );
}
