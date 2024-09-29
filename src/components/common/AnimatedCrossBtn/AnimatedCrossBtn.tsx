import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import Cross from '@/assests/icons/cross-btn.svg';
import Button from '@/components/ui/Button';

interface AnimatedCrossBtnProps {
  handleClick: () => void;
}

export const AnimatedCrossBtn = ({ handleClick }: AnimatedCrossBtnProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const button = buttonRef.current;
      const poly = button && button.querySelector('#arrowPath');

      const toArrow = () => {
        gsap.to(poly, {
          attr: {
            points: `
            24.8 11.9 0.1 36.6 11.1 47.7 28.2 30.8 28.2 71.9 35.9 71.9 43.8 71.9 43.8 30.8 60.7 47.8 71.8 36.8
            46.9 11.9 46.9 11.9 35.9 0.8 35.9 0.8 35.9 0.8 24.8 11.9
          `, // Points for the final arrow shape
          },
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const toCross = () => {
        gsap.to(poly, {
          attr: {
            points: `
            24.7 36.1 0 60.8 11 71.9 28.1 54.7 28.1 54.7 35.8 47.1 43.7 55 43.7 55 60.7 72 
            71.7 61 46.8 36.1 71.1 11.8 60.1 0.7 35.8 25 11.6 0.9 0.6 11.9
          `, // Points for the initial cross shape
          },
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      if (button) {
        button.addEventListener('mouseenter', toArrow);
        button.addEventListener('mouseleave', toCross);
      }

      return () => {
        if (button) {
          button.removeEventListener('mouseenter', toArrow);
          button.removeEventListener('mouseleave', toCross);
        }
      };
    },
    { scope: buttonRef }
  );

  return (
    <Button
      className="h-[62px] rounded-full border-[1px] p-[16px]"
      ref={buttonRef}
      size={62}
      type="submit"
      onClick={handleClick}
      variant="unstyled"
      aria-label="go to project page"
    >
      <Cross />
    </Button>
  );
};
