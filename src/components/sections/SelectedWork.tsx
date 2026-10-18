import ProjectShowcase from "../ProjectShowcase";
import Reveal from "../Reveal";
import Section from "../Section";
import { archive, projects, site } from "../../data/site";

const [bondit, vrCampus, ...compact] = projects;

export default function SelectedWork() {
  return (
    <Section
      id="work"
      index="01"
      label="Selected work"
      title="Five builds, and what each had to solve."
      lead="Two substantial builds, then a set of smaller tools that show the range: an in-browser data utility, a field-facing web app, and a compiler."
    >
      <div className="space-y-16 md:space-y-24">
        <Reveal>
          <ProjectShowcase project={bondit} />
        </Reveal>

        <Reveal>
          <ProjectShowcase
            project={vrCampus}
            extraLink={{ label: "Read the case study", href: "#immersive" }}
          />
        </Reveal>

        <div className="space-y-12 md:space-y-16">
          {compact.map((project, i) => (
            <Reveal key={project.id} delay={i * 60}>
              <ProjectShowcase project={project} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal>
        <div className="mt-20 border-t border-line pt-8">
          <h3 className="annot">Also on GitHub</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {archive.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-text-muted transition-colors duration-[var(--duration-quick)] hover:text-text"
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-text-faint">
            Everything public lives at{" "}
            <a
              href={site.links.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-text-muted hover:text-accent"
            >
              github.com/yaqeen009
            </a>
            .
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
