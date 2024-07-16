import React from 'react';

import { useMyContext } from '@/context';

import Button from '../Button';

export const HamburgerMenuButton = () => {
  const { menuIsOpen, setMenuIsOpen } = useMyContext();

  const handleOnClick = () => {
    setMenuIsOpen((prevState) => !prevState);
  };

  return (
    <Button
      variant="unstyled"
      className={`flex h-[48px] items-start px-[8px] hover:bg-white/10 lg:h-[66px] ${menuIsOpen ? 'active' : ''} `}
      onClick={handleOnClick}
      datatype="hamburger-menu"
      aria-label="Hamburger Menu"
    >
      <div className="ham-bgr-btn relative flex h-full w-[40px]">
        <b
          style={{
            transform: menuIsOpen ? 'rotate(-45deg)' : 'none',
            top: menuIsOpen ? '50%' : '20%',
          }}
        />
        <b style={{ opacity: menuIsOpen ? 0 : 1 }} />
        <b
          style={{
            transform: menuIsOpen ? 'rotate(45deg)' : 'none',
            top: menuIsOpen ? '50%' : '80%',
          }}
        />
      </div>
    </Button>
  );
};

HamburgerMenuButton.displayName = 'HamburgerMenuButton';
