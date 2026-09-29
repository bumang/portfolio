# Plan — Portfolio Refresh (Diversio / Optimo Teams / About)

Status: implemented — pending visual browser QA
Source of truth: `Umanga_Bhattarai_Revised_CV.docx` (repo root)
Digest: `docs/frontend-skill-digest/{AGENTS.md,project-digest.md}` (created)
Repo class: `frontend-app` (Next.js 14 Pages Router, static export, Tailwind)
Branch model: `feat/portfolio-refresh` off `dev` (current branch)

## Scope Guardrails

- No new UI components and no redesign. Every change reuses the existing
  markup/classes and mirrors existing patterns.
- No changes to routing/transition implementation, no new dependencies.
- Content source is the revised CV plus the official brand assets noted below.
- Site content is hardcoded; these are source edits, not CMS/API changes.

## Change Inventory

### 1. Project grid — `src/features/feature-project/routes/FeatureProject.tsx`

Add two entries to the hardcoded `projects` array (new work first):

```ts
const projects = [
  { name: 'diversio', src: 'diversio.svg', bgColor: '#5B34E9' },
  { name: 'optimo-teams', src: 'optimo-teams.svg', bgColor: '#7B61FF' },
  { name: 'skyleap', src: 'skyleap.svg', bgColor: '#167DCE' },
  { name: 'tigg', src: 'tigg.svg', bgColor: '#8483CE' },
  { name: 'xuno', src: 'xuno.svg', bgColor: '#00A6A6' },
  { name: 'space', src: 'space.svg', bgColor: '#F4B21A' },
];
```

Layout math with 6 cards (existing cards are 500 px wide, SVG cards are
500×340 + 107 px name line):

