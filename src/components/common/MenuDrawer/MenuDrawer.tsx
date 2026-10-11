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

    // Moon "sphere rotation": the equirectangular texture track slides
    // vertically behind the fixed circular mask — a full revolution reads
    // as the surface travelling top to bottom, staying in place. The track
    // starts one copy above (yPercent -50 → 0) so the window is always
    // covered — the two tileable copies loop seamlessly, never running out.
    const moonSpin = gsap.fromTo(
      '.moon-track',
      { yPercent: -50 },
      {
        yPercent: 0,
        duration: 60,
        ease: 'none',
        repeat: -1,
        paused: true,
      }
    );
    // Pulsating light radiating from the moon's silhouette (opacity only).
    const moonGlow = gsap.fromTo(
      '.moon-glow',
      { opacity: 0.45 },
      {
        opacity: 1,
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

        moonSpin.play();
        moonGlow.play();
      } else {
        moonSpin.pause();
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
            src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/moon-texture.avif`}
            alt="moon"
          />
          <MenuList handleOnClick={handleExitAnimation} isOpen={menu} />
        </article>
      </section>
    </div>
  );
};
