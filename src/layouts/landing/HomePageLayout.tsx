'use client';

import Head from 'next/head';

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
  const { menuIsOpen, setMenuIsOpen } = useMyContext();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-landing-background">
      <Head>
        <title>Home | My Portfolio</title>
        <meta
          name="description"
          content="Welcome to my portfolio. Discover my work, projects, and skills in web development, design, and programming. Get in touch to learn more about my professional journey."
        />
        <meta
          name="keywords"
          content="portfolio, home, web development, design, programming, projects, skills"
        />
        <meta name="author" content="Umanga Bhattarai" />
        <meta property="og:title" content="Home | My Portfolio" />
        <meta
          property="og:description"
          content="Welcome to my portfolio. Discover my work, projects, and skills in web development, design, and programming. Get in touch to learn more about my professional journey."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.yourwebsite.com/" />
      </Head>
      <InfiniteSlider
        src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/back-drop.svg`}
        alt="back-drop"
        fill
      />

      {generateRandomStars(0.01)}
      <div className="relative h-screen justify-center overflow-x-hidden md:pt-s88">
        <div className="fixed top-0 z-[70] h-s88 w-full">
          <TopHeader />
        </div>
        {children}
      </div>
      <MenuDrawer menu={menuIsOpen} setMenu={setMenuIsOpen} />
    </div>
  );
};
