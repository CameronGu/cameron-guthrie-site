## Prompt: Refactor **cameronjguthrie.com** to **Astro + React islands + Tailwind + shadcn**, with a Projects & Tools section and preserved hero aesthetic

**Role:** Senior front-end engineer.
**Goal:** Rebuild cameronjguthrie.com as a fast static site. Use **Astro** for SSG, **React islands** for interactivity, **Tailwind** for styling, **shadcn/ui** for primitives, **tweakcn** for theme tokens. Output a deployable `/dist` for shared hosting.

---

### 0) High-level requirements

* **Static output only**: no server runtime; generate HTML/CSS/JS at build.
* **IA**: Home, About, Work, Projects & Tools, Contact.
* **Hero aesthetic (must-keep)**

  * Full-bleed hero **cutout** image (Cameron walking) in the foreground.
  * **Name/logo scrolls behind** the static figure on scroll.
  * Implement with `position: sticky` and/or modern parallax transforms—no hacky z-index piles.
  * **Graceful mobile** fallback (simpler stacked layout; reduced motion if needed).
* **Palette derived from the hero**: define CSS variables and reuse sitewide.
* **Projects & Tools**: Card grid with **filters**; each item has an **MDX** detail page.
* **Minimal JS**: hydrate only where needed (React islands).
* **Typography**: clean, modern; neutral base with one accent; **dark mode via CSS variables**.
* **No tracking pixels** by default; small analytics option in Phase 2.
* **Output**: `/dist` ready for shared hosting (Apache/Nginx static).

---

### 1) Stack & packages

* **Astro 4+**, **@astrojs/react**, **@astrojs/mdx**, **React** (for islands).
* **Tailwind 3/4**, **shadcn/ui** (with Radix), **lucide-react**.
* **MDX**, **class-variance-authority**, **clsx**, **tailwind-merge**.
* **tweakcn** (optional) to export Tailwind tokens → `theme.css`.

**Install (pnpm preferred):**

```bash
pnpm dlx create-astro@latest cameron-site --template with-tailwindcss --install --add react --git
cd cameron-site
pnpm add @astrojs/mdx @astrojs/react @types/react @types/react-dom
pnpm add class-variance-authority clsx tailwind-merge lucide-react
# shadcn/ui (Astro guide)
pnpm dlx shadcn@latest init
# then generate needed ui components per shadcn Astro docs
```

---

### 2) Project structure

```
/public
/src
  /components
    /ui                 # shadcn components
    /site               # site shells
      Hero.astro        # walking image + scrolling-name effect
      Header.astro
      Footer.astro
      Nav.tsx
      Card.tsx
      Tag.tsx
      ThemeToggle.tsx
    /projects
      ProjectsGrid.tsx
      ProjectFilters.tsx
  /content
    /projects           # MDX entries
  /layouts
    BaseLayout.astro
    PageLayout.astro
  /pages
    index.astro
    about.astro
    work.astro
    contact.astro
    projects.astro
    projects/[slug].astro
  /styles
    globals.css
    theme.css
/content.config.ts
/astro.config.mjs
/tailwind.config.(ts|cjs)
/tsconfig.json
/components.json         # shadcn config
/README.md
```

---

### 3) Routing & pages

* `index.astro`: includes `<Hero />`, brief intro, three CTAs to About, Work, Projects & Tools.
* `about.astro`: concise bio; subsections: Builder, Strategist, Operator.
* `work.astro`: cards for businesses/roles; short blurbs + links.
* `projects.astro`: renders `ProjectsGrid` (React island) with filters.
* `projects/[slug].astro`: renders MDX project detail.
* `contact.astro`: simple email link or form stub (no backend).

---

### 4) Content model: Projects & Tools

**`/content.config.ts`**

```ts
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),                   // stable slug
    summary: z.string(),                // one line; function-first
    tags: z.array(z.string()).default([]),
    status: z.enum(["active","in-dev","archived"]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    date_started: z.string().optional(), // ISO yyyy-mm-dd
    date_updated: z.string().optional(), // ISO
    featured: z.boolean().default(false),
  })
});

export const collections = { projects };
```

**Example MDX**: `/src/content/projects/instructifly.mdx`

```mdx
---
title: "InstructiFly"
slug: "instructifly"
summary: "Portmanteau flight training concept, curriculum tools, and name study."
tags: ["aviation","naming","prototype"]
status: "in-dev"
repo: "https://github.com/your/repo"
demo: "https://demo.example.com"
date_started: "2024-10-01"
date_updated: "2025-10-06"
featured: true
---
Body content here. Short context, goals, current state, usage notes.
```

---

### 5) Components

**Layout**

* `BaseLayout.astro`: HTML shell, meta, OpenGraph, theme variables, font preload.
* `PageLayout.astro`: section header and constrained content width.

**Header/Footer**

* Minimal header with site title + nav.
* Footer with copyright, repo link.

