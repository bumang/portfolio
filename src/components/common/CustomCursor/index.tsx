// components/CustomCursor.tsx

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { useMyContext } from '@/context';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { setMousePosition } = useMyContext();

  useGSAP(
    () => {
      const moveCursor = (event: MouseEvent) => {
        if (cursorRef.current) {
          setMousePosition({ x: event.clientX - 8, y: event.clientY - 420 });
          gsap.to(cursorRef.current, {
            duration: 0.3,
            ease: 'power3.out',
            x: event.clientX - 8,
            y: event.clientY - 840,
            force3D: true, // Ensure 3D rendering
          });
        }
      };

      document.addEventListener('mousemove', moveCursor);

      return () => {
        document.removeEventListener('mousemove', moveCursor);
      };
    },
    {
      scope: cursorRef,
    }
  );

  return (
    <div
      className="cursor z-[99] h-s16 w-s16 rounded-full border-2 border-solid bg-background-white"
      ref={cursorRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        transform: 'translate3d(mousePosition.x, mousePosition.y, 0)',
      }}
    />
  );
};
