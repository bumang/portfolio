import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useTransitionContext } from '@/context';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const TEXT = 'is a Software Developer.';

export const SectionScrollFirst = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const heroContainer = useRef<HTMLDivElement>(null);

  const avatarImage = useRef<HTMLImageElement>(null);
  const aboutImage = useRef<HTMLImageElement>(null);

  const { timeline } = useTransitionContext();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Horizontal pinned scroll is a desktop experience; on mobile the
      // sections stack and scroll natively.
      mm.add('(min-width: 976px)', () => {
        const pin = gsap.fromTo(
          sectionRef.current,
          {
            translateX: 0,
          },
          {
            translateX: '-300vw',
            ease: 'none',
            duration: 1,
            scrollTrigger: {
              trigger: triggerRef.current,
              start: 'top top',
              end: '+=400% bottom',
              scrub: true,
              pin: true,
              markers: false,

              anticipatePin: 1,
            },
          }
        );
        return () => {
          pin.kill();
        };
      });
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      const letters = gsap.utils.toArray('.letter:not(.space)');

      gsap.fromTo(
        letters,
        { y: (i) => (i % 2 === 0 ? '-80%' : '80%') },
        {
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '10% top',
            end: '300% bottom',
            scrub: true,
            markers: false,
          },
        }
      );

      if (aboutImage.current) {
        gsap.set(aboutImage.current, {
          transform: 'scale3d(1.8, 1.8, 1)',
        });

        gsap.to(aboutImage.current, {
          transform: 'scale3d(1, 1, 1)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '150% top',
            end: '300% top',
            scrub: true,
            markers: false,
          },
        });
      }
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
    <div className="scroll-section-outer">
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="scroll-section-inner relative flex w-full flex-col bg-background-about lg:h-screen lg:w-[400vw] lg:flex-row"
        >
          <div
            ref={heroContainer}
            className="scroll-section flex w-full flex-col lg:h-full lg:w-screen"
          >
            <div className="relative m-auto flex h-full w-fit flex-auto flex-col items-start justify-center px-s24 py-s40 leading-[0.95] sm:max-h-[55%] lg:px-0 lg:py-0 lg:leading-heavy xl:max-h-[68%]">
              <div className="relative flex h-fit gap-s24 overflow-y-hidden lg:gap-s64">
                <div className="aboutWord invisible font-trial text-[clamp(64px,20vw,260px)] font-heavy leading-[0.95] text-text-default lg:leading-semi-bold">
                  UMANGA
                </div>
                <div className="aboutWord invisible font-trial text-[clamp(64px,20vw,260px)] font-heavy leading-[0.95] text-text-default lg:leading-semi-bold">
                  -
                </div>
                <div className="aboutWord invisible font-trial text-[clamp(64px,20vw,260px)] font-heavy leading-[0.95] text-text-default lg:leading-semi-bold">
                  SE
                </div>
              </div>

              <div className="flex gap-s28">
                <div className="relative h-full overflow-y-hidden">
                  <div className="aboutWord invisible font-trial text-[clamp(64px,20vw,260px)] font-heavy leading-[0.95] text-text-default lg:leading-semi-bold">
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
                    className="h-s64 w-s64 lg:h-[173px] lg:w-[173px]"
                    alt="avatar"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-section flex w-full items-center justify-center py-s40 lg:h-full lg:w-[150vw]">
            <div className="relative flex h-fit w-full justify-center font-trial text-[30px] font-medium leading-[0.95] tracking-[2px] text-text-default sm:text-[44px] lg:text-h1 lg:leading-semi-bold lg:tracking-[24px]">
              {TEXT.split('').map((letter, index) => {
                return letter === ' ' ? (
                  <div key={`${index + 1} `} className="letter space">
                    &nbsp;
                  </div>
                ) : (
                  <div className="letter" key={`${index + 1} `}>
                    {letter}
                  </div>
                );
              })}{' '}
            </div>
          </div>
          <div className="scroll-section flex w-full max-w-full items-center justify-center overflow-hidden lg:h-full lg:max-w-[50vw]">
            <Image
              ref={aboutImage}
              src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/about.png`}
              width={100}
              height={100}
              className="h-[70vw] w-full object-cover lg:h-full"
              alt="about_image"
            />
          </div>
          <div className="scroll-section flex w-full flex-col gap-s32 px-s24 py-s40 lg:h-full lg:w-screen lg:flex-row lg:justify-between lg:gap-0 lg:px-0 lg:py-0">
            <div className="flex w-full max-w-full font-trial text-[clamp(56px,16vw,200px)] font-medium leading-[0.95] text-text-default lg:max-w-[56.82%] lg:pl-[80px] lg:pt-s88 lg:leading-[200px]">
              KNOW A LITTLE MORE ABOUT ME
            </div>
            <div className="flex w-full max-w-full items-end lg:max-w-[38.79%] lg:pb-s44">
              <div className="bg-background-black w-full max-w-[550px] border-t-[2px] border-text-default py-s40 font-inter text-[22px] font-medium leading-normal text-text-default">
                My name is Umanga Bhattarai, a software engineer from Kathmandu, Nepal, specializing
                in TypeScript and Golang, with a focus on React.js, Next.js, and scalable frontend
                architecture. I enjoy building products end to end, from clean interfaces to
                serverless backends and well-tested releases. I care about performance, thoughtful
                details, and code that stays easy to maintain. Outside of work, I enjoy football,
                cycling, and traveling, which inspire my creativity and drive for continuous
                improvement. My goal is to blend technical excellence with user-centric design,
                crafting digital experiences that stand the test of time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
