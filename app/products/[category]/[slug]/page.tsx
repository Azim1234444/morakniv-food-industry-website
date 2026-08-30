import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageHeader } from "@/components/content/PageHeader";
import { SourceNote } from "@/components/content/SourceNote";
import {
  ModelImageNote,
  ModelImageNoteFallback,
} from "@/components/product/ModelImageNote";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductImageFrame } from "@/components/product/ProductImageFrame";
import { ProductSpecTable } from "@/components/product/ProductSpecTable";
import {
  ProductVariants,
  ProductVariantsFallback,
} from "@/components/product/ProductVariants";
import { VerificationNotice } from "@/components/product/VerificationNotice";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { resolveModelImage } from "@/lib/images/model-image";
import {
  STIFFNESS_LABELS,
  canPublishSpecs,
  getAllProducts,
  getCategory,
  getFamilySiblings,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

/**
 * One route per MODEL CODE — 45 of them, not one per article number.
 *
 * Article numbers are reached as `?article=14953` on their model's route. The
 * query string is deliberately not part of the generated params: it selects a
 * variant client-side and must never produce a second indexable page.
 */
export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

/**
 * Metadata describes the MODEL. The canonical URL is the bare model route with
 * no `?article=`, so the five colour variants of one knife stay a single page
 * in the index instead of five near-duplicates.
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return {};

  const category = getCategory(product.category);
  const title = `${product.name} ${product.modelCode}`;

  const flex = product.blade?.stiffness
    ? `${STIFFNESS_LABELS[product.blade.stiffness]} blade. `
    : "";
  const colours =
    product.variants.length === 1
      ? "Supplied in black."
      : `Available in ${product.variants.length} handle colours.`;

  const description = `${product.name}, model ${product.modelCode}${
    product.dimension ? `, ${product.dimension.printed}` : ""
  }. ${flex}${colours} From the Morakniv ${category?.name ?? ""} range, made in Mora, Sweden.`;

  const canonical = `/products/${product.category}/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} — Morakniv Food Industry`,
      description,
      url: canonical,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const category = getCategory(product.category);
  if (!category) notFound();

  const related = getRelatedProducts(product, 4);
  const siblings = getFamilySiblings(product);
  const showsSpecs = canPublishSpecs(product);
  const modelImage = resolveModelImage(product);
  const hasImage = Boolean(modelImage) || product.images.length > 0;

  return (
    <>
      <PageHeader
        eyebrow={category.name}
        title={product.name}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.name, href: `/products/${category.slug}` },
          { label: `${product.name} ${product.modelCode}` },
        ]}
      >
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <p className="flex items-baseline gap-3">
            <span className="label-eyebrow text-ink-subtle">Model</span>
            <span className="font-mono text-lg text-brand">
              {product.modelCode}
            </span>
          </p>
          {product.dimension && (
            <p className="flex items-baseline gap-3">
              <span className="label-eyebrow text-ink-subtle">Dimension</span>
              <span className="font-mono text-sm text-ink tabular-nums">
                {product.dimension.printed}
              </span>
            </p>
          )}
          {product.blade?.stiffness && (
            <p className="flex items-baseline gap-3">
              <span className="label-eyebrow text-ink-subtle">Flex</span>
              <span className="text-sm text-ink">
                {STIFFNESS_LABELS[product.blade.stiffness]}
              </span>
            </p>
          )}
        </div>
      </PageHeader>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Image */}
            <div className="lg:col-span-5">
              <div className="border border-line">
                <ProductImageFrame
                  images={product.images}
                  productName={`${product.name} ${product.modelCode}`}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  size="detail"
                  priority
                  modelImage={modelImage}
                />
              </div>

              {/* Two things the frame cannot say for itself: which knife is
                  in the photograph when it is borrowed from a sibling flex
                  grade, and which colour the selected article is. The caption
                  states both, and tracks the selection for the second. */}
              <Suspense
                fallback={
                  <ModelImageNoteFallback
                    product={product}
                    hasImage={hasImage}
                    family={modelImage?.family}
                  />
                }
              >
                <ModelImageNote
                  product={product}
                  hasImage={hasImage}
                  family={modelImage?.family}
                />
              </Suspense>
            </div>

            {/* Details */}
            <div className="lg:col-span-7">
              <h2 className="label-eyebrow text-ink-subtle">Specifications</h2>

              <div className="mt-5">
                {showsSpecs ? (
                  <ProductSpecTable product={product} />
                ) : (
                  <VerificationNotice variant="detail" />
                )}
              </div>

              <div className="mt-8 border-t border-line pt-8">
                <Suspense
                  fallback={<ProductVariantsFallback product={product} />}
                >
                  <ProductVariants product={product} />
                </Suspense>
              </div>

              {/* Sibling flex grades are LINKS to their own model pages, never
                  options on this one: each has its own model code and its own
                  blade etching. */}
              {siblings.length > 0 && (
                <div className="mt-8 border-t border-line pt-8">
                  <h2 className="label-eyebrow text-ink-subtle">
                    Also available in
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
                    The same blade in another flex grade, printed on the same
                    catalogue page.
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {siblings.map((sibling) => (
                      <li key={sibling.slug}>
                        <Link
                          href={`/products/${sibling.category}/${sibling.slug}`}
                          className="inline-flex items-baseline gap-2 border border-line px-3 py-2 text-sm text-ink transition-colors hover:border-ink-subtle hover:bg-surface-alt"
                        >
                          <span className="font-mono text-xs text-brand">
                            {sibling.modelCode}
                          </span>
                          {sibling.blade?.stiffness && (
                            <span className="text-ink-muted">
                              {STIFFNESS_LABELS[sibling.blade.stiffness]}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 border-t border-line pt-8">
                <h2 className="label-eyebrow text-ink-subtle">Category</h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
                  {category.description}
                </p>
                <p className="mt-4">
                  <Link
                    href={`/products/${category.slug}`}
                    className="text-sm font-medium text-ink underline underline-offset-4 transition-colors hover:text-brand"
                  >
                    Browse {category.name}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <SourceNote className="mt-12">
            Source: <em>Morakniv Professional Food Industry Knives &mdash;
            PUG</em>, p.{product.source?.page}.
          </SourceNote>
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section tone="alt" divided>
          <Container>
            <h2 className="text-[1.75rem] leading-tight font-medium tracking-tight text-ink sm:text-3xl">
              Other {category.name.toLowerCase()}
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
