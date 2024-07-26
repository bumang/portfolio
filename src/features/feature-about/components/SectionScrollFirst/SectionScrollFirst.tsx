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
          className="scroll-section-inner relative flex h-screen w-[400vw] flex-row bg-background-about"
        >
          <div ref={heroContainer} className="scroll-section flex h-full w-screen flex-col">
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
          <div className="scroll-section flex h-full w-[150vw] items-center justify-center">
            <div className="relative flex h-fit w-full justify-center font-trial text-h1 font-medium leading-semi-bold tracking-[24px] text-text-default">
              {TEXT.split('').map((letter) => {
                return letter === ' ' ? (
                  <div className="letter space">&nbsp;</div>
                ) : (
                  <div className="letter" key={letter}>
                    {letter}
                  </div>
                );
              })}{' '}
            </div>
          </div>
          <div className="scroll-section flex h-full w-full max-w-[50vw] items-center justify-center overflow-hidden">
            <Image
              ref={aboutImage}
              src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/about.png`}
              width={100}
              height={100}
              className="h-full w-full object-cover"
              alt="about_image"
            />
          </div>
          <div className="scroll-section flex h-full w-screen justify-between">
            <div className="flex w-full max-w-[56.82%] pl-[80px] pt-s88 font-trial text-[200px] font-medium leading-[200px] text-text-default">
              KNOW A LITTLE MORE ABOUT ME
            </div>
            <div className="flex w-full max-w-[38.79%] items-end pb-s44">
              <div className="bg-background-black w-full max-w-[550px] border-t-[2px] border-text-default py-s40 font-inter text-[22px] font-medium leading-normal text-text-default">
                My name is Umanga Bhattarai, a developer based in Kathmandu, Nepal, specializing in
                React.js, Next.js, and Golang. I focus on creating seamless animations, intuitive
                layouts, and engaging interactions for a delightful user experience. With a
                dedication to robust application architecture and comprehensive testing, I build
                scalable and maintainable solutions. Outside of work, I enjoy football, cycling, and
                traveling, which inspire my creativity and drive for continuous improvement. My goal
                is to blend technical excellence with user-centric design, crafting digital
                experiences that stand the test of time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
