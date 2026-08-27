import type { Metadata } from "next";

import { DefinitionGrid } from "@/components/content/DefinitionGrid";
import { DownloadCard } from "@/components/content/DownloadCard";
import { PageHeader } from "@/components/content/PageHeader";
import { Prose } from "@/components/content/Prose";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { b2bManual } from "@/lib/documents";
import { manufacturer } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Order",
  description:
    "The Morakniv Gung B2B portal: logging in, finding products, importing orders from Excel, checkout, and downloading product data and price lists.",
  alternates: { canonical: "/how-to-order" },
  openGraph: {
    title: "How to Order — Morakniv Food Industry",
    description:
      "How ordering works through the Morakniv Gung B2B portal, based on the manufacturer's user manual.",
    url: "/how-to-order",
  },
};

/* Steps below are taken from the Gung B2B portal user manual (English). */
const steps = [
  {
    term: "1 — Log in",
    description:
      "Go to morakniv.gung.io. Choose Swedish or English using the flag icons; selecting English shows menus and product information in English. First-time users click 'Forgot password' to receive a link and create a password, then log in with their email address.",
  },
  {
    term: "2 — Find products",
    description:
      "After logging in you land on a page listing the products in your shop. Search by article number or article name, filter by product type or product series, and use the product cards — which show article number, image, product name, your price and delivery date — to add items to the cart.",
  },
  {
    term: "3 — Check the detail page",
    description:
      "Clicking a product image opens a detailed page showing dimensions, description and the recommended price. Products are ordered in even multiples according to the packaging quantity.",
  },
  {
    term: "4 — Or import from Excel",
    description:
      "Choose 'Import order from Excel', select the 'Column format' upload format, download the example template, fill in SKU and quantity (EAN is not required) and upload the file. Note that items already in your cart are replaced by the uploaded items.",
  },
  {
    term: "5 — Checkout",
    description:
      "Open the checkout from the icon in the upper right. Quantities can be adjusted and a desired delivery date set. A minimum order value must be met to check out.",
  },
  {
    term: "6 — Delivery and reference",
    description:
      "Choose the delivery location from your saved addresses. A reference, PO or order number must be provided. A message to the order recipient can be added — for example delivery instructions.",
  },
  {
    term: "7 — Submit",
    description:
      "The final step summarises the information going into the order. Click 'Submit Order' to complete; an order summary is sent to your email.",
  },
];

const portalFeatures = [
  {
    term: "Product data export",
    description:
      "Download product images (IMG), product data sheets as PDF with one page per product, and full product information in Excel. Available in Swedish and English, and for some products Norwegian or German. A maximum of 20 items per download applies to images and product data sheets.",
  },
  {
    term: "Price lists",
    description:
      "Current net prices and RRP can be downloaded as a price list, sent via a download link to your email.",
  },
  {
    term: "My Pages",
    description:
      "Manage users, shipping addresses and contact details, and view orders and invoices. Tabs cover addresses, contacts, orders, invoices and the users linked to your order number.",
  },
  {
    term: "Previous orders",
    description:
      "View and download all previous order confirmations in different formats.",
  },
  {
    term: "Delivery overview",
    description:
      "See all upcoming deliveries and their status, including delivery tracking numbers and expected delivery dates.",
  },
  {
    term: "Saved carts & favourites",
    description:
      "Save shopping carts as favourites to save time when reordering bestsellers, and mark individual knives as favourites to jump straight to their product pages.",
  },
];

export default function HowToOrderPage() {
  return (
    <>
      <PageHeader
        eyebrow="How to order"
        title="Ordering through the Morakniv B2B portal."
        lede="Morakniv AB operates a self-service ordering portal for trade customers. Logging in with your own credentials gives you your range, your prices and your order history."
        crumbs={[{ label: "Home", href: "/" }, { label: "How to Order" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={manufacturer.b2bPortal} className="w-full sm:w-auto">
            Open the B2B portal
          </Button>
          <Button
            href={b2bManual.href}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Read the user manual (PDF)
          </Button>
        </div>
      </PageHeader>

      {/* ---------------------------------------------------------------
          Access caveat — stated before the steps, not buried after them
          --------------------------------------------------------------- */}
      <Section size="sm">
        <Container>
          <SourceNote variant="caution">
            <strong className="font-medium text-ink">
              Before you begin.
            </strong>{" "}
            The portal described on this page is operated by Morakniv AB in
            Sweden and requires an existing trade account. Account eligibility,
            minimum order values, pricing, lead times and delivery terms are set
            by the manufacturer and are not published on this site. In
            Malaysia, Morakniv Food Industry products are distributed and
            imported by Akmal Station — if you are unsure which route
            applies to you, contact us before registering.
          </SourceNote>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          The ordering flow
          --------------------------------------------------------------- */}
      <Section divided>
        <Container>
          <SectionHeading
            eyebrow="The process"
            title="From login to submitted order."
            lede="Seven steps, as documented in the manufacturer's portal manual."
          />

          <DefinitionGrid items={steps} columns={1} className="mt-12" />

          <SourceNote className="mt-8">
            Source: <em>Morakniv User Manual — Gung B2B portal</em> (English),
            Morakniv AB.
          </SourceNote>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          What else the portal does
          --------------------------------------------------------------- */}
      <Section tone="alt" divided>
        <Container>
          <SectionHeading
            eyebrow="Beyond ordering"
            title="Product data, price lists and order history."
          />

          <DefinitionGrid items={portalFeatures} className="mt-12" />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Support
          --------------------------------------------------------------- */}
      <Section tone="sunk" divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Support"
                title="Questions about the portal."
              />

              <Prose className="mt-6">
                <p>
                  The user manual lists a support address for portal and order
                  enquiries, operated by the manufacturer.
                </p>
              </Prose>

              <p className="mt-6">
                <a
                  href={`mailto:${manufacturer.orderEmail}`}
                  className="text-lg font-medium text-ink underline underline-offset-4 transition-colors hover:text-brand"
                >
                  {manufacturer.orderEmail}
                </a>
              </p>
            </div>

            <div className="lg:col-span-7">
              <DownloadCard document={b2bManual} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
