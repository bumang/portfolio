import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import InfiniteVerticalSlider from '@/components/ui/InfiniteVerticalSlider';

import { MenuList } from './component';

interface MenuDrawerProps {
  menu?: boolean;
}

export const MenuDrawer = ({ menu }: MenuDrawerProps) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const router = useRouter();

  useGSAP(() => {
    const menuDrawerAnimation = gsap.timeline();
    if (!isInitialLoad) {
      if (menu) {
        menuDrawerAnimation.set('.menu-container', {
          transform: 'translateY(-100%)',
          visibility: 'hidden',
        });
        menuDrawerAnimation.set('.moon', {
          autoAlpha: 0,
        });
        menuDrawerAnimation.set('.items', {
          transform: 'translate(0px, 100%)',
        });
        menuDrawerAnimation.set('.line', {
          transform: 'translate(100%, 0px)',
        });

        menuDrawerAnimation.to('.menu-container', {
          transform: 'translateY(0%)',
          visibility: 'visible',
          duration: 1.5,
          ease: 'power4.inOut',
        });
        menuDrawerAnimation.to(
          '.moon',
          {
            autoAlpha: 1,
            duration: 0.5,
          },
          '-=0.05'
        );
        menuDrawerAnimation.to(
          '.items',
          {
            autoAlpha: 1,
            transform: 'translate(0px, 0%)',
            duration: 0.8,
          },
          '-=0.1'
        );
        menuDrawerAnimation.to(
          '.line',
          {
            transform: 'translate(0%, 0px)',
            duration: 0.5,
          },
          '-=0.5'
        );
      } else {
        menuDrawerAnimation.to(
          '.moon',
          {
            autoAlpha: 0,
            duration: 0.5,
          },
          '-=0.5'
        );
        menuDrawerAnimation.to(
          '.items',
          {
            autoAlpha: 1,
            transform: 'translate(0px, 100%)',
            duration: 0.8,
          },
          '-=0.1'
        );
        menuDrawerAnimation.to(
          '.line',
          {
            transform: 'translate(100%, 0px)',
            duration: 0.5,
          },
          '-=0.5'
        );

        menuDrawerAnimation.to('.menu-container', {
          transform: 'translateY(-100%)',
          visibility: 'visible',
          duration: 1.5,
          ease: 'power4.inOut',
        });
      }
    }
    setIsInitialLoad(false);
  }, [menu]);

  const handleExitAnimation = (routes: string) => {
    router.push(routes);
  };

  return (
    <div className="menu-container invisible fixed inset-0 z-[60] bg-black">
      <section className="absolute left-0 top-[0] h-full w-full">
        <article className="relative flex h-full">
          <InfiniteVerticalSlider
            src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/moon.png`}
            alt="moon"
            fill
          />
          <MenuList handleOnClick={handleExitAnimation} />
        </article>
      </section>
    </div>
  );
};
