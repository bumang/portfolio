# 15 — Optimizer Output (iteration 4)

## 60fps rules applied

- **Moon loop** = `translateX` (xPercent) of a texture track only —
  compositor-only (MDN rendering waterfall: no layout, no paint per frame).
  No `background-position`, no CSS `rotateY` of a filtered 5MB layer, no SVG
  filter chains (the old `feGaussianBlur` drop/inner-shadow pipeline is gone).
- **Seamless revolution**: two tileable texture copies, `xPercent: -50`,
  `repeat: -1`, `ease: 'none'` — the wrap frame is pixel-identical to the
  start frame. Texture made tileable offline (48px edge crossfade; measured
  raw seam ≈ 11–15/255 per channel would have been visible every loop).
- **Shading pre-baked**: sphere lighting (key light + limb darkening) and the
  rim halo are static `radial-gradient`s rasterized once (defined as
  `.moon-shading` / `.moon-glow` in `globals.css`, the project's convention —
  no inline styles); only the halo's `opacity` animates (compositor-only).
  Killed the `blur-[24px]` duplicate layer (per-frame re-rasterization of a
  full-res copy).
- **Conventions**: moon images use `next/image` (no `eslint-disable`
  comments anywhere in the new code); the dead SVG-filter pipeline is gone.
- **Asset**: 5.83MB SVG (4.37MB base64 PNG + filters) → 2048×1024 AVIF q55,
  267KB (~22× smaller) — faster download, decode, and far less GPU memory.
- **Guitar string**: `gsap.quickTo` (the GSAP-documented mousemove pattern —
  no tween re-parsing per event) on a 2-number proxy + one `path` attribute
  write per update; release via `elastic.out` (pure ease math, no physics
  sim). Interaction disabled on the aria-hidden marquee clone (6 strings →
  3 listeners).
- **`will-change: transform`** only on the single moving track node.
- About text: same easing family at shorter durations (accepted "faster but
  smooth" contract).
- `h-dvh` wrapper: dvh length keeps mobile browser-chrome correctness while
  restoring definite-height resolution (no JS measurement needed).

## Behavior notes preserved

- Menu open/close choreography (container, items, `.line` sweep, moon fade)
  untouched; the sweep now animates an `<svg>` — zero console errors.
- Moon: full disc, bottom-anchored, one revolution / 60s, glow pulse
  0.35→0.85 (3.2s yoyo) — same pulse contract; drift removed per user
  ("keeping it in the same place").
- Experience rows: exact pre-polish desktop geometry restored.
