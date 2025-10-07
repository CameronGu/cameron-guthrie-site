# Repository Guidelines

## Project Structure & Module Organization
Post-refactor, the root will host an Astro project. Source lives under `src/`: layouts in `src/layouts/`, Astro pages in `src/pages/`, React islands in `src/components/{site,projects,ui}`, and Tailwind tokens in `src/styles/{globals.css,theme.css}`. MDX project content belongs in `src/content/projects/` with schema defined in `content.config.ts`. Keep shadcn-generated primitives inside `src/components/ui/` and avoid editing them directly—extend via wrappers in `src/components/site/`. Public assets (hero cutout, favicon set, sitemap) go in `/public`. Preserve the existing `ref/` directory for documentation; do not ship it.

## Build, Test, and Development Commands
Install dependencies with `pnpm install`. Use `pnpm dev` for the Astro dev server and `pnpm build` to emit the static `/dist`. Run `pnpm astro check` for type/content validation and `pnpm lint` (configure on first pass) before opening a PR. After `pnpm build`, sanity-check the output by serving `dist` locally: `pnpm dlx serve dist`.

## Coding Style & Naming Conventions
Author Astro files with 2-space indentation. Favor functional React components with TypeScript types and `client:only` hydration hints kept minimal (`client:idle`, `client:visible`). Tailwind classes should flow from tokens defined in `theme.css`; prefer composable utilities over ad-hoc `style` attributes. Name files in PascalCase for components (`Hero.astro`, `ProjectsGrid.tsx`), kebab-case for routes (`projects/[slug].astro`), and lowercase-kebab for assets. Keep hero-related styles centralized in `Hero.astro` or dedicated partials; document any custom CSS variables.

## Testing Guidelines
Manual QA remains critical: confirm hero parallax behavior in desktop Chrome/Safari/Firefox, verify reduced-motion fallbacks, and inspect light/dark themes. Exercise the Projects grid filters with keyboard-only navigation and ensure screen readers announce filter state. Run Lighthouse against the built `dist` to keep Performance/Accessibility/SEO ≥95, and validate HTML via the W3C checker when structural changes land.

## Commit & Pull Request Guidelines
Continue using Conventional Commit prefixes (`feat:`, `refactor:`, `chore:`). Scope commits around one concern (e.g., “feat: scaffold hero island”); include MDX content changes separately from component updates. PRs should summarize structure changes, list commands run (`pnpm build`, `pnpm astro check`), attach before/after captures for visual shifts, and note any new dependencies or shadcn components. Flag outstanding content todos if you touch `src/content/`.

## Hero & Theme Expectations
The hero must keep the walking cutout fixed while the name/logo scrolls behind it; rely on sticky positioning or lightweight scroll observers, honoring `prefers-reduced-motion`. Derive Tailwind/`theme.css` tokens from the hero palette and keep both light and dark sets in sync. When updating imagery, ship optimized `.webp` plus fallbacks and update palette tokens concurrently.
