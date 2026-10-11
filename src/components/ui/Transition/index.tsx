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
    fromHeader,
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

        if (fromProjectsPage && !fromHeader) {
          setFromProjectsPage(false);
          setDisplayChildren(children);
          secondPageTransTimeline.pause().clear();
          firstPageTransTimeline.pause().clear();
          return;
        }

        // Phase 1 — two curtains rise from below. The dark one leads, the
        // gray one follows slightly delayed; both smoothly decelerate as they
        // reach the top of the viewport (ease-out).
        firstPageTransTimeline.to(slideOut.current, {
          transform: 'translateY(-100%)',
          visibility: 'visible',
          display: 'block',
          duration: 0.75,
          ease: 'power4.out',
        });
        firstPageTransTimeline.to(
          slideOutSecond.current,
          {
            transform: 'translateY(-100%)',
            visibility: 'visible',
            display: 'block',
            duration: 0.65,
            ease: 'power4.out',
          },
          0.18
        );

        // Play the firstPageTransTimeline and wait for it to complete
        await firstPageTransTimeline.play().then(() => {
          setDisplayChildren(children);
          firstPageTransTimeline.pause().clear();
        });

        // Phase 2 — scene change: the curtain that arrived last leaves first
        // and the one that arrived first leaves second (crossover), zipping
        // upward off-screen to reveal the next page.
        secondPageTransTimeline.to(slideOutSecond.current, {
          transform: 'translateY(-200%)',
          visibility: 'visible',
          duration: 0.7,
          delay: 0.15,
          ease: 'power3.inOut',
        });
        secondPageTransTimeline.to(
          slideOut.current,
          {
            transform: 'translateY(-200%)',
            visibility: 'visible',
            duration: 0.6,
            ease: 'power3.inOut',
          },
          0.3
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
