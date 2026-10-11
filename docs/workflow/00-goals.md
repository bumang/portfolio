# Dynamic Workflow — Portfolio Polish Pass

> Orchestrated as sequential sub-agent roles: researcher → planner → analyzer →
> implementer → tester → optimizer → reviewer. Each role writes its artifact here.
> Skills installed for this project: `graphify` (codebase knowledge graph,
> `.agents/skills/graphify`) and `ponytail` (lazy-senior minimal-change discipline,
> `.agents/skills/ponytail` + audit/debt/gain/help/review companions).

## Goals

1. **Font consistency across browsers.** Same fonts, same weights, same rendering
   everywhere. No local-font or synthetic-weight divergence.
2. **Mobile responsiveness.** Project page (and other pages) usable on small
   screens. Desktop scroll-driven/animation experiences must be analyzed first,
   then adapted (not blindly resized) for mobile.
3. **60fps, faster animations — behavior preserved.**
   - Home page text entrance/exit animation
   - Page-transition exit animation
   - Main menu open/close animation
   Rule: note the current behavior first, then only improve speed/smoothness.
4. **Complete the main menu.**
   - Menu item list: smooth, seamless infinite vertical scroll (repeats itself).
   - Moon: stays in place, rotates (creates "flying over the moon" feel),
     moves inwards (toward the viewer), with a subtle glow on its circumference.

## Definition of Done

- `pnpm check-lint` and `tsc --noEmit` pass.
- `pnpm build` succeeds (static export used for GH Pages).
- Desktop behavior unchanged; mobile verified at 375px.
- Only transform/opacity animated in loops and transitions (60fps).
