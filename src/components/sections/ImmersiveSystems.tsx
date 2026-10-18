import Reveal from "../Reveal";
import Section from "../Section";
import { projects } from "../../data/site";

const vrProject = projects.find((project) => project.id === "vr-campus");

const pipeline = [
  {
    step: "01",
    title: "Model the site",
    body: "The Physics and Chemistry departments were reconstructed as geometry in Blender: blocks, circulation routes and the landmarks a visitor would actually use to orient themselves.",
  },
  {
    step: "02",
    title: "Assemble the scene",
    body: "Imported into Unity as a single navigable environment, with lighting and materials set so the space stays legible without a powerful machine behind it.",
  },
  {
    step: "03",
    title: "Make it walkable",
    body: "C# scripts drive the first-person navigation and the XR rig, so the same scene can be explored on a monitor or through a headset.",
  },
  {
    step: "04",
    title: "Record the walkthrough",
    body: "The result was captured as a demonstration so the work can be reviewed by anyone without installing a build.",
  },
];

/**
 * Case study for the XR project. The video is the primary evidence; the
 * pipeline explains the engineering behind it, and the closing note states
 * what the project does not claim.
 */
export default function ImmersiveSystems() {
  return (
    <Section
      id="immersive"
      index="02"
      label="Immersive systems"
      title="Walking a campus before you get there."
      lead="A virtual reality reconstruction of the Physics and Chemistry departments at the University of Ghana — my route into spatial interfaces, and the project that shaped how I think about software that occupies space."
    >
      <Reveal>
        <figure className="border border-line bg-bg-raised">
          <div className="relative aspect-video w-full">
            <iframe
              src="https://www.youtube-nocookie.com/embed/gJNC8mtrAKo"
              title="VR walkthrough of the reconstructed Physics and Chemistry departments, University of Ghana"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line px-5 py-3">
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-faint uppercase">
              Walkthrough — Unity, Blender, C#
            </span>
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-faint uppercase">
              Author's own recording
            </span>
          </figcaption>
        </figure>
      </Reveal>

      <Reveal>
        <ol className="mt-16 space-y-10">
          {pipeline.map((item) => (
            <li key={item.step} className="grid gap-2 border-t border-line pt-6 sm:grid-cols-[4rem_1fr] sm:gap-6">
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">{item.step}</span>
              <div>
                <h3 className="text-lg text-text">{item.title}</h3>
                <p className="mt-2 max-w-[56ch] text-[0.9375rem] leading-relaxed text-text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal>
        <div className="mt-16 border-t border-line pt-6">
          <h3 className="annot">What this project does not claim</h3>
          <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-text-muted">
            It is a completed academic reconstruction with a recorded demonstration — not a deployed campus navigation
            product, not evaluated with a study group, and not in use by the university. The repository holds project
            metadata; the recording is the evidence.
          </p>
          {vrProject?.links.length ? (
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {vrProject.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-mono text-xs tracking-[0.14em] text-text uppercase transition-colors duration-[var(--duration-quick)] hover:text-accent"
                  >
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
