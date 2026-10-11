# 01 — Researcher Output

## Goal 1: Cross-browser font consistency

- MDN `@font-face`: when `local()` precedes `url()`, the **user's installed copy
  is used** if present. A locally installed Druk trial (different version/format)
  makes rendering diverge per machine and per browser. For web delivery, serve
  WOFF2 and rely on the served file, not local fonts.
- MDN `@font-face` weight/style matching: faces must declare their real
  `font-weight`/`font-style`, otherwise `font-weight: 700/900` cannot match the
  face and browsers either **synthesize** (faux bold — stroke widths differ
  between Chrome/WebKit/Firefox) or fall back to a different family. The fix for
  single-weight display faces: `font-synthesis: none` so no browser ever
  synthesizes, guaranteeing identical glyph rendering.
- Next.js `next/font/local` generates the `@font-face` + fallback stack itself;
  the CSS variable it exposes already includes the fallback family. Self-hosting
  (which this project already does via `next/font`) is the consistent approach.

Findings applied in this project:

1. `src/styles/fonts/DrukTrial/style.css` — 302 lines of hand-written
   `@font-face` with `local()` sources and `font-weight: normal` on every face.
   It is **never imported** (dead code). All 36 faces declare `font-weight:
   normal`, so bold/heavy utilities can never match. → Delete (ponytail:
   deletion beats addition).
2. The site actually uses **one** face: `DrukCond-Super-Trial.woff` via
   `next/font/local` (`font-trial` → `var(--druk-trail)`). Every `font-heavy` /
   `font-bold` / `font-medium` used together with `font-trial` currently relies
   on browser font synthesis → the root cause of "font not consistent across
   browsers". → `font-synthesis: none` + proper fallback stacks make all
   browsers render the exact same glyphs.
3. `body` never sets `font-family` → tailwind base uses `ui-sans-serif,
   system-ui` stack, which differs per OS/browser. Body copy should be the
   site's Inter (already loaded via Google Fonts import, which is fine and
   consistent cross-browser).

## Goal 2: Mobile — what's best for scroll/animation-heavy pages

- Heavy desktop experiences: the project grid is a `140vw × 210vh` canvas with a
  mouse-follow pan (`mousemove` → GSAP). Mobile has no mouse; panning-by-touch
  fights native scrolling. Best practice: **separate simplified mobile
  experience** — a straightforward stacked grid, tap = navigate, same curtain
  transition. Keep the desktop choreography untouched (guarded by
  `gsap.matchMedia('(min-width: 976px)')`).
- Pinned horizontal ScrollTrigger sections (About page) are unusable on small
  screens (400vw translate). Best: **disable pin/translate below `lg`**, let
  sections stack and scroll natively; keep the scrub animations that still read
  well vertically (letter reveal), they degrade gracefully.
- Fixed viewport heights: `100vh` > visible viewport on mobile browsers (URL
  bar). Use `dvh` (`h-dvh`, Tailwind ≥3.4) for the app-frame layouts.
- The detail pages (diversio/tigg/…) are two 50% columns with a 220px heading —
  below `lg` they must stack, with fluid type (`clamp()`), and keep their
  entrance choreography (it is transform-only and works at any width).

## Goal 3: 60fps + faster, behavior-preserving

- Only `transform` and `opacity` are compositor-animated (MDN/web.dev): loops
  and transitions must avoid `background-position`, `clip-path`, `width`, etc.
  for continuous animation. One-shot entrances can use them sparingly.
- GSAP best practice (gsap.com/resources): set initial states with GSAP (not
  CSS), tween transforms (not `left/top`), and let `translate3d` (force3D) keep
  loops on the GPU.
- Current offenders:
  - `animate-infinite-vertical-slider` animates `backgroundPositionY` (paint)
    on the moon container — and it targets a `<div>` wrapping an `<img>`, so it
    doesn't even move the moon. → replaced by the goal-4 moon treatment.
  - `loopMenuTop` (`translateY(-300%)`) was a non-seamless menu-loop attempt.
    → replaced by a true two-copy marquee (`yPercent: -50`, `repeat: -1`).
- Speeding up while preserving behavior = same choreography/order/easing
  families, shorter durations and delays. Easing of the same power family at
  shorter durations reads "faster but smooth".

## Goal 4: Menu — infinite list + moon flyover (web-researched)

- **Infinite vertical list**: the seamless pattern is exactly two copies of the
  list inside a track; animate the track `translateY` from 0 to −50% linearly
  (`repeat: -1`, `ease: 'none'`). Constant speed: `duration = halfTrackHeight /
  pxPerSecond`. Second copy must be `aria-hidden` + not focusable (a11y).
- **"Flying over the moon"** (parallax flyover pattern, e.g. Tympanus Codrops
  Moonlight Parallax concept, simplified for 2D):
  1. Moon stays anchored (fixed position, no background scroll).
  2. **Rotates in place**: slow, subtle continuous roll (oscillating ±1–2°,
     sine easing) — reads as drifting over the surface.
  3. **Moves inwards**: slow scale-up toward the viewer (1 → ~1.15) with sine
     yoyo — reads as the camera flying forward.
  4. **Subtle circumference glow**: a static radial-gradient halo layer behind
     the moon edge; animate only its `opacity` (cheap). Avoid `filter: blur` on
     large areas (paint cost).
- All of the above are `transform`/`opacity` only → 60fps.
