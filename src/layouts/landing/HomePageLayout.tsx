'use client';

import { MenuDrawer, TopHeader } from '@/components';
import { useMyContext } from '@/context';
import FallingStar from '@/features/feature-home/components/FallingStar';
import InfiniteSlider from '@/features/feature-home/components/InfiniteSlider';

interface HomePageLayoutProps {
  children: React.ReactNode;
}

const generateRandomStars = (numStars: number) => {
  const stars = [];

  // eslint-disable-next-line no-plusplus
  for (let i: number = 0; i < numStars; i++) {
    stars.push(<FallingStar key={i} />);
  }

  return stars;
};

export const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  const numStars = Math.floor(Math.random() * 0.09) + 3;
  const { menuIsOpen, setMenuIsOpen } = useMyContext();

  return (
    <div className="min-w-screen relative min-h-screen overflow-hidden bg-landing-background">
      <InfiniteSlider
        src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/back-drop.png`}
        alt="back-drop"
        fill
      />
      {generateRandomStars(numStars)}
      <div className="relative h-screen justify-center overflow-x-hidden pt-s88">
        <div className="fixed top-0 z-[70] h-s88 w-full">
          <TopHeader />
        </div>
        {children}
      </div>
      <MenuDrawer menu={menuIsOpen} setMenu={setMenuIsOpen} />
    </div>
  );
};
