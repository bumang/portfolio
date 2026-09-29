import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { cn } from '@/utils/cn';

interface InfiniteCapsuleScrollProps {
  header: string;
  headerIndex: string;
  heroText: string;
  bgColor: string;
  txtColor: string;
}

export const InfiniteCapsuleScroll = ({
  header,
  headerIndex,
  heroText,
  bgColor,
  txtColor,
}: InfiniteCapsuleScrollProps) => {
  const heroInfiniteRef = useRef(null);

  // Keep the marquee at a readable pace no matter how long the skill list is.
  const animationDuration = `${Math.max(25, Math.round(heroText.length * 0.5))}s`;

  useGSAP(
    () => {
      gsap.to(heroInfiniteRef?.current, {
        opacity: 1,
        ease: 'power1.out',
      });
    },
    { scope: heroInfiniteRef }
  );

  return (
    <div
      ref={heroInfiniteRef}
      className={cn(
        'flex h-[35vw] w-[60vw] flex-col justify-between overflow-hidden rounded-[50vw] border text-xs font-normal opacity-0',
        bgColor
      )}
    >
      <div
        className={cn(
          'mx-auto my-[4%] flex w-[60%] justify-between text-[22px] leading-[30px]',
          txtColor
        )}
      >
        <div>{header}</div>
        <div>{headerIndex}</div>
      </div>
      <div
        className={cn(
          'group flex cursor-pointer items-end gap-s32 whitespace-nowrap font-trial',
          txtColor
        )}
      >
        <span
          className="animate-loopL text-[260px] leading-[244px] group-hover:[animation-play-state:paused]"
          style={{ animationDuration }}
        >
          {heroText}
        </span>
        <span
          className="animate-loopL text-[260px] leading-[244px] group-hover:[animation-play-state:paused]"
          style={{ animationDuration }}
        >
          {heroText}
        </span>
      </div>
    </div>
  );
};
