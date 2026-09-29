# Frontend Skill Digest — Operating Contract

## Purpose

This folder holds the repo-local frontend digest for `my_portfolio` (Umanga
Bhattarai's personal portfolio site). `project-digest.md` is the authoritative
fingerprint of the repo; this `AGENTS.md` is the operating contract that
governs how frontend lanes consume that fingerprint.

Create or refresh both files only through the frontend skill's
`refresh-digest` lane (the marketplace `/frontend:refresh-digest` command).
Other commands must use ephemeral inline detection when the digest is missing
or stale, and must not write digest files.

## Authoritative File

- `project-digest.md` — single source of truth for repo detection results
  (classification, tooling, framework, styling, data, testing, CI/CD, freshness).
- `AGENTS.md` (this file) — governs trust, freshness, and re-check rules.

## When to Refresh

Refresh the digest when any of these change:

- `pnpm-lock.yaml` / `package.json` (dependency or script changes)
- Primary framework or rendering model (Next.js version, pages vs app router,
  static export settings in `next.config.mjs`)
- Workspace layout (new packages, monorepo conversion)
- Tailwind/design-token changes in `tailwind.config.ts`
- Test tooling adoption (none exists today)
- Analytics / observability tool addition (none exists today)
- CI provider, deploy target, or branch model changes
  (`.github/workflows/nextjs.yml`, default branch)
- Any signal listed in the Freshness section of `project-digest.md`

## Trust and Re-check Rules

Trust without re-checking:

- Repo classification (`frontend-app`, single package)
- Package manager (`pnpm`, lockfile v9)
- Framework (Next.js 14.2.4, Pages Router, static export)
- Source layout (`src/pages`, `src/features`, `src/layouts`)
- Styling approach (Tailwind + custom tokens, SVGR)

Verify at runtime when staleness is possible:

- Install / lint / type-check / build commands and their current behavior
- CI provider and deploy branch (`main` → GitHub Pages)
- Branch model (working branch may not be `main`)
- Asset conventions under `public/` (new project images are added there)
- Whether a test stack has been introduced

Never silently override digest values. If a lane detects a mismatch, note the
discrepancy and recommend a refresh.
