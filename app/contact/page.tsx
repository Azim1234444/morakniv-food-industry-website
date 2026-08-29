import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/content/PageHeader";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import {
  COLOR_LABELS,
  getProductByArticleNo,
  getProductBySlug,
} from "@/lib/products";
import type { Product, ProductVariant } from "@/lib/products/types";
import { distributor, manufacturer } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  /* Deliberately makes no promise about response time — see the enquiry
     acknowledgement template for the same rule applied to email copy. */
  description:
    "Send a product, quotation, distribution or technical enquiry to Akmal Station, distributor and importer of Morakniv Food Industry products in Malaysia. Include an article number and we will pick it up from there.",
  /* Canonical omits the query string, so /contact?product=11096 does not
     compete with /contact in search results. */
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Morakniv Food Industry",
    description:
      "Send a product, quotation, distribution or technical enquiry to Akmal Station, distributor and importer of Morakniv Food Industry products in Malaysia.",
    url: "/contact",
  },
};

type ContactPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/* C0 control characters plus DEL, built from a string so this file stays ASCII. */
const CONTROL_CHARS = new RegExp("[\u0000-\u001F\u007F]", "g");

/**
 * Cleans a query-string value before it goes anywhere near the page or the
 * form. The result is treated as *text a stranger put in a URL* — never as a
 * verified product reference, and never rendered as raw HTML.
 */
