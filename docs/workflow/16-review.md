# 16 — Reviewer Output (iteration 4)

Fresh-eyes review of the full diff against the goal contracts.

## Passed

- **Goal 1 (about text speed)**: `.aboutWord` entrance/exit now mirror the
  homepage exactly (`0.7/0.04/0.55 power2.out` in, `0.03/0.4 power2.out` out).
  Avatar pop chain preserved (fires off the words' `.then()`).
- **Goal 2 (experience section)**: root cause correctly identified and proven
  by measurement — `min-h-dvh` made the containing block indefinite, breaking
  every `h-full`/`justify-end` chain. `h-dvh` restores the measured pre-polish
  geometry (rows bottom-aligned, last row = section bottom − 80px). Bonus:
  `SectionSixth`'s identical pattern is repaired too.
- **Goal 3 (moon)**: Y-axis rotation implemented the correct way for a flat
  2D render — the existing equirectangular texture slides behind a fixed
  circular mask (what sphere Y-axis rotation looks like from the front; a raw
  CSS `rotateY` would have been a coin-flip collapse at 90°, MDN). Full disc
  visible (no top crop), no more drift, glow pulse kept. Asset 5.83MB → 267KB
  AVIF; only transform/opacity animate; shading pre-baked.
- **Goal 4 (guitar string)**: SVG bezier divider pulls toward the cursor
  (up/down, ±18px clamp), releases with elastic wobble, settles to exact rest.
  Keeps the `.line` class (open/close sweep intact, zero console errors),
  `currentColor` hover tint, clone copy non-interactive.
- Gates: `tsc --noEmit`, `eslint`/`prettier`, `next build` (11/11) — green.
  Live CDP measurements on desktop 1440×813 and emulated mobile 375×667 —
  all pass (see 14-test).
- **Code style**: no inline `style={{}}` (gradients live in `globals.css`),
  no `eslint-disable` comments (moon uses `next/image`); the experience list
  still contains all 5 roles including Diversio (verified in source, live
  DOM and `out/about.html`).

## Residual risks (need human eyes/device)

1. **Moon size/taste**: disc ≈ 443px at 1440w (`h-[58vh]`, 94%) — tunable in
   `InfiniteVerticalSlider` if it should be bigger or anchored tighter to the
   bottom.
2. **Rotation speed**: 60s/revolution (`moonSpin` in `MenuDrawer.tsx`) — taste.
3. **String feel**: pull gain (0.8), clamp (±18px), release (`elastic.out(1,
0.35)`, 1.1s) are tunable constants in `GuitarString.tsx`.
4. **Texture seam**: edge band is blended offline; the loop is mathematically
   seamless, but verify on a real display that the 48px crossfade band isn't
   visible as a soft stripe on the surface (it sits at the 360° meridian).
5. `out/` and the dev server artifacts: build re-exported; deploy flow
   unchanged (GitHub Pages).

## Housekeeping

- Workflow artifacts: `docs/workflow/10-goals-iteration4.md` +
  `11-analysis` + `12-research` + `13-plan` + `14-test` + `15-optimize` +
  `16-review` (analysis-first order per user request).
- `public/moon.svg` deleted; `public/moon-texture.avif` added; dead
  `backgroundImage.moon` tailwind entry removed.
