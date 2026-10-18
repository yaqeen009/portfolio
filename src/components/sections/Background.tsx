import Reveal from "../Reveal";
import Section from "../Section";
import { education, site } from "../../data/site";

export default function Background() {
  return (
    <Section
      id="background"
      index="04"
      label="Background"
      title="Computer science, statistics, and the habit of finishing things."
      lead="I work in the space between engineering, human–computer interaction and immersive technology."
    >
      <Reveal>
        <div className="max-w-[62ch] space-y-5 text-base leading-relaxed text-text-muted">
          <p>
            My degree is in Computer Science with a Mathematical Sciences background and an academic specialisation in
            Statistics. That combination shapes how I build: I want the software to be correct, and I want to be able to
            say why it is correct.
          </p>
          <p>
            In practice that means full-stack work — React and TypeScript on the front, Node and a database behind it —
            with an interest in the parts of an interface that are hard to get right: hierarchy, feedback, and what
            happens when the data is hostile. When the medium allows it, I move into Unity and Blender and build things
            that occupy space rather than sit in a rectangle.
          </p>
          <p>
            I am early in my career and I would rather show four finished things than twenty started ones. The projects
            on this page are the finished ones, and the limitations of each are written down next to it.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-14 border-t border-line pt-8">
          <h3 className="annot">Education</h3>
          <dl className="mt-5 space-y-6">
            {education.map((entry) => (
              <div key={entry.title} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="font-mono text-xs tracking-[0.14em] text-text-faint uppercase">{entry.period}</dt>
                <dd>
                  <p className="font-display text-lg text-text">{entry.title}</p>
                  <p className="mt-1 text-sm text-text-faint">{entry.org}</p>
                  <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-text-muted">{entry.detail}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      <Reveal>
        <p className="mt-12 text-sm text-text-faint">
          Full employment history and references are available on request — email{" "}
          <a href={site.links.email.href} className="link-underline text-text-muted hover:text-accent">
            {site.email}
          </a>
          .
        </p>
      </Reveal>
    </Section>
  );
}
