# 05 — Optimizer Output

## 60fps rules applied

- Every looping animation is `transform`/`opacity` only:
  - menu marquee → `translateY` (GSAP, `ease: none`, `repeat: -1`) + `will-change-transform`
  - moon roll/inward drift → `rotate` + `scale` + `will-change-transform`
  - moon glow → `opacity` pulse on a pre-rendered radial-gradient halo (no blur)
- Removed paint-triggering loops:
  - `infiniteVerticalSlider` (`backgroundPositionY`) deleted — it didn't even
    move the `<img>` (it animated the wrapper's background).
  - `loopMenuTop` (`translateY(-300%)` non-seamless attempt) deleted; replaced
    by a true two-copy marquee.
- `font-synthesis: none` eliminates faux-bold glyph rendering (paint/raster
  consistency across browsers).
- Continuous marquee speed is constant (55px/s) regardless of screen size —
  duration derived from copy height; marquee starts 0.55s after the drawer
  entrance so the two motions don't compete.
- Mobile: heavy desktop-only work skipped entirely — `gsap.matchMedia('(min-
  width: 976px)')` guards the project canvas pan/init and the About pinned
  horizontal scrubs; `mousemove` listener early-returns below `lg`.
- `dvh` units for app frames so mobile browser chrome never cuts off content.

## Behavior notes preserved

- Entrance/exit choreographies keep their order and easing families
  (`power4.inOut` curtains, `power2.out` reveals, `sine.inOut` moon) at shorter
  durations — "faster but smooth".
