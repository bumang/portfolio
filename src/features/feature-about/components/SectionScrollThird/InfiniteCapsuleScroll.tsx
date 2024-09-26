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
        <span className="group-hover:pause animate-loopL text-[260px] leading-[244px]">
          {heroText}
        </span>
        <span className="group-hover:pause animate-loopL text-[260px] leading-[244px]">
          {heroText}
        </span>
      </div>
    </div>
  );
};
