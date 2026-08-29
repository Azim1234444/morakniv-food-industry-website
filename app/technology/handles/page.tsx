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

/*
 * Client-supplied grip photograph, from the CorporateWebsite delivery
 * (source `Food_PUG (1).jpg.jpeg`).
 *
 * SCOPE RULE — read before writing any copy around this image.
 * It is an editorial/technical visual showing a handle being held. It is NOT
 * product photography and carries no article number:
 *
 *   - It must not be attached to a `Product` record, and must not be used to
 *     satisfy `ProductImageFrame`, which keeps its "image pending" state.
 *   - No SKU may be inferred from how the knife looks. The blade shape and
 *     handle in the frame identify no single article, and the delivery
 *     supplied no article number for it.
 *   - The handle in the frame is the PUG handle: the rounded pommel,
 *     integrated finger guard and thumb support the PUG catalogue describes
 *     are all visible. The PUG section below is written from that catalogue,
 *     and every claim in it is one the catalogue makes. Nothing about the
 *     range is inferred from this photograph.
 *   - Alt text and caption describe what the photograph SHOWS, nothing more.
 */
import gripInUseImage from "@/public/images/technology/handle-grip-in-use.webp";

export const metadata: Metadata = {
  title: "Handles",
  description:
    "The PUG handle — Performance Universal Grip: glass-fiber reinforced polypropylene, a rounded pommel, integrated finger guard and defined thumb support, in five colours.",
  alternates: { canonical: "/technology/handles" },
  openGraph: {
    title: "Handles — Morakniv Food Industry",
    description:
      "The Performance Universal Grip, developed for professional, repetitive work and demanding hygiene procedures.",
    url: "/technology/handles",
  },
};

/*
 * Catalogue pp.5–6 — the Performance Universal Grip.
 *
 * Every entry below restates a claim the catalogue makes about the handle.
 * Nothing is added from the product photography. Steel and hardness belong to
 * /technology/steel and are not repeated here.
 */
const pugFeatures = [
  {
    term: "Glass-fiber reinforced polypropylene",
    description:
      "The handle is made from glass-fiber reinforced polypropylene, creating a hard, wear-resistant construction.",
  },
  {
    term: "Rounded pommel",
    description:
      "A rounded pommel contributes to secure handling during repetitive work.",
  },
  {
    term: "Integrated finger guard",
    description:
      "An integrated finger guard contributes to secure handling, keeping the hand behind the edge.",
  },
  {
    term: "Defined thumb support",
    description:
      "Defined thumb support contributes to secure handling and helps place the hand consistently on the grip.",
  },
];

/* Catalogue p.6 — the five colours the range is available in. */
const pugColours = [
  "Black",
  "Red",
  "Green",
  "Yellow",
  "Metal-detectable blue",
];

export default function HandlesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="Handles"
        lede="How a knife feels in the hand is crucial. The range is built on one handle, the Performance Universal Grip, offered in five colours to suit the varied demands of the workplace."
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

      {/* PUG handle — photograph and introduction */}
      <Section tone="alt" divided>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="The handle"
                title="One grip across the range."
                lede="Every knife in the range is built on the PUG handle, developed for professional, repetitive work and demanding hygiene procedures."
              />
            </div>

            {/*
              Introduces the handle context for the variants below. Lazy by
              default — it sits well below the fold on every viewport.
            */}
            <figure className="m-0 lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-sunk">
                <Image
                  src={gripInUseImage}
                  alt="A hand gripping a knife by its moulded black handle, held against a stainless steel surface."
                  fill
                  placeholder="blur"
                  quality={85}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 40%" }}
                />
              </div>
              <figcaption className="mt-4 text-sm leading-relaxed text-ink-subtle">
                Handle application and grip in a food-industry setting.
              </figcaption>
            </figure>
          </div>

        </Container>
      </Section>

      {/* PUG — Performance Universal Grip */}
      <Section divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="PUG"
                title="Performance Universal Grip."
                lede="The handle at the core of the PUG range, developed for professional, repetitive work and demanding hygiene procedures."
              />
            </div>

            <div className="lg:col-span-7">
              <Prose>
                <p>
                  The handle geometry is designed to provide safety, control and
                  refined ergonomics. Its shape supports a stable grip and
                  controlled rotation in the hand during repetitive work.
                </p>
              </Prose>

              <h3 className="label-eyebrow mt-10 text-ink-subtle">
                Range colours
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {pugColours.map((colour) => (
                  <li key={colour} className="text-sm text-ink-muted">
                    {colour}
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
                The metal-detectable blue variant supports traceability and food
                safety in professional food production and HACCP. Colours are
                not offered on every model — the colours available for a given
                article are listed on its product page.
              </p>
            </div>
          </div>

          <DefinitionGrid items={pugFeatures} className="mt-12" />

          <SourceNote className="mt-8">
            Source: <em>Morakniv Professional Food Industry Knives — PUG</em>,
            pp.5&ndash;6.
          </SourceNote>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Product film — sits below the grip variants it illustrates.

          PLAYBACK RULES, and why they are what they are:
          `controls` gives the browser's own player, which is keyboard
          accessible and familiar. There is deliberately no `autoplay`, no
          `loop` and no `muted`: this is a five-minute film with speech, and
          starting it unbidden — or silently — would be both hostile and a
          misuse of the footage. `preload="metadata"` fetches only the index,
          which is a ~100 KB range request because the file was written
          faststart; the 31.9 MB body is not touched until someone presses play.

          COPY RULE: the presenter is not named here. The film carries its own
          on-screen caption, but naming a person in site copy needs their
          approval, which has not been given to us. Nothing in this section
          asserts a handle specification, a colour range or a product.
          --------------------------------------------------------------- */}
      <Section divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Product film"
                title="See the grip in use."
                lede="A product film showing handle design and grip in a food-industry setting."
              />
            </div>

            <div className="lg:col-span-7">
              <figure className="m-0">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-sunk">
                  <video
                    controls
                    preload="metadata"
                    playsInline
                    poster="/video/handles-product-film-poster.webp"
                    aria-label="Product film showing handle design and grip in a food-industry setting"
                    className="absolute inset-0 h-full w-full object-contain"
                  >
                    <source
                      src="/video/handles-product-film-720p.mp4"
                      type="video/mp4"
                    />
                    <p className="p-6 text-sm leading-relaxed text-ink-muted">
                      Your browser cannot play this video.{" "}
                      <a
                        href="/video/handles-product-film-720p.mp4"
                        className="underline underline-offset-4 hover:text-brand"
                      >
                        Open the file directly
                      </a>{" "}
                      instead.
                    </p>
                  </video>
                </div>
                <figcaption className="mt-4 text-sm leading-relaxed text-ink-subtle">
                  5 min 12 s, with sound. Playback starts only when you press
                  play.
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </Section>


      <Section tone="alt" divided>
        <Container>
          <SectionHeading
            eyebrow="Next"
            title="Blades, steel and traceability."
          />

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              href="/technology/blades"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Blades and flex grades
            </Button>
            <Button
              href="/technology/steel"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              The steel
            </Button>
            <Button
              href="/products"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Browse the range
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
