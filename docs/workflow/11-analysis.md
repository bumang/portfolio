# 11 — Analyzer Output (iteration 4, user-requested order: analysis first)

Method: code inspection + **live measurements via headless Chrome CDP**
(`getBoundingClientRect` at 1440×813), plus `git log -p` comparison against the
pre-polish commits (b6b3ec8 → fad2bc7 → fc6b5de → 084dc08).

## Goal 1 — About text entry (slow)

`SectionScrollFirst.tsx` entrance (`.aboutWord`):

```
delay: 1.2, stagger: { each: 0.05 }, duration: 0.5   (default power1 ease)
```

Homepage reference (`FeatureHome.tsx`, accepted in iteration 1):

```
delay: 0.7, stagger: { each: 0.04 }, ease: 'power2.out', duration: 0.55
exit:  stagger: { each: 0.03 }, ease: 'power2.out', duration: 0.4
```

The about exit currently uses `stagger 0.05 / duration 0.5`. Fix = mirror the
homepage numbers exactly (entrance and exit), keep the avatar pop chain (it is
triggered by the words' `.then()`, so it speeds up automatically).

## Goal 2 — Experience section rows "pushed above"

Measured live (1440×813, `/about`):

|          | section     | right column               | rows top               | rows bottom              |
| -------- | ----------- | -------------------------- | ---------------------- | ------------------------ |
| current  | 11382–12195 | height **426** (content)   | 11382 (= section top!) | 11808                    |
| old code | 11382–12195 | height **733** (stretched) | 11774                  | 12115 (= bottom − pb-20) |

Root cause, proven by measurement: commit `084dc08` changed the `FeatureAbout`
wrapper from `h-screen` → `min-h-dvh`.

- `min-height` does **not** give the containing block a definite height, so
  every descendant `height: 100%` (`SectionFourth`'s inner container and its
  two columns) computes to `auto`.
- The right column collapses to its content height, `justify-end` becomes a
  no-op, and the rows pin to the top of the section with ~387px of dead space
  below — "pushed above".
- Reverting just that one class (tested live with the old file) restores the
  exact previous layout: columns stretch to the section, rows bottom-aligned
  (last row bottom = section bottom − `pb-20` 80px), "EXPERIENCES" centered.

The current `SectionFourth` markup itself is fine (its mobile classes only
kick in below `lg`). Fix: `min-h-dvh` → `h-dvh` in `FeatureAbout.tsx` (a `dvh`
length is definite, so percentage heights resolve again; dvh keeps the mobile
URL-bar correctness from the polish pass). Bonus: `SectionSixth` uses the same
`h-full` + `justify-end` pattern, so its email bottom-alignment is also
restored.

## Goal 3 — Moon

Asset: `public/moon.svg` = **5.83MB**. Structure (inspected):

- one circle path (top edge exactly at viewBox top → the "cut on top" look is
  compounded by the render container, below),
- filled via `<pattern>` from an embedded **2280×1140 PNG** (4.37MB base64) —
  a **2:1 equirectangular moon-surface texture**,
- 3 SVG filters (drop shadow + 2 inner shadows, each an `feGaussianBlur`
  chain) for shading.

Rendering: `InfiniteVerticalSlider` renders the SVG **twice** via
`next/image` (`unoptimized: true`, so the 5.8MB file is shipped raw): a
`blur-[24px] brightness-125` glow copy + the main copy, inside a
`bottom-0 h-[38%] overflow-hidden` container while the disc itself is
`aspect-square w-full` (1440×1440 at 1440w) → only the bottom 38% band is
visible → **the moon is cut on the top** by the container.

Animation (`MenuDrawer.tsx`):

- `moonFloat`: `rotate: 360` (in-plane Z spin, 90s) — the user reads this as
  x-axis rotation and wants **y-axis** rotation;
- `moonDrift`: `scale → 1.25` (45s) — user wants it to **stay in place**;
- `moonGlow`: opacity pulse on the blurred copy (3.2s yoyo).

Resource cost: 5.8MB download/decode + huge blurred raster layer re-painted
during the loop. This is the "lot of resources" complaint.

## Goal 4 — Menu divider

`MenuList/index.tsx` renders after every item:

```jsx
<div className="line h-full w-full bg-text-default p-s1 group-hover:bg-primary-lightGray" />
```

- a ~2px horizontal strip (1px padding + background);
- it participates in the menu open/close choreography (`MenuDrawer` tweens
  `.line` with `translateX(100%) → 0` / back);
- hover brightens it via `group-hover`.

Required: guitar-string interaction — pull near it (up/down), release → spring
back. The `.line` class must survive (choreography contract), so the new
element keeps `className="line"` and only the inner artwork changes to an SVG
string.

## Contracts that stay identical

- Menu open/close choreography (container slide, items rise, **lines sweep in
  from the right**, moon fades).
- About text: masked slide-up entrance / slide-up exit (only timing changes).
- Experience section: same rows, same order, bottom-aligned on desktop.
- Menu marquee behavior (direction-persistent drift, wheel/touch velocity).
