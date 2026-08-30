import Image from "next/image";

import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CatalogueVisual } from "@/lib/images/catalogue";

type CategoryFiguresProps = {
  figures: CatalogueVisual[];
  categoryName: string;
};

/**
 * Blade and handle figures for a category, reproduced from the catalogue.
 *
 * The closing note is not decorative: the catalogue's figures are not keyed to
 * article numbers, so the page has to say plainly that these illustrate the
 * range rather than any one knife in the assortment above.
 *
 * This section sits after the assortment by design. A buyer arriving here
 * wants an article number first; the reference material is what they read
 * second, so it stays visually strong but never precedes the listing.
 */
export function CategoryFigures({
  figures,
  categoryName,
}: CategoryFiguresProps) {
  if (figures.length === 0) return null;

  return (
    <Section tone="alt" size="sm" divided>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="From the catalogue"
              title="Blade profiles."
              lede={`Blade geometry the ${categoryName.toLowerCase()} range is built on.`}
            />
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {figures.map((figure) => (
                <figure
                  key={figure.image.src}
                  className="m-0 flex flex-col border border-line bg-surface"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                    <Image
                      src={figure.image}
                      alt={figure.alt}
                      fill
                      placeholder="blur"
                      quality={85}
                      sizes="(min-width: 1024px) 44vw, (min-width: 640px) 46vw, 100vw"
                      className="object-contain p-4"
                    />
                  </div>

                  <figcaption className="flex flex-1 flex-col border-t border-line px-5 py-4">
                    <span className="label-eyebrow text-ink-subtle">
                      {figure.label}
                    </span>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">
                      {figure.caption}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <SourceNote className="mt-8">
              These figures describe blade geometry across the range as a whole
              rather than any single model.
            </SourceNote>
          </div>
        </div>
      </Container>
    </Section>
  );
}
