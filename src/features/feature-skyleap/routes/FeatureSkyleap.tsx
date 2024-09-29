import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import VisitSiteIcon from '@/assests/icons/visit-site.svg';
import { AnimatedCrossBtn } from '@/components';
import { useTransitionContext } from '@/context';

export const FeatureSkyleap = () => {
  const projectsList = ['Web App', 'Admin Portal', 'Backend', 'Browser Extension'];
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

      gsap.set('.rara-text', {
        transform: 'translate(0px, 100%)',
        visibility: 'hidden',
      });

      gsap.to('.rara-text', {
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
      timeline.add(
        gsap.to('.rara-text', {
          autoAlpha: 1,
          visibility: 'visible',
          transform: 'translate(0px, -200%)',
          ease: 'power2.out',
          duration: 1,
        }),
        0.2
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
          src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/skyleap_detail.png`}
        />
      </div>
      <div ref={raraContainer} className="flex h-full w-[50%] flex-col justify-around px-[60px]">
        <div className="relative h-fit overflow-y-hidden font-trial text-[220px] font-bold leading-[220px] text-white">
          <div className="rara-word">SKYLEAP</div>
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
              Advanced Zero Trust Browsing Solutions for Safe and Controlled Browsing
            </div>
            <div className="rara-text font-inter text-[18px] font-medium leading-[28px] text-primary-darkBlue">
              SkyLeap provides advanced Zero Trust browsing solutions to safeguard your digital
              environment. It’s tools protect against data leaks and zero-day threats, ensuring your
              browsing activities remain secure and under control.
            </div>
          </div>
        </div>

        <div className="group relative flex h-fit w-fit overflow-y-hidden hover:cursor-pointer">
          <Link target="_blank" rel="noopener noreferrer" href="https://www.skyleap-sec.com/">
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
