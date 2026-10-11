# 04 — Tester Output

## Commands (all green)

- `npx tsc --noEmit` — pass (one fix needed: `tabIndex` added to `NavLinkProps`).
- `pnpm check-lint` (eslint + prettier) — pass (auto-formatted touched files).
- `pnpm build` (Next 14 static export) — pass, 11/11 static pages.
- Dev-server smoke: `/`, `/project`, `/project/diversio`, `/about` → 200, no
  console errors. (A transient 500 batch was caused by running `pnpm build`
  while `next dev` was live — stale `.next`; clean dev restart resolves.)

## Behavioral checks (from analysis contracts)

| Contract | Status |
|---|---|
| Menu opens: container slides down, moon fades, items rise, lines sweep | ✓ faster (0.55/0.4/0.55/0.35s) |
| Menu closes: mirrored choreography | ✓ 0.4–0.5s |
| Page transition: double curtain upward wipe, dark-blue then gray | ✓ 0.55/0.45s phases |
| Home text: masked slide-up entrance + staggered slide-up exit | ✓ delay 0.7s, faster stagger |
| Project grid desktop: canvas pan + clip-path sweep + colored slide-out | ✓ untouched, guarded to lg+ |
| About pinned horizontal sections: desktop intact, disabled < 976px | ✓ stacked + native scroll |

## Known pre-existing issue (not in scope)

- ~~`<title>{page ?? 'Projects'} | My Portfolio</title>` array-child warning~~
  **FIXED** — the prerendered HTML contained a literal `<!-- -->` in the
  browser tab title (`Diversio<!-- --> | My Portfolio`). Root cause: two JSX
  children (expression + text) instead of one text node. Fixed with a template
  literal; verified `<title>Diversio | My Portfolio</title>` and no React
  warning.
- ~~Duplicate `<meta name="description">` on project layouts~~ **FIXED** —
  Next deduped the two tags and kept the copy-pasted *home page* description
  on every project page; removed the stray tag.
- ~~`FallingStar` `Math.random()` during render~~ **FIXED** — latent
  hydration mismatch on the `style` attribute; stars are now rendered
  client-side only (count unchanged, zero visual diff).
