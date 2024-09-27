import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { NavLink } from '@/components/common/NavLink';

import { MenuItems } from '../../constants';

interface MenuListProps {
  handleOnClick?: (route: string) => void;
}

export const MenuList = ({ handleOnClick }: MenuListProps) => {
  const router = useRouter();
  const menuInfiniteRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(menuInfiniteRef?.current, {
        opacity: 1,
        ease: 'power1.out',
      });
    },
    { scope: menuInfiniteRef }
  );

  return (
    <div className="z-10 mx-[5%] h-full w-full">
      <div
        ref={menuInfiniteRef}
        className="no-scrollbar m-auto h-full w-[70%] overflow-y-auto pb-[20px] opacity-0"
      >
        {MenuItems &&
          MenuItems.map((d) => {
            const isActive = router.pathname === d.routes;
            return (
              <div className="group animate-loopT" key={d.index}>
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
        {MenuItems &&
          MenuItems.map((d) => {
            const isActive = router.pathname === d.routes;
            return (
              <div className="group animate-loopT" key={d.index}>
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
