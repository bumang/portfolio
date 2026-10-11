# 17 — Iteration 4, Round 2 (user-verified issues + fixes)

## User feedback

1. "The guitar thing for the divider is not working — I don't think that is
   implemented at all."
2. "The experience section: the Header EXPERIENCE should be top-left, not
   like it is right now."
3. Moon:
   a. it looks like a flat circle — make it a **sphere**, **bigger**, shown as
   its **top half** over **~40% of the screen from the bottom**, and the
   animation should run **top→bottom** (currently left→right);
   b. the **radiating glow is not visible**.

Also: no inline `style={{}}`, no `eslint-disable` comments (addressed in the
previous round; kept that way here).

## Analyzer — why the string "didn't work at all"

Reproduced with **real CDP `Input.dispatchMouseEvent`** (the earlier test had
dispatched synthetic events straight at the SVG, bypassing hit-testing — a
flawed test). Three real defects:

1. **The marquee drift kept moving the divider out from under the cursor.**
   At 55px/s a 40px band passes a stationary cursor in <1s; the string plucked
   itself back almost immediately → "nothing happens".
2. **The bend was anchored at the fixed midpoint (x=50).** Hovering at 10% of
   the line's width produced ~3px of movement → invisible.
3. **`h-s56` did not exist** in the Tailwind spacing scale (s48 → s60), so the
   SVG fell back to its viewBox aspect ratio: a rendered hit band of
   907×**508px** instead of 907×56.

## Fixes

- `GuitarString.tsx`:
  - the string now forms a **V peaking at the cursor's x** (a pulled string is
    two straight segments, physically), so the pull is visible anywhere on the
    divider;
  - **marquee freeze while held** via `onHoverChange` — the pull can be held
    under the cursor; drift resumes on release;
  - **auto-release at the stretch limit**: pulling past ±18px lets go and the
    string snaps back (per the request "after reaching certain height it
    should leave after being stretched and goes back");
  - height fixed to the existing scale value `h-s64` / viewBox 64 (1 unit =
    1px);
  - mouse-only (`pointerType === 'mouse'`) so touch drags keep driving the
    marquee.
- `MenuList/index.tsx`: `stringHoverRef` — while a string is held the drift
  targets 0 with a fast decay; wheel/touch velocity logic unchanged.
- `SectionFourth.tsx`: heading column `items-start justify-start` → EXPERIENCES
  flush top-left (rows stay bottom-right).
- Moon:
  - disc **80vh**, positioned so its center sits on the viewport bottom edge:
    exactly the **top half visible over 40% of the screen height**;
  - texture asset re-exported **rotated 90°** (1024×2048) and the track made
    vertical (`h-[400%]`, two 1:2 copies, `yPercent 0 → 50`) → the surface
    travels **top→bottom**; seamless, 60s/revolution;
  - **glow made visible**: a bright ring (`radial-gradient` at ~85% of the
    93vh glow box, i.e. right on the disc edge) blooming outward, pulsing
    opacity 0.45 → 1;
  - **sphere look**: stronger pre-baked shading — top-left key light (0.32)
    plus limb darkening ramping to 0.93/0.97 at the rim.

## Verification (real inputs + measurement)

| check                 | result                                                                    |
| --------------------- | ------------------------------------------------------------------------- |
| string band size      | 907×64 ✓ (was 907×508)                                                    |
| pull at midpoint      | V peak x=50, bend −9.1/+14.9 ✓                                            |
| pull near edge (x=15) | V peak x=15 ✓ (visible anywhere)                                          |
| marquee while held    | 0 px/s ✓ (was drifting)                                                   |
| after release         | resumes 54.7px/s ≈ AUTO_SPEED ✓                                           |
| stretch limit         | auto-releases, settles to rest ✓                                          |
| no hover              | drift 54.98px/s ✓                                                         |
| moon visible band     | 325px = **40.0vh** (desktop + 375×667 mobile) ✓                           |
| moon direction        | **down (top→bottom)**, 21.7px/s → 60s/rev ✓                               |
| glow box              | 756px ring centred on the 650px disc ✓                                    |
| EXPERIENCES           | text top offset 0 from section top, left 72 ✓ rows still bottom-aligned ✓ |

Gates: `tsc --noEmit`, `eslint`/`prettier`, `next build` (11/11) — green.
