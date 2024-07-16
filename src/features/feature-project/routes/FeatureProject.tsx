import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useMyContext, useTransitionContext } from '@/context';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const FeatureProject = () => {
  const { timeline } = useTransitionContext();
  const { mousePosition } = useMyContext();

  const projectPageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set('.word', {
      transform: 'translate(0px, 100%)',
      visibility: 'hidden',
    });
    gsap.set('.projectImageContainer', {
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      opacity: 0,
    });

    gsap.to('.projectImageContainer', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      opacity: 1,
      delay: 1.2,
      duration: 1,
      ease: 'power2.out',
    });
    gsap.to('.word', {
      autoAlpha: 1,
      visibility: 'visible',
      transform: 'translate(0px, 0%)',
      delay: 1.2,
      stagger: {
        each: 0.05,
      },
      duration: 0.5,
    });

    timeline.add(
      gsap.to('.projectImageContainer', {
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        opacity: 1,
        duration: 0.8,
        ease: 'power2.in',
      }),
      0
    );

    timeline.add(
      gsap.to('.word', {
        autoAlpha: 1,
        visibility: 'visible',
        transform: 'translate(0px, -100%)',
        stagger: {
          each: 0.05,
        },
        duration: 0.5,
      }),
      0
    );
  }, {});

  useEffect(() => {
    const handleMouseMove = () => {
      if (!projectPageRef.current) return;
      const moveX = -mousePosition.x;
      const moveY = -mousePosition.y;

      gsap.to(projectPageRef.current, {
        duration: 1,
        x: moveX,
        y: moveY,
        ease: 'power2.out',
        force3D: true,
      });
    };

    // Add event listener when mounted
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener when unmounted
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <div
      ref={projectPageRef}
      className="relative flex h-[130vh] w-[130vw] items-center justify-center"
    >
      <div className="absolute left-[20%] top-[40%] flex-nowrap font-trial text-h1 font-heavy leading-bold tracking-[1rem] text-text-off-white/10">
        SELECT PROJECT
      </div>
      <div className="flex h-[90%] min-w-[90%] flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex flex-col gap-s16">
            <div className="projectImageContainer cursor-pointer overflow-hidden">
              <Image
                alt="rara-space"
                width={500}
                height={500}
                priority
                style={{ width: 'auto', height: 'auto' }}
                src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/rara_space.svg`}
              />
            </div>
            <div className="relative overflow-y-hidden">
              <div className="word invisible font-trial text-h2 font-heavy leading-medium text-text-default">
                RARA SPACE
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-s16">
            <div className="projectImageContainer cursor-pointer">
              <Image
                alt="tigg"
                width={500}
                height={500}
                priority
                style={{ width: 'auto', height: 'auto' }}
                src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/tigg.svg`}
              />
            </div>

            <div className="relative h-full overflow-y-hidden">
              <div className="word invisible font-trial text-h2 font-heavy leading-medium text-text-default">
                TIGG
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-s16">
            <div className="projectImageContainer cursor-pointer">
              <Image
                alt="r2px"
                width={500}
                height={500}
                priority
                style={{ width: 'auto', height: 'auto' }}
                src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/r2px.svg`}
              />
            </div>
            <div className="relative h-full overflow-y-hidden">
              <div className="word invisible font-trial text-h2 font-heavy leading-medium text-text-default">
                R2PX
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
