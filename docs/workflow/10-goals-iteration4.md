# Iteration 4 — Dynamic Workflow Goals (user-specified)

> Same orchestrated sub-agent workflow as iterations 1–3 (roles: analyzer →
> researcher → planner → implementer → tester → optimizer → reviewer). The
> user asked to **analyze first**, then research, then plan, then implement.

## Goals

1. **About page text entry animation is too slow** — match it to the homepage
   entrance/exit timing (homepage is the accepted reference).
2. **Experience section is broken** — "the text in that section are pushed
   above; we want how it was previously." Restore the previous desktop layout
   exactly.
3. **Moon rework** — the moon animation is heavy on browser resources and the
   image is wrong for the intended effect:
   - the moon image is cut on the top;
   - it currently reads as rotating on the x-axis; the user wants it to rotate
     **on the y-axis** (around its vertical axis) while **staying in place**;
   - requires **web research** on the correct technique + the optimized
     (compositor-friendly) way to animate it.
4. **Menu divider becomes a guitar string** — the divider line between menu
   items should animate like a suspended guitar string: hovering near it pulls
   (stretches) it toward the cursor, up or down; on release it springs back to
   its resting position with a string-like wobble. May require a new SVG.

## Definition of Done (inherited from iteration 1)

- `pnpm check-lint` and `npx tsc --noEmit` pass.
- `pnpm build` succeeds (static export for GitHub Pages).
- Desktop behavior unchanged except the intended changes; mobile verified at
  375px.
- Only transform/opacity animated in loops; no 5MB+ assets.
