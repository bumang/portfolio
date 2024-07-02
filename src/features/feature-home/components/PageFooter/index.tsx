import React from 'react';

import RightArrow from '@/assests/icons/right-arrow-btn.svg';
import Button from '@/components/ui/Button';

interface PageFooterProps {
  handleClick?: () => void;
}

const PageFooter = ({ handleClick }: PageFooterProps) => (
  <div className="flex min-h-full min-w-full justify-between px-s40 py-s16">
    <div className="relative h-fit overflow-y-hidden">
      <div className="word invisible flex items-center p-s12 text-s20 font-normal text-text-default">
        Web developer
      </div>
    </div>
    <div className="transform transition-transform duration-300 ease-in-out hover:scale-125">
      <Button onClick={handleClick} children={<RightArrow />} type="submit" variant="unstyled" />
    </div>
  </div>
);

export default PageFooter;
