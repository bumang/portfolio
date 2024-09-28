import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { AnimatedCrossBtn } from '@/components';

export const FeatureRara = () => {
  const router = useRouter();
  const handleNavigation = () => {
    router.push('/project');
  };

  return (
    <div className="relative flex h-full w-full">
      <div className="absolute left-[calc(50%-32px)] top-[-62px] z-[55] transform transition-transform duration-300 ease-in-out">
        <AnimatedCrossBtn handleClick={handleNavigation} />
      </div>
      <div className="my-auto flex h-[370px] w-[50%] px-[60px]">
        <Image
          alt="rara"
          width={500}
          height={500}
          priority
          style={{ width: 'auto', height: 'auto' }}
          src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/rara_detail.png`}
        />
      </div>
      <div className="flex h-full w-[50%] flex-col justify-evenly px-[60px]">
        <div className="font-trial text-[260px] font-bold leading-[244px] text-secondary-lightGray">
          RARA SPACE
        </div>
        <div className="font-inter text-[24px] font-normal leading-[42px] text-primary-darkBlue">
          Rara Space is a comprehensive software that provides a range of features designed to
          streamline and optimize business operations.
        </div>
      </div>
    </div>
  );
};
