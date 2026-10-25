import { useEffect, useRef, useState } from "react";
import { navItems, site } from "../data/site";
import { useActiveSection, useScrollProgress } from "../hooks";

const sectionIds = navItems.map((item) => item.id);

function Icon({ name }: { name: "github" | "linkedin" | "mail" }) {
  const paths: Record<string, string> = {
    github:
      "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z",
    linkedin:
      "M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 21h-3.37v-6.53c0-1.64-.59-2.76-2.05-2.76-1.12 0-1.79.76-2.08 1.5-.11.26-.14.63-.14 1V21H9.43s.05-11.33 0-12.5h3.37v1.77c.45-.7 1.25-1.7 3.05-1.7 2.23 0 3.9 1.46 3.9 4.6V21Z",
    mail: "M3 5.5h18v13H3v-13Zm1.6 1.2L12 12.1l7.4-5.4",
  };

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" focusable="false">
      {name === "mail" ? (
        <path d={paths.mail} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d={paths[name]} fill="currentColor" />
      )}
    </svg>
  );
}

export default function RailNav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const progress = useScrollProgress();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    focusables?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      {/* ---------------------------------------------------------------- rail */}
      <aside
        aria-label="Site navigation and contact"
        className="fixed left-0 top-0 z-30 hidden h-full flex-col justify-between border-r border-line bg-bg/80 px-4 py-8 backdrop-blur md:flex md:w-rail lg:w-56 lg:px-6"
      >
        <a href="#top" className="group block">
          <span className="block font-display text-2xl font-semibold tracking-tight text-text">
            YW
          </span>
          <span className="mt-2 hidden font-mono text-[0.6875rem] leading-relaxed tracking-[0.14em] text-text-faint uppercase lg:block">
            Yaqeen
            <br />
            Wunzalgu
          </span>
          <span className="sr-only">{site.name} — back to top</span>
        </a>

        <nav aria-label="Sections" className="py-8">
          <ol className="flex flex-col gap-1">
            {navItems.map((item) => {
              const current = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={current ? "true" : undefined}
                    className={`group flex items-center gap-3 border-l py-1.5 pl-3 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-out-quint)] ${
                      current
                        ? "border-accent text-text"
                        : "border-line text-text-faint hover:border-line-strong hover:text-text"
                    }`}
                  >
                    <span className="font-mono text-[0.6875rem] tracking-[0.14em]">{item.index}</span>
                    <span className="hidden text-sm lg:block">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="flex flex-col gap-4">
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={site.links.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-faint transition-colors duration-[var(--duration-quick)] hover:text-accent"
              aria-label="GitHub profile"
            >
              <Icon name="github" />
            </a>
            <a
              href={site.links.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-faint transition-colors duration-[var(--duration-quick)] hover:text-accent"
              aria-label="LinkedIn profile"
            >
              <Icon name="linkedin" />
            </a>
            <a
              href={site.links.email.href}
              className="text-text-faint transition-colors duration-[var(--duration-quick)] hover:text-accent"
              aria-label={`Email ${site.name}`}
            >
              <Icon name="mail" />
            </a>
          </div>

          {/* Reading position — the rail doubles as a progress measure. */}
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-px bg-line" aria-hidden="true">
              <div
                className="absolute left-0 top-0 w-px bg-accent"
                style={{ height: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <span className="hidden font-mono text-[0.625rem] tracking-[0.14em] text-text-faint lg:block">
              {String(Math.round(progress * 100)).padStart(2, "0")}%
            </span>
          </div>
        </div>
      </aside>

      {/* --------------------------------------------------------- mobile bar */}
      <header className="fixed top-0 left-0 z-30 flex w-full items-center justify-between border-b border-line bg-bg/90 px-5 py-3 backdrop-blur md:hidden">
        <a href="#top" className="font-display text-lg font-semibold text-text">
          YW
          <span className="sr-only"> — back to top</span>
        </a>
        <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-faint uppercase">
          {site.role}
        </span>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label="Open navigation"
          className="-mr-2 p-2 text-text-muted transition-colors hover:text-accent"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path d="M3 7h18M3 12h18M3 17h18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {/* ------------------------------------------------------ mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-ink-1000/70"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-navigation"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Sections"
            className="absolute right-0 top-0 flex h-full w-[min(20rem,88vw)] flex-col border-l border-line bg-bg px-6 py-5"
          >
            <div className="flex items-center justify-between">
              <span className="annot">Contents</span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close navigation"
                className="-mr-2 p-2 text-text-muted transition-colors hover:text-accent"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav aria-label="Sections" className="mt-6 flex-1">
              <ol className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.id} className="border-t border-line last:border-b">
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-3.5 text-text transition-colors hover:text-accent"
                    >
                      <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-faint">
                        {item.index}
                      </span>
                      <span className="font-display text-lg">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="flex flex-col gap-3 border-t border-line pt-5 text-sm">
              <a href={site.links.email.href} className="link-underline w-fit text-text-muted hover:text-text">
                {site.email}
              </a>
              <div className="flex items-center gap-4">
                <a
                  href={site.links.github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-muted hover:text-accent"
                >
                  <Icon name="github" /> GitHub
                </a>
                <a
                  href={site.links.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-muted hover:text-accent"
                >
                  <Icon name="linkedin" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
