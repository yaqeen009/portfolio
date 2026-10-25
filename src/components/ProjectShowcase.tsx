import ProjectFigure from "./ProjectFigure";
import type { Project } from "../data/site";

interface ProjectShowcaseProps {
  project: Project;
  /** Extra link rendered inside the body, e.g. "Read the case study". */
  extraLink?: { label: string; href: string };
}

function StatusFlag({ status }: { status: string }) {
  const isLive = status.toLowerCase() === "live";
  return (
    <span className="flex items-center gap-2">
      {isLive && <span className="signal-pulse h-1.5 w-1.5 bg-accent" aria-hidden="true" />}
      <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-faint uppercase">{status}</span>
    </span>
  );
}

/** Figure panel: the diagram sits on a faint coordinate grid. */
function Plate({ id, ratio }: { id: string; ratio: string }) {
  return (
    <div
      className={`relative overflow-hidden border border-line bg-bg-raised transition-colors duration-(--duration-base) ease-out-quint group-hover:border-line-strong ${ratio}`}
    >
      <div className="field-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-(--duration-base) ease-out-quint group-hover:-translate-y-1">
        <ProjectFigure id={id} className="h-full w-full" />
      </div>
    </div>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="text-2xl text-text md:text-3xl">{project.name}</h3>
        <StatusFlag status={project.status} />
      </div>

      <p className="mt-3 text-base text-text-muted">{project.summary}</p>

      <dl className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed">
        <div>
          <dt className="annot">Purpose</dt>
          <dd className="mt-1.5 text-text-muted">{project.purpose}</dd>
        </div>
        <div>
          <dt className="annot">Contribution</dt>
          <dd className="mt-1.5 text-text-muted">{project.contribution}</dd>
        </div>
      </dl>

      <p className="mt-6 font-mono text-xs tracking-[0.08em] text-text-faint">
        {project.stack.join(", ")}
      </p>

      {project.note && <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-text-faint italic">{project.note}</p>}
    </>
  );
}

function Links({ project, extraLink }: ProjectShowcaseProps) {
  const links = extraLink ? [extraLink, ...project.links] : project.links;
  if (links.length === 0) return null;
  return (
    <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
      {links.map((link) => {
        const external = link.href.startsWith("http");
        return (
          <li key={link.href}>
            <a
              href={link.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="link-underline font-mono text-xs tracking-[0.14em] text-text uppercase transition-colors duration-[var(--duration-quick)] hover:text-accent"
            >
              {link.label}
              {external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Three compositions share one content model so the work reads as a set while
 * each project gets a layout that suits its material.
 */
export default function ProjectShowcase({ project, extraLink }: ProjectShowcaseProps) {
  const body = (
    <div>
      <Meta project={project} />
      <Links project={project} extraLink={extraLink} />
    </div>
  );

  if (project.layout === "feature") {
    return (
      <article className="group grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Plate id={project.id} ratio="aspect-[16/11]" />
        </div>
        <div className="lg:col-span-6">{body}</div>
      </article>
    );
  }

  if (project.layout === "wide") {
    return (
      <article className="group grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:order-2">
          <Plate id={project.id} ratio="aspect-[16/11]" />
        </div>
        <div className="lg:col-span-6 lg:order-1">{body}</div>
      </article>
    );
  }

  return (
    <article className="group grid gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <Plate id={project.id} ratio="aspect-[4/3]" />
      </div>
      <div className="lg:col-span-8">{body}</div>
    </article>
  );
}
