# yaqeen009 — portfolio

Personal site for Yaqeen Wunzaligu: full-stack web engineering and immersive,
spatial interfaces.

- **Stack:** React 19, TypeScript, Vite, Tailwind CSS v4 (CSS-first config)
- **No runtime UI dependencies.** The hero's spatial field is drawn with the
  Canvas 2D API and the motion system is CSS plus `IntersectionObserver`, so
  there is no animation or 3D library in the bundle.
- **Design system:** see [DESIGN.md](./DESIGN.md)

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint over `src/` (JS + TS, React hooks rules) |
| `npm run verify` | `typecheck` → `lint` → `build` |

## Structure

```
src/
  data/site.ts                 all copy, links, projects, capabilities
  hooks/index.ts               useReveal, useScrollProgress, useActiveSection
  components/
    RailNav.tsx                rail / mobile drawer navigation
    Section.tsx                section shell and heading grid
    Reveal.tsx                 scroll reveal wrapper
    ProjectShowcase.tsx        project layouts (feature | wide | compact)
    ProjectFigure.tsx          inline SVG diagrams per project
    SpatialField.tsx           hero canvas point field
    ActionLink.tsx             the two button shapes
    sections/                  Hero, SelectedWork, ImmersiveSystems,
                               Capabilities, Background, ResearchInterests,
                               Contact, Footer
  index.css                    design tokens (primitive → semantic), base, motion
```

## Editing content

All text and links live in `src/data/site.ts`. Adding a project means adding one
object to the `projects` array and a matching entry in `ProjectFigure` if it
needs a diagram.

Two rules the content follows:

1. **No unverifiable claims.** No invented metrics, user counts, or employment
   history. Limitations are stated on the page.
2. **No broken links.** A project link is only included if it resolves.

## Deployment

`npm run build` outputs a static site to `dist/`. The production site is served
at <https://yaqeen009.vercel.app/>. `public/robots.txt` and `public/sitemap.xml`
reference that domain — update them if the site moves.

## Notes

- `public/favicon.svg` is the monogram mark.
- `src/assets/` holds older logo images that the current design does not use.
- `mcp-client.ts` and `mcp.config.json` at the repository root are unrelated
  tooling experiments, not part of this application; ESLint ignores them.
