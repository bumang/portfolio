'use client';

import Head from 'next/head';

import { MenuDrawer, TopHeader } from '@/components';
import { useMyContext } from '@/context';

interface ProjectPageLayoutProps {
  children: React.ReactNode;
}

export const ProjectsPageLayout = ({ children }: ProjectPageLayoutProps) => {
  const { menuIsOpen } = useMyContext();

  return (
    <div className="no-scrollbar relative h-screen w-screen overflow-y-scroll bg-project-background">
      <Head>
        <title>Projects | My Portfolio</title>
        <meta
          name="description"
          content="Explore my portfolio projects showcasing my skills in web development, design, and programming. See the diverse range of projects I've worked on and learn about the technologies I use."
        />
        <meta
          name="keywords"
          content="portfolio, projects, web development, design, programming, technology, skills"
        />
        <meta name="author" content="Umanga Bhattarai" />
        <meta property="og:title" content="Projects | My Portfolio" />
        <meta
          property="og:description"
          content="Explore my portfolio projects showcasing my skills in web development, design, and programming. See the diverse range of projects I've worked on and learn about the technologies I use."
        />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="This is the home page of my portfolio. Explore my work and projects."
        />
        <meta property="og:url" content="https://bumang.github.io/portfolio/project" />
      </Head>
      <div className="relative h-full w-full justify-center pt-s88">
        <div className="fixed top-0 z-[70] h-s88 w-full">
          <TopHeader />
        </div>
        {children}
      </div>
      <MenuDrawer menu={menuIsOpen} />
    </div>
  );
};
