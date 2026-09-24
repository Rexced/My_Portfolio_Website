@AGENTS.md

# Saim Wajid's portfolio

A fully static Next.js 16 (App Router) + React 19 + Tailwind v4 site, exported to `out/` and served by GitHub Pages at https://rexced.github.io. There is no server, API or database at runtime. Full stack details are in `TECH_STACK.md`; keep it in sync when the stack changes.

## Commands

```bash
npm run dev          # dev server on 0.0.0.0:3000 (LAN devices allowed via next.config.mjs)
npm run build        # static export -> out/
npm start            # serve out/ on :4321
npm run typecheck    # tsc --noEmit
```

There are no tests or linter. Run `npm run typecheck` and `npm run build` to verify a change.

## Where things live

- `data/content.ts` holds all site copy (profile, projects, skills). Content edits go here, not in components.
- `lib/region.ts` defines the three resume versions (PK, US, UK/IE), their PDFs in `public/cv/`, and the timezone-based `guessRegion()`.
- `components/region-provider.tsx` is the region context. `/pk/`, `/us/` and `/uk/` pin a region; `/` guesses it after mount.
- `components/home.tsx` composes the page sections, and each route's `page.tsx` renders `<Home region=... />`.
- `app/globals.css` holds the theme tokens under `@theme inline`. Light is the default, dark lives under `:root[data-theme="dark"]`, and `.terminal` is always dark. There's no `tailwind.config`.

## Constraints

- **Static export only** (`output: "export"`). Don't add route handlers, server actions, middleware, ISR, `next/image` optimisation or anything else that needs a running server.
- Keep `trailingSlash: true`, since GitHub Pages serves `/us/` as `/us/index.html`.
- All motion must respect reduced motion (`MotionConfig reducedMotion="user"` plus CSS `prefers-reduced-motion`).
- The inline theme script in `app/layout.tsx` prevents a theme flash before first paint. Keep it, and keep `suppressHydrationWarning` on `<html>`.
- Pushing to `main` deploys to production through `.github/workflows/deploy.yml`.

## Code style

- TypeScript, no semicolons, double quotes, 2-space indent.
- Import through the `@/` alias. Merge classes with `cn()` from `lib/utils.ts`.
- Interactive components start with `"use client"`.
- Comments are short and explain *why*.
