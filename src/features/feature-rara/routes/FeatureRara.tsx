import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import VisitSiteIcon from '@/assests/icons/visit-site.svg';
import { AnimatedCrossBtn } from '@/components';
import { useTransitionContext } from '@/context';

export const FeatureRara = () => {
  const router = useRouter();
  const { timeline } = useTransitionContext();
  const raraContainer = useRef<HTMLDivElement>(null);

  const handleNavigation = () => {
    router.push('/project');
  };

  useGSAP(
    () => {
      gsap.set('.rara-word', {
        transform: 'translate(0px, 100%)',
        visibility: 'hidden',
      });

      gsap.to('.rara-word', {
        autoAlpha: 1,
        visibility: 'visible',
        transform: 'translate(0px, 0%)',
        delay: 1.2,
        stagger: {
          each: 0.05,
        },
        ease: 'power2.out',
        duration: 0.5,
      });

      timeline.add(
        gsap.to('.rara-word', {
          autoAlpha: 1,
          visibility: 'visible',
          transform: 'translate(0px, -100%)',
          stagger: {
            each: 0.05,
          },
          ease: 'power2.out',
          duration: 0.5,
        })
      );
    },
    { scope: raraContainer }
  );

  return (
    <div className="relative flex h-full w-full">
      <div className="absolute left-[calc(50%-32px)] top-[-62px] z-[55] transform transition-transform duration-300 ease-in-out">
        <AnimatedCrossBtn handleClick={handleNavigation} />
      </div>
      <div className="my-auto flex h-[370px] w-[50%] px-[60px]">
        <Image
          alt="rara"
          width={500}
          height={500}
          priority
          style={{ width: 'auto', height: 'auto' }}
          src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/rara_detail.png`}
        />
      </div>
      <div ref={raraContainer} className="flex h-full w-[50%] flex-col justify-evenly px-[60px]">
        <div className="relative h-fit overflow-y-hidden font-trial text-[240px] font-bold leading-[220px] text-secondary-lightGray">
          <div className="rara-word">SPACE</div>
        </div>
        <div className="relative h-fit overflow-y-hidden">
          <div className="rara-word font-inter text-[24px] font-normal leading-[42px] text-primary-darkBlue">
            Rara Space is a comprehensive software that provides a range of features designed to
            streamline and optimize business operations.
          </div>
        </div>
        <div className="flex items-center gap-s4 text-black hover:cursor-pointer hover:text-secondary-blueHover">
          <div className="font-inter text-[28px] font-normal leading-[42px]">Visit Website</div>
          <div>
            <VisitSiteIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
