import React from 'react';
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
    <div className="hello relative flex h-[170vh] w-[170vw]">
      <div className="absolute left-[50%] top-[50%] w-full font-trial text-heavy font-heavy leading-bold text-text-off-white/10">
        SELECT PROJECT
      </div>
    </div>
  );
};
