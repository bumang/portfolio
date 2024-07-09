'use client';

import { MenuDrawer } from '@/components';
import { useMyContext } from '@/context';

interface AboutLayoutProps {
  children: React.ReactNode;
}

export const AboutPageLayout = ({ children }: AboutLayoutProps) => {
  const { menuIsOpen, setMenuIsOpen } = useMyContext();
  return (
    <div className="relative h-screen w-screen">
      {children}
      <MenuDrawer menu={menuIsOpen} setMenu={setMenuIsOpen} />
    </div>
  );
};
