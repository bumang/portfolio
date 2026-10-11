# 18 — Iteration 4, Round 3 (user-verified issues + fixes)

## User feedback

1. "The divider should be a separate component, then isolate it to animate it."
2. Moon: "the images should be infinite — right after a certain time it becomes
   a black sphere — and it is cut off at the top, which looks weird."

## Findings and fixes

### 1. Divider component

`GuitarString` was already a standalone component owning all of its animation
(self-contained `useGSAP` + `quickTo`; `MenuList` only passes a hover
boolean). To make the separation explicit it now lives in its own component
folder, matching the project convention:

- `MenuDrawer/component/MenuList/GuitarString/index.tsx` (was a flat file next
  to `MenuList/index.tsx`). The import specifier (`./GuitarString`) is
  unchanged.
- Animation isolation kept: the pull/pluck/quickTo logic never leaves the
  component; the only outside signal is `onHoverChange` so the marquee can
  freeze while a string is held.

Note: moving the file required a clean dev restart — Next's dev module cache
kept the old `GuitarString.tsx` path and served a 500 until `.next` was
cleared.

### 2a. Moon "black sphere" after a while

Root cause: the texture track animated `yPercent 0 → +50`, i.e. the track
moved **down** away from the fixed circular window. While it moved the window
gradually uncovered empty space, and by the end of one 60s cycle the visible
half was empty — the menu's black background showing through = "black sphere".

Fix: the track now starts one copy above the window and slides to zero
(`yPercent -50 → 0`). The window is covered for the whole cycle by
construction (track top ≤ 0 and track bottom ≥ window height at all times).
Verified over a full 66s cycle:

- track y samples: −1275 … −82, wrapping to −1275 at 60s (expected range
  [−1300, 0]) — never outside;
- `windowAlwaysCovered: true` for every sample;
- post-cycle screenshot pixel in the moon area = `srgb(118,116,119)` (a mid-
  gray surface, not black).

### 2b. Moon "cut off at the top"

Root cause: the clipping container was exactly `h-[40vh]` — the moon disc top
landed on its boundary and, more visibly, the glow (which extends ~7vh above
the disc's top edge) was sliced flat at the container's top edge.

Fix: the container is now `h-[48vh]` while the disc keeps its 40vh visible
band — the extra 8vh is headroom for the glow. Geometry:

- container top 423px, glow top 435px → glow fully inside (`glowNotClipped:
true`);
- disc top 488px → visible band still exactly **40.0vh**;
- screenshot shows the glow ring above the disc top (`srgb(56,59,53)`) fading
  into the black background — no flat cut.

Also softened the extreme limb darkening (0.97 → 0.88 at the rim) so the
silhouette no longer fades to solid black right where the glow starts.

## Gates

`tsc --noEmit`, `eslint`/`prettier`, `next build` (11/11) — green. Divider
re-verified with real cursor events after the component move: 907×64 band,
pull peaks at cursor x, drift frozen while held (0 px/s), resumes at
54.7px/s, settles to exact rest.
