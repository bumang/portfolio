import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
export const SectionScrollSecond = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        targetRef.current,
        { transform: 'translate(-50%, -50%) scale3d(0, 0, 1)' },
        {
          transform: 'translate(-50%, -50%) scale3d(3.5, 3.5, 1)',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '100% bottom',
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        '.skills_title_up',
        { x: '-100%' },
        {
          x: '0',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: '-10% top',
            end: '100% bottom',
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        '.skills_title_down',
        { x: '100%' },
        {
          x: '0',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: '-10% top',
            end: '100% bottom',
            scrub: true,
            markers: false,
          },
        }
      );
    },
    { scope: triggerRef }
  );

  return (
    <div className="relative flex h-[500vw] w-full flex-col overflow-x-clip bg-background-about">
      <div ref={triggerRef} className="max-w-screen min-h-[400vh]">
        <div className="sticky top-[calc(50%-120px)] z-30 flex justify-center">
          <div className="z-40 text-center font-trial text-[120px] font-bold leading-[120px] text-background-about">
            <div className="skills_title_up">WHAT I USE</div>
            <div className="skills_title_down">FOR MY PROJECTS</div>
          </div>
        </div>
        <div
          className="sticky left-[50%] top-[50%] h-[40vw] w-[40vw] rounded-[100%] bg-text-default"
          ref={targetRef}
        />
      </div>
    </div>
  );
};
