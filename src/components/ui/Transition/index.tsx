import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { useMyContext, useTransitionContext } from '@/context';

gsap.registerPlugin(useGSAP);

interface TransitionProps {
  children: ReactNode;
}

const Transition = ({ children }: TransitionProps) => {
  const [displayChildren, setDisplayChildren] = useState<ReactNode>(children);
  const container = useRef<HTMLDivElement>(null);
  const slideOut = useRef(null);
  const slideOutSecond = useRef(null);

  const {
    routeFromMenu,
    // fromHeader,
    setFromHeader,
    setRouteFromMenu,
    fromProjectsPage,
    setFromProjectsPage,
  } = useMyContext();

  const { timeline } = useTransitionContext();
  const firstPageTransTimeline = gsap.timeline({
    paused: true,
  });

  const secondPageTransTimeline = gsap.timeline({
    paused: true,
    smoothChildTiming: true,
  });

  // exit animation
  useGSAP(() => {
    const executeAnimations = async () => {
      // Check if children have changed
      if (
        (children as ReactElement)?.props?.children?.key !==
        (displayChildren as ReactElement)?.props?.children?.key
      ) {
        // Play the initial timeline and wait for it to complete
        if (!routeFromMenu) {
          await timeline.play().then(() => {
            timeline.pause().clear();
          });
        }

        if (fromProjectsPage) {
          setFromProjectsPage(false);
          setDisplayChildren(children);
          secondPageTransTimeline.pause().clear();
          firstPageTransTimeline.pause().clear();

          return;
        }

        // Define the firstPageTransTimeline animation
        firstPageTransTimeline.to(
          slideOut.current,
          {
            transform: 'translateY(-100%)',
            visibility: 'visible',
            display: 'block',
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
            display: 'block',
            duration: 0.8,
            ease: 'power4.inOut',
          },
          '-=0.7'
        );

        // Play the firstPageTransTimeline and wait for it to complete
        await firstPageTransTimeline.play().then(() => {
          setDisplayChildren(children);
          firstPageTransTimeline.pause().clear();
        });

        // Define the secondPageTransTimeline animation
        secondPageTransTimeline.to(
          slideOutSecond.current,
          {
            transform: 'translateY(-200%)',
            visibility: 'visible',
            duration: 1,
            delay: 0.5,
            ease: 'power4.inOut',
          },
          '-=0.3'
        );
        secondPageTransTimeline.to(
          slideOut.current,
          {
            transform: 'translateY(-200%)',
            visibility: 'visible',
            duration: 0.8,
            delay: 0.1,
            ease: 'power4.inOut',
          },
          '-=0.7'
        );
        secondPageTransTimeline.set(slideOut.current, {
          transform: 'translateY(200%)',
          visibility: 'hidden',
          display: 'none',
        });
        secondPageTransTimeline.set(slideOutSecond.current, {
          transform: 'translateY(200%)',
          visibility: 'hidden',
          display: 'none',
        });

        // Play the secondPageTransTimeline and wait for it to complete
        await secondPageTransTimeline.play().then(() => {
          secondPageTransTimeline.pause().clear();
          setRouteFromMenu(false);
          setFromHeader(false);
        });
      }
    };

    executeAnimations();
  }, [children]);

  // entry animation
  // useGSAP(() => {
  //   gsap.to(container.current, {
  //     opacity: 1,
  //   });
  // });

  return (
    <div ref={container} className="relative">
      {displayChildren}
      <div
        ref={slideOut}
        className="invisible fixed left-0 top-[100vh] z-[70] hidden h-full w-full bg-primary-darkBlue"
      />
      <div
        ref={slideOutSecond}
        className="invisible fixed left-0 top-[100vh] z-[70] hidden h-full w-full bg-background-preLoader"
      />

      {/* <div className="preloader z-[100] bg-transparent">
        <HomePreLoader onExitAnimation={() => setExitAnimation(true)} />
      </div> */}
    </div>
  );
};

export default Transition;
