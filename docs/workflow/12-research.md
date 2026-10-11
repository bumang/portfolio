# 12 — Researcher Output (iteration 4, live web research)

## Goal 1 — matching timings

No new research needed: the homepage values are the accepted in-project
reference (iteration 1, `docs/workflow/03-plan.md`). Same easing family at
shorter durations reads "faster but smooth".

## Goal 2 — percentage heights vs min-height

MDN CSS sizing: a percentage `height` resolves against the containing block's
**used height only when that height is definite**. `min-height` alone leaves
the height `auto`/indefinite, so `height: 100%` computes to `auto` — this is
the classic `min-h-full` + `h-full` trap. `height: 100dvh` (a length) is
definite → children resolve. Empirically confirmed with live CDP measurement
(see 11-analysis).

## Goal 3 — moon rotating on its Y axis, optimized

- **MDN `rotateY()`**: "rotates an element around the y-axis (vertical)
  without deforming it… `rotateY(a)` is equivalent to `rotate3d(0,1,0,a)`".
  For a **flat** image a true `rotateY` needs `perspective` and behaves like a
  coin spin — the disc collapses to an edge at 90° and shows its mirrored
  back. That is _not_ how a planet rotating around its vertical axis looks;
  the user wants the moon to stay a full circle in place.
- **The correct visual technique** (Stack Overflow "Rotating globe in CSS",
  the standard CSS-planet pattern): keep a **fixed circular mask** and slide a
  **2:1 equirectangular surface texture** horizontally inside it. Horizontal
  texture travel around a fixed disc _is_ what rotation around the Y axis
  looks like from the front. Key finding for this project: **the existing
  asset already contains exactly that** — a 2280×1140 equirectangular texture
  baked into the SVG pattern.
- **Loop seam**: measured the texture's left/right edge columns (numpy,
  mean |Δ| ≈ 11–15/255) — the texture does **not** tile perfectly. A raw
  slide-loop would show a seam every revolution. Fix at asset time: blend a
  ~48px edge band (crossfade left edge into right edge) so the texture becomes
  tileable, then loop two copies with `x: 0 → -W`, `repeat: -1`, `ease: none`
  (perfectly seamless).
- **Performance** (MDN "Animation performance and frame rate" — rendering
  waterfall: recalc style → layout → paint; web.dev "High-performance CSS
  animations"): only `transform`/`opacity` skip layout+painting each frame.
  Consequences applied:
  - the loop must be a `translateX` of the texture track (compositor-only),
    not `background-position` (paint) and not a CSS `rotateY` of a huge
    filtered image;
  - drop the SVG `feGaussianBlur` filter chains and the `blur-[24px]` glow
    copy — filters on large animated layers force re-rasterization; replace
    shading with pre-baked CSS `radial-gradient` overlays (rasterized once);
  - `will-change: transform` on the single moving node (MDN `will-change`,
    used sparingly);
  - the glow becomes a static radial-gradient halo whose **opacity** pulses
    (opacity is compositor-only).
- **Asset weight**: 5.83MB SVG (4.37MB base64 PNG + filter pipeline) →
  extract the texture, downscale to 2048×1024, make tileable, encode **AVIF**
  (MDN image formats; Chrome 85+/Firefox 93+/Safari 16.1+). Expect
  ~150–250KB — a ~25–40× saving, faster decode, far less GPU memory, and it
  kills the duplicated blurred copy.
- **Stay in place**: remove the `scale → 1.25` drift tween (user contract).
  One full surface revolution ≈ 60s, `ease: none`, `repeat: -1`.

## Goal 4 — guitar-string divider

- **GSAP `gsap.quickTo()`** (official docs): "If you find yourself calling
  `gsap.to()` many times on the same numeric property… like in a
  `mousemove` event, you can boost performance by creating a `quickTo()`
  function instead… it directly pipes a new number… skips unit conversion,
  relative values, plugin parsing…" → exactly right for a cursor-following
  string bend.
- **Geometry**: a string under tension pulled at its midpoint ≈ a quadratic
  Bézier: `M 0 20 Q 50 (20+c) 100 20` with control offset `c`; the visible
  midpoint displacement is `c/2` (Bézier midpoint formula). Pull up = negative
  `c`, down = positive, clamped to ±18px so it reads as stretch, not break.
- **Release**: GSAP's `elastic.out` ease (GSAP Eases docs) gives a decaying
  overshoot oscillation — a good approximation of a plucked string wobble
  (amplitude = pull at release, period ~1s). Cheap, no physics sim needed.
- **Pointer events** (MDN `pointermove`/`pointerleave`): work for mouse _and_
  touch drags — on touch, dragging the marquee near a divider can pluck it;
  the menu viewport already sets `touch-action: none`.
- **SVG specifics**: `preserveAspectRatio="none"` + fixed height keeps the
  string stretched to any width; a `fill="transparent"` hit `<rect>` makes the
  whole 40px-tall band hoverable ("hover near the divider line");
  `vector-effect="non-scaling-stroke"` keeps the stroke 2px.
- **Contract**: the new element keeps the `line` class so the menu
  open/close sweep (`translateX(100%) → 0`) is untouched; interaction is
  skipped on the marquee clone copy (`aria-hidden` guard) to halve listeners.

## Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY
- https://developer.mozilla.org/en-US/docs/Web/CSS/perspective
- https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
- https://developer.mozilla.org/en-US/docs/Web/Performance/Animation_performance_and_frame_rate
- https://web.dev/articles/animations-guide
- https://gsap.com/docs/v3/GSAP/gsap.quickTo/
- https://gsap.com/docs/v3/Eases/
- https://stackoverflow.com/questions/27781634/rotating-globe-in-css
