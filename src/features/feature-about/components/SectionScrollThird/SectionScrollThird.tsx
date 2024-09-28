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

  const childRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray('.panel') as HTMLDivElement[];

      // Horizontal scroll animation for the entire section
      const pin = gsap.fromTo(
        sectionRefThird.current,
        { translateX: 0 },
        {
          translateX: '-150vw',
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: triggerRefThird.current,
            start: 'top top',
            end: '+=350% bottom',
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

      gsap.set(panels, { scale: 0.8 });

      panels.forEach((panel, i) => {
        let startValue = '';
        let endValue = '';

        if (i === 0) {
          startValue = 'left 20%';
          endValue = 'left left';
        } else if (i === panels.length - 1) {
          startValue = 'right right';
          endValue = 'right center';
        } else {
          startValue = 'right right';
          endValue = 'left left';
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: pin,
            start: startValue,
            end: endValue,
            scrub: true,
            markers: false,
          },
        });

        timeline
          .to(panel, {
            scale: 1,
            ease: 'power1.out',
            duration: 1,
          })
          .to(panel, {
            scale: 1,
            ease: 'none',
            duration: 1,
          })
          .to(panel, {
            scale: 0.8,
            ease: 'power1.out',
            duration: 1,
          });
      });

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
          className="scroll-section-inner no-scrollbar relative flex h-screen w-[350vw] flex-row bg-text-default text-black"
        >
          <div
            ref={heroContainerThird}
            className="scroll-section ml-20 flex h-full w-full items-center"
          >
            <div
              ref={(el) => {
                childRefs.current[0] = el;
              }}
              className="panel flex h-full w-[60vw] items-center justify-center"
            >
              <InfiniteCapsuleScroll
                bgColor="bg-secondary-green"
                header="CSS"
                headerIndex="01"
                heroText="SCSS - Chakra UI - Tailwind - GSAP - "
                txtColor="text-background-default"
              />
            </div>
            <div
              ref={(el) => {
                childRefs.current[1] = el;
              }}
              className="panel flex h-full w-[60vw] items-center justify-center"
            >
              <InfiniteCapsuleScroll
                bgColor="bg-background-yellow"
                header="JS"
                headerIndex="02"
                heroText="JavaScript - ReactJS - NextJS - "
                txtColor="text-black"
              />
            </div>

            <div
              ref={(el) => {
                childRefs.current[2] = el;
              }}
              className="panel flex h-full w-[60vw] items-center justify-center"
            >
              <InfiniteCapsuleScroll
                bgColor="bg-secondary-blueHover"
                header="Backend"
                headerIndex="03"
                heroText="Golang - Golang - Golang - "
                txtColor="text-background-default"
              />
            </div>
            <div
              ref={(el) => {
                childRefs.current[3] = el;
              }}
              className="panel flex h-full w-[60vw] items-center justify-center"
            >
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
