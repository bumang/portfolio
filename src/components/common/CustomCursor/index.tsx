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
          const { clientX, clientY } = event;

          setMousePosition({ x: clientX, y: clientY });

          gsap.to(cursorRef.current, {
            duration: 0.3,
            ease: 'power3.out',
            x: clientX - cursorRef.current.offsetWidth / 2, // Center the cursor
            y: clientY - cursorRef.current.offsetHeight / 2, // Center the cursor
            force3D: true, // Better 3D rendering performance
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
      className="cursor z-[99] h-s16 w-s16 rounded-full border-2 border-solid border-white bg-white"
      ref={cursorRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        transform: 'translate3d(0, 0, 0)',
      }}
    />
  );
};
