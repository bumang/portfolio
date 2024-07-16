import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import RightArrow from '@/assests/icons/right-arrow-btn.svg';
import Button from '@/components/ui/Button';

interface PageFooterProps {
  handleClick?: () => void;
}

const PageFooter = ({ handleClick }: PageFooterProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const button = buttonRef.current;
      const poly = buttonRef.current && buttonRef.current.querySelector('#arrowPath');

      const toPlus = () => {
        gsap.to(poly, {
          attr: {
            points:
              '35 34.2 0 34.2 0 49.8 35 49.8 35 85 50.6 85 50.6 49.8 85 49.8 85 41.6 85 34.2 50.6 34.2 50.6 0 35 0',
          },
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const toArrow = () => {
        gsap.to(poly, {
          attr: {
            points:
              '58.5 34.2 0 34.2 0 49.8 58.3 49.8 48.1 60.5 58.8 71 78.4 49.1 78.4 49.1 85 41.7 78.5 34.2 78.5 34.2 59.4 12.5 47.9 23.5',
          },
          duration: 0.4,
          ease: 'power2.out',
        });
      };
      if (button) {
        button.addEventListener('mouseenter', toPlus);
        button.addEventListener('mouseleave', toArrow);
      }
      return () => {
        if (button) {
          button.removeEventListener('mouseenter', toPlus);
          button.removeEventListener('mouseleave', toArrow);
        }
      };
    },
    {
      scope: buttonRef,
    }
  );

  return (
    <div className="flex min-h-full min-w-full justify-between p-[16px] lg:px-s40 lg:py-s16">
      <div className="relative h-fit overflow-y-hidden">
        <div className="word invisible flex items-center p-s12 text-s20 font-normal text-text-default">
          Web developer
        </div>
      </div>
      <div className="transform transition-transform duration-300 ease-in-out hover:scale-125">
        <Button
          className="h-[62px] rounded-full border-[1px] p-[16px]"
          ref={buttonRef}
          onClick={handleClick}
          size={62}
          type="submit"
          variant="unstyled"
          aria-label="go to project page"
        >
          <RightArrow />
        </Button>
      </div>
    </div>
  );
};

export default PageFooter;
