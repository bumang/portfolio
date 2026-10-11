# 03 — Planner Output

## Files & changes (smallest change that fully solves each goal)

### Goal 1 — Fonts
1. **DELETE** `src/styles/fonts/DrukTrial/style.css` (dead, wrong declarations).
2. `src/styles/globals.css`:
   - `body { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; font-synthesis: none; }`
   - add `h-dvh` usage stays in tailwind classes.
3. `tailwind.config.ts`:
   - `inter: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif']`
   - `trial: ['var(--druk-trail)', 'Inter', 'ui-sans-serif', 'sans-serif']`
4. `src/styles/fonts/DrukTrial/index.ts`: keep single face, set `weight: '400'`,
   `style: 'normal'` explicitly, delete the commented-out face list (dead code).

### Goal 2 — Mobile
5. `src/features/feature-project/routes/FeatureProject.tsx`:
   - Wrap desktop init/mousemove with `gsap.matchMedia()` / `(min-width: 976px)`.
   - Add mobile-only (`lg:hidden`) stacked project list: name + image, tap →
     `router.push`, standard curtain transition (no `fromProjectsPage`).
   - Keep desktop canvas exactly as-is.
6. Detail pages `Feature{Diversio,Tigg,Rara,R2px,OptimoTeams,Skyleap}` (and
   xuno/space routes if they reuse them):
   - `flex-col lg:flex-row`; image box `h-auto w-full lg:h-[370px] lg:w-[50%]`,
     `px-s24 lg:px-[60px]`.
   - Heading `text-[220px] leading-[220px]` → `text-[clamp(88px,24vw,220px)]
     leading-[0.95] lg:leading-[220px]`.
   - Cross button: reposition responsive (`top-s24 left-1/2 -translate-x-1/2`
     mobile, absolute desktop as now).
7. Home `FeatureHome.tsx` + `PageFooter` heading sizes:
   - `text-h2` → `text-[clamp(44px,14vw,112px)] md:text-h1`, `leading-[0.95]
     md:leading-[112px]`/`md:leading-heavy` per element (desktop identical).
8. About `SectionScrollFirst.tsx`:
   - `gsap.matchMedia('(min-width: 976px)')` around the pin/translateX tween.
   - `scroll-section-inner`: `w-screen flex-col lg:w-[400vw] lg:flex-row`;
     sections `h-auto py-s40 lg:h-screen`.
9. Layouts (`HomePageLayout`, `ProjectPageLayout`, `ProjectsPageLayout`,
   `AboutPageLayout`): `h-screen` → `h-dvh` for the app frame.
10. Menu (`MenuList`): `text-[112px]`→`text-[clamp(48px,12vw,112px)]`,
    `py-[120px]`→`py-s40 lg:py-[120px]`, matching line-heights.

### Goal 3 — Faster, 60fps, behavior-preserving
11. `FeatureHome.tsx` + detail pages: entrance `delay: 1.2 → 0.7`,
    `duration: 0.5 → 0.55` (keep 0.5 where fine), `stagger 0.05 → 0.04`;
    exit tweens `duration 0.5 → 0.4`, `stagger 0.05 → 0.03`.
12. `components/ui/Transition/index.tsx`: curtain durations 1/0.8 → 0.55/0.45,
    phase-two delays 0.5/0.1 → 0.2/0; keep order, easing family `power4.inOut`.
13. `MenuDrawer.tsx`: open container 0.8→0.55 (`power4.out`), items 0.8→0.55,
    line 0.5→0.35, moon 0.5→0.4; close container 0.5→0.4 (`power4.in`),
    items 0.8→0.5, line 0.5→0.35, moon 0.5→0.3. Same choreography/order.

### Goal 4 — Menu completion
14. `MenuList/index.tsx`: two-copy track marquee (GSAP `yPercent: -50`,
    `repeat: -1`, `ease: 'none'`, duration from half-height at ~55px/s),
    second copy `aria-hidden`, links `tabIndex={-1}`. Track starts/pauses with
    the drawer via callback from `MenuDrawer`.
15. `InfiniteVerticalSlider` → moon treatment: remove `backgroundPositionY`
    animation. Moon container: fixed at bottom `h-[38%]`; inner:
    - slow roll: `rotation: ±1.2deg`, `duration: 16`, `sine.inOut`, yoyo ∞
    - inward drift: `scale: 1 → 1.18`, `duration: 22`, `sine.inOut`, yoyo ∞
    - glow: radial-gradient halo layer behind top edge, `opacity` pulse 6s yoyo
    - only transform/opacity; `will-change: transform` on the animating node.

### Verification (tester)
- `pnpm check-lint`, `npx tsc --noEmit`, `pnpm build`.
- Visual: desktop (1440×900) behavior parity; mobile 375×667 pass over home,
  project list, one detail page, about, menu.

### Risk register
- Marquee + entrance share transforms → put entrance on children, marquee on
  track (different elements) to avoid tween conflicts.
- `dvh` support: modern browsers only — acceptable (Tailwind 3.4 `h-dvh`).
- About scrub on mobile: keep letter scrub (vertical scroll), disable pin only.
