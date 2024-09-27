import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter

import { NavLink } from '@/components/common/NavLink';

import { MenuItems } from '../../constants';

interface MenuListProps {
  handleOnClick?: (route: string) => void;
}

export const MenuList = ({ handleOnClick }: MenuListProps) => {
  const router = useRouter(); // Get the current route

  return (
    <div className="z-10 mx-[5%] h-full w-full">
      <div className="list-container no-scrollbar m-auto h-full w-[70%] overflow-y-auto pb-[20px]">
        {MenuItems &&
          MenuItems.map((d) => {
            const isActive = router.pathname === d.routes; // Check if the route is active
            return (
              <div className="group" key={d.index}>
                <NavLink
                  href={isActive ? '#' : d?.routes}
                  onClick={() => !isActive && handleOnClick?.(d?.routes)}
                  exact
                >
                  <div
                    className={`flex cursor-pointer justify-between border-secondary-lightBlue px-s12 py-[120px] ${
                      isActive ? 'cursor-not-allowed' : ''
                    }`}
                  >
                    <div className="relative h-fit overflow-y-hidden">
                      <div
                        className={`items font-trial text-[112px] font-heavy leading-[112px] ${
                          isActive
                            ? 'cursor-not-allowed text-white/40'
                            : 'text-text-default group-hover:text-primary-lightGray'
                        }`}
                      >
                        {d.itemName}
                      </div>
                    </div>
                    <div className="relative h-fit overflow-y-hidden">
                      <div
                        className={`items font-trial text-[112px] font-heavy leading-[112px] ${
                          isActive
                            ? 'cursor-not-allowed text-white/40'
                            : 'text-text-default group-hover:text-primary-lightGray'
                        }`}
                      >
                        {d.index}
                      </div>
                    </div>
                  </div>
                </NavLink>
                <div className="line h-full w-full bg-text-default p-s1 group-hover:bg-primary-lightGray" />
              </div>
            );
          })}
      </div>
    </div>
  );
};
