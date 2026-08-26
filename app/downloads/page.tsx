import type { Metadata } from "next";

import { DownloadCard } from "@/components/content/DownloadCard";
import { PageHeader } from "@/components/content/PageHeader";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  ashWoodOutdoor,
  b2bManual,
  catalogue,
  complianceDocuments,
  pressRelease,
} from "@/lib/documents";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download the Morakniv Professional Food Industry Knives 2026 catalogue, declarations of compliance, the B2B portal user manual and press materials.",
  alternates: { canonical: "/downloads" },
  openGraph: {
    title: "Downloads — Morakniv Food Industry",
    description:
      "Product catalogue, compliance declarations, B2B portal manual and press materials.",
    url: "/downloads",
  },
};

export default function DownloadsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Download centre"
        lede="Product, technical and compliance documents, published as supplied by Morakniv AB. All files are PDF and open in a new tab."
        crumbs={[{ label: "Home", href: "/" }, { label: "Downloads" }]}
      />

      {/* ---------------------------------------------------------------
          Product literature
          --------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Product literature"
            title="The 2026 catalogue."
            lede="The complete product and technical reference for the food industry range."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <DownloadCard document={catalogue} />
          </div>

          <SourceNote className="mt-8">
            The catalogue is a large file. Article-number counts on this site are
            taken from it; detailed per-knife specifications are still being
            verified against the manufacturer&rsquo;s product data before
            publication.
          </SourceNote>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Compliance — food industry range
          --------------------------------------------------------------- */}
      <Section tone="alt" divided>
        <Container>
          <SectionHeading
            eyebrow="Compliance"
            title="Declarations — food industry range."
            lede="Issued by Morakniv AB for the materials in the food industry knives that come into contact with food."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {complianceDocuments.map((document) => (
              <DownloadCard key={document.id} document={document} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Compliance — explicitly OUTSIDE the food industry range
          --------------------------------------------------------------- */}
      <Section divided>
        <Container>
          <SectionHeading
            eyebrow="Other product lines"
            title="Declaration — Ashwood Outdoor collection."
            lede="Supplied with the client materials but covering a different product line. Listed separately so its scope is unambiguous."
          />

          <SourceNote variant="caution" className="mt-8">
            <strong className="font-medium text-ink">
              Not a food industry document.
            </strong>{" "}
            This declaration covers outdoor knives with coated stainless steel
            blades, and cites FDA 21 CFR 170.39 alongside the EU regulations. The
            document itself notes that the food contact material in these
            products is the coated stainless steel blade, and that the handles
            are therefore not evaluated for food contact. It does not apply to
            the food industry range described elsewhere on this site.
          </SourceNote>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <DownloadCard document={ashWoodOutdoor} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Ordering & press
          --------------------------------------------------------------- */}
      <Section tone="sunk" divided>
        <Container>
          <SectionHeading
            eyebrow="Ordering & press"
            title="Portal manual and press materials."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <DownloadCard document={b2bManual} />
            <DownloadCard document={pressRelease} />
          </div>

          <SourceNote className="mt-8">
            All documents on this page were issued by Morakniv AB, Mora, Sweden.
            They are reproduced here unmodified. Where a declaration states an
            issue date, that date is shown on the card.
          </SourceNote>
        </Container>
      </Section>
    </>
  );
}
