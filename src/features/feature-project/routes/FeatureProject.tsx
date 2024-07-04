import React from 'react';
import { useGSAP } from '@gsap/react';

import { useTransitionContext } from '@/context';

export const FeatureProject = () => {
  const { timeline } = useTransitionContext();

  useGSAP(() => {
    timeline.call(() => {}, undefined, 0);
  }, {});
  return <div>Project Page</div>;
};
