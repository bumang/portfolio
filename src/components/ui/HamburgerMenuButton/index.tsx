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
      className={`h-[66px] w-[74px] hover:bg-white/10 ${menuIsOpen ? 'active' : ''} `}
      onClick={handleOnClick}
      datatype="hamburger-menu"
    >
      <div className="ham-bgr-btn relative flex h-full min-w-full items-center">
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
