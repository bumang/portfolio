import React from 'react';

import { NavLink } from '@/components/common/NavLink';

import { MenuItems } from '../../constants';

interface MenuListProps {
  handleOnClick?: (route: string) => void;
}

export const MenuList = ({ handleOnClick }: MenuListProps) => (
  <div className="z-10 mx-[5%] h-full w-full">
    <div className="list-container no-scrollbar m-auto h-full w-[70%] overflow-y-auto pb-[20px]">
      {MenuItems &&
        MenuItems.map((d) => (
          <div className="group" key={d.index}>
            <NavLink href={d?.routes} onClick={() => handleOnClick?.(d?.routes)} exact>
              <div className="flex cursor-pointer justify-between border-secondary-lightBlue px-s12 py-[120px]">
                <div className="relative h-fit overflow-y-hidden">
                  <div className="items font-trial text-h3 font-heavy leading-bold text-text-default disabled:cursor-not-allowed disabled:opacity-[0.8] group-hover:text-primary-lightGray">
                    {d.itemName}
                  </div>
                </div>
                <div className="relative h-fit overflow-y-hidden">
                  <div className="items font-trial text-h3 font-heavy leading-bold text-text-default disabled:cursor-not-allowed disabled:opacity-[0.8] group-hover:text-primary-lightGray">
                    {d.index}
                  </div>
                </div>
              </div>
            </NavLink>
            <div className="line h-full w-full bg-text-default p-s1 group-hover:bg-primary-lightGray" />
          </div>
        ))}
    </div>
  </div>
);
