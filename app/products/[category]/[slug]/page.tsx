import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/content/PageHeader";
import { SourceNote } from "@/components/content/SourceNote";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductImageFrame } from "@/components/product/ProductImageFrame";
import { ProductSpecTable } from "@/components/product/ProductSpecTable";
import { VerificationNotice } from "@/components/product/VerificationNotice";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import {
  getAllProducts,
  getCategory,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

/**
 * Metadata is built from verified fields only. For an unverified record that
 * means article number, name and category — never a guessed specification.
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return {};

  const category = getCategory(product.category);
  const title = product.articleNo
    ? `${product.name} — ${product.articleNo}`
    : product.name;

  const description = product.articleNo
    ? `${product.name}, article number ${product.articleNo}, from the Morakniv ${category?.name ?? ""} range. Made in Mora, Sweden.`
    : `${product.name} from the Morakniv ${category?.name ?? ""} collection. Made in Mora, Sweden.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.category}/${product.slug}`,
    },
    openGraph: {
      title: `${title} — Morakniv Food Industry`,
      description,
      url: `/products/${product.category}/${product.slug}`,
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
  const isVerified = product.dataStatus === "verified";

  /* Article number is carried into the enquiry context (Phase 3 form). */
  const enquiryHref = product.articleNo
    ? `/contact?product=${encodeURIComponent(product.articleNo)}`
    : `/contact?product=${encodeURIComponent(product.slug)}`;

  return (
    <>
      <PageHeader
        eyebrow={category.name}
        title={product.name}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.name, href: `/products/${category.slug}` },
          { label: product.name },
        ]}
      >
        {product.articleNo ? (
          <p className="flex items-baseline gap-3">
            <span className="label-eyebrow text-ink-subtle">Article no.</span>
            <span className="font-mono text-lg text-brand tabular-nums">
              {product.articleNo}
            </span>
          </p>
        ) : (
          <p className="text-sm text-ink-subtle">
            The catalogue lists this model by name only; no article number is
            printed.
          </p>
        )}
      </PageHeader>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Image */}
            <div className="lg:col-span-5">
              <div className="border border-line">
                <ProductImageFrame
                  images={product.images}
                  productName={product.name}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  size="detail"
                  priority
                />
              </div>

              {product.images.length === 0 && (
                <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
                  Product photography has not been supplied for this article.
                  Images are not reproduced from the catalogue PDF.
                </p>
              )}
            </div>

            {/* Details */}
            <div className="lg:col-span-7">
              <h2 className="label-eyebrow text-ink-subtle">Specifications</h2>

              <div className="mt-5">
                {isVerified ? (
                  <ProductSpecTable product={product} />
                ) : (
                  <VerificationNotice variant="detail" />
                )}
              </div>

              <div className="mt-8 border-t border-line pt-8">
                <h2 className="text-lg font-medium text-ink">
                  Enquire about this article
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                  Send us the article number with your volumes and intended
                  tasks, and we will come back with a recommendation. Pricing,
                  stock and lead times are not published on this site.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href={enquiryHref} className="w-full sm:w-auto">
                    Enquire about{" "}
                    {product.articleNo ? product.articleNo : product.name}
                  </Button>
                  <Button
                    href={`/products/${category.slug}`}
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    All {category.name}
                  </Button>
                </div>
              </div>

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
            Article number and product name from{" "}
            <em>Morakniv Professional Food Industry Knives 2026</em>,{" "}
            {category.cataloguePages}.
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
