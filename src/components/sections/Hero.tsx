import type { CSSProperties } from "react";
import ActionLink from "../ActionLink";
import SpatialField from "../SpatialField";
import { site } from "../../data/site";

/**
 * The hero states the two things a visitor needs: who this is, and what they
 * build. The spatial field behind it is the one expressive element on the
 * page; everything else stays quiet.
 */
export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      {/* Spatial field — decorative, so it is hidden from assistive tech. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] md:block" aria-hidden="true">
        <div className="field-grid absolute inset-0 opacity-60 mask-[radial-gradient(115%_85%_at_72%_42%,#000_28%,transparent_70%)]" />
        <SpatialField className="absolute inset-0 h-full w-full mask-[radial-gradient(115%_90%_at_70%_45%,#000_22%,transparent_68%)]" />
        {/* Scrim: the field fades out where it would sit behind body copy. */}
        <div className="absolute inset-y-0 left-0 w-2/5 bg-linear-to-r from-bg via-bg/80 to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-330 flex-col justify-center px-6 py-24 md:min-h-[92svh] md:px-10 md:py-32 lg:px-12">
        <p data-enter style={{ "--enter-delay": "0ms" } as CSSProperties} className="annot">
          {site.role} · {site.location}
        </p>

        <h1
          id="hero-title"
          data-enter
          style={{ "--enter-delay": "80ms" } as CSSProperties}
          className="mt-6 max-w-[16ch] text-5xl leading-[0.98] font-semibold tracking-[-0.03em] text-text sm:text-6xl md:text-7xl lg:text-[5.25rem]"
        >
          {site.name}
        </h1>

        <p
          data-enter
          style={{ "--enter-delay": "180ms" } as CSSProperties}
          className="mt-6 max-w-[24ch] font-display text-2xl leading-tight text-text-muted sm:text-3xl md:max-w-[30ch]"
        >
          {site.headline}
        </p>

        <p
          data-enter
          style={{ "--enter-delay": "280ms" } as CSSProperties}
          className="mt-8 max-w-[62ch] text-base leading-relaxed text-text-muted"
        >
          {site.supporting}
        </p>

        <div
          data-enter
          style={{ "--enter-delay": "380ms" } as CSSProperties}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <ActionLink href="#work">View selected work</ActionLink>
          <ActionLink href="#contact" variant="quiet">
            Get in touch
          </ActionLink>
        </div>

        <div
          data-enter
          style={{ "--enter-delay": "480ms" } as CSSProperties}
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6"
        >
          <span className="flex items-center gap-2.5">
            <span className="signal-pulse h-1.5 w-1.5 bg-accent" aria-hidden="true" />
            <span className="annot">Working across</span>
          </span>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
            <li>Full-stack engineering</li>
            <li>Interactive front end</li>
            <li>XR &amp; spatial computing</li>
            <li>Immersive analytics</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
