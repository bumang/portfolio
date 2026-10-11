import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import InfiniteVerticalSlider from '@/components/ui/InfiniteVerticalSlider';
import { useMyContext } from '@/context';

import { MenuList } from './component';
import { TopHeader } from '../TopHeader';

interface MenuDrawerProps {
  menu?: boolean;
  setMenu?: Dispatch<SetStateAction<boolean>>;
}

export const MenuDrawer = ({ menu, setMenu }: MenuDrawerProps) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const router = useRouter();
  const { setRouteFromMenu } = useMyContext();

  useGSAP(() => {
    const menuDrawerOpenAnimation = gsap.timeline();
    const menuDrawerCloseAnimation = gsap.timeline();

    // Moon "flyover": the full disc spins in place about its own center
    // (surface texture drifting along the rim = flying over a rotating moon),
    // drifting slowly inward toward the viewer. Transform-only.
    const moonFloat = gsap.to('.moon-roll', {
      rotate: 360,
      transformOrigin: '50% 50%',
      duration: 90,
      ease: 'none',
      repeat: -1,
      paused: true,
    });
    const moonDrift = gsap.to('.moon-roll', {
      scale: 1.25,
      transformOrigin: '50% 50%',
      duration: 45,
      ease: 'none',
      paused: true,
    });
    // Pulsating light radiating from the moon's silhouette (opacity only).
    const moonGlow = gsap.fromTo(
      '.moon-glow',
      { opacity: 0.35 },
      {
        opacity: 0.85,
        duration: 3.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        paused: true,
      }
    );

    if (!isInitialLoad) {
      if (menu) {
        menuDrawerOpenAnimation.set('.menu-container', {
          transform: 'translateY(-100%)',
          visibility: 'hidden',
        });
        menuDrawerOpenAnimation.set('.moon', {
          autoAlpha: 0,
        });
        menuDrawerOpenAnimation.set('.items', {
          transform: 'translate(0px, 100%)',
        });
        menuDrawerOpenAnimation.set('.line', {
          transform: 'translate(100%, 0px)',
        });

        // Everything moves with the same power4.out curve so the container and
        // its contents finish together — no perceived lag.
        menuDrawerOpenAnimation.to('.menu-container', {
          transform: 'translateY(0%)',
          visibility: 'visible',
          duration: 0.55,
          ease: 'power4.out',
        });
        menuDrawerOpenAnimation.to(
          '.moon',
          {
            autoAlpha: 1,
            duration: 0.4,
          },
          0
        );
        menuDrawerOpenAnimation.to(
          '.items',
          {
            autoAlpha: 1,
            transform: 'translate(0px, 0%)',
            duration: 0.5,
            ease: 'power4.out',
          },
          0.05
        );
        menuDrawerOpenAnimation.to(
          '.line',
          {
            transform: 'translate(0%, 0px)',
            duration: 0.4,
            ease: 'power4.out',
          },
          0.1
        );

        moonFloat.play();
        moonDrift.play();
        moonGlow.play();
      } else {
        moonFloat.pause();
        moonDrift.pause();
        moonGlow.pause();

        menuDrawerCloseAnimation.to(
          '.moon',
          {
            autoAlpha: 0,
            duration: 0.35,
          },
          0
        );
        menuDrawerCloseAnimation.to(
          '.items',
          {
            autoAlpha: 1,
            transform: 'translate(0px, 100%)',
            duration: 0.5,
            ease: 'power4.in',
          },
          0.05
        );
        menuDrawerCloseAnimation.to(
          '.line',
          {
            transform: 'translate(100%, 0px)',
            duration: 0.35,
            ease: 'power4.in',
          },
          0.1
        );

        menuDrawerCloseAnimation.to(
          '.menu-container',
          {
            transform: 'translateY(-100%)',
            visibility: 'visible',
            duration: 0.45,
            ease: 'power4.in',
          },
          0.05
        );
      }
    }
    setIsInitialLoad(false);
  }, [menu]);

  const handleExitAnimation = (routes: string) => {
    router.push({ pathname: routes });
    setRouteFromMenu?.(true);
    setMenu?.(false);
  };

  return (
    <div className="menu-container invisible fixed inset-0 z-[60] bg-black">
      <div className="fixed top-0 z-[70] h-s88 w-full">
        <TopHeader />
      </div>
      <section className="absolute left-0 top-[0] h-full w-full">
        <article className="relative flex h-full">
          <InfiniteVerticalSlider
            src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/moon.svg`}
            alt="moon"
            fill
          />
          <MenuList handleOnClick={handleExitAnimation} isOpen={menu} />
        </article>
      </section>
    </div>
  );
};
