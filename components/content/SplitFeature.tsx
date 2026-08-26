import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type SplitFeatureProps = {
  image: StaticImageData;
  alt: string;
  /** Place the image on the right instead of the left. */
  reverse?: boolean;
  /** Aspect ratio of the image frame. */
  ratio?: "landscape" | "portrait" | "square";
  /** CSS object-position, for steering the crop away from dead space. */
  focus?: string;
  caption?: string;
  children: ReactNode;
};

const ratios = {
  landscape: "aspect-[4/3] lg:aspect-[3/2]",
  portrait: "aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]",
  square: "aspect-square",
} as const;

export function SplitFeature({
  image,
  alt,
  reverse = false,
  ratio = "landscape",
  focus = "center",
  caption,
  children,
}: SplitFeatureProps) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <figure
        className={`m-0 lg:col-span-6 ${reverse ? "lg:order-2" : "lg:order-1"}`}
      >
        <div
          className={`relative w-full overflow-hidden bg-surface-sunk ${ratios[ratio]}`}
        >
          <Image
            src={image}
            alt={alt}
            fill
            placeholder="blur"
            quality={85}
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
            style={{ objectPosition: focus }}
          />
        </div>

        {caption && (
          <figcaption className="mt-3 text-xs leading-relaxed text-ink-subtle">
            {caption}
          </figcaption>
        )}
      </figure>

      <div
        className={`lg:col-span-6 ${reverse ? "lg:order-1" : "lg:order-2"}`}
      >
        {children}
      </div>
    </div>
  );
}
