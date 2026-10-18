import { useEffect, useRef, useState } from "react";

/**
 * Adds `data-reveal` on mount and flips it to `shown` when the element scrolls
 * into view.
 *
 * The attribute is applied from JavaScript on purpose: if the script never
 * runs, nothing is hidden and the content stays readable.
 */
export function useReveal<T extends HTMLElement>(options?: { threshold?: number }) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    element.setAttribute("data-reveal", "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "shown");
          observer.unobserve(entry.target);
        }
      },
      { threshold: options?.threshold ?? 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options?.threshold]);

  return ref;
}

function readProgress(): number {
  if (typeof window === "undefined") return 0;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  return scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
}

/** Fraction of the document scrolled, 0 → 1, updated on animation frames. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(readProgress);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setProgress(readProgress());
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return progress;
}

/** Id of the section currently closest to the reading position. */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
