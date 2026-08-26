import type { Metadata } from "next";
import Image from "next/image";

import { DefinitionGrid } from "@/components/content/DefinitionGrid";
import { PageHeader } from "@/components/content/PageHeader";
import { Prose } from "@/components/content/Prose";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

/*
 * IMAGE RIGHTS — see the note in app/page.tsx. `food-industry-worker.jpg`
 * shows an identifiable person and no model release was supplied. Commercial
 * use must be confirmed in writing before this site goes live.
 */
import workerImage from "@/public/images/food-industry-worker.jpg";

export const metadata: Metadata = {
  title: "Handles",
  description:
    "Handle designs and grip variants — Ergo-Grip, G-Grip, Uni-Grip, Pro-Grip and RMH-Grip — each developed for a specific area of use in the food industry.",
  alternates: { canonical: "/technology/handles" },
  openGraph: {
    title: "Handles — Morakniv Food Industry",
    description:
      "Grip variants and handle designs developed for specific areas of use, materials and workplace conditions.",
    url: "/technology/handles",
  },
};

/* Catalogue p.17 — grip variants, listed exactly as the catalogue names them. */
const gripVariants = [
  {
    term: "Ergo-Grip",
    description:
      "Made with soft grip material to reduce joint strain and support fatigue-free work. The double-molded rubber and etched surface prevent slipping, even in wet environments. The open-rear design allows quick repositioning during cutting, breakdown and deboning.",
  },
  {
    term: "G-Grip",
    description:
      "Constructed from polyamide with a microblasted surface for optimal friction, preventing the hand from slipping onto the blade. The open-rear design allows quick and safe repositioning, while integrated fingergrooves provide a slip-resistant grip with maximum control.",
  },
  {
    term: "Uni-Grip",
    description:
      "The versatile standard handle, made of polyamide with a microblasted surface. The well-shaped protective nose enhances safety by preventing the hand from sliding forward. Suited to general-purpose daily use.",
  },
  {
    term: "Pro-Grip",
    description:
      "Soft grip material reduces joint strain and supports fatigue-free operation. The double-molded rubber handle with an etched structure and well-shaped nose ensures a secure grip, even in wet conditions.",
  },
  {
    term: "RMH-Grip",
    description:
      "The extra ribbed structure on the handle ensures maximum safety through increased friction — even when working with heavy rubber gloves.",
  },
];

/* Catalogue p.16 — construction features, described separately from variants. */
const handleDesigns = [
  {
    term: "Ribbed pattern",
    description:
      "The extra ribbed structure ensures maximum safety through increased friction, even when working with heavy rubber gloves.",
  },
  {
    term: "TPE handles",
    description:
      "The soft grip material supports fatigue-free use, reducing strain on joints. The double-molded rubber handle with its etched surface prevents the hand from slipping onto the blade, even in wet conditions.",
  },
  {
    term: "Rear-open handles",
    description:
      "Handles open at the rear facilitate quick and secure repositioning during cutting, breakdown and deboning tasks, supporting fatigue-free, controlled handling.",
  },
  {
    term: "Handles with fingergrooves",
    description:
      "Fingergrooves combined with a microblasted surface enable fatigue-free, highly slip-resistant use and offer maximum control.",
  },
];

export default function HandlesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="Handles"
        lede="How a knife feels in the hand is crucial. Each handle is designed for a specific area of use, with different materials and colours to suit the varied demands of the workplace."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Handles" },
        ]}
      />

      {/* Why the grip matters */}
      <Section>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <figure className="m-0 lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-sunk">
                <Image
                  src={workerImage}
                  alt="A food industry worker in protective whites, hairnet and apron in a chilled processing room."
                  fill
                  placeholder="blur"
                  quality={85}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 35%" }}
                />
              </div>
            </figure>

            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="It's all about the grip"
                title="Power, precision and full control."
              />

              <Prose className="mt-6">
                <p>
                  The handles on the food processing knives are ergonomically
                  shaped to allow strong, precise and controlled movements,
                  helping reduce the risk of repetitive strain injuries.
                </p>
                <p>
                  Designing a good grip is more complex than it seems, because
                  the human hand is just as complex. The 27 bones, 30 joints and
                  55 muscles — including 16 dedicated to the thumb — work
                  together to create precise and coordinated movements. The
                  strength comes from 14 muscles in the forearm, while 41 small
                  muscles in the hand enable fine, high-precision tasks.
                </p>
                <p className="text-ink">
                  Custom colours are available on request.
                </p>
              </Prose>

              <SourceNote className="mt-8">
                Source: <em>Morakniv Professional Food Industry Knives 2026</em>,
                p.14.
              </SourceNote>
            </div>
          </div>
        </Container>
      </Section>

      {/* Grip variants */}
      <Section tone="alt" divided>
        <Container>
          <SectionHeading
            eyebrow="Grip variants"
            title="Different handles for different needs."
          />

          <DefinitionGrid items={gripVariants} className="mt-12" />

          <SourceNote variant="caution" className="mt-8">
            The catalogue is inconsistent about how many handle families exist.
            Page&nbsp;14 refers to &ldquo;four distinct handle materials&rdquo;
            and names Ergo-Grip, G-Grip, Uni-Grip and Pro-Grip; page&nbsp;17
            documents these five variants; and the product tables list further
            grip codes again, including P-Grip, PS-Grip and AM-Grip. The five
            variants documented on p.17 are shown above, without asserting a
            total. The full list of grip codes will be published with the
            product data once verified.
          </SourceNote>
        </Container>
      </Section>

      {/* Handle designs */}
      <Section divided>
        <Container>
          <SectionHeading
            eyebrow="Handle designs"
            title="Construction features."
            lede="Design elements that appear across the grip variants, each addressing a specific handling or safety requirement."
          />

          <DefinitionGrid items={handleDesigns} className="mt-12" />

          <SourceNote className="mt-8">
            Source: <em>Morakniv Professional Food Industry Knives 2026</em>,
            p.16.
          </SourceNote>

          <div className="mt-9">
            <Button href="/technology/safety" variant="secondary">
              Safety &amp; traceability
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
