import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { visualSource, type CatalogueVisual } from "@/lib/images/catalogue";

type CategoryHeroProps = {
  visual: CatalogueVisual;
};

/**
 * The wide visual that sits between the page header and the assortment.
 *
 * Photographs fill the frame; the catalogue's line-art figures sit on white and
 * are contained instead, on the paler ground so the sheet still reads as a
 * figure rather than a photograph that failed to load.
 */
export function CategoryHero({ visual }: CategoryHeroProps) {
  const isPhoto = visual.fit === "cover";

  return (
    <figure className="m-0 border-b border-line bg-surface-alt">
      <Container>
        <div className="py-8 md:py-10">
          <div
            className={`relative w-full overflow-hidden ${
              isPhoto
                ? "aspect-[4/3] bg-surface-sunk sm:aspect-[2/1] lg:aspect-[21/9]"
                : "aspect-[3/2] bg-surface px-6 py-8 sm:aspect-[5/2] md:px-12 lg:aspect-[3/1]"
            }`}
          >
            <Image
              src={visual.image}
              alt={visual.alt}
              fill
              priority
              placeholder="blur"
              quality={85}
              sizes="(min-width: 1280px) 1216px, 100vw"
              className={
                isPhoto ? "object-cover object-center" : "object-contain p-2"
              }
            />
          </div>

          <figcaption className="mt-4 flex flex-col gap-1 text-xs leading-relaxed text-ink-subtle sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <span className="max-w-2xl">{visual.caption}</span>
            <span className="shrink-0 tabular-nums">
              {visualSource(visual)}
            </span>
          </figcaption>
        </div>
      </Container>
    </figure>
  );
}
