import { useEffect } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';

import { globalTimeline } from '@/pages/_app';

import PageFooter from '../components/PageFooter';

export const FeatureHome = () => {
  const router = useRouter();

  const handleNavigation = async () => {
    // globalTimeline.addPause();
    const animation = gsap.timeline();
    animation.to('.word', {
      autoAlpha: 1,
      visibility: 'visible',
      transform: 'translate(0px, 100%)',
      stagger: {
        each: 0.2,
      },
      duration: 0.5,
      onComplete: () => {
        globalTimeline.removePause(0);
      },
    });
    globalTimeline.play().eventCallback('onComplete', () => {
      router.push('/projects');
    });
  };

  useEffect(() => {
    const handleLoad = () => {
      const textAnimation = gsap.timeline();
      textAnimation.set('.word', {
        transform: 'translate(0px, 100%)',
        visibility: 'hidden',
      });
      if (router.pathname === '/') {
        textAnimation.to('.word', {
          autoAlpha: 1,
          visibility: 'visible',
          transform: 'translate(0px, 0%)',
          delay: 0.5,
          stagger: {
            each: 0.3,
          },
          duration: 2,
        });
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [router.pathname === '/']);
  return (
    <div className="relative flex h-[calc(100vh-88px)] min-w-full flex-col">
      <div className="relative m-auto flex h-full w-fit flex-auto flex-col items-start justify-center leading-heavy sm:max-h-[55%] xl:max-h-[65%]">
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
