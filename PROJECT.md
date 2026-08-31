# TVC Fashion House Sdn. Bhd. — Corporate Website

Static, multi-page marketing website for **TVC Fashion House Sdn. Bhd.** (Reg. No. 202001003068 / 1359387-P), a Malaysian trading house moving **woven apparel** and **fresh produce** through one chain: import → warehousing (Kajang) → wholesale (Port Dickson). Incorporated 23 January 2020.

---

## Tech Stack

| Layer      | Choice                                            | Notes                                          |
| ---------- | ------------------------------------------------- | ---------------------------------------------- |
| Markup     | Semantic HTML (4 pages)                           | No templating — shared nav/footer duplicated   |
| Styling    | Tailwind CSS (Play CDN) + `css/style.css`         | Custom theme tokens declared in inline config  |
| Behavior   | Vanilla JS (`js/main.js`, ES module)              | No frameworks                                  |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering) (npm) | Bundled by Vite, respects reduced-motion    |
| Build      | [Vite](https://vitejs.dev) (`appType: 'mpa'`)     | Multi-page build, clean-URL dev/preview server |
| Fonts      | Google Fonts: Plus Jakarta Sans + Inter           | Display + body                                 |
| Icons      | Inline SVG sprite per page                        | Custom line icons, `stroke: currentColor`      |

No Node framework, no client router. The site works as plain files; Vite exists for DX (dev server, bundling, minification).

## Folder Structure

```
website/
├── index.html            Home (company overview, collage hero, mosaic, sections)
├── warehouse.html        Warehouse page (animated SVG scene, functions, gallery)
├── apparel.html          Apparel product page (catalog, process, compliance)
├── vegetables.html       Vegetables product page (range, sourcing, illustration)
├── vite.config.js        Vite config (mpa + 4 build entries)
├── package.json          scripts: dev / build / preview
├── PROJECT.md            ← this file
├── SKILL.md              AI-assistant instructions for working on this site
├── DESIGN-SYSTEM.md      Human-readable UI style guide
├── css/style.css         Motion & custom layer (reveals, parallax, marquee, nav)
├── js/main.js            All interactions (Lenis, nav, menu, reveals, counters…)
├── public/               Copied verbatim to dist/ (server configs)
│   ├── .htaccess         Apache clean-URL rewrites
│   └── _redirects        Netlify-style clean-URL redirects
└── assets/
    ├── favicon.png      (site icon, from company logo)
    ├── logo.png         (company logo, nav + footer)
    └── img/
        ├── web/          Curated Unsplash photos (optimized, ≤1600px, q78)
        ├── factory/      Real factory photos (from company PDF)
        ├── compliance/   Real compliance activity photos (from company PDF)
        └── products/     Real product photos (from company PDF)
```

## Pages

| URL (clean)   | File              | Purpose                                                        |
| ------------- | ----------------- | -------------------------------------------------------------- |
| `/`           | `index.html`      | Home: hero collage, marquee, overview mosaic, vision/mission, what-we-do, operations, people, locations, standards, contact CTA |
| `/warehouse`  | `warehouse.html`  | Kajang facility: edge-bleed hero, animated SVG warehouse scene, 4 function cards, gallery, location |
| `/apparel`    | `apparel.html`    | Apparel line: hero collage + stats, 5-style catalog, factory process, compliance, CTA |
| `/vegetables` | `vegetables.html` | Produce line: hero organic blocks, 6-category range, sourcing steps, animated crate SVG, CTA |

## Features

- **Floating pill nav** — frosted-glass bar, shadow on scroll, animated underlines, active page highlighted, Products dropdown (hover + click + keyboard, Escape/outside closes), full-screen mobile menu with numbered links
- **Hero compositions** — home: staggered photo collage with circular chat badge (per reference design); warehouse: edge-bleed photo blended by gradient; apparel: collage + stats row; vegetables: organic shape blocks
- **Motion system** — Lenis inertia scrolling, scroll-triggered fade/rise reveals with stagger (`data-reveal`, `--rd` delay), curtain-wipe image reveals (`.img-reveal`, `--curtain` color per section), Ken-Burns-free subtle parallax (`data-parallax`), marquee band, animated stat counters, animated SVGs (warehouse forklift scene via SMIL, swaying produce crate), gentle floating badges
- **Accessibility** — skip links, focus-visible styles, `aria-expanded`/`aria-current`, `prefers-reduced-motion` disables Lenis/reveals/parallax/marquee/SMIL, semantic landmarks, alt text everywhere
- **Clean URLs** — `/warehouse` not `/warehouse.html` (see Deployment)
- **Responsive** — verified 375px → 1440px; `overflow-x: clip` guards decorative vectors; mobile menu scrolls on short screens

## Running Locally

```bash
npm install     # once
npm run dev     # http://localhost:5173 (clean URLs work here)
npm run build   # production bundle → dist/
npm run preview # serve dist/ locally
```

> Opening the HTML files directly via `file://` does **not** work (ES module + clean URLs). Always use the dev server or a static host.

## Deployment

`npm run build` outputs a fully static `dist/`. Clean URLs need one of:

- **Vercel** (current deployment) — `vercel.json` at the repo root handles it: `cleanUrls: true` serves `/apparel` from `apparel.html` and 308-redirects `/apparel.html` to `/apparel`. The same file applies the security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, nosniff), since Vercel ignores `_headers`/`.htaccess`.
- **Apache** — `dist/.htaccess` is included (rewrite `/page` → `page.html`, 301 `.html` → clean, security headers). Requires `mod_rewrite`, `mod_headers` + `AllowOverride All`.
- **Netlify** — `dist/_redirects` and `dist/_headers` included (200 rewrites + 301 canonicalization + security headers).
- **nginx** —
  ```nginx
  location / { try_files $uri $uri.html $uri/ =404; }
  rewrite ^/([^.]+)\.html$ /$1 permanent;
  ```

