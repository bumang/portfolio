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
        delay: 0.7,
        stagger: {
          each: 0.04,
        },
        ease: 'power2.out',
        duration: 0.55,
      });

      timeline.add(
        gsap.to('.word', {
          autoAlpha: 1,
          visibility: 'visible',
          transform: 'translate(0px, -100%)',
          stagger: {
            each: 0.03,
          },
          ease: 'power2.out',
          duration: 0.4,
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
      className="relative flex h-full min-w-full flex-col md:h-[calc(100dvh-88px)]"
    >
      <div className="relative mx-auto flex h-full w-fit flex-auto flex-col items-center justify-center text-center leading-[0.95] sm:max-h-[55%] md:max-h-[80%] md:leading-heavy lg:mt-[4%] xl:max-h-[68%]">
        <div className="relative h-fit overflow-y-hidden">
          <div className="word invisible font-trial text-[clamp(48px,14vw,112px)] font-heavy leading-[0.95] text-secondary-lightBlue md:text-h1">
            SOFTWARE DEV.
          </div>
        </div>

        <div className="flex flex-col text-center lg:flex-row lg:gap-s28">
          <div className="relative h-full overflow-y-hidden">
            <div className="word invisible font-trial text-[clamp(48px,14vw,112px)] font-heavy leading-[0.95] text-secondary-lightBlue md:text-h1">
              {' '}
              LIVING IN
            </div>
          </div>
          <div className="mt-s8 flex flex-col items-start justify-start md:leading-bold lg:pt-s6">
            <div className="relative h-fit overflow-y-hidden">
              <div className="word invisible font-trial text-[clamp(48px,14vw,112px)] font-heavy leading-[0.95] text-secondary-lightBlue md:text-h2 md:leading-[112px]">
                KATHMANDU
              </div>
            </div>
            <div className="relative h-fit w-full overflow-y-hidden lg:w-fit">
              <div className="word invisible font-trial text-[clamp(48px,14vw,112px)] font-heavy leading-[0.95] text-secondary-lightBlue md:text-h2 md:leading-[112px]">
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
