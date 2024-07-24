import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useTransitionContext } from '@/context';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const SectionScrollFirst = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const heroContainer = useRef<HTMLDivElement>(null);

  const avatarImage = useRef<HTMLImageElement>(null);

  const { timeline } = useTransitionContext();

  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
          opacity: 1,
        },
        {
          translateX: '-200vw',
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'bottom bottom',
            end: '+=200%',
            scrub: 0.2,
            pin: true,
            markers: false,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      gsap.set('.aboutWord', {
        transform: 'translate(0px, 100%)',
        visibility: 'hidden',
      });
      gsap.set(avatarImage.current, {
        scale: 0,
        visibility: 'hidden',
      });

      gsap
        .to('.aboutWord', {
          autoAlpha: 1,
          visibility: 'visible',
          transform: 'translate(0px, 0%)',
          delay: 1.2,
          stagger: {
            each: 0.05,
          },
          duration: 0.5,
        })
        .then(() => {
          gsap.to(avatarImage.current, {
            visibility: 'visible',
            scale: 1,
            transformOrigin: 'center center',
            duration: 0.8,
            delay: -0.5,
            ease: 'power1.inOut',
          });
        });

      timeline.add(
        gsap.to('.aboutWord', {
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
      timeline.add(
        gsap.to(avatarImage.current, {
          visibility: 'visible',
          scale: 0,
          transformOrigin: 'center center',
          duration: 0.8,
          ease: 'power1.inOut',
        }),
        0
      );
    },
    { scope: heroContainer }
  );

  return (
    <div className="scroll-section-outer h-screen w-screen bg-background-about">
      {/* <div className="screen min-w-screen min-h-screen bg-green-500">cat</div> */}
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="scroll-section-inner no-scrollbar relative flex h-screen w-[300vw] bg-background-preLoader"
        >
          <div ref={heroContainer} className="scroll-section flex h-screen w-screen flex-col">
            <div className="relative m-auto flex h-full w-fit flex-auto flex-col items-start justify-center leading-heavy sm:max-h-[55%] xl:max-h-[68%]">
              <div className="relative flex h-fit gap-s64 overflow-y-hidden">
                <div className="aboutWord invisible font-trial text-h1 font-heavy leading-semi-bold text-text-default">
                  UMANGA
                </div>
                <div className="aboutWord invisible font-trial text-h1 font-heavy leading-semi-bold text-text-default">
                  -
                </div>
                <div className="aboutWord invisible font-trial text-h1 font-heavy leading-semi-bold text-text-default">
                  24
                </div>
              </div>

              <div className="flex gap-s28">
                <div className="relative h-full overflow-y-hidden">
                  <div className="aboutWord invisible font-trial text-h1 font-heavy leading-semi-bold text-text-default">
                    {' '}
                    BHATTARAI
                  </div>
                </div>
                <div className="relative mt-s8 flex flex-col items-center justify-center pt-s6 leading-bold">
                  <Image
                    ref={avatarImage}
                    src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/avatar.png`}
                    width={173}
                    height={173}
                    alt="avatar"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-section flex h-screen w-screen items-center justify-center bg-red-500">
            Helllooo
          </div>
          <div className="scroll-section flex h-screen w-screen items-center justify-center bg-yellow-500">
            More content
          </div>
        </div>
      </div>
      <div className="screen min-w-screen min-h-screen bg-green-500">meowww</div>
    </div>
  );
};
