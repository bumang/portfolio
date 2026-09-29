# Frontend Project Digest — my_portfolio

## Repo Classification

- `repo_kind`: `frontend-app`
- `confidence`: `high`
- Signals: single root `package.json`, Next.js Pages Router app under
  `src/pages`, feature-based UI code under `src/features`, layout wrappers in
  `src/layouts`, no workspace manifest, no internal packages, no Storybook or
  token package. Static-export personal portfolio, not a design system or
  monorepo.

## Tooling

| Concern                | Detected                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| Package manager        | `pnpm` (`pnpm-lock.yaml`, `lockfileVersion: '9.0'`, `.npmrc`)                              |
| Workspace manager      | none (single package)                                                                      |
| Install                | `pnpm install`                                                                             |
| Lint                   | `pnpm check-lint` → `eslint . --ext ts --ext tsx --ext js`; also `pnpm lint` → `next lint` |
| Type-check             | no script; `pnpm exec tsc --noEmit` (tsconfig has `noEmit: true`)                          |
| Unit / component tests | none configured                                                                            |
| E2E tests              | none configured                                                                            |
| Format                 | `pnpm check-format` (Prettier check) / `pnpm format` (write)                               |
| Build                  | `pnpm build` → `next build` with `output: 'export'` (emits `out/`)                         |
| Pre-commit             | Husky + lint-staged: `pnpm format` then `pnpm check-lint` for `*.{js,ts,jsx,tsx}`          |
| Commit policy          | commitlint (`commitlint.config.js`) extends `@commitlint/config-conventional`              |

Note: `next.config.mjs` sets `typescript.ignoreBuildErrors: true` and
`eslint.ignoreDuringBuilds: true`, so `pnpm build` does not enforce types or
lint. Run lint/type-check explicitly.

## Framework & Runtime

- Primary framework: **Next.js 14.2.4** (Pages Router, React 18)
- Rendering / packaging: **static export** (`output: 'export'`,
  `images.unoptimized: true`), deployed as static files
- Production base path: `/portfolio` (`assetPrefix` + `basePath` when
  `NODE_ENV=production`), `NEXT_PUBLIC_PATH_PREFIX=/portfolio` set in CI
- Animation: GSAP + `@gsap/react` (`useGSAP`, ScrollTrigger, ScrollToPlugin);
  `next-transpile-modules` wraps gsap
- SVG: `@svgr/webpack` turns imported `.svg` into React components
- Entry points: `src/pages/_app.tsx` (contexts + `getLayout` pattern),
  `src/pages/_document.tsx`
- Route areas: `/`, `/project`, `/project/{skyleap,tigg,space,xuno}`,
  `/about`

## Styling & Design System

- Styling solution: **Tailwind CSS 3.4** with a large custom theme in
  `tailwind.config.ts` (custom colors, `s*` spacing, `h1/h2/h3` font sizes,
  `leading-*`, animations, `loopTextLeft`/`loopTextDown` keyframes)
- Fonts: local Druk Trial woff family (`src/styles/fonts/DrukTrial`,
  `font-trial`) + Inter (`font-inter`)
- Global CSS: `src/styles/globals.css`, `src/styles/buttons.css`
- Component styling: Tailwind utility classes + occasional inline styles;
  class merging via `cn` (`src/utils/cn.ts`, clsx + tailwind-merge)
- Design system: none published or consumed; no token package. Shared visual
  language lives in Tailwind theme + `src/components/ui`.
- Asset convention: public assets in `public/` referenced with
  `${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/...`

## Data, State & API

- Data fetching: none (no React Query, SWR, axios, Redux, Zustand, Apollo)
- State: React Context only — `MyContextProvider` (`src/context/AppContext`)
  for menu/cursor/mouse/transition flags and `TransitionProvider`
  (`src/context/TransitionContext`) for the shared GSAP timeline
- API client / endpoints: none
- Content source: **hardcoded arrays and strings inside feature components**
  (e.g., the `projects` array in
  `src/features/feature-project/routes/FeatureProject.tsx`, about copy in
  `src/features/feature-about/components/*`)
- Backend: not in this repo. No OpenAPI/Swagger, Bruno/Postman collections, or
  local backend directory. `src/pages/api/hello.ts` is unused boilerplate and
  dead under static export.
- API contract sources: none. Future API-integration work must ask the user
  for a contract source or stop.

## Testing Stack

- Unit / component: none (no Jest, Vitest, React Testing Library)
- E2E: none (no Playwright/Cypress)
- No test setup files or test paths
- Verification today: lint + type-check + build + manual browser QA
- Workspace scoping: not applicable (single package)

## Analytics & Observability

- Analytics: none detected
- Observability: none detected (no Sentry, LogRocket, Datadog RUM)
- If added, bootstrap would belong near `src/pages/_app.tsx` alongside the
  existing providers

## CI/CD & Release Signals

- CI provider: **GitHub Actions** — `.github/workflows/nextjs.yml`
  (`Deploy Next.js site to Pages`)
