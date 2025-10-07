# cameronjguthrie.com — Astro rebuild

A fast static rebuild of cameronjguthrie.com using Astro, React islands, Tailwind, and shadcn primitives. The project ships a sticky hero with the walking cutout, MDX-powered projects archive, and light/dark theme control.

## Quickstart

```bash
pnpm install
pnpm dev             # start the Astro dev server
pnpm astro check     # type/content validation
pnpm build           # emit static dist/
pnpm lint            # run ESLint across Astro + React islands
```

Serve the production build locally with:

```bash
pnpm dlx serve dist
```

## Project structure

```
/
├── public/                    # static assets (hero art, favicon, robots)
├── src/
│   ├── components/
│   │   ├── site/              # site-specific wrappers (Hero, Header, Tag, etc.)
│   │   ├── projects/          # React islands for projects grid & filters
│   │   └── ui/                # shadcn-derived primitives (card, badge)
│   ├── content/               # MDX collections (see config.ts)
│   ├── layouts/               # BaseLayout + PageLayout shells
│   ├── pages/                 # Astro routes (index/about/work/projects/contact)
│   └── styles/                # globals.css + theme tokens
├── src/lib/utils.ts           # clsx + tailwind-merge helper
├── src/content/config.ts      # content collection schema
├── tailwind.config.ts
└── components.json            # shadcn CLI config
```

## Adding a project entry

Create an `.mdx` file under `src/content/projects/` with the schema defined in `src/content/config.ts`:

```mdx
---
title: "Radar Briefing"
slug: "radar-briefing"
summary: "Weekly intelligence brief that connects macro trends to operational decisions."
tags: ["ops", "analysis", "writing"]
status: "in-dev"
repo: "https://github.com/your/project" # optional
demo: "https://radar.example.com"       # optional
date_started: "2024-06-03"
date_updated: "2025-09-28"
featured: true
---

Long-form project body content in MDX.
```

Projects marked `featured: true` surface on the home page and bubble to the top of the filterable grid.

## Theming & tokens

- Theme definitions live in `src/config/themes.ts`; update or add entries there to surface new palettes in the UI.
- `src/lib/theme.ts` applies the tokens at runtime and persists both the palette and light/dark mode in `localStorage`.
- `src/styles/theme.css` provides fallback tokens (hero palette) and token names referenced through Tailwind in `tailwind.config.ts`.
- Users can pick palettes via the header selector, and the existing light/dark toggle continues to honour system preferences.

## Hero assets

`src/components/site/Hero.astro` implements the sticky cutout + scrolling name effect. Replace `/public/img/cjg-bacalar-no_logo-front-image-1920x1080.{png,webp}` with optimized hero art when the final assets are ready. Pair any new art with updated color tokens in `theme.css`.

## Manual QA checklist

- Desktop hero: walking cutout remains fixed, name scrolls behind, no layout shift.
- Mobile hero: stacked layout, reduced-motion fallback verified.
- Light/dark themes stay in sync; theme toggle works after reload.
- Projects grid filters are keyboard operable and screen readers announce result counts.
- Run Lighthouse on `dist/` (Performance ≥95, Accessibility ≥95, SEO ≥95).
- Validate HTML with the W3C checker before shipping structural tweaks.

## Content TODOs

- [ ] Finalize site copy for Home, About, Work, Contact.
- [ ] Finish 5–10 MDX project entries with summaries, tags, and status.
- [ ] Export/update theme tokens (tweakcn) into `src/styles/theme.css`.
- [ ] Produce optimized hero cutout assets (`.webp` + fallbacks).
- [ ] Set per-page SEO titles, descriptions, and OG images.
- [ ] Backfill repo/demo links and status accuracy for each project.
