import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { useTransitionContext } from '@/context';

gsap.registerPlugin(useGSAP);

interface TransitionProps {
  children: ReactNode;
}

const Transition = ({ children }: TransitionProps) => {
  const [displayChildren, setDisplayChildren] = useState<ReactNode>(children);
  const container = useRef<HTMLDivElement>(null);
  const slideOut = useRef(null);
  const slideOutSecond = useRef(null);

  const { timeline } = useTransitionContext();
  const firstPageTransTimeline = gsap.timeline({
    paused: true,
  });
  const secondPageTransTimeline = gsap.timeline({
    paused: true,
  });

  // exit animation
  useGSAP(() => {
    if (
      (children as ReactElement)?.props?.children?.key !==
      (displayChildren as ReactElement)?.props?.children?.key
    ) {
      timeline.play().then(() => {
        firstPageTransTimeline.to(
          slideOut.current,
          {
            transform: 'translateY(-100%)',
            visibility: 'visible',
            duration: 1,
            ease: 'power4.inOut',
          },
          '-=0.5'
        );
        firstPageTransTimeline.to(
          slideOutSecond.current,
          {
            transform: 'translateY(-100%)',
            visibility: 'visible',
            duration: 1,
            ease: 'power4.inOut',
          },
          '-=0.8'
        );
        firstPageTransTimeline.play().then(() => {
          setDisplayChildren(children);
          firstPageTransTimeline.pause().clear();
        });
        secondPageTransTimeline.to(slideOutSecond.current, {
          transform: 'translateY(-200%)',
          visibility: 'visible',
          duration: 1,
          delay: 1,
          ease: 'power4.inOut',
        });
        secondPageTransTimeline.to(
          slideOut.current,
          {
            transform: 'translateY(-200%)',
            visibility: 'visible',
            duration: 1,
            delay: 0.2,
            ease: 'power4.inOut',
          },
          '-=0.8'
        );
        secondPageTransTimeline.set(slideOut.current, {
          transform: 'translateY(200%)',
          visibility: 'hidden',
        });
        secondPageTransTimeline.set(slideOutSecond.current, {
          transform: 'translateY(200%)',
          visibility: 'hidden',
        });
        secondPageTransTimeline.play().then(() => {
          secondPageTransTimeline.pause().clear();
        });

        return () => {
          timeline.pause().clear();
        };
      });
    }
  }, [children, displayChildren]);

  // entry animation
  // useGSAP(() => {
  //   gsap.to(container.current, {
  //     opacity: 1,
  //   });
  // });

  return (
    <div className="min-h-full min-w-full" ref={container}>
      {displayChildren}
      <div
        ref={slideOut}
        className="invisible absolute left-0 top-[100vh] z-[70] h-full w-full bg-primary-darkBlue"
      />
      <div
        ref={slideOutSecond}
        className="invisible absolute left-0 top-[100vh] z-[70] h-full w-full bg-background-preLoader"
      />
      {/* <div className="preloader z-[100] bg-transparent">
        <HomePreLoader onExitAnimation={() => setExitAnimation(true)} />
      </div> */}
    </div>
  );
};

export default Transition;
