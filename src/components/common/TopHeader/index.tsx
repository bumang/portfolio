import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { HamburgerMenuButton } from '@/components/ui';
import { cn } from '@/utils/cn';

import Logo from '../../../assests/icons/logo.svg';

export const TopHeader = () => {
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <div className="flex min-h-full w-full items-center justify-between px-s16 lg:px-s40">
      <Link href="/" scroll={false}>
        <div className="group flex gap-s8 p-s4 lg:p-s12">
          <div className="hover:cursor-pointer">
            <Logo />
          </div>

          <div className="relative cursor-pointer overflow-hidden text-s20 font-bold leading-normal text-secondary-lightBlue">
            <span
              className={cn(
                'inline-block transition duration-300 ease-out',
                !isHome && 'group-hover:-translate-y-[120%]'
              )}
            >
              Umanga Bhattarai
            </span>
            {!isHome && (
              <span className="absolute left-0 inline-block translate-y-[180%] rotate-12 transition duration-300 ease-out group-hover:-translate-y-0 group-hover:rotate-0">
                Home
              </span>
            )}

            <div
              className={cn(
                'absolute bottom-0 h-s2 border-b-2 bg-white transition-all duration-300 ease-out',
                isHome ? 'w-0 group-hover:w-full' : 'w-0 group-hover:w-[32%]'
              )}
            />
          </div>
        </div>
      </Link>
      <div>
        <HamburgerMenuButton />
      </div>
    </div>
  );
};
