'use client';

import Head from 'next/head';

import { MenuDrawer } from '@/components';
import { useMyContext } from '@/context';

interface AboutLayoutProps {
  children: React.ReactNode;
}

export const AboutPageLayout = ({ children }: AboutLayoutProps) => {
  const { menuIsOpen, setMenuIsOpen } = useMyContext();
  return (
    <div className="relative h-screen w-full max-w-[calc(100vw-15px)]">
      <Head>
        <title>About Me | My Portfolio</title>
        <meta
          name="description"
          content="Learn more about me, my background, and my skills. Discover my journey as a web developer, my passions, and the technologies I specialize in."
        />
        <meta
          name="keywords"
          content="about me, web developer, background, skills, journey, technologies, portfolio"
        />
        <meta name="author" content="Umanga Bhattarai" />
        <meta property="og:title" content="About Me | My Portfolio" />
        <meta
          property="og:description"
          content="Learn more about me, my background, and my skills. Discover my journey as a web developer, my passions, and the technologies I specialize in."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bumang.github.io/portfolio/about" />
      </Head>
      {children}
      <MenuDrawer menu={menuIsOpen} setMenu={setMenuIsOpen} />
    </div>
  );
};
