# 02 — Analyzer Output (current behavior inventory)

## A. Font pipeline (Goal 1)

- `_app.tsx` wraps everything in `<main className={drukTrail.variable}>`;
  `drukTrail` = `next/font/local` loading only `DrukCond-Super-Trial.woff`.
- Tailwind `fontFamily.trial = ['var(--druk-trail)']`, `inter = ['Inter']`
  (no fallback stack).
- Every display heading is `font-trial` + `font-heavy`/`font-bold`/`font-medium`.
  The loaded face is a single regular weight → browsers synthesize or substitute
  → inconsistency. `body` has no font-family (system stack varies by OS).
- `src/styles/fonts/DrukTrial/style.css` (all-face `@font-face` with `local()`,
  `font-weight: normal`, italic faces as `font-style: normal`) is dead code.

## B. Mobile breakage inventory (Goal 2)

| Surface | Issue |
|---|---|
| Project grid `FeatureProject.tsx` | 140vw×210vh canvas, `mousemove` pan, 500px tiles, 260px heading; unusable on touch |
| Detail pages ×6 (`Feature{Diversio,Skyleap,Tigg,Rara,R2px,OptimoTeams}`) | two fixed 50% columns, `text-[220px]`, `h-[370px]`, `px-[60px]`, cross btn at `left-[calc(50%-32px)] top-[-62px]` |
| Home headings | `text-h2`=112px at base; "SOFTWARE DEV." overflows 375px viewport; `leading-[112px]` fixed |
| About `SectionScrollFirst` | pinned 400vw horizontal scrub; broken on touch |
| Menu items | `text-[112px]`, `py-[120px]` — one item taller than a phone screen |
| Layouts | `h-screen` (100vh) everywhere — bottom cut off on mobile browsers |
| Project detail pages xuno/space | reuse diversio-style feature components |

## C. Animation behavior notes (Goal 3 — record, then improve)

1. **Home text** (`FeatureHome.tsx`, shared pattern in detail pages):
   - Entrance: words masked (`overflow-hidden`), start `translateY(100%)` +
     `visibility:hidden`; on mount `delay: 1.2`, `duration: 0.5`, `stagger:
     0.05`, slide up to 0.
   - Exit (via shared `timeline` from `TransitionContext`): same words slide up
     `translateY(-100%)`, same stagger/duration.
   - Perceived slowness: 1.2s delay + 0.62s stagger tail.
2. **Page transition** (`components/ui/Transition/index.tsx`):
   - Two fixed curtains (`bg-primary-darkBlue`, `bg-background-preLoader`),
     positioned below viewport, slide up in staggered wipe (1s + 0.8s, eased
     `power4.inOut`), swap children, then continue up to −200% (1s + 0.8s with
     0.5/0.1 delays), then reset to below viewport.
   - Total ≈ 2.3s. Behavior = double-layer upward curtain wipe.
3. **Menu drawer** (`MenuDrawer.tsx`):
   - Open: container `translateY(-100%)→0`, 0.8s `power4.out`; moon fade 0.5s;
     items `translateY(100%)→0` 0.8s; lines `translateX(100%)→0` 0.5s, offset
     overlaps. Close mirrors it with `power4.in`, container 0.5s.
   - Perceived slowness: item slide (0.8s) + container (0.8s).
4. **Moon** (`InfiniteVerticalSlider`): 2s `backgroundPositionY` loop that
   doesn't even affect the `<img>` (animates the wrapper's background) — the
   moon is effectively static; menu items list is static scroll (`overflow-y-
   auto`), infinite-loop attempt commented out.

## D. 60fps offenders

- `infiniteVerticalSlider` keyframes → `backgroundPositionY` (paint).
- `loopMenuTop` → `translateY(-300%)` non-seamless (unused now).
- Home `useEffect` in FeatureProject re-creates a mousemove listener on every
  `mousePosition` context change (fine, but guarded by matchMedia on mobile).

## E. What stays identical (contracts)

- Menu: slide-down container, fade moon, items up from bottom, lines from right.
- Transition: two staggered curtains, dark-blue first, gray second, upward wipe.
- Home text: masked slide-up entrance, staggered; slide-up exit.
- Desktop project grid: canvas pan + click choreography (clip-path sweep,
  project slide-out curtain with project bg color) untouched on `lg+`.
