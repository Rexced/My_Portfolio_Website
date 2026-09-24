# Tech Stack

The portfolio is a **fully static site**. `npm run build` pre-renders every page to plain HTML, CSS and JS in `out/`, and GitHub Pages serves that folder. There's no server, database or API at runtime.

## Core

| Layer | Tool | Version | Why |
|---|---|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) | 16.3 | File-based routes (`/`, `/pk`, `/us`, `/uk`), font optimisation and static export via `output: "export"` |
| UI library | [React](https://react.dev) | 19.3 | Component model for the interactive sections |
| Language | [TypeScript](https://www.typescriptlang.org) | 5.9 | Type-checks content (`data/content.ts`) and region logic |
| Runtime (build only) | Node.js | 22 in CI | Needed to build, not to host |

## Styling

| Tool | Version | Used for |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com) | 4.3 | Utility classes. Theme tokens (`--accent`, `--surface`…) live in `app/globals.css` under `@theme inline`. It's light by default (white, near-black text, jade `#0b7a54`), with a dark theme under `:root[data-theme="dark"]`. The `.terminal` class re-declares the tokens so the hero terminal looks like macOS Terminal: white with a grey title bar in light mode, dark in dark mode. There's no `tailwind.config` file. |
| `@tailwindcss/postcss` | 4.3 | Tailwind v4's PostCSS plugin (`postcss.config.mjs`) |
| `clsx` + `tailwind-merge` | 2.1 / 3.7 | `cn()` helper in `lib/utils.ts` for conditional class names |
| Google Fonts via `next/font` | – | **JetBrains Mono** (headings, terminal) and **Inter** (body), self-hosted at build time |

## Motion & interactivity

| Tool | Version | Used for |
|---|---|---|
| [Framer Motion](https://motion.dev) | 12.43 | Scroll reveals, card expand/collapse, mobile menu, hero entrance |
| [Lenis](https://lenis.darkroom.engineering) | 1.3 | Smooth scrolling and `#anchor` navigation (`components/smooth-scroll.tsx`) |
| CSS keyframes | built-in | Pipeline "packets" travelling between architecture nodes |
| View Transitions API | built-in | Dark/light switch wipes the new theme across the page (`components/theme-toggle.tsx`); falls back to an instant switch |
| [Lucide](https://lucide.dev) icons | 0.454 | Icons (download, GitHub, LinkedIn, etc.) |

The hero's name scramble and typed neofetch terminal are hand-written React. They don't pull in any extra library.

All motion respects the OS **reduced-motion** setting, through `MotionConfig reducedMotion="user"` and CSS `prefers-reduced-motion` rules.

## Dark mode

- `components/theme-toggle.tsx` is the switch at the top right. Its knob sits left for dark and right for light. The knob is a glossy jade droplet: framer-motion springs, a squash-and-stretch pulse, and a lagging blob merged through an SVG "goo" filter. It has its own `view-transition-name`, so it animates live above the page wipe.
- Switching sets `data-theme` on `<html>`, saves the choice to `localStorage`, and wipes the new theme in, moving the same way as the knob.
- A tiny inline script in `app/layout.tsx` re-applies a saved choice before first paint, so the page never flashes the wrong theme. Light is the default.

## Region-aware resume / CV

This is plain TypeScript with no third-party service, cookies or IP lookup.

- `lib/region.ts` defines the three versions (**PK**, **US**, **UK/IE**), plus their PDFs and a timezone-based `guessRegion()`.
- `components/region-provider.tsx` is a React context. `/pk/`, `/us/` and `/uk/` pin the version. On `/`, the version is guessed from `Intl.DateTimeFormat().resolvedOptions().timeZone`.
- PDFs live in `public/cv/`.

## Build & hosting

| Piece | Details |
|---|---|
| Output | `next build` → `out/` (static export, `trailingSlash: true`, unoptimised images) |
| Hosting | **GitHub Pages**, free, at `https://rexced.github.io` |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`): `npm ci` → `npm run build` → upload `out/` → `actions/deploy-pages` on every push to `main` |
| Package manager | npm (`package-lock.json`) |

## Project layout

```
app/          routes: page.tsx (/), pk/, us/, uk/, layout.tsx, globals.css, icon.svg
components/   page sections (hero, about, projects, skills, contact, navbar) + helpers
data/         content.ts — every piece of site copy; edit this to update the site
lib/          region.ts (CV routing), utils.ts (cn helper)
public/cv/    the three resume / CV PDFs
```

## Commands

```bash
npm install          # once
npm run dev          # live-reloading dev server → http://localhost:3000
npm run build        # static site → out/
npx serve out        # preview the built site
npm run typecheck    # TypeScript check (tsc --noEmit)
```
