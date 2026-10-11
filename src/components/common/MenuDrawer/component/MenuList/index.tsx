import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { NavLink } from '@/components/common/NavLink';

import { MenuItems } from '../../constants';

interface MenuListProps {
  handleOnClick?: (route: string) => void;
  isOpen?: boolean;
}

// Base auto-drift speed (px/s). The direction follows the user's scroll input:
// scrolling down sets the drift to travel down the list, scrolling up sets it
// to travel up — and it stays in that direction after the input ends ("how the
// user left it"). No input yet = the original downward-travel marquee.
const AUTO_SPEED = 55;
const MAX_SPEED = 1800;

export const MenuList = ({ handleOnClick, isOpen = false }: MenuListProps) => {
  const router = useRouter();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const renderCopy = (isClone: boolean) => (
    <div aria-hidden={isClone || undefined} className="flex flex-col">
      {MenuItems.map((d) => {
        const isActive = router.pathname === d.routes;
        return (
          <div className="group" key={`${isClone ? 'clone' : 'main'}-${d.index}`}>
            <NavLink
              href={isActive ? '#' : d?.routes}
              tabIndex={isClone ? -1 : undefined}
              onClick={() => !isActive && handleOnClick?.(d?.routes)}
              exact
            >
              <div
                className={`flex cursor-pointer justify-between border-secondary-lightBlue px-s12 py-s40 lg:py-[120px] ${
                  isActive ? 'cursor-not-allowed' : ''
                }`}
              >
                <div className="relative h-fit overflow-y-hidden">
                  <div
                    className={`items font-trial text-[clamp(48px,13vw,112px)] font-heavy leading-[0.95] lg:leading-[112px] ${
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
                    className={`items font-trial text-[clamp(48px,13vw,112px)] font-heavy leading-[0.95] lg:leading-[112px] ${
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
  );

  useGSAP(
    () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport || !isOpen) return () => {};

      const halfHeight = () => track.scrollHeight / 2;
      // direction: -1 = travelling down the list (items rise), +1 = up.
      const state = { y: 0, velocity: 0, direction: -1 };

      const tick = (_time: number, deltaTime: number) => {
        const dt = Math.min(deltaTime, 64) / 1000;
        // Decay any user velocity toward the persistent drift in the user's
        // last scroll direction.
        state.velocity += (state.direction * AUTO_SPEED - state.velocity) * Math.min(1, dt * 2.5);
        state.y += state.velocity * dt;
        const height = halfHeight();
        // Wrap so the two-copy loop is seamless in both directions.
        if (state.y <= -height) state.y += height;
        if (state.y > 0) state.y -= height;
        gsap.set(track, { y: state.y });
      };

      const impulse = (delta: number) => {
        if (delta !== 0) {
          // Wheel down (negative delta after sign flip) = travel down the
          // list; wheel up = travel up. The direction persists after release.
          state.direction = delta < 0 ? -1 : 1;
          state.velocity = gsap.utils.clamp(-MAX_SPEED, MAX_SPEED, state.velocity + delta * 2.5);
        }
      };

      // Wheel down (positive deltaY) speeds the drift up (content flows up
      // faster); wheel up (negative) reverses the direction.
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        impulse(-e.deltaY);
      };

      let lastTouchY: number | null = null;
      const onTouchStart = (e: TouchEvent) => {
        lastTouchY = e.touches[0].clientY;
      };
      const onTouchMove = (e: TouchEvent) => {
        if (lastTouchY === null) return;
        e.preventDefault();
        const dy = lastTouchY - e.touches[0].clientY; // finger up = scroll down
        lastTouchY = e.touches[0].clientY;
        impulse(-dy);
      };
      const onTouchEnd = () => {
        lastTouchY = null;
      };

      gsap.ticker.add(tick);
      viewport.addEventListener('wheel', onWheel, { passive: false });
      viewport.addEventListener('touchstart', onTouchStart, { passive: true });
      viewport.addEventListener('touchmove', onTouchMove, { passive: false });
      viewport.addEventListener('touchend', onTouchEnd);

      return () => {
        gsap.ticker.remove(tick);
        viewport.removeEventListener('wheel', onWheel);
        viewport.removeEventListener('touchstart', onTouchStart);
        viewport.removeEventListener('touchmove', onTouchMove);
        viewport.removeEventListener('touchend', onTouchEnd);
      };
    },
    { dependencies: [isOpen], scope: trackRef }
  );

  return (
    <div ref={viewportRef} className="no-scrollbar z-10 mx-[5%] h-full w-full touch-none">
      <div className="no-scrollbar m-auto h-full w-[70%] overflow-hidden pb-[20px]">
        <div ref={trackRef} className="will-change-transform">
          {renderCopy(false)}
          {renderCopy(true)}
        </div>
      </div>
    </div>
  );
};
