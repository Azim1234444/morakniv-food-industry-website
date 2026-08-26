import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/forms/ContactForm";
import { DownloadCard } from "@/components/content/DownloadCard";
import { PageHeader } from "@/components/content/PageHeader";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { catalogue } from "@/lib/documents";
import { getAllProducts } from "@/lib/products";
import type { Product } from "@/lib/products/types";
import { manufacturer } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  /* Deliberately makes no promise about response time — see the enquiry
     acknowledgement template for the same rule applied to email copy. */
  description:
    "Send a product, quotation, distribution or technical enquiry to Morakniv Food Industry Malaysia. Include an article number from the 2026 catalogue and we will pick it up from there.",
  /* Canonical omits the query string, so /contact?product=11096 does not
     compete with /contact in search results. */
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Morakniv Food Industry",
    description:
      "Send a product, quotation, distribution or technical enquiry to Morakniv Food Industry Malaysia.",
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

/**
 * Best-effort catalogue lookup, used for display context only.
 *
 * A match tells the visitor "yes, we recognise that reference" and links them
 * back to the product page. A miss changes nothing: the value still prefills
 * the form, because a customer quoting a number from a printed catalogue or an
 * old order should not be told they are wrong by a website that is still
 * verifying its own product data.
 */
function findByReference(reference: string): Product | undefined {
  if (!reference) return undefined;

  return getAllProducts().find(
    (product) => product.articleNo === reference || product.slug === reference,
  );
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const reference = sanitiseParam(params.product);
  const matched = findByReference(reference);

  /*
   * Prefill priority: the matched article number, then the product name for
   * the Classic 1891 models that the catalogue lists without one, then
   * whatever the visitor arrived with.
   */
  const prefill = matched
    ? (matched.articleNo ?? matched.name)
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
                        {matched.name}
                      </p>
                      <p className="mt-1.5 text-sm text-ink-muted">
                        {matched.articleNo
                          ? `Article ${matched.articleNo}`
                          : "No article number listed in the catalogue"}
                      </p>
                      <Link
                        href={`/products/${matched.category}/${matched.slug}`}
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
                        We could not match this reference to an entry in the
                        2026 catalogue, but it has been added to your enquiry so
                        we can look into it.
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

                CONTENT RULE — no Malaysian address, telephone number,
                registration number or opening hours appears here, because no
                supplied client document contains one. See lib/site.ts.
                --------------------------------------------------------- */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-xl font-medium tracking-tight text-ink">
                  Contact details
                </h2>

                <div className="mt-6 border-t border-line pt-6">
                  <p className="label-eyebrow mb-3 text-ink-subtle">
                    Morakniv Food Industry Malaysia
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    Our Malaysian office details — registered address, telephone
                    number and business hours — are being finalised and will be
                    published here once confirmed. In the meantime the enquiry
                    form is the fastest way to reach us, and reaches the same
                    people.
                  </p>
                </div>

                <div className="mt-8 border-t border-line pt-6">
                  <p className="label-eyebrow mb-3 text-ink-subtle">
                    Manufacturer — Sweden
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    The knives are made by {manufacturer.legalName} in Mora,
                    Sweden. For matters that concern the manufacturer directly:
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

                <div className="mt-8 border-t border-line pt-6">
                  <p className="label-eyebrow mb-3 text-ink-subtle">
                    Existing trade accounts
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    If you already order through the Morakniv B2B portal, place
                    and track orders there rather than through this form.
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <Button
                      href={manufacturer.b2bPortal}
                      variant="secondary"
                      size="sm"
                      className="w-full"
                    >
                      Open the B2B portal
                    </Button>
                    <Button
                      href="/how-to-order"
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      How ordering works
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Catalogue — the thing most enquirers actually want next
          --------------------------------------------------------------- */}
      <Section tone="alt" divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Before you write"
                title="The full 2026 range, in one PDF."
                lede="Article numbers, categories and product descriptions for the complete food industry programme. Quoting an article number in your enquiry saves a round of emails."
              />

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/products" className="w-full sm:w-auto">
                  Browse the catalogue
                </Button>
                <Button
                  href="/downloads"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  All downloads
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <DownloadCard document={catalogue} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
