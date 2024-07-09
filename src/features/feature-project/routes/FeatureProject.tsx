import React from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { useTransitionContext } from '@/context';

export const FeatureProject = () => {
  const { timeline } = useTransitionContext();

  useGSAP(() => {
    timeline.add(
      gsap.to('.hello', {
        scale: 2,
      })
    );
  }, {});
  return (
    <div className="hello relative flex h-[130vh] w-[130vw] items-center justify-center">
      <div className="absolute left-[20%] top-[40%] font-trial text-h1 font-heavy leading-bold tracking-[1rem] text-text-off-white/10">
        SELECT PROJECT
      </div>
      <div className="flex h-[90%] min-w-[90%] flex-col justify-between">
        <div className="flex justify-between">
          <Image
            alt="rara-space"
            width={500}
            height={500}
            src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/rara_space.svg`}
          />
          <Image
            alt="tigg"
            width={500}
            height={500}
            src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/tigg.svg`}
          />
        </div>
        <div className="flex justify-center">
          <Image
            alt="r2px"
            width={500}
            height={500}
            src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/r2px.svg`}
          />
        </div>
      </div>
    </div>
  );
};
