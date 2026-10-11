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
        'flex h-[38vh] w-[90%] flex-col justify-between overflow-hidden rounded-[20vw] border text-xs font-normal opacity-0 lg:h-[35vw] lg:w-[60vw] lg:rounded-[50vw]',
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
          className="animate-loopL text-[clamp(100px,34vw,260px)] leading-[0.95] group-hover:[animation-play-state:paused] lg:leading-[244px]"
          style={{ animationDuration }}
        >
          {heroText}
        </span>
        <span
          className="animate-loopL text-[clamp(100px,34vw,260px)] leading-[0.95] group-hover:[animation-play-state:paused] lg:leading-[244px]"
          style={{ animationDuration }}
        >
          {heroText}
        </span>
      </div>
    </div>
  );
};
