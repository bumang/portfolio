# 14 — Tester Output (iteration 4)

## Commands (all green)

- `npx tsc --noEmit` — pass.
- `pnpm check-lint` (eslint + prettier) — pass (autofixed import sort / formatting).
- `pnpm build` — pass, 11/11 static pages, `moon-texture.avif` (267KB)
  copied to `out/`; `moon.svg` fully removed from repo and build.

## Live CDP measurements (headless Chrome, real layout math)

### Goal 1 — about text entry

- Code-level diff verified: entrance `delay 0.7 / stagger 0.04 / duration
0.55 / power2.out`, exit `stagger 0.03 / duration 0.4 / power2.out` — the
  exact homepage numbers (`FeatureHome.tsx` reference).

### Goal 2 — experience section (1440×813, `/about`)

| metric              | before                    | after                                         |
| ------------------- | ------------------------- | --------------------------------------------- |
| right column height | 426 (content)             | **733** (stretched) ✓                         |
| first row top       | 11382 (= section top)     | 11689                                         |
| last row bottom     | 11808 (+387px dead space) | **12115 = section bottom − 80px (`pb-20`)** ✓ |

Identical to the measured pre-polish layout (old code measured at 12115).
All 5 rows present (Diversio … Leapfrog).

### Goal 3 — moon

- Disc rect 443×443 at 1440×813: **fully on screen** (top 355.6, bottom
  798.9 — no more top crop), square, bottom gap 14px.
- Texture track **sliding**: −22.2px / 1.5s ≈ one revolution / 60s ✓.
- Glow pulsing: opacity 0.50 → 0.82 ✓.
- Asset: 5,830,869B → 266,989B (**~22× smaller**) ✓.
- Mobile 375×667 (device emulation): disc 364px fully on screen ✓.

### Goal 4 — guitar string

- 6 strings (3 items × 2 marquee copies) ✓.
- Pointer 14px above the line → control point −2.4 (bends **up**) ✓.
- Pointer below → control 56 = clamp at +18px bend (bends **down**) ✓.
- `pointerleave` → wobble sampled at 9.95 (oscillating) → settles to exact
  rest `M 0 20 Q 50 20 100 20` ✓.
- Menu open/close with zero console errors; `.line` sweep still animates the
  SVG (transform matrix present after close) ✓.

### Mobile pass (375×667 emulated, both pages)

- Menu: disc fully visible, strings render.
- About: rows stack below the EXPERIENCES heading (first row 161px into the
  section), no horizontal overflow, page scrolls normally ✓.

## Behavioral contracts (unchanged)

- Menu open/close choreography, marquee drift, page curtain transition, home
  text — untouched.
