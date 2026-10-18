import type { ReactNode } from "react";
import { useReveal } from "../hooks";

interface SectionProps {
  id: string;
  index: string;
  label: string;
  /** Optional display heading for the section. */
  title?: string;
  /** Optional supporting sentence under the heading. */
  lead?: string;
  children: ReactNode;
  /** Escape hatch for the rare section that needs a different inner rhythm. */
  className?: string;
}

/**
 * One section shell for the whole site: hairline top rule, a two-column
 * editorial grid (heading column / content column) that collapses to a stack,
 * and a reveal trigger on the heading block.
 */
export default function Section({ id, index, label, title, lead, children, className = "" }: SectionProps) {
  const headingRef = useReveal<HTMLDivElement>();
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-20 border-t border-line md:scroll-mt-8 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1320px] px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="2xl:grid 2xl:grid-cols-12 2xl:gap-10">
          <div ref={headingRef} className="2xl:col-span-3">
            <div className="2xl:sticky 2xl:top-24">
              <p className="annot flex items-center gap-3">
                <span className="text-accent">{index}</span>
                <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                {label}
              </p>
              {title && (
                <h2 id={headingId} className="mt-5 text-3xl text-text md:text-4xl">
                  {title}
                </h2>
              )}
              {!title && (
                <h2 id={headingId} className="sr-only">
                  {label}
                </h2>
              )}
              {lead && <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-text-muted">{lead}</p>}
            </div>
          </div>

          <div className="mt-12 2xl:col-span-9 2xl:mt-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