> Note: each host reads only its own config format. `vercel.json` is the one that matters for the current Vercel deployment.

`og:image` paths are currently relative — set absolute URLs (with domain) once the live domain is known.

## Image Credits

- `assets/img/web/*` — curated [Unsplash](https://unsplash.com) photos (Unsplash License, free for commercial use), resized ≤1600px, JPEG q78 progressive.
- `assets/img/factory/*`, `assets/img/compliance/*`, `assets/img/products/*` — company's own photos extracted from `PHOTOS PRODUCTS.pdf`.

## Editing Content

- **Text/copy** — edit directly in the HTML files; each section is marked with `<!-- ============ SECTION ============ -->` comments.
- **Nav/footer live in all 4 files** — a nav or footer change must be applied to `index.html`, `warehouse.html`, `apparel.html`, and `vegetables.html`.
- **Adding a page** — create `page.html` in root, add an entry in `vite.config.js` inputs, add nav/footer from an existing page, add server redirect lines if needed.
- **Colors/fonts** — Tailwind theme tokens are declared in the inline `tailwind.config` script in each page's `<head>`; keep all 4 in sync.

## Project Conventions

1. **No em-dashes (—) or en-dashes (–) anywhere** — use commas, colons, periods, or `&middot;`.
2. **Rounding scale** — large containers/cards `rounded-xl` (12px), small chips/captions `rounded-lg` (8px), buttons/badges/dots `rounded-full`. Nothing rounder.
3. **Motion is sparing** — one reveal pass, no parallax gimmicks, everything respects `prefers-reduced-motion`.
4. **Light theme** — white/sand bands, warm near-black ink; dark panels are accents only.
5. **Links are extensionless** (`href="apparel"`), home is `href="./"`.
6. **Label style** — uppercase, `text-[10px]–[11px]`, `font-semibold`, `tracking-[0.16em–0.28em]`.
