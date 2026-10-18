import Reveal from "../Reveal";
import Section from "../Section";
import { capabilities } from "../../data/site";

/**
 * Capabilities are stated as prose per area. No proficiency bars, no badge
 * rows, no percentages — a claim you cannot measure is worse than a sentence.
 */
export default function Capabilities() {
  return (
    <Section
      id="capabilities"
      index="03"
      label="Capabilities"
      title="What I work with."
      lead="Everything listed here is used in the projects on this page or in assessed coursework."
    >
      <ul className="border-t border-line">
        {capabilities.map((group) => (
          <Reveal key={group.area} as="li" className="border-b border-line">
            <div className="grid gap-2 py-7 md:grid-cols-[12rem_1fr] md:gap-8">
              <h3 className="font-display text-lg text-text">{group.area}</h3>
              <p className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-text-muted">{group.detail}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
