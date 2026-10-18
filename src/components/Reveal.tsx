import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "../hooks";

interface RevealProps {
  children: ReactNode;
  /** Stagger in milliseconds, applied through a CSS custom property. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Reveal-on-scroll wrapper.
 *
 * The hiding attribute is added by the hook after mount, so with JavaScript
 * disabled (or before hydration) the content is simply visible.
 */
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: RevealProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <Tag ref={ref} className={className} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
