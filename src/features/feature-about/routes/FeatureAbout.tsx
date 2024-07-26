import React from 'react';

import { TopHeader } from '@/components';
import { SectionScrollFirst, SectionScrollSecond } from '@/features/feature-about/components';

import { SectionScrollThird } from '../components/SectionScrollThird';

export const FeatureAbout = () => (
  <div className="no-scrollbar flex h-screen w-full flex-col overflow-x-clip bg-background-about">
    <div className="fixed top-0 z-[70] h-s88 w-full">
      <TopHeader />
    </div>
    <SectionScrollFirst />
    <SectionScrollSecond />
    <SectionScrollThird />
  </div>
);
