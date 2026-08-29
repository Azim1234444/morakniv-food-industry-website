import Image from "next/image";
import type { ReactNode } from "react";

import { getStiffnessMark, type StiffnessMark } from "@/lib/images/technology";

export type StiffnessGrade = {
  /** Grade key, used to pull the manufacturer's published mark. */
  key: StiffnessMark["key"];
  term: string;
  /** Optional short qualifier shown beside the term. */
  meta?: string;
  description: ReactNode;
};

/**
 * The four flex grades, each shown with the mark the manufacturer publishes
 * for it.
 *
 * The mark sits beside the description rather than in a panel of its own: the
 * graphic and the words describe the same thing, and splitting them into two
 * parallel lists would make the reader match them up by name. The mark carries
 * its own lettering, so the visible heading repeats it — kept because image
 * text is not text, and the heading is what search and screen readers use.
 */
export function StiffnessGrades({
  grades,
  className = "",
}: {
  grades: StiffnessGrade[];
  className?: string;
}) {
  return (
    <dl
      className={`grid gap-px border border-line bg-line sm:grid-cols-2 ${className}`}
    >
      {grades.map((grade) => {
        const mark = getStiffnessMark(grade.key);

        return (
          <div key={grade.key} className="flex gap-5 bg-surface p-6">
            {mark && (
              <div className="relative h-16 w-16 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]">
                <Image
                  src={mark.image}
                  alt={mark.alt}
                  fill
                  sizes="72px"
                  className="object-contain object-left"
                />
              </div>
            )}

            <div className="min-w-0">
              <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-base font-medium text-ink">
                  {grade.term}
                </span>
                {grade.meta && (
                  <span className="label-eyebrow text-ink-subtle">
                    {grade.meta}
                  </span>
                )}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink-muted">
                {grade.description}
              </dd>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