function sanitiseParam(value: string | string[] | undefined): string {
  const first = Array.isArray(value) ? value[0] : value;
  if (typeof first !== "string") return "";

  return first
    .replace(CONTROL_CHARS, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
}

type Matched = { product: Product; variant?: ProductVariant };

/**
 * Best-effort catalogue lookup, used for display context only.
 *
 * Accepts an article number — which is what a model page's enquiry button
 * sends — or a model slug, and resolves either to the model that carries it.
 * An article number also yields its variant, so the panel can name the colour
 * and link back with that colour already selected.
 *
 * A match tells the visitor "yes, we recognise that reference". A miss changes
 * nothing: the value still prefills the form, because a customer quoting a
 * number from a printed catalogue or an old order should not be told they are
 * wrong by a website that is still verifying its own product data.
 */
function findByReference(reference: string): Matched | undefined {
  if (!reference) return undefined;

  const byArticle = getProductByArticleNo(reference);
  if (byArticle) return byArticle;

  const bySlug = getProductBySlug(reference.toLowerCase());
  return bySlug ? { product: bySlug } : undefined;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const reference = sanitiseParam(params.product);
  const matched = findByReference(reference);

  /*
   * Prefill priority: the matched article number, then the model code when the
   * visitor arrived on a model slug rather than an article, then whatever they
   * arrived with.
   */
  const prefill = matched
    ? (matched.variant?.articleNo ?? matched.product.modelCode)
    : reference;

  /*
   * Stamped on the server, not in the browser. The Server Action compares this
   * against its own clock for the minimum-completion-time check, so the two
   * readings always come from the same source and clock skew is a non-issue.
   */
  /* eslint-disable-next-line react-hooks/purity -- see above: this page is
     request-time dynamic (it awaits `searchParams`), so the stamp is taken
     once per request and serialised to the client as a prop. There is no
     re-render to make it unstable and no hydration pass to mismatch. */
  const renderedAt = Date.now();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us about your operation."
        lede="Whether you are specifying knives for a new processing line, requesting a quotation, or asking about distribution in the region — send the details below and we will take it from there."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* ---------------------------------------------------------
                Form column
                --------------------------------------------------------- */}
            <div className="lg:col-span-7">
              {reference && (
                <div className="mb-10 border border-line bg-surface-alt p-6">
                  <p className="label-eyebrow mb-3 text-ink-subtle">
                    Enquiring about
                  </p>

                  {matched ? (
                    <>
                      <p className="text-lg leading-snug font-medium text-ink">
                        {matched.product.name}{" "}
                        <span className="font-mono text-base text-ink-muted">
                          {matched.product.modelCode}
                        </span>
                      </p>
                      <p className="mt-1.5 text-sm text-ink-muted">
                        {matched.variant
                          ? `Article ${matched.variant.articleNo} — ${COLOR_LABELS[matched.variant.color]}`
                          : `Model ${matched.product.modelCode}`}
                      </p>
                      {/* Links back with the colour already selected, so the
                          visitor returns to exactly the article they enquired
                          about rather than the model's default. */}
                      <Link
                        href={
                          matched.variant
                            ? `/products/${matched.product.category}/${matched.product.slug}?article=${matched.variant.articleNo}`
                            : `/products/${matched.product.category}/${matched.product.slug}`
                        }
                        className="mt-4 inline-block text-sm font-medium text-ink underline underline-offset-4 transition-colors hover:text-brand"
                      >
                        View the product page
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="text-lg leading-snug font-medium text-ink">
                        {reference}
                      </p>
                      <p className="mt-1.5 text-sm text-ink-muted">
                        We could not match this reference to a current article
                        number, but it has been added to your enquiry so we can
                        look into it.
                      </p>
                    </>
                  )}

                  <p className="mt-4 text-xs leading-relaxed text-ink-subtle">
                    The reference above is carried over from the link you
                    followed. It is editable in the form below.
                  </p>
                </div>
              )}

              <ContactForm
                renderedAt={renderedAt}
                defaultArticleNo={prefill || undefined}
              />
            </div>

            {/* ---------------------------------------------------------
                Contact information column

                CONTENT RULE — the Malaysian business comes first and the
                manufacturer second, because visitors writing from this page
                are writing to Akmal Station, not to Sweden. Every value
                comes from lib/site.ts; the form itself posts to
                ENQUIRY_TO_EMAIL, never to an address rendered here.

                Telephone and business hours are still PENDING_CLIENT and are
                therefore absent rather than invented.
                --------------------------------------------------------- */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-xl font-medium tracking-tight text-ink">
                  Contact details
                </h2>

                <div className="mt-6 border-t border-line pt-6">
                  <p className="label-eyebrow mb-3 text-ink-subtle">
                    Malaysia — distributor &amp; importer
                  </p>

                  <address className="text-base leading-relaxed text-ink not-italic">
                    <strong className="font-medium">
                      {distributor.legalName}
                    </strong>
                    <br />
                    {distributor.address.map((line) => (
                      <span key={line} className="text-ink-muted">
                        {line}
                        <br />
                      </span>
                    ))}
                  </address>

                  <dl className="mt-5 space-y-4 text-sm">
                    <div>
                      <dt className="text-ink-subtle">Enquiries</dt>
                      <dd className="mt-1">
                        <a
                          href={`mailto:${distributor.enquiryEmail}`}
                          className="text-ink underline underline-offset-4 transition-colors hover:text-brand"
                        >
                          {distributor.enquiryEmail}
                        </a>
                      </dd>
                    </div>

                    <div>
                      <dt className="text-ink-subtle">Registration no.</dt>
                      <dd className="mt-1 text-ink-muted">
                        {distributor.registrationNumber}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                    {distributor.legalName} distributes and imports Morakniv
                    Food Industry products in Malaysia. The enquiry form
                    reaches the same team and is the fastest route.
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
                    A telephone number and business hours will be published
                    here once confirmed.
                  </p>
                </div>

                {/*
                  Secondary route, kept in the Malaysian half of the column
                  because that is whose hub it is. The form above remains the
                  primary path and is unchanged — this is an alternative for
                  people who would rather reach the distributor through its own
                  page. What that page offers is not restated here.
                */}
                <div className="mt-8 border-t border-line pt-6">
                  <p className="label-eyebrow mb-3 text-ink-subtle">
                    Other contact options
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {distributor.legalName} keeps its contact and ordering
                    routes on its own Linktree page.
                  </p>
                  <div className="mt-5">
                    <Button
                      href={distributor.linktree}
                      variant="secondary"
                      size="sm"
                      className="w-full"
                    >
                      Contact us via Linktree
                    </Button>
                  </div>
                </div>

                <div className="mt-8 border-t border-line pt-6">
                  <p className="label-eyebrow mb-3 text-ink-subtle">
                    Manufacturer — Sweden
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    The knives are made by {manufacturer.legalName} in Mora,
                    Sweden — a separate company from {distributor.legalName}.
                    For matters that concern the manufacturer directly:
                  </p>

                  <dl className="mt-5 space-y-4 text-sm">
                    <div>
                      <dt className="text-ink-subtle">Postal address</dt>
                      <dd className="mt-1 text-ink">
                        {manufacturer.legalName}
                        <br />
                        {manufacturer.postalAddress.map((line) => (
                          <span key={line}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-ink-subtle">Telephone</dt>
                      <dd className="mt-1">
                        <a
                          href={`tel:${manufacturer.telephone.replace(/[\s-]/g, "")}`}
                          className="text-ink underline underline-offset-4 transition-colors hover:text-brand"
                        >
                          {manufacturer.telephone}
                        </a>
                      </dd>
                    </div>

                    <div>
                      <dt className="text-ink-subtle">General enquiries</dt>
                      <dd className="mt-1">
                        <a
                          href={`mailto:${manufacturer.email}`}
                          className="text-ink underline underline-offset-4 transition-colors hover:text-brand"
                        >
                          {manufacturer.email}
                        </a>
                      </dd>
                    </div>
                  </dl>

                  <SourceNote className="mt-6">
                    Source: <em>Morakniv Food Industry Catalogue 2026</em>,
                    p.43, and the supplied compliance declarations.
                  </SourceNote>
                </div>

                {/*
                  The manufacturer's own trade channels are deliberately not
                  offered here. This site is Akmal Station's, and ordering in
                  Malaysia runs through Akmal Station — sending a buyer to
                  Sweden to order sends them away from the business whose site
                  this is. Do not re-add an ordering link to the manufacturer.
                */}
                <div className="mt-8 border-t border-line pt-6">
                  <p className="label-eyebrow mb-3 text-ink-subtle">
                    How ordering works
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    Browse the range, note the article number, and send it to
                    us with the quantity you need.
                  </p>
                  <div className="mt-5">
                    <Button
                      href="/how-to-order"
                      variant="secondary"
                      size="sm"
                      className="w-full"
                    >
                      How to order
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Before you write — the article number is what saves the round trip
          --------------------------------------------------------------- */}
      <Section tone="alt" divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Before you write"
                title="Find the article number first."
                lede="Article numbers, categories and product descriptions for the complete food industry programme are published across the product pages. Quoting an article number in your enquiry saves a round of emails."
              />
            </div>

            <div className="flex items-end lg:col-span-5">
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/products" className="w-full sm:w-auto">
                  Browse the range
                </Button>
                <Button
                  href="/how-to-order"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  How to order
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
