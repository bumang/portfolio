import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { useTransitionContext } from '@/context';

export const FeatureAbout = () => {
  const aboutContainer = useRef<HTMLDivElement>(null);
  const avatarImage = useRef<HTMLImageElement>(null);

  const { timeline } = useTransitionContext();

  useGSAP(
    () => {
      gsap.set('.word', {
        transform: 'translate(0px, 100%)',
        visibility: 'hidden',
      });
      gsap.set(avatarImage.current, {
        scale: 0,
        visibility: 'hidden',
      });

      gsap
        .to('.word', {
          autoAlpha: 1,
          visibility: 'visible',
          transform: 'translate(0px, 0%)',
          delay: 1.2,
          stagger: {
            each: 0.15,
          },
          duration: 0.5,
        })
        .then(() => {
          gsap.to(avatarImage.current, {
            visibility: 'visible',
            scale: 1,
            transformOrigin: 'center center',
            duration: 1,
            delay: -0.5,
            ease: 'power4.inOut',
          });
        });

      timeline.add(
        gsap.to('.word', {
          autoAlpha: 1,
          visibility: 'visible',
          transform: 'translate(0px, 100%)',
          stagger: {
            each: 0.15,
          },
          duration: 0.5,
        })
      );
    },
    { scope: aboutContainer }
  );
  return (
    <div className="flex h-[calc(100vh-88px)] min-w-full flex-col">
      <div
        ref={aboutContainer}
        className="relative m-auto flex h-full w-fit flex-auto flex-col items-start justify-center leading-heavy sm:max-h-[55%] xl:max-h-[68%]"
      >
        <div className="relative flex h-fit gap-s64 overflow-y-hidden">
          <div className="word invisible font-trial text-h1 font-heavy leading-semi-bold text-text-default">
            UMANGA
          </div>
          <div className="word invisible font-trial text-h1 font-heavy leading-semi-bold text-text-default">
            -
          </div>
          <div className="word invisible font-trial text-h1 font-heavy leading-semi-bold text-text-default">
            24
          </div>
        </div>

        <div className="flex gap-s28">
          <div className="relative h-full overflow-y-hidden">
            <div className="word invisible font-trial text-h1 font-heavy leading-semi-bold text-text-default">
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
  );
};
