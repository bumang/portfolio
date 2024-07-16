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
    <div ref={homeContainer} className="relative flex h-[calc(100vh-88px)] min-w-full flex-col">
      <div className="relative m-auto flex h-full w-fit flex-auto flex-col items-start justify-center leading-heavy sm:max-h-[55%] xl:max-h-[68%]">
        <div className="relative h-fit overflow-y-hidden">
          <div className="word invisible font-trial text-h1 font-heavy text-secondary-lightBlue">
            SOFTWARE DEV.
          </div>
        </div>

        <div className="flex gap-s28">
          <div className="relative h-full overflow-y-hidden">
            <div className="word invisible font-trial text-h1 font-heavy text-secondary-lightBlue">
              {' '}
              LIVING IN
            </div>
          </div>
          <div className="mt-s8 flex flex-col items-start justify-start pt-s6 leading-bold">
            <div className="relative h-fit overflow-y-hidden">
              <div className="word invisible font-trial text-h2 font-heavy text-secondary-lightBlue">
                KATHMANDU
              </div>
            </div>
            <div className="relative h-fit overflow-y-hidden">
              <div className="word invisible font-trial text-h2 font-heavy text-secondary-lightBlue">
                NEPAL
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 z-[60] h-s118 w-full">
        <PageFooter handleClick={handleNavigation} />
      </div>
    </div>
  );
};
