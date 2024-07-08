'use client';

import { MenuDrawer, TopHeader } from '@/components';
import { useMyContext } from '@/context';

interface ProjectPageLayoutProps {
  children: React.ReactNode;
}

export const ProjectPageLayout = ({ children }: ProjectPageLayoutProps) => {
  const { menuIsOpen } = useMyContext();

  return (
    <div className="no-scrollbar relative h-screen w-screen overflow-y-scroll bg-project-background">
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
