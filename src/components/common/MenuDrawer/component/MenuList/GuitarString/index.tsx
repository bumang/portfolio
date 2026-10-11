import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface GuitarStringProps {
  /** Disabled on the aria-hidden marquee clone (halves listeners). */
  interactive?: boolean;
  /** Lets the menu freeze the marquee drift while a string is held. */
  onHoverChange?: (hovering: boolean) => void;
}

// Divider drawn as a suspended guitar string. Hovering near it pulls the
// string toward the cursor — up or down, peaking at the cursor's x — and the
// menu drift pauses so the pull can be held; stretching it to the limit (or
// leaving) releases it: it springs back with a decaying wobble (elastic ease
// = damped oscillation). The SVG keeps the `line` class so the menu
// open/close sweep (translateX) still applies, and uses currentColor for the
// hover tint. Mouse-only: a touch drag must keep driving the marquee.
const MAX_BEND = 18; // max midpoint displacement, px (1 viewBox unit = 1px)
const STRING_Y = 32; // string rest y in the 64-unit-tall viewBox

export const GuitarString = ({ interactive = true, onHoverChange }: GuitarStringProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      const path = pathRef.current;
      if (!svg || !path || !interactive) {
        return undefined;
      }

      const state = { bend: 0, x: 50 };
      const render = () => {
        // A pulled string forms a V peaking at the cursor.
        path.setAttribute(
          'd',
          `M 0 ${STRING_Y} L ${state.x} ${STRING_Y + state.bend} L 100 ${STRING_Y}`
        );
      };
      // quickTo: the optimized way to pipe a cursor-following value (GSAP docs).
      const bendTo = gsap.quickTo(state, 'bend', {
        duration: 0.25,
        ease: 'power2.out',
        onUpdate: render,
      });

      const pluck = () => {
        gsap.killTweensOf(state);
        if (state.bend === 0) return;
        gsap.to(state, {
          bend: 0,
          duration: 1.1,
          ease: 'elastic.out(0.7, 0.3)',
          onUpdate: render,
        });
      };

      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        const rect = svg.getBoundingClientRect();
        state.x = gsap.utils.clamp(3, 97, ((e.clientX - rect.left) / rect.width) * 100);
        const dy = e.clientY - (rect.top + rect.height / 2); // + = below the string
        const bend = gsap.utils.clamp(-MAX_BEND, MAX_BEND, dy * 0.8);
        if (Math.abs(bend) >= MAX_BEND) {
          // Stretched past its limit: let go — the string snaps back.
          pluck();
        } else {
          bendTo(bend);
        }
      };
      const onPointerEnter = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        onHoverChange?.(true);
      };
      const onPointerLeave = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        onHoverChange?.(false);
        pluck();
      };

      svg.addEventListener('pointerenter', onPointerEnter);
      svg.addEventListener('pointermove', onPointerMove);
      svg.addEventListener('pointerleave', onPointerLeave);
      return () => {
        svg.removeEventListener('pointerenter', onPointerEnter);
        svg.removeEventListener('pointermove', onPointerMove);
        svg.removeEventListener('pointerleave', onPointerLeave);
      };
    },
    { dependencies: [interactive], scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      className="line block h-s64 w-full select-none text-text-default group-hover:text-primary-lightGray"
      viewBox="0 0 100 64"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {interactive && <rect x="0" y="0" width="100" height="64" fill="transparent" />}
      <path
        ref={pathRef}
        d={`M 0 ${STRING_Y} L 50 ${STRING_Y} L 100 ${STRING_Y}`}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};
