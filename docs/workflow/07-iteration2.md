# 07 — Iteration 2: Analyzer + Planner (user-verified regressions)

## Findings (researcher/analyzer)

1. **Falling stars** — original behavior (commit `cdc3e65~1`): ~3 stars rendered,
   and because `HomePageLayout` re-renders on every context `mousePosition`
   change, each mousemove re-randomized the star styles → stars "fell rapidly"
   on mouse move. Iteration-1 hydration guard removed the feature (0 stars).
   Fix: keep client-only rendering (hydration-safe) but render `generateRandomStars(3)`
   after mount so the mousemove re-randomization effect returns.
2. **Page transition** — the speed-up collapsed the two-phase choreography and
   clipped the phase-2 delays into negative offsets. Intended behavior
   (user-specified): Phase 1 — dark curtain leads, gray follows slightly
   delayed, both decelerate into place (ease-out). Phase 2 — the follower
   leaves first, the leader second (crossover, "scene change"), zipping up.
   Visible, fast, smooth. Fix: rebuild timelines with absolute positions.
3. **"is a Software Developer" too small** — iteration-1 used
   `clamp(22px,5vw,260px)`; 5vw at desktop ≈ 72px vs original 260px. Fix:
   `text-[30px] sm:text-[44px] lg:text-h1` (desktop restored exactly).
4. **Menu components lag the drawer** — container used `power4.out` (fast
   visible start) while items/lines used default `power1.out` starting late;
   marquee had a 0.55s delay. Fix: same ease family, near-zero offsets, marquee
   starts immediately (ticker ramps drift in).
5. **Menu scroll interaction** — wheel down must speed up the auto-drift (same
   direction), wheel up must reverse the direction, velocity decays back to
   drift, ~1:1 page-like displacement per notch (impulse/decay ratio ≈ 100px).
   Implement as ticker-driven velocity + modulo wrap (seamless both ways) +
   touch support.
6. **Moon** — iteration-1 scale yoyo read as "zoom in/out" and the ±1.6° roll
   was imperceptible; the opacity-only glow was rejected. Fix: visible
   rotation (rotateZ ±2° + rotationX 0→5° with perspective — reads as flying
   over the surface), one-way inward drift (scale → 1.25, no yoyo), and a
   radiating pulse on the edge glow (scale + opacity, origin on the horizon).
7. **Gap before the pills** — on mobile the "WHAT I USE" section keeps its
   desktop scroll runway (`h-[500vw]` + `min-h-[400vh]`) and the capsule
   section stacks with large paddings → huge dead scroll before the first
   capsule. Fix: compact mobile runways, keep desktop untouched.

## Plan
- `HomePageLayout.tsx` — mounted-gate + `generateRandomStars(3)`.
- `components/ui/Transition/index.tsx` — rebuild both timelines per spec.
- `SectionScrollFirst.tsx` — restore desktop letter size.
- `MenuDrawer.tsx` — synchronized open/close; new moon tweens.
- `MenuList/index.tsx` — ticker marquee + wheel/touch velocity control.
- `InfiniteVerticalSlider/index.tsx` — horizon glow layer.
- `SectionScrollSecond.tsx`, `SectionScrollThird.tsx`,
  `InfiniteCapsuleScroll.tsx`, `SectionSixth.tsx` — mobile runway/spacing
  fixes + desktop email size restore.
