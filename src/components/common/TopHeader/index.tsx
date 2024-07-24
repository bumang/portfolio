import React from 'react';
import Link from 'next/link';

import { HamburgerMenuButton } from '@/components/ui';

import Logo from '../../../assests/icons/logo.svg';

export const TopHeader = () => (
  <div className="flex min-h-full w-full items-center justify-between px-s16 lg:px-s40">
    <Link href="/" scroll={false}>
      <div className="group flex gap-s8 p-s4 lg:p-s12">
        <div className="hover:cursor-pointer">
          <Logo />
        </div>
        <div className="relative cursor-pointer overflow-hidden text-s20 font-bold leading-normal text-secondary-lightBlue">
          <span className="inline-block transition duration-300 ease-out group-hover:-translate-y-[120%]">
            Umanga Bhattarai
          </span>
          <span className="absolute left-0 inline-block translate-y-[180%] rotate-12 transition duration-300 ease-out group-hover:-translate-y-0 group-hover:rotate-0">
            Umanga Bhattarai
          </span>
          <div className="absolute bottom-0 h-s2 w-0 border-b-2 bg-background-preLoader transition-all duration-300 ease-out group-hover:w-full" />
        </div>
      </div>
    </Link>
    <div>
      <HamburgerMenuButton />
    </div>
  </div>
);
