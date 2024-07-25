import React from 'react';

import { TopHeader } from '@/components';
import { SectionScrollFirst } from '@/features/feature-about/components';

export const FeatureAbout = () => (
  <div className="flex h-screen w-screen flex-col bg-background-about">
    <div className="fixed top-0 z-[70] h-s88 w-full">
      <TopHeader />
    </div>
    <SectionScrollFirst />
  </div>
);
