import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { InfiniteCapsuleScroll } from './InfiniteCapsuleScroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const SectionScrollThird = () => {
  const sectionRefThird = useRef<HTMLDivElement>(null);
  const triggerRefThird = useRef<HTMLDivElement>(null);
  const heroContainerThird = useRef<HTMLDivElement>(null);
  const heroInfiniteRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(heroInfiniteRef?.current, {
        opacity: 1,
        ease: 'power1.out',
      });
      const pin = gsap.fromTo(
        sectionRefThird.current,
        {
          translateX: 0,
        },
        {
          translateX: '-200vw',
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: triggerRefThird.current,
            start: 'top top',
            end: '+=400% bottom',
            scrub: true,
            pin: true,
            markers: false,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            scrollbars: {
              visible: false,
            },
          },
        }
      );
      return () => {
        pin.kill();
      };
    },
    { scope: sectionRefThird }
  );

  return (
    <div className="scroll-section-outer">
      <div ref={triggerRefThird}>
        <div
          ref={sectionRefThird}
          className="scroll-section-inner no-scrollbar relative flex h-screen w-[400vw] flex-row bg-text-default text-black"
        >
          <div
            ref={heroContainerThird}
            className="scroll-section ml-20 flex h-full w-full items-center gap-[15vw]"
          >
            <div className="flex h-full w-[60vw] items-center justify-center">
              <InfiniteCapsuleScroll
                bgColor="bg-secondary-green"
                header="CSS"
                headerIndex="01"
                heroText="SCSS - Chakra UI - Tailwind CSS -"
                txtColor="text-background-default"
              />
            </div>
            <div className="flex h-full w-[60vw] items-center justify-center">
              <InfiniteCapsuleScroll
                bgColor="bg-background-yellow"
                header="JS"
                headerIndex="02"
                heroText="JavaScript - ReactJS - NextJS - "
                txtColor="text-black"
              />
            </div>

            <div className="flex h-full w-[60vw] items-center justify-center">
              <InfiniteCapsuleScroll
                bgColor="bg-secondary-blueHover"
                header="Backend"
                headerIndex="03"
                heroText="Golang - Golang - Golang - "
                txtColor="text-background-default"
              />
            </div>
            <div className="flex h-full w-[60vw] items-center justify-center">
              <InfiniteCapsuleScroll
                bgColor="bg-background-pink"
                header="Others"
                headerIndex="04"
                heroText="Astro - Sanity CMS - Shopify - "
                txtColor="text-text-default"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
