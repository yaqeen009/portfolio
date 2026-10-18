import Reveal from "../Reveal";
import Section from "../Section";
import { researchInterests } from "../../data/site";

/**
 * Research interests, not findings. The wording is deliberately prospective:
 * these are questions I want to work on, and the section says so.
 */
export default function ResearchInterests() {
  return (
    <Section
      id="research"
      index="05"
      label="Research interests"
      title="Questions I want to keep working on."
      lead="These are directions I am reading towards and building towards — not published results, and not claims of expertise."
    >
      <ul className="grid gap-x-10 gap-y-10 md:grid-cols-2">
        {researchInterests.map((interest, i) => (
          <Reveal key={interest.title} as="li" delay={i * 50}>
            <div className="border-t border-line pt-5">
              <h3 className="font-display text-xl text-text">{interest.title}</h3>
              <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-text-muted">{interest.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <p className="mt-14 max-w-[62ch] border-t border-line pt-6 text-sm leading-relaxed text-text-faint">
          The campus reconstruction on this page is where the immersive-analytics interest started: it is a spatial
          representation of a real environment, and it raised the questions about orientation, scale and navigation
          that I would like to take further.
        </p>
      </Reveal>
    </Section>
  );
}
