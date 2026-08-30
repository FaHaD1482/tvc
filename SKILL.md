---
name: tvc-website-frontend
description: UI/Frontend rules for the TVC Fashion House website. Use when editing, styling, or debugging any page in this project — covers the stack, design tokens, component recipes, motion laws, responsive rules, and project conventions that must not be broken.
---

# TVC Fashion House — Frontend Skill

Instructions for working on this website's UI. Follow these rules in every edit.

## Stack Rules

- Static HTML (4 pages: `index.html`, `warehouse.html`, `apparel.html`, `vegetables.html`) + Tailwind CSS Play CDN + vanilla JS (`js/main.js`, ES module) + Lenis (npm, bundled by Vite).
- **No frameworks, no client router, no jQuery.** Do not introduce React/Vite-processed components.
- Tailwind config is an inline `tailwind.config` script in each page's `<head>`. **The config block must be identical in all 4 files** — if you change tokens, change all 4.
- The nav and footer are duplicated in all 4 files. **Any nav/footer edit must be applied to all 4.**
- Internal links are extensionless: `href="apparel"`, `href="warehouse"`, home is `href="./"`, home anchors are `href="./#operations"`. Never link with `.html`.
- Vite config uses `appType: 'mpa'` — do not remove, it powers clean URLs in dev/preview.

## Design Tokens (Tailwind theme)

| Token   | Value     | Use                                      |
| ------- | --------- | ---------------------------------------- |
| `ink`   | `#211E17` | Text, dark accent blocks, solid buttons  |
| `sand`  | `#F6F2E9` | Alternating section background           |
| `soft`  | `#6E6A5E` | Secondary/body-muted text                |
| `thread`| `#AE4A2A` | Apparel accent, primary highlights       |
| `olive` | `#66753B` | Produce accent                           |
| `denim` | `#3F5F8A` | Shared/info accent                       |
| `brass` | `#AC8446` | Eyebrows, small metallic accents         |
| `white` | base      | Default section background               |

- Light theme only. Dark (`bg-ink`) panels are accents (stat block, CTA panel), never full sections.
- Section rhythm alternates white → sand; separate with `border-y border-ink/[0.06]`.

## Typography

- Headings: `font-display` (Plus Jakarta Sans), `font-extrabold tracking-tight`, sizes `text-4xl md:text-[3.2rem]` (page h2) / `sm:text-5xl xl:text-[3.8rem]` (hero h1).
- Body: `font-sans` (Inter), `text-[15px]` or `text-base leading-relaxed text-soft`.
- Labels: uppercase `text-[10px–11px] font-semibold tracking-[0.16–0.28em]`.
- **Never use em-dashes (—) or en-dashes (–).** Use commas, colons, periods, or `&middot;`.

## Rounding Scale (strict)

- Large containers/cards/figures: `rounded-xl` (12px). Hero feature cards may use `rounded-2xl` (16px).
- Small chips/captions: `rounded-lg` (8px).
- Buttons, badges, dots, avatars: `rounded-full`.
- Nothing rounder than 16px except pills/circles.

## Component Recipes

- **Eyebrow**: `<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-thread">` with a leading `h-1.5 w-1.5 rounded-full bg-thread` dot.
- **Primary button**: `rounded-full bg-ink px-6 py-3.5 text-[13px] font-semibold text-white hover:bg-thread hover:shadow-xl` + trailing `#i-arrow` icon that nudges right on hover.
- **Secondary button**: same, but `border border-ink/15 bg-white text-ink hover:border-ink/40`.
- **Card**: `rounded-xl border border-ink/[0.08] bg-white shadow-card` + `card-hover` class (lift on hover).
- **Photo caption chip**: `absolute bottom-3 left-3 rounded-lg bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur-sm`.
- **Line icons**: inline SVG sprite at top of each `<body>` (`<symbol>` + `<use href="#i-...">`), `stroke-width 1.5`, `currentColor`. Add new symbols to all 4 pages.
- **Section padding**: `py-20 md:py-28` inside `mx-auto max-w-shell px-5 sm:px-8`.
- **Dark CTA panel**: `rounded-xl bg-ink` with right-half photo + `bg-gradient-to-r from-ink via-ink/70 to-ink/25` overlay; the photo wrapper must have `overflow-hidden` (parallax scale spills otherwise).

## Motion Laws

- Reveals: `data-reveal` (+ `style="--rd: 80ms–360ms"` stagger). Images: `.img-reveal` (curtain wipe; set `--curtain` to the section bg when not white, e.g. sand sections).
- Parallax: `data-parallax="0.12–0.18"` on absolutely-positioned images with `scale-[1.15]`+ inside `overflow-hidden` parents only.
- Counters: `data-count` on the number element. Float badges: `.float-soft`. Marquee: `.marquee-track` with two identical groups.
- SVG SMIL animations: tag the `<svg data-smil>` — JS pauses them under reduced motion.
- **Every animation must have a `prefers-reduced-motion: reduce` kill switch in `css/style.css`.**
- No auto-playing carousels, no particle backgrounds, no parallax gimmicks beyond the approved banners.

## JS (`js/main.js`)

- One IIFE, guarded feature blocks (`if (el)`), `reduced` flag from `matchMedia`. Lenis anchors: `a[href^="#"]` → `lenis.scrollTo` with `offset: -70`.
- Products dropdown: hover opens/closes, **click always opens** (never toggle), outside click + Escape close.
- If you add an element an existing block targets, verify the block still finds it; if you remove markup, remove its JS block.

## Responsive Rules

- Breakpoint chains: grids `grid-cols-1/2 → sm:grid-cols-2/3 → lg:grid-cols-3/4/5`; heroes collapse to single column below `lg`.
- `body { overflow-x: hidden; overflow-x: clip; }` — keep it; decorative vectors use negative offsets.
- Mobile menu (`#mobile-menu`): `overflow-y-auto`, links numbered `01–09`, close on link click/Escape.
- Test at 375 / 768 / 1024 / 1440 after any layout change.

## Definition of Done

`npm run build` passes · all 4 pages serve 200 on the dev server at clean URLs · no `—`/`–` in any file · no `.html` internal hrefs · asset references resolve · reduced-motion switches intact.
