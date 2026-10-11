# 13 — Planner Output (iteration 4)

Smallest change that fully solves each goal (ponytail discipline).

## Goal 1 — About text entry matches homepage

`src/features/feature-about/components/SectionScrollFirst/SectionScrollFirst.tsx`
— `.aboutWord` tweens only:

- entrance: `delay 1.2 → 0.7`, `stagger each 0.05 → 0.04`, `duration 0.5 →
0.55`, add `ease: 'power2.out'`;
- exit (in the shared `timeline`): `stagger each 0.05 → 0.03`, `duration 0.5 →
0.4`, add `ease: 'power2.out'`.
- Avatar pop chain untouched (fires off the words' `.then()`).

## Goal 2 — Experience section restored

`src/features/feature-about/routes/FeatureAbout.tsx`:

- wrapper `min-h-dvh` → `h-dvh` (definite height → `h-full`/`justify-end`
  chains resolve again; dvh keeps mobile chrome correctness).
- No change to `SectionFourth` itself (its desktop classes already equal the
  pre-polish ones; mobile classes are `lg:`-scoped).

## Goal 3 — Moon: Y-axis rotation, full disc, optimized

1. **Asset pipeline** (one-time, committed result to `public/`):
   - extract the embedded 2280×1140 equirectangular texture from
     `public/moon.svg`;
   - resize to 2048×1024, make **tileable** (48px left/right edge crossfade —
     seam measured at ~11–15/255 without it);
   - encode AVIF (`-quality 65`) → `public/moon-texture.avif` (~150–250KB);
   - **DELETE** `public/moon.svg` (5.83MB) and the dead `backgroundImage.moon`
     entry in `tailwind.config.ts`.
2. `src/components/ui/InfiniteVerticalSlider/index.tsx` — rewrite (name kept
   for minimal diff):
   - container: `absolute bottom-0 h-[58vh] w-full` (no more `h-[38%]` band
     cropping the top);
   - disc: `aspect-square h-full mx-auto` circle, `overflow-hidden rounded-full`;
   - inside: track of **two** texture copies side by side (`w-[200%]`),
     `will-change-transform`; the two `<img>`s are the only moving node;
   - static shading overlays (pre-baked, cheap): dark limb + top-left light
     via `radial-gradient`s; rim halo div behind the disc
     (`radial-gradient(closest-side, …)`) whose **opacity** pulses
     (`.moon-glow` — keep the class so the existing glow tween still targets
     it);
   - all imagery `draggable={false}` / decorative alt.
3. `src/components/common/MenuDrawer/MenuDrawer.tsx`:
   - `moonFloat` → texture-track slide `x: 0 → -W` (W = one texture width),
     60s, `ease: 'none'`, `repeat: -1`, paused, play on open / pause on close;
   - **delete** `moonDrift` (user: stays in place);
   - `moonGlow` unchanged in behavior (opacity pulse 0.35→0.85, 3.2s yoyo);
   - `.moon` fade in/out contract unchanged.

## Goal 4 — Guitar-string divider

1. New `src/components/common/MenuDrawer/component/MenuList/GuitarString.tsx`:
   - `<svg>` keeps `className="line"` (choreography contract) +
     `text-text-default group-hover:text-primary-lightGray` (hover-color
     contract) — stroke uses `currentColor`;
   - `viewBox="0 0 100 40"`, `preserveAspectRatio="none"`, rendered height
     40px → 1 user-unit = 1px; string path `M 0 20 Q 50 20 100 20`,
     `strokeWidth 2`, `vector-effect="non-scaling-stroke"`;
   - transparent hit `<rect>` over the full viewBox → "hover near the
     divider" works on a 40px band;
   - pointer logic: `quickTo`-driven bend proxy, bend = clamp(cursor offset
     from line center × 0.8, ±18px), control point offset = 2×bend;
     `pointerleave` → `elastic.out(1, 0.35)` (~1.1s) back to 0 (pluck wobble);
   - skip interaction on the marquee clone (`interactive` prop, false for the
     `aria-hidden` copy).
2. `MenuList/index.tsx`: replace the `<div className="line …">` with
   `<GuitarString interactive={!isClone} />`.

## Risk register

- AVIF + GitHub Pages: fine (static file, modern browsers; all target
  browsers support it).
- Two texture copies × 2048px wide in DOM: only ~2MP total, fine; if memory
  becomes a concern later, drop to 1536×768.
- The marquee clone divider: interaction off — deliberate (aria-hidden copy).
- Menu open/close tweens `.line` transform on an `<svg>` — GSAP CSSPlugin
  handles SVG elements in all modern browsers.
- `h-dvh` wrapper: sections use explicit `vh` heights; nothing depends on the
  wrapper growing beyond viewport (verified in 11-analysis).

## Verification (tester)

- `npx tsc --noEmit`, `pnpm check-lint`, `pnpm build`.
- CDP measurement pass: about-word timings present in DOM; experience rows
  bottom-aligned at 1440×813 (right column ≈ 733px, last row bottom = section
  bottom − 80px); menu divider pulls/springs; moon disc fully visible,
  texture sliding, glow pulsing; asset size check (`moon-texture.avif` ≪
  moon.svg).
- Dev smoke on `/`, `/about`, `/project`.
