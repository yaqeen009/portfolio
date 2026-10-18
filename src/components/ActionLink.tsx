import type { ReactNode } from "react";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "quiet";
  external?: boolean;
}

/**
 * The site has exactly two actions: a primary one and a quiet one. Both keep
 * the same shape so the eye can find them consistently.
 */
export default function ActionLink({ href, children, variant = "primary", external = false }: ActionLinkProps) {
  const base =
    "inline-flex items-center gap-2 px-5 py-3 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors duration-[var(--duration-quick)] ease-[var(--ease-out-quint)] active:translate-y-px";

  const styles =
    variant === "primary"
      ? "bg-accent text-on-accent hover:bg-accent/85"
      : "border border-line-strong text-text hover:border-accent hover:text-accent";

  return (
    <a
      href={href}
      className={`${base} ${styles}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
