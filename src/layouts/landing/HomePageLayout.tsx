'use client';

import { useEffect, useState } from 'react';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Client-only: star styles are random, so rendering them during
    // prerender would diverge from the HTML on hydration. Once mounted,
    // every mousemove (context mousePosition update) re-randomizes the
    // stars — the rapid shooting-star effect on mouse move.
    setMounted(true);
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-landing-background">
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

      {mounted && generateRandomStars(3)}
      <div className="relative h-dvh justify-center overflow-x-hidden md:pt-s88">
        <div className="fixed top-0 z-[40] h-s88 w-full">
          <TopHeader />
        </div>
        {children}
      </div>
      <MenuDrawer menu={menuIsOpen} setMenu={setMenuIsOpen} />
    </div>
  );
};