- Keep `w-[130vw]`; grow the pan container `h-[160vh]` → `h-[220vh]`.
- Keep the two existing rows and insert one middle row so rows read
  top-right → center → bottom-left (same card markup duplicated, which is
  already the file's pattern):
  - Row 1: `projects.slice(0, 2)` — `justify-end`, inner `max-w-[75%] justify-between` (unchanged, refs 0/1)
  - Row 2 (new): `projects.slice(2, 4)` — `justify-center`, inner `max-w-[75%] justify-between` (refs 2/3)
  - Row 3: `projects.slice(4)` — existing bottom block `w-[90%] justify-around` (refs 4/5)
- `handleProjectClick` needs no change (`findIndex` + `bgColor` + push).
- Vertical gaps come from the existing `justify-between` column; tune
  `h-[220vh]` after browser QA if the rows feel too far apart.

### 2. New grid assets — `public/`

Match the existing 500×340 brand-card SVG style (flat brand background +
centered white logo):

- `public/diversio.svg` — bg `#5B34E9`, Diversio wordmark in white
  (derived from official `Logo-diversio.svg`, recolored).
- `public/optimo-teams.svg` — bg `#7B61FF`, Optimo wordmark/symbol in white
  (derived from official `logo-optimo-1.svg`, recolored).
- `public/diversio_detail.png` — official Diversio platform screenshot
  (`Platform-Home-1.png`), resized to ~778 px wide like existing detail PNGs.
- `public/optimo_detail.png` — official Optimo product screenshot
  (`optimo-video-thumbnail.png`), resized to ~778 px wide.

These use official marketing assets from diversio.com; swap with the user's own
screenshots later if preferred.

### 3. New detail routes (mirror of `feature-tigg`)

Two new route components copied from
`src/features/feature-tigg/routes/FeatureTigg.tsx` (identical GSAP timeline,
`AnimatedCrossBtn`, chip list, headline, description, visit-site link) with new
content:

- Diversio — `/project/diversio`
  - Title: `DIVERSIO`; chips: `Web App`, `Design System`, `Platform`
  - Headline: “SOC 2-compliant Unified People Intelligence Platform”
  - Copy: “Diversio helps organizations measure and improve diversity, equity,
    and inclusion. I lead frontend architecture for the platform, restructure
    the company-wide design system across production apps, and build the
    testing and CI/CD infrastructure that keeps releases fast and reliable.”
  - Link: `https://diversio.com/`; bg `#5B34E9`
- Optimo Teams — `/project/optimo-teams`
  - Title: `OPTIMO`; chips: `Web App`, `Teams`, `Analytics`
  - Headline: “People intelligence for healthier, high-performing teams”
  - Copy: “Optimo Teams is Diversio's SOC 2-compliant people intelligence
    platform. I owned the frontend end-to-end: a 55-route application across
    15 feature modules and 75 page components, covering authentication,
    permissions, product analytics, observability, and integrations.”
  - Link: `https://optimoteams.com/`; bg `#7B61FF`

New files (no existing file edited except the barrel):

```
src/features/feature-diversio/index.ts
src/features/feature-diversio/routes/index.ts
src/features/feature-diversio/routes/FeatureDiversio.tsx
src/features/feature-optimo-teams/index.ts
src/features/feature-optimo-teams/routes/index.ts
src/features/feature-optimo-teams/routes/FeatureOptimoTeams.tsx
src/pages/project/diversio/index.tsx
src/pages/project/optimo-teams/index.tsx
```

`src/features/index.ts` gains the two barrel exports (alphabetical order).
Page files mirror `src/pages/project/tigg/index.tsx`:
`ProjectPageLayout bgColor="bg-[#5B34E9]" page="Diversio"` and
`bgColor="bg-[#7B61FF]" page="Optimo Teams"`.

Note: the 220 px display title wraps naturally to `OPTIMO` / `TEAMS` on one
line each; verify in browser QA before adjusting anything.

### 4. Experience — `src/features/feature-about/components/SectionFourth/SectionFourth.tsx`

Insert one row at the top of the list, reusing the exact border/padding classes:

```tsx
<div className="flex w-full justify-between border-t-[1px] border-black py-s18 font-inter text-s18">
  <div className="flex items-center">Diversio</div>
  <div>
    <div className="text-[14px]">Full time</div>
    <div>Software Engineer</div>
  </div>
</div>
```

### 5. Avatar — `public/avatar.png`

Replace in place from `IMG_6020.PNG` (root): center-crop to square and resize
to the current 174×173 footprint (display stays 173×173 in
`SectionScrollFirst`). No markup change. Old file is recoverable from git.

```
sips -c 1024 1024 IMG_6020.PNG --out /tmp/avatar_square.png
sips -z 174 174 /tmp/avatar_square.png --out public/avatar.png
```

### 6. Capsules — `src/features/feature-about/components/SectionScrollThird/SectionScrollThird.tsx`

Implemented: four existing `heroText` strings updated plus two new capsule
panels (05 AI, 06 Testing), driven only by `InfiniteCapsuleScroll` props:

- 01 CSS (`bg-secondary-green`): `SCSS - Chakra UI - Tailwind - Styled Components - Material UI - GSAP - `
- 02 JS (`bg-background-yellow`): `JavaScript - TypeScript - ReactJS - NextJS - Vite - Astro - AlpineJS - `
- 03 Backend (`bg-secondary-blueHover`): `Golang - AWS Lambda - Python - REST API - PostgreSQL - MySQL - Redis - `
- 04 Others (`bg-background-pink`): `Storybook - Chromatic - Mixpanel - Shopify - Sanity CMS - Git - GitHub - `
- 05 AI (`bg-primary-darkBlue`): `Pi - Claude Code - Codex - DeepSeek - Claude Sonnet - AI Agents - AI Workflows - `
- 06 Testing (`bg-background-lightBlue`): `Jest - Vitest - React Testing Library - Playwright - TDD - GitHub Actions - CircleCI - Crafting Sandbox - Cloudflare - Sentry - `

Layout math for 6 panels: section `w-[350vw]` → `w-[460vw]`, pan
`translateX -150vw` → `-270vw`, trigger `end '+=350% bottom'` →
`'+=600% bottom'`. Panel scale logic already handles arbitrary counts.

### 7. About copy — `src/features/feature-about/components/SectionScrollFirst/SectionScrollFirst.tsx`

The panel text is currently 609 characters. Proposed replacement is 607
characters (same visual block), CV-accurate, keeps the closing sentence:

> My name is Umanga Bhattarai, a software engineer based in Kathmandu, Nepal,
> specializing in React.js, TypeScript, Next.js, and AWS serverless. I focus on
> scalable frontend architecture, seamless animations, design systems, and
> AI-assisted workflows. From SOC 2-compliant platforms to automated CI/CD, I
> build maintainable products that ship with confidence. Outside of work, I
> enjoy football, cycling, and traveling, which inspire my creativity and drive
> for continuous improvement. My goal is to blend technical excellence with
> user-centric design, crafting digital experiences that stand the test of time.

## Verification Plan

1. `pnpm check-lint` (ESLint + Prettier plugin) — ✅ passed.
2. `pnpm exec tsc --noEmit` — ✅ passed.
3. `pnpm check-format` — ✅ all touched/new files pass (9 pre-existing
   unrelated files were already failing before this change).
4. `pnpm build` with `NEXT_PUBLIC_PATH_PREFIX=/portfolio` — ✅ static export
   emitted 11 pages, including `/project/diversio` and `/project/optimo-teams`.
5. Generated output checks: `/project` renders 6 cards with the two new SVGs;
   both detail pages contain their new copy and background classes; `/about`
   contains the Diversio row, new copy, and the AI/Testing capsules; avatar
   asset is 174×174.
6. Remaining: `pnpm dev` visual QA in a browser (scattered-card pointer
   reachability, capsule scroll speed, `OPTIMO TEAMS` title wrapping) before
   shipping.
7. No commit/push until explicitly authorized.

## Revision 2 Verification

- `pnpm check-lint` ✅ · `pnpm exec tsc --noEmit` ✅ · `pnpm build` ✅ (11 pages).
- Generated CSS contains all scattered position classes (`left-[3%]` …
  `top-[76%]`), the `180vw`/`240vh` canvas sizes, and the hover-pause variant.
- `/about` output carries the new copy and per-capsule durations
  (36–64 s), and `Software Dev.` for Diversio.

## Revision 2 — feedback round

Five adjustments applied after the first implementation:

1. **Avatar is circular again.** `public/avatar.png` is now a 174×174 circular
   crop (transparent corners) of the `IMG_6020.PNG` square crop, matching the
   previous baked-circle avatar asset. No markup change; display stays 173×173.
2. **Projects page scattered + pointer pan recalibrated.**
   `FeatureProject.tsx` no longer renders 3 aligned rows. All 6 cards are
   absolutely positioned on a compact `140vw × 210vh` canvas, newest-first and
   snapped onto the brick lattice — columns `8/27/46/65`, rows `5/37/69`.
   Pairings follow the project order: diversio `27/5` + optimo-teams `65/5`,
   skyleap `8/37` + tigg `46/37`, xuno `27/69` + space `65/69`. The set reads
   as a tidy, intentional scatter rather than a grid, staircase, or ring. The
   pointer mapping is normalized to the full canvas: pointer top-left shows the
   canvas origin, pointer bottom-right shows the canvas end (with the 88 px
   header offset compensated), so every card is reachable from any pointer
   position.
3. **About copy refocused on the person.** The “Know a little more about me”
   panel now leads with “software engineer … TypeScript and Golang” instead of
   Diversio/SOC 2 highlights. 624 chars vs the original 609.
4. **Capsule marquee speed.** `InfiniteCapsuleScroll` now derives a per-capsule
   `animationDuration` from text length (`max(25, length × 0.5)` seconds), so
   longer skill lists don’t scroll faster. The pre-existing no-op
   `group-hover:pause` was replaced with a working
   `group-hover:[animation-play-state:paused]`, so hovering pauses the marquee
   for reading.
5. **Diversio experience role** reads `Software Dev.` to match the other rows.

## Decision Log (round 1)

1. Grid row arrangement: 3 rows × 2 cards — chosen (later replaced by the
   scattered canvas in Revision 2).
2. Capsules: update 4 existing + add 05 AI + 06 Testing/CI — chosen.
3. Official brand assets from diversio.com — approved for now.
4. Project order: newest first (Diversio, Optimo Teams, Skyleap, Tigg, Xuno,
   Space) — chosen.