**Nav**

* Desktop links: Home, About, Work, Projects & Tools, Contact.
* Mobile: shadcn `Sheet` or `DropdownMenu` island (hydrate lazily).

**Card/Tag**

* `Card.tsx`: shadcn `Card`.
* `Tag.tsx`: `Badge` chips; keyboard accessible.
* Respect `prefers-reduced-motion`.

**Theme toggle**

* `ThemeToggle.tsx`: flips CSS variables for light/dark; persist in `localStorage`.

**Projects grid + filters**

* `ProjectsGrid.tsx` (island): props `{ items, initialTag?, initialQuery? }`.
* `ProjectFilters.tsx`: search input, tag pills, status filter; state lifted to grid.

---

### 6) Hero Section: detailed requirements

**`Hero.astro` must:**

* Load the **transparent cutout** PNG/WebP of Cameron walking.
* Fix the figure with `position: sticky; top: 0;` in a bounded hero container.
* Render **name/logo text behind** that moves on scroll (vertical or horizontal) via `transform: translate3d(...)` or `scroll-timeline` (fallbacks in place).
* Prefer **CSS-only** (no heavy listeners). If needed, a tiny React island can read scroll and apply transforms with `requestAnimationFrame`.
* **No layout shift**: reserve aspect-ratio and sizes; precompute container heights.
* **Colors**: derive primary/accent from the hero image (manual or tweakcn), inject to `:root` and `.dark` in `theme.css`.
* **Mobile**: stacked layout; reduce motion; ensure the figure and name remain legible.

---

### 7) Styling & theme tokens

* Keep Tailwind base; define CSS variables in `theme.css`:

  * `--color-bg`, `--color-fg`, `--color-accent`, `--ring`, `--muted`, etc.
  * Provide `.dark` overrides.
* If using **tweakcn**, export the palette → paste into `theme.css`, map to Tailwind theme and shadcn tokens.
* Maintain consistent spacing scale; avoid bespoke per-page hacks.

---

### 8) Data flow

* Astro loads the `projects` collection at build.
* `projects.astro` serializes minimal payload for island hydration.

**`src/pages/projects.astro`**

```astro
---
import { getCollection } from "astro:content";
import ProjectsGrid from "../components/projects/ProjectsGrid.tsx";

const items = await getCollection("projects");
const payload = items.map(i => ({
  slug: i.slug,
  title: i.data.title,
  summary: i.data.summary,
  tags: i.data.tags,
  status: i.data.status,
  repo: i.data.repo,
  demo: i.data.demo,
  featured: i.data.featured
}));
---
<ProjectsGrid client:load items={payload} />
```

* `projects/[slug].astro` uses `getEntryBySlug` to render MDX detail.

---

### 9) SEO, metadata, social

* Add `<SEO>` utility to set title, description, canonical, OG tags.
* Per-page overrides (project detail uses MDX frontmatter).
* Generate `/robots.txt` and `/sitemap.xml` via Astro integrations.
* Clean URLs; preload primary font only if needed; set language and `dir`.

---

### 10) Accessibility

* Keyboard focus styles on all interactive elements (visible focus ring).
* Proper heading order; landmarks (`<header>`, `<main>`, `<nav aria-label="Primary">`, `<footer>`).
* High contrast text; test light and dark.
* Honor `prefers-reduced-motion` (especially in **Hero**).
* Tag chips togglable via keyboard; filters announce state changes for SRs.

---

### 11) Performance & budgets

* **Home**: HTML < 50 KB; CSS < 50 KB; JS < 60 KB.
* Projects **island** JS < 40 KB.
* No large images in initial viewport (except hero cutout—optimize aggressively).
* Use `loading="lazy"` where appropriate; responsive `srcset`.
* Avoid hydration for non-interactive components.

---

### 12) Build & deploy

* Build: `pnpm build`
* Output: `/dist`
* Deploy by copying `/dist` to shared host root.
* If Apache, optional `.htaccess` for client-side navigation under `/projects/[slug]`—prefer static routes.

---

### 13) Content migration

* Draft new copy in `.mdx` files and page sections.
* Seed **5–10** initial project entries.
* Suggested tags: `cli`, `travel`, `finance`, `ops`, `design`, `proto`, `tool`.
* Set realistic `status` per item; fill `date_*` fields.

---

### 14) QA checklist

* HTML validation passes on all pages.
* Lighthouse: **Performance ≥ 95**, **Accessibility ≥ 95**, **SEO ≥ 95**.
* No broken links; dark mode works; hero degrades gracefully on mobile and when reduced motion is set.
* Project filters fully keyboard operable and screen-reader friendly.
* Builds cleanly on a fresh machine with a single command.

---

### 15) Acceptance criteria

