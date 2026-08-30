# TVC Fashion House — UI Design System

The visual language of this website: a light, premium, photographic style for a Malaysian trading house (woven apparel + fresh produce). Clean corporate layout with editorial photography and restrained motion.

---

## 1. Color Palette

| Token    | Hex       | Role                                            |
| -------- | --------- | ----------------------------------------------- |
| White    | `#FFFFFF` | Base section background                         |
| Sand     | `#F6F2E9` | Alternating section background, tinted blocks   |
| Ink      | `#211E17` | Headings, body-strong, dark accent panels       |
| Soft     | `#6E6A5E` | Muted body text, captions                       |
| Thread   | `#AE4A2A` | Apparel accent, eyebrows, primary highlights    |
| Olive    | `#66753B` | Produce accent                                  |
| Denim    | `#3F5F8A` | Shared/info accent, tags                        |
| Brass    | `#AC8446` | Metallic micro-accents, index labels            |

**Rules**
- Sections alternate white and sand. Dark ink panels are accents only (stat tile, CTA card) — never a full section.
- Accents are ≤10% of any screen. Ink text on white/sand always passes WCAG AA.
- Opacity tints (`bg-olive/10`, `bg-thread/15`) are used for icon chips and soft circles — never hard borders of pure accent.

## 2. Typography

| Role          | Font                        | Style                                            |
| ------------- | --------------------------- | ------------------------------------------------ |
| Display       | Plus Jakarta Sans (700/800) | `tracking-tight`, leading 1.04–1.08              |
| Body          | Inter (400/500/600)         | 15–18px, `leading-relaxed`, color `ink`/`soft`   |

Scale: hero `text-[2.5rem] → 4.1rem` · section h2 `text-4xl → 3.2rem` · card h3 `text-lg → 1.45rem` · body `15–16px` · labels `10–11px uppercase tracked`.

**Label style**: uppercase, semibold, `letter-spacing 0.16–0.28em`, usually accent-colored, often preceded by a 6px dot.
**Italic accent**: one word per heading may be italic + accent colored (`<span class="italic text-thread">`).

## 3. Spacing & Layout

- Container: `max-w-shell` (76rem), gutters `px-5 sm:px-8`.
- Section rhythm: `py-20 md:py-32`.
- Grid gaps: cards `gap-5/6`, mosaic `gap-4 md:gap-5`, hero columns `gap-12 lg:gap-14`.
- Rounding: cards/containers **12px** (`rounded-xl`), hero feature cards 16px, chips/captions **8px**, pills/circles for actions/avatars only.

## 4. Component Inventory

- **Floating pill nav** — fixed, `mt-4`, frosted `bg-white/85 backdrop-blur-xl`, `rounded-3xl`, shadow after 30px scroll; rust underline on hover/active; Products dropdown (white card, icon chips); Contact pill CTA.
- **Mobile menu** — full-screen white, numbered links (01–09) in display font, scrollable, phone number at bottom.
- **Hero compositions** —
  - *Home*: staggered two-card collage (portrait main 62%×75% top-right, landscape 55%×40% bottom-left), circular ink chat-badge pinned on the main card's corner, dot grid + plus + sparkle vectors, soft tinted circle.
  - *Warehouse*: edge-bleed photo (right 52%, full height, rounded left corners, white gradient blend).
  - *Apparel*: main photo + tilted-free overlap card + certification badge + stats row.
  - *Vegetables*: organic tinted block + circle behind photo, overlap card, floating badge.
- **Marquee band** — thread-red strip, uppercase white mono-spaced-feel text scrolling left, dot separators.
- **Mosaic grid** — 4-col bento: large photo (2×2), ink stat block with ghost numeral, photo tiles with caption chips, accent statement block.
- **Fact bar** — 5-cell `gap-px` strip on `bg-ink/10`, sand cells, mono-style labels + live status dot.
- **Media cards** (What We Do / cross-links) — image left (240px) + content right; category chip on photo; hover lift + 1.06 image zoom.
- **Process steps** — numbered ink squares (rounded-xl) on a dashed connector line (horizontal on lg, vertical below).
- **People cards** — circular ink/denim/tinted initial avatars with decorative dot clusters, name + uppercase role.
- **Location cards** — ghost numeral, pin chip, code label (`MY·SGR·02`), address, function footnote.
- **Certification cards** — icon + name + status sublabel, centered.
- **CTA panel** — ink rounded card, photo right with ink gradient (fully covered), white pill buttons.
- **Footer** — Explore links row + brand row + reg-no/copyright.

## 5. Motion Catalog

| Effect            | Trigger            | Timing                              |
| ----------------- | ------------------ | ----------------------------------- |
| Fade/rise reveal  | scroll into view   | 0.9s `cubic-bezier(.16,1,.3,1)` + stagger |
| Curtain image wipe| scroll into view   | 1s scaleY curtain (section-matched) |
| Card lift         | hover              | −6px + shadow 0.4s                  |
| Image zoom        | card hover         | scale 1.06, 0.7s                    |
| Parallax banners  | scroll             | ±speed 0.12–0.18, rAF-driven        |
| Smooth scroll     | Lenis              | 1.15s eased, anchors offset −70px   |
| Marquee           | infinite           | 36s linear loop                     |
| Count-up stats    | scroll into view   | 1.5s cubic ease-out                 |
| Float badges      | infinite           | 6s ±8px ease-in-out                 |
| SVG scenes        | SMIL               | forklift shuttle 13s, sway 5–7s     |

**Laws**: one reveal pass per element; no autoplay carousels; no particles; everything neutralized under `prefers-reduced-motion` (Lenis off, reveals instant, SMIL paused, marquee stopped).

## 6. Responsive Behavior

| Width    | Behavior                                                                    |
| -------- | --------------------------------------------------------------------------- |
| ≥1024px  | Full layouts: split heroes, 4–5 col grids, horizontal step connectors       |
| 768–1023 | 2-col grids, collage scales, vertical step connectors                       |
| <768     | Single column; hero mini-cards hidden; nav collapses to burger + overlay menu; stat strips 2-col |
| <640     | SVG scene labels hidden; caption chips compact                              |

Guardrails: `body overflow-x hidden/clip`; decorative vectors always inside clipping contexts; touch targets ≥44px; body text ≥14px (labels exempt).

## 7. Do / Don't

**Do** use real photography with caption chips · mono-feel uppercase micro-labels · generous whitespace · dashed hairlines as the "logistics" motif · accent-colored italic word per heading.

**Don't** use em/en-dashes in copy · gradients (purple/blue "AI SaaS") · emoji as icons · stock photos of handshakes · rounding above 16px on containers · dark full sections · staggered "chaos" animations · new fonts.
