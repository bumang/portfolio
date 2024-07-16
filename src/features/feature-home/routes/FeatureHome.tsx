import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { useTransitionContext } from '@/context';

import PageFooter from '../components/PageFooter';

export const FeatureHome = () => {
  const router = useRouter();
  const { timeline } = useTransitionContext();
  const homeContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set('.word', {
        transform: 'translate(0px, 100%)',
        visibility: 'hidden',
      });

      gsap.to('.word', {
        autoAlpha: 1,
        visibility: 'visible',
        transform: 'translate(0px, 0%)',
        delay: 1.2,
        stagger: {
          each: 0.05,
        },
        duration: 0.5,
      });

      timeline.add(
        gsap.to('.word', {
          autoAlpha: 1,
          visibility: 'visible',
          transform: 'translate(0px, -100%)',
          stagger: {
            each: 0.05,
          },
          duration: 0.5,
        })
      );
    },
    { scope: homeContainer }
  );

  const handleNavigation = () => {
    router.push('/project');
  };

  return (
    <div
      ref={homeContainer}
      className="relative flex h-full min-w-full flex-col lg:h-[calc(100vh-88px)]"
    >
      <div className="relative mx-auto flex h-full w-fit flex-auto flex-col items-center justify-center text-center leading-[112px] sm:max-h-[55%] lg:mt-[4%] lg:leading-heavy xl:max-h-[68%]">
        <div className="relative h-fit overflow-y-hidden">
          <div className="word invisible font-trial text-h2 font-heavy text-secondary-lightBlue lg:text-h1">
            SOFTWARE DEV.
          </div>
        </div>

        <div className="flex flex-col text-center lg:flex-row lg:gap-s28">
          <div className="relative h-full overflow-y-hidden">
            <div className="word invisible font-trial text-h2 font-heavy text-secondary-lightBlue lg:text-h1">
              {' '}
              LIVING IN
            </div>
          </div>
          <div className="mt-s8 flex flex-col items-start justify-start lg:pt-s6 lg:leading-bold">
            <div className="relative h-fit overflow-y-hidden">
              <div className="word invisible font-trial text-h2 font-heavy leading-[112px] text-secondary-lightBlue lg:text-h2">
                KATHMANDU
              </div>
            </div>
            <div className="relative h-fit w-full overflow-y-hidden lg:w-fit">
              <div className="word invisible font-trial text-h2 font-heavy leading-[112px] text-secondary-lightBlue lg:text-h2">
                NEPAL
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 z-[60] w-full lg:h-s118">
        <PageFooter handleClick={handleNavigation} />
      </div>
    </div>
  );
};
