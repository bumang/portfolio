import { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

import { useMyContext } from '@/context';

export const SectionSixth = () => {
  const { mousePosition } = useMyContext();
  const email = 'umangabhattarai11@gmail.com';

  const emailRef = useRef<HTMLDivElement[]>([]);
  const originalRectsRef = useRef<DOMRect[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const maxYOffset = 120;
  const scale = 1;
  const margin = 5;

  // Capture letter positions on mount
  useEffect(() => {
    if (emailRef.current.length > 0) {
      originalRectsRef.current = emailRef.current
        .map((letter) => letter?.getBoundingClientRect() || null)
        .filter(Boolean);
    }
  }, [emailRef.current.length]);

  // Animate letters based on the mouse position
  const handleMouseMove = useCallback(() => {
    if (!mousePosition || originalRectsRef.current.length === 0) return;

    const { x: mouseX, y: mouseY } = mousePosition;

    emailRef.current.forEach((letter, index) => {
      const rect = originalRectsRef.current[index];

      // Ensure rect is valid
      if (!rect) return;

      // Calculate margins for detecting the mouse position
      const modifiedTop = rect.top - margin;
      const modifiedBottom = rect.bottom + margin;

      // Check if the mouse is over this letter
      const isMouseOverLetter =
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= modifiedTop &&
        mouseY <= modifiedBottom;

      if (isMouseOverLetter) {
        // Animate the hovered letter
        gsap.to(letter, {
          duration: 0.4,
          transform: `translate3d(0px, -${maxYOffset}px, 0px)`,
          ease: 'power1.out',
        });

        // Adjust the range of letters to be animated, ensuring no overflow
        const start = Math.max(index - 10, 0); // Ensure we don't go before the first letter
        const end = Math.min(index + 10, emailRef.current.length - 1); // Ensure we don't go beyond the last letter

        // Animate neighbors within a valid range
        for (let neighborIndex = start; neighborIndex <= end; neighborIndex += 1) {
          const neighborLetter = emailRef.current[neighborIndex];
          const yOffset = maxYOffset * (scale * (1 - Math.abs(neighborIndex - index) / 10));

          gsap.to(neighborLetter, {
            transform: `translate3d(0px, -${yOffset}px, 0px)`,
            duration: 0.4,
            ease: 'power1.out',
          });
        }
      }
    });
  }, [mousePosition]);

  // Reset the letters when the mouse leaves the container
  const handleMouseLeave = useCallback(() => {
    if (!emailRef.current.length) return;

    gsap.to(emailRef.current, {
      transform: 'translate3d(0px, 0px, 0px)',
      duration: 0.4,
      ease: 'power1.out',
    });
  }, []);

  // Attach event listeners to the container for mousemove and mouseleave
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div className="min-h-screen w-screen bg-text-default">
      <div className="mx-auto flex h-full w-[90%] flex-col items-center justify-end text-black">
        <div className="flex flex-1 flex-col justify-center gap-s12">
          <div className="text-center text-s20 font-light leading-[21.5px]">
            Click on my email below to contact me
          </div>
          <Link
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <div ref={containerRef} className="relative flex h-[230.5px] flex-row">
              {email.split('').map((letter, index) => (
                <div
                  key={`${index + 1}`}
                  ref={(ref) => {
                    if (ref) {
                      emailRef.current[index] = ref;
                    }
                  }}
                  className="font-trial text-[175px] uppercase leading-[175.5px] text-primary-lightBlue"
                  style={{ transform: 'translate3d(0px, 0px, 0px)' }}
                >
                  {letter}
                </div>
              ))}
            </div>
          </Link>
        </div>
        <div className="flex w-full justify-between py-s16 text-s20 font-light leading-[24px]">
          <div className="flex flex-col">
            <span>Kathmandu </span>
            <span>Nepal</span>
          </div>
          <div className="flex flex-col">
            <span>available now </span>
            <span>for projects</span>
          </div>
          <div className="flex flex-col">
            <span>Portfolio </span>
            <span>&copy; 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};
