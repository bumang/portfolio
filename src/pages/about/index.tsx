// import { FeatureAbout } from '@/features/feature-about';
// import { AboutPageLayout } from '@/layouts/about';

// const AboutPage = () => <FeatureAbout />;

// ProjectPage.getLayout = (page: React.ReactElement) => <AboutPageLayout>{page}</AboutPageLayout>;
// export default AboutPage;

'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.section');
    const horizontalScroll = gsap.to(sections, {
      translateX: '-200vw',
      // xPercent: '200vw',
      ease: 'none',
    });

    const scrollTweenss = ScrollTrigger.create({
      // xPercent: -100 * (sections.length - 1),
      // translateX: '-100vw',
      // ease: 'none',
      animation: horizontalScroll,
      anticipatePin: 1,
      trigger: containerRef.current,
      // start: 'top top',
      endTrigger: sectionRef.current,
      end: '+=200%',
      scrub: true,
      pin: true,
      markers: true,
    });

    return () => {
      scrollTweenss.kill();
    };
  }, [containerRef, sectionRef]);

  return (
    <>
      <div ref={containerRef} className="container flex h-screen w-full max-w-[100vw] bg-red-500">
        <div ref={sectionRef} className="section max-w-screen h-screen w-full bg-background-about">
          Hello
        </div>
        <div ref={sectionRef} className="section max-w-screen h-screen w-full bg-yellow-300">
          World
        </div>
      </div>
      <div className="h-screen w-screen bg-green-500">simeee</div>
    </>
  );
};

export default AboutPage;
