import type { Metadata } from "next";

import { CTASection } from "@/components/content/CTASection";
import { PageHeader } from "@/components/content/PageHeader";
import { Prose } from "@/components/content/Prose";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { distributor, manufacturer } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Order",
  description:
    "How to order Morakniv Food Industry knives in Malaysia: browse the range, note the article number, and order or enquire through Akmal Station, distributor and importer of Morakniv Food Industry products in Malaysia.",
  alternates: { canonical: "/how-to-order" },
  openGraph: {
    title: "How to Order — Morakniv Food Industry",
    description:
      "Order Morakniv Food Industry knives in Malaysia through Akmal Station. Browse the range, note the article number, and send an enquiry.",
    url: "/how-to-order",
  },
};

/**
 * How to order — the Malaysian route, and only the Malaysian route.
 *
 * SCOPE RULE
 * This site belongs to Akmal Station, which distributes and imports Morakniv
 * Food Industry products in Malaysia. Ordering on this page therefore means
 * ordering through Akmal Station. The manufacturer runs its own trade channels
 * in Sweden; they are not described here and must not be re-added as an
 * ordering option, because sending a Malaysian buyer to them is sending them
 * away from the business whose site this is.
 *
 * The journey the page is built around is deliberately three moves long:
 * browse the range, note the article number, get in touch. Anything that adds
 * a fourth move is working against it.
 *
 * COPY RULE
 * The Linktree is named as Akmal Station's own hub and nothing more. What sits
 * inside it is the client's to publish and change; no route, handle, number or
 * instruction may be inferred from it here. See `distributor.linktree`.
 */
export default function HowToOrderPage() {
  return (
    <>
      <PageHeader
        eyebrow="How to order"
        title="Ordering in Malaysia."
        lede={`Morakniv Food Industry knives are distributed and imported in Malaysia by ${distributor.legalName}. Three moves: find the knife, note its article number, send it to us with the quantity you need.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "How to Order" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={distributor.linktree} className="w-full sm:w-auto">
            Order / Enquire via Linktree
          </Button>
          <Button
            href="/products"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Browse the range
          </Button>
        </div>
      </PageHeader>

      {/* ---------------------------------------------------------------
          Who you are ordering from

          The two companies stay visibly separate here, as everywhere else on
          the site: Morakniv AB makes the knives, Akmal Station brings them
          into Malaysia. Neither sentence may be softened into implying they
          are the same business, or that the relationship is anything stronger
          than distribution and import.
          --------------------------------------------------------------- */}
      <Section divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Malaysia"
                title={`Order through ${distributor.legalName}.`}
                lede={`${distributor.role} Orders, quotations and product questions all come to us.`}
              />
            </div>

            <div className="lg:col-span-7">
              <Prose size="lg">
                <p>
                  Morakniv Food Industry knives are made by{" "}
                  {manufacturer.legalName} in Mora, Sweden — a separate company.{" "}
                  {distributor.legalName} is the business that distributes and
                  imports them here, and is who you deal with for orders,
                  quotations and product questions in Malaysia.
                </p>
                <p>
                  Our Linktree is the hub for ordering and contact enquiries.
                  It opens in a new tab and is kept up to date by us.
                </p>
              </Prose>

              <div className="mt-8">
                <Button href={distributor.linktree} size="lg">
                  Order / Enquire via Linktree
                </Button>
              </div>

              <SourceNote className="mt-8">
                {distributor.legalName} — registration no.{" "}
                {distributor.registrationNumber},{" "}
                {distributor.addressCompact.join(", ")}.
              </SourceNote>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Product enquiries — the article number is the whole trick

          This is the route that carries a specific knife with it, so it points
          at the enquiry form rather than the Linktree. `/contact?product=<no>`
          is prefilled from every product page; the form is the only path that
          arrives with an article number already attached.
          --------------------------------------------------------------- */}
      <Section tone="alt" divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Product enquiries"
                title="Send the article number."
                lede="Every knife in the range has its own article number. Quoting it is the difference between a quotation and a conversation about which knife you meant."
              />
            </div>

            <div className="lg:col-span-7">
              <Prose size="lg">
                <p>
                  Each product page carries its article number and an enquiry
                  link that brings the number along with it, so there is nothing
                  to copy out or retype. If you already have a number from a previous order, it can go
                  straight into the form.
                </p>
                <p>
                  Tell us the quantity you need alongside it. Quantities are
                  what let us come back with pricing and availability in one
                  reply rather than three.
                </p>
              </Prose>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/contact" className="w-full sm:w-auto">
                  Send a product enquiry
                </Button>
                <Button
                  href="/products"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Find an article number
                </Button>
              </div>

              <SourceNote className="mt-8">
                Source: <em>Morakniv Professional Food Industry Knives &mdash;
                PUG</em>. Prices, minimum quantities and lead times are not
                published on this site and are confirmed on enquiry.
              </SourceNote>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Browsing the range
          --------------------------------------------------------------- */}
      <Section tone="sunk" divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="The range"
                title="Start with the task, not the knife."
                lede="The programme is organised by what the knife is for — boning, butchering, filleting, trimming, slicing — so the shortest way in is the job you need it to do."
              />
            </div>

            <div className="lg:col-span-7">
              <Prose size="lg">
                <p>
                  Browse the range by category, choose a model, then use the
                  colour and article number shown on the product page when
                  making an enquiry. From any product page, the enquiry link
                  carries that article number into the form for you.
                </p>
                <p>
                  Not sure which model fits the line? Send us the cut, the
                  volume and the conditions it works in, and we will come back
                  with a recommendation.
                </p>
              </Prose>

              <div className="mt-8">
                <Button href="/products" size="lg">
                  Browse all products
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Closing CTA — the Linktree leads, the form sits beside it
          --------------------------------------------------------------- */}
      <CTASection
        eyebrow="Ready to order"
        title="Order or enquire through Akmal Station."
        lede="Our Linktree is the hub for ordering and contact enquiries. For a specific knife, the enquiry form is the more direct route — it carries the article number with it."
        primary={{
          label: "Order / Enquire via Linktree",
          href: distributor.linktree,
        }}
        secondary={{ label: "Send a product enquiry", href: "/contact" }}
      />
    </>
  );
}
