# 09 — Iteration 3: Menu scroll direction, moon identity, gap

## Analyzer findings

1. **Scroll direction** — the drift always decayed back to the fixed downward
   travel. User spec: the drift direction must *follow* the scroll input —
   scroll up = travel up, scroll down = travel down — and **persist** in that
   direction after the input ends ("how the user left it"). No input yet =
   original downward travel.
2. **Moon** — inspected `public/moon.svg`: the path is a **full circle**
   (x 150–1686, y 50–1586 — a moon disc of radius ~768 centered at (918, 818))
   with a base64-embedded surface texture, but the viewBox `0 0 1736 286`
   crops it to a horizon strip. That is why the glow sat on a "horizon" and
   the rotation was imperceptible. Correct treatment: show the full circle
   (crop with `overflow-hidden` at render time instead), spin it about its
   own center — texture + rim craters drift past = rotating in place — and
   pulse a glow that follows the exact silhouette.
3. **One-page gap after "WHAT I USE FOR MY PROJECTS"** — the section's outer
   (`h-[500vw]` desktop / `h-[260vh]` mobile) was much taller than its trigger
   content (`min-h-[400vh]` / `min-h-[220vh]`), leaving a blank tail before
   the capsule pills. The expanding circle is designed to hand off into the
   cream pills background; the blank broke that handoff.

## Implemented

- `MenuList/index.tsx` — velocity model now tracks `direction` (-1 down / +1
  up); wheel/touch input sets it; decay target = `direction * AUTO_SPEED`, so
  the marquee keeps going the way the user left it. Displacement per wheel
  notch still ≈ 100px (page-like).
- `public/moon.svg` — viewBox widened to the full circle (`150 50 1536 1536`).
- `InfiniteVerticalSlider/index.tsx` — moon rendered as an `aspect-square`
  layer inside an `overflow-hidden` bottom container; glow = blurred copy of
  the exact silhouette (`moon-glow`), crisp disc on top.
- `MenuDrawer.tsx` — `moonFloat` = continuous `rotate: 360` (90s, `ease: none`)
  about the disc center; `moonDrift` = one-way scale → 1.25 (45s); `moonGlow`
  = opacity pulse 0.35→0.85 (3.2s yoyo) on the silhouette glow. Play on open,
  pause on close.
- `SectionScrollSecond.tsx` — outer/trigger aligned (`160vh` mobile /
  `400vh` desktop) so the expanding circle hands off directly into the pills
  section — no more dead page.

## Verification

- `tsc --noEmit`, `eslint`/`prettier`, `next build` (11/11) — green.
- Dev smoke `/`, `/project`, `/about` — 200, no warnings.
- Graphify graph refreshed after code changes.
