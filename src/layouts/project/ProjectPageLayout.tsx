'use client';

import { MenuDrawer, TopHeader } from '@/components';
import { useMyContext } from '@/context';

interface ProjectPageLayoutProps {
  children: React.ReactNode;
}

export const ProjectPageLayout = ({ children }: ProjectPageLayoutProps) => {
  const { menuIsOpen } = useMyContext();

  return (
    <div className="min-w-screen relative min-h-screen overflow-hidden bg-landing-background">
      <div className="relative h-screen justify-center overflow-x-hidden pt-s88">
        <div className="fixed top-0 z-[70] h-s88 w-full">
          <TopHeader />
        </div>
        {children}
      </div>
      <MenuDrawer menu={menuIsOpen} />
    </div>
  );
};
