import React from 'react';
import Link from 'next/link';

import { HamburgerMenuButton } from '@/components/ui';

import Logo from '../../../assests/icons/logo.svg';

export const TopHeader = () => (
  <div className="flex min-h-full w-full items-center justify-between px-s40">
    <Link href="/" scroll={false}>
      <div className="flex gap-s8 p-s12">
        <div className="hover:cursor-pointer">
          <Logo />
        </div>
        <div className="relative cursor-pointer overflow-hidden text-s20 font-bold leading-normal text-secondary-lightBlue">
          Umanga Bhattarai
        </div>
      </div>
    </Link>

    <div>
      <HamburgerMenuButton />
    </div>
  </div>
);
