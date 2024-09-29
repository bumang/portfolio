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

        menuDrawerOpenAnimation.to('.menu-container', {
          transform: 'translateY(0%)',
          visibility: 'visible',
          duration: 0.8,
          ease: 'power4.out',
        });
        menuDrawerOpenAnimation.to(
          '.moon',
          {
            autoAlpha: 1,
            duration: 0.5,
          },
          '-=0.05'
        );
        menuDrawerOpenAnimation.to(
          '.items',
          {
            autoAlpha: 1,
            transform: 'translate(0px, 0%)',
            duration: 0.8,
          },
          '-=0.1'
        );
        menuDrawerOpenAnimation.to(
          '.line',
          {
            transform: 'translate(0%, 0px)',
            duration: 0.5,
          },
          '-=0.5'
        );
      } else {
        menuDrawerCloseAnimation.to(
          '.moon',
          {
            autoAlpha: 0,
            duration: 0.5,
          },
          '-=0.5'
        );
        menuDrawerCloseAnimation.to(
          '.items',
          {
            autoAlpha: 1,
            transform: 'translate(0px, 100%)',
            duration: 0.8,
          },
          '-=0.1'
        );
        menuDrawerCloseAnimation.to(
          '.line',
          {
            transform: 'translate(100%, 0px)',
            duration: 0.5,
          },
          '-=0.5'
        );

        menuDrawerCloseAnimation.to('.menu-container', {
          transform: 'translateY(-100%)',
          visibility: 'visible',
          duration: 0.5,
          ease: 'power4.in',
        });
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
          <MenuList handleOnClick={handleExitAnimation} />
        </article>
      </section>
    </div>
  );
};