- Deploy platform: **GitHub Pages** (`actions/upload-pages-artifact` →
  `actions/deploy-pages`), URL `https://bumang.github.io/portfolio`
- Trigger: push to `main` + manual `workflow_dispatch`
- Build in CI: `pnpm install`, `pnpm add next --save-dev`, `npx next build`
  with `NEXT_PUBLIC_PATH_PREFIX=/portfolio`
- No PR workflow, no preview/sandbox platform, no release automation
- Husky pre-commit + lint-staged are the only local quality gates

## Workflow Conventions

- Default / deploy branch: `main`; long-lived working branch: `dev`; feature
  branches follow `feat/<name>` (see `feat/about`, `feat/project`, `feat/homePage`)
- PR flow: feature branch → `dev` → `main` (history shows merge PRs into `dev`)
- Commit style: Conventional Commits (`fix:`, `feat:`, ...)
- Docs / planning folders: this digest is the first `docs/` content; no
  existing plan folder
- Import conventions: `@/*` path alias → `src/*`, group-sorted imports
  (simple-import-sort), arrow-function components (ESLint airbnb-typescript +
  Prettier)
- Page conventions: each page sets `Component.getLayout` with a layout
  wrapper (`ProjectsPageLayout`, `ProjectPageLayout`, `AboutPageLayout`)
- Feature conventions: `src/features/feature-<name>/` with `routes/index.ts`
  and feature `index.ts` barrel exports

## Skill Applicability Map

| Lane          | Status         | Notes                                                                 |
| ------------- | -------------- | --------------------------------------------------------------------- |
| review        | `applies`      | Plain TypeScript/React diff review is meaningful; no tests to gate on |
| api           | `out_of_scope` | No API layer, client, or contract in this repo                        |
| testing       | `out_of_scope` | No test harness exists; adding one would be a separate decision       |
| analytics     | `out_of_scope` | No analytics tool installed; adding one is out of current scope       |
| observability | `out_of_scope` | No monitoring tool installed                                          |
| cicd          | `applies`      | GitHub Actions + Pages deploy; no preview envs                        |
| planning      | `applies`      | Feature-folder conventions and static content model are clear         |
| commit        | `applies`      | Husky + lint-staged + commitlint; atomic conventional commits         |
| new-branch    | `applies`      | `feat/<name>` off `dev` (or repo's current working branch)            |
| create-pr     | `applies`      | Target `dev`; no PR template in repo                                  |

## Freshness

- Generated: `2026-09-29T15:31:27+0545`
- Generated from commit: `99a7521e346592011f0b2a830a910872b0c6e8eb` (branch `dev`)
- Files inspected and their sha256 (first 16 chars):

| File                           | sha256-16          | mtime      |
| ------------------------------ | ------------------ | ---------- |
| `package.json`                 | `4cbac285e9417e9d` | 2024-07-24 |
| `pnpm-lock.yaml`               | `bd18d0d10dd76885` | 2024-07-24 |
| `next.config.mjs`              | `b12f838217fb6e5b` | 2024-07-26 |
| `tailwind.config.ts`           | `a6b400f950e13edd` | 2024-09-29 |
| `tsconfig.json`                | `77d62b3ca93999d5` | 2024-09-28 |
| `.github/workflows/nextjs.yml` | `ab1b7dac299dd58b` | 2024-07-08 |
| `.eslintrc.json`               | `a59d24a7b793bd6f` | 2024-07-24 |
| `.prettierrc`                  | `fee28533882826c3` | 2024-07-06 |
| `commitlint.config.js`         | `cb4c027aa3fce115` | 2024-07-06 |
| `.husky/pre-commit`            | `55cf495302d82e87` | 2024-07-24 |

- Source structure inspected: `src/pages`, `src/features/feature-*`,
  `src/layouts`, `src/components`, `src/context`, `src/styles`, `public/`
- Refresh triggers: see `AGENTS.md` (lockfile, framework, Tailwind theme, test
  stack, analytics/observability, CI/branch model)

## Open Questions

- No test or E2E stack exists. Lanes must not assume one; verification is
  lint + `tsc --noEmit` + build + manual browser checks unless the user
  chooses to add tooling.
- The site content is entirely hardcoded. Any "content update" is a source
  edit inside a feature component, not a CMS/API change.
- New project work (Diversio / Optimo Teams) assets now live in `public/`:
  `diversio.svg` + `optimo-teams.svg` (500×340 brand cards) and
  `diversio_detail.png` + `optimo_detail.png` (~778 px wide). Sourced from
  official diversio.com brand assets; swap with the user's own artwork if
  provided.
- The avatar image `public/avatar.png` is a circular headshot rendered at
  173×173 in `SectionScrollFirst`; replacements must be pre-cropped to a
  circle/square to avoid distortion under `images.unoptimized` (current file is
  a 174×174 circular crop of `IMG_6020.PNG` with transparent corners).