* Navigable IA with five top-level pages.
* **Hero**: desktop shows fixed cutout figure; name text scrolls **behind** smoothly; **no CLS**.
* Mobile hero uses simplified stacked layout with reduced motion; still aesthetically cohesive.
* Palette **clearly derived from hero**; tokens mapped through Tailwind/shadcn.
* Projects grid renders from MDX; **filters + search** work as islands.
* Each project has a consistent MDX detail layout.
* Static build deploys to shared hosting (no Node server).
* Repo includes a clear **README** with build/deploy instructions.

---

### 16) Nice-to-have (Phase 2)

* RSS/JSON feed for project updates.
* Simple changelog page (commit messages → entries).
* Algolia or tiny **fuse.js** client search if item count grows.
* “Uses” page (gear, stack).
* Tiny privacy-friendly analytics toggle.

---

### 17) Files to add/edit

* `astro.config.mjs`: enable MDX + React integrations.
* `content.config.ts`: collection schema (above).
* `tailwind.config.ts`: extend theme; map to shadcn tokens.
* `src/styles/theme.css`: light/dark CSS variables; tweakcn dump slot.
* `src/components/ui/*`: shadcn generated for Astro.
* `src/components/site/*`: Hero, Header, Footer, Nav, Card, Tag, ThemeToggle.
* `src/components/projects/*`: grid + filters islands.
* `src/pages/*`: index/about/work/contact/projects.
* `src/pages/projects/[slug].astro`: detail template.

---

### 18) Notes for shadcn in Astro

* Use `client:load`/`client:idle` on interactive React components.
* Some Radix components need hydration to open menus/drawers/dialogs.
* Follow the shadcn **Astro** install doc; generate React components into `/components/ui`.

---

### 19) Example scaffolds (brief)

**`src/layouts/BaseLayout.astro`** (skeleton)

```astro
---
const { title = "Cameron Guthrie", description = "Entrepreneur & Strategic Integrator" } = Astro.props;
---
<html lang="en" class="h-full">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <!-- OG/Twitter tags added by SEO util -->
    <link rel="stylesheet" href="/globals.css" />
  </head>
  <body class="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)] antialiased">
    <slot />
  </body>
</html>
```

**`src/pages/projects.astro`** – shown earlier.

**`src/styles/theme.css`** (token slots)

```css
:root {
  --color-bg: #0b0b0b;  /* replace via tweakcn export */
  --color-fg: #f6f6f6;
  --color-accent: #c63d2f;
  --muted: #777;
  --ring: var(--color-accent);
}

.dark {
  --color-bg: #0a0a0a;
  --color-fg: #e9e9e9;
  --color-accent: #e05241;
  --muted: #999;
}
```

**`src/components/site/Hero.astro`** (outline)

```astro
---
/* Minimal CSS-first approach; add a tiny island if needed for transforms */
---
<section class="relative h-[140vh] overflow-hidden">
  <div class="sticky top-0 h-screen">
    <!-- Name layer (background, scrolls) -->
    <div aria-hidden="true" class="absolute inset-0 grid place-items-center">
      <div class="text-[clamp(4rem,12vw,16rem)] font-extrabold tracking-tight
                  text-[color:var(--color-accent)]/15 will-change-transform"
           style="transform: translate3d(0, calc(var(--scroll,0)*-0.25%), 0);">
        CAMERON&nbsp;GUTHRIE
      </div>
    </div>

    <!-- Foreground cutout -->
    <div class="relative h-full flex items-end justify-center">
      <img
        src="/img/hero-cutout.webp"
        alt="Cameron walking"
        width="1200" height="1600"
        class="max-h-[85vh] object-contain drop-shadow-2xl select-none pointer-events-none"
        loading="eager" />
    </div>
  </div>
</section>
```

*(If needed, add a tiny island to set `--scroll` via `document.scrollingElement.scrollTop`/viewport math and `requestAnimationFrame`, with `prefers-reduced-motion` fallback.)*

---

### 20) README requirements

* Quickstart (install/build/preview).
* How to add a Project (MDX template).
* Theming via `theme.css` / tweakcn.
* Where Hero assets live + optimization guidelines.
* Accessibility & performance tips.

---

**Deliverables**

* Full Astro + Tailwind + shadcn scaffold.
* `Hero.astro` implemented per spec with graceful mobile + reduced motion.
* Example MDX project entries (5–10).
* Layout and component scaffolding ready for content.
* `README.md` with build & deploy steps.
* **Short content-todo checklist** printed at the end.

---

**Content-todo checklist (post-scaffold)**

* [ ] Finalize site copy for Home, About, Work, Contact.
* [ ] Write 5–10 MDX entries (Projects & Tools) with `summary/tags/status`.
* [ ] Export/update theme tokens (tweakcn) → `theme.css`.
* [ ] Provide optimized hero cutout assets (`.webp` + fallbacks).
* [ ] Set per-page SEO titles/descriptions and OG images.
* [ ] Fill repo/demo links where available; mark statuses accurately.

---