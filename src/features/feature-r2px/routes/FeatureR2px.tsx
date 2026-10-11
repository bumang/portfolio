import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import VisitSiteIcon from '@/assests/icons/visit-site.svg';
import { AnimatedCrossBtn } from '@/components';
import { useTransitionContext } from '@/context';

export const FeatureR2px = () => {
  const projectsList = ['Web Application'];
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
        delay: 0.7,
        stagger: {
          each: 0.04,
        },
        ease: 'power2.out',
        duration: 0.55,
      });

      gsap.set('.rara-text', {
        transform: 'translate(0px, 100%)',
        visibility: 'hidden',
      });

      gsap.to('.rara-text', {
        autoAlpha: 1,
        visibility: 'visible',
        transform: 'translate(0px, 0%)',
        delay: 0.7,
        stagger: {
          each: 0.04,
        },
        ease: 'power2.out',
        duration: 0.55,
      });

      timeline.add(
        gsap.to('.rara-word', {
          autoAlpha: 1,
          visibility: 'visible',
          transform: 'translate(0px, -100%)',
          stagger: {
            each: 0.03,
          },
          ease: 'power2.out',
          duration: 0.4,
        })
      );
      timeline.add(
        gsap.to('.rara-text', {
          autoAlpha: 1,
          visibility: 'visible',
          transform: 'translate(0px, -200%)',
          ease: 'power2.out',
          duration: 0.6,
        }),
        0.2
      );
    },
    { scope: raraContainer }
  );

  return (
    <div className="relative flex h-full w-full flex-col lg:flex-row">
      <div className="absolute left-1/2 top-s16 z-[55] -translate-x-1/2 transform transition-transform duration-300 ease-in-out lg:left-[calc(50%-32px)] lg:top-[-62px] lg:translate-x-0">
        <AnimatedCrossBtn handleClick={handleNavigation} />
      </div>
      <div className="my-auto flex w-full items-center justify-center px-s24 py-s32 lg:h-[370px] lg:w-[50%] lg:px-[60px] lg:py-0">
        <Image
          alt="rara"
          width={500}
          height={500}
          priority
          className="max-w-full object-contain"
          style={{ width: 'auto', height: 'auto' }}
          src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/xuno_detail.png`}
        />
      </div>
      <div
        ref={raraContainer}
        className="flex h-full w-full flex-col justify-around gap-s24 px-s24 py-s40 lg:w-[50%] lg:gap-0 lg:px-[60px] lg:py-0"
      >
        <div className="relative h-fit overflow-y-hidden font-trial text-[clamp(88px,24vw,220px)] font-bold leading-[0.95] text-white lg:leading-[220px]">
          <div className="rara-word">XUNO</div>
        </div>
        <div className="relative flex h-fit flex-col gap-s20 overflow-y-hidden">
          <div className="rara-word flex gap-s12">
            {projectsList.map((d, i) => (
              <div
                key={`${i + 1}`}
                className="rounded-[100px] border-[1px] border-black px-s20 py-s8 text-black"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="relative flex h-fit flex-col gap-s16 overflow-y-hidden">
            <div className="rara-word font-inter text-[20px] font-semibold leading-[28px] text-primary-darkBlue">
              Inclusive multi-sided fintech platform
            </div>
            <div className="rara-text font-inter text-[18px] font-medium leading-[28px] text-primary-darkBlue">
              R2PX (xuno) is the first and only inclusive multi-sided fintech platform that equips
              individuals, businesses, merchants, and financial institutions alike with access to a
              host of global banking and payment networks and unmatched exchange rates, speed, and
              security.
            </div>
          </div>
        </div>
        <div className="group relative flex h-fit w-fit overflow-y-hidden hover:cursor-pointer">
          <Link target="_blank" rel="noopener noreferrer" href="https://nepal.xuno.co/">
            <div className="rara-word flex items-center text-black">
              <div className="font-inter text-[16px] font-normal leading-[28px]">Visit Website</div>
              <div>
                <VisitSiteIcon />
              </div>
            </div>
            <div className="absolute bottom-0 h-s2 w-0 border-b-2 bg-black transition-all duration-300 ease-out group-hover:w-[92%]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
