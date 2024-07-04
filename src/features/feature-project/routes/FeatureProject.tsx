import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

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
  return <div className="hello">Project Page</div>;
};
