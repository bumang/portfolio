import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const SectionScrollThird = () => {
  const sectionRefThird = useRef<HTMLDivElement>(null);
  const triggerRefThird = useRef<HTMLDivElement>(null);
  const heroContainerThird = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pin = gsap.fromTo(
        sectionRefThird.current,
        {
          translateX: 0,
        },
        {
          translateX: '-100vw',
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: triggerRefThird.current,
            start: 'top top',
            end: '+=200% bottom',
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
          className="scroll-section-inner no-scrollbar relative flex h-screen w-[200vw] flex-row bg-text-default"
        >
          <div ref={heroContainerThird} className="scroll-section h-full w-screen">
            Hello
          </div>
          <div ref={heroContainerThird} className="scroll-section h-full w-screen">
            World
          </div>
        </div>
      </div>
    </div>
  );
};
