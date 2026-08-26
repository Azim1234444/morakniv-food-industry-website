import type { Metadata } from "next";

import { DefinitionGrid } from "@/components/content/DefinitionGrid";
import { PageHeader } from "@/components/content/PageHeader";
import { Prose } from "@/components/content/Prose";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Steel",
  description:
    "Swedish stainless steel from Alleima in Sandviken, made from 80–90% recycled content, with a micro grain structure and cryogenic hardening to 58 HRC.",
  alternates: { canonical: "/technology/steel" },
  openGraph: {
    title: "The Steel — Morakniv Food Industry",
    description:
      "Swedish stainless steel from Alleima, micro grain structure and cryogenic hardening to 58 HRC.",
    url: "/technology/steel",
  },
};

const processSteps = [
  {
    term: "Cryogenic hardening",
    meta: "58 HRC",
    description:
      "Each blade undergoes an industry-leading cryogenic hardening process, resulting in a Rockwell hardness of 58 HRC. This extends the time between sharpening and increases resistance to chipping and cracking, even when cutting harder materials like bone or frozen foods.",
  },
  {
    term: "Micro grain structure",
    description:
      "The steel's micro grain structure allows for a finer, sharper edge with minimal tearing — suited to high-precision tasks, and important for delicate items such as deli meats and vegetables.",
  },
  {
    term: "Computer-controlled grinding",
    description:
      "The blade receives its final shape through computer-controlled spine, side and edge grinding, ensuring optimal geometry and consistent performance.",
  },
  {
    term: "Robotic sharpening",
    description:
      "Each blade is robotically sharpened for precision, then tested and documented to guarantee uniform sharpness and maximum efficiency.",
  },
  {
    term: "Mirror-polished finish",
    description:
      "A mirror-polished finish reduces friction, improves glide, simplifies cleaning and minimises bacterial buildup — described in the catalogue as essential for hygienic handling.",
  },
  {
    term: "Corrosion resistance",
    description:
      "Despite the name, stainless steel is not fully resistant to corrosion; a more accurate term would be rust-resistant steel. The blades are made to offer strength, durability and better rust resistance in wet or moist environments.",
  },
];

export default function SteelPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="The Steel"
        lede="Swedish stainless steel from Alleima in Sandviken has been part of Morakniv knives for over a century."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "The Steel" },
        ]}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Sourcing"
                title="80–90% recycled Swedish stainless steel."
              />
            </div>

            <div className="lg:col-span-7">
              <Prose size="lg">
                <p>
                  Over time, the share of recycled content in the steel has
                  steadily increased. Today the alloy is made from 80&ndash;90%
                  recycled Swedish stainless steel.
                </p>
                <p>
                  In modern steel production it is rare for stainless steel to
                  be made entirely from virgin material. Research shows that
                  recycled steel retains the same high quality, and since iron
                  atoms are eternal, the material can be reused indefinitely in
                  new compositions. Increasing the recycling rate also reduces
                  carbon dioxide emissions.
                </p>
              </Prose>

              <SourceNote variant="caution" className="mt-8">
                The catalogue states the recycled share in two places and the
                figures differ: p.8 refers to &ldquo;a recycled ratio exceeding
                90%&rdquo;, while p.12 states &ldquo;80&ndash;90% recycled
                Swedish stainless steel&rdquo;. The more conservative
                p.12 figure is used throughout this site.
              </SourceNote>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="alt" divided>
        <Container>
          <SectionHeading
            eyebrow="From billet to edge"
            title="How the blade is made."
          />

          <DefinitionGrid items={processSteps} className="mt-12" />

          <SourceNote className="mt-8">
            Source: <em>Morakniv Professional Food Industry Knives 2026</em>,
            pp.12 and 18&ndash;19.
          </SourceNote>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              href="/technology/blades"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Blades and flex grades
            </Button>
            <Button
              href="/technology/safety"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Safety &amp; traceability
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
