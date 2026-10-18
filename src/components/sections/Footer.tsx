import { site } from "../../data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
        <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-faint uppercase">
          © {year} {site.name}
        </p>
        <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-faint uppercase">
          React · TypeScript · Tailwind CSS · Vite
        </p>
        <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-faint uppercase">
          No tracking scripts
        </p>
      </div>
    </footer>
  );
}
