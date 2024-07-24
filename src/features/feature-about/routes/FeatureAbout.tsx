import React from 'react';

import { TopHeader } from '@/components';
import { SectionScrollFirst } from '@/features/feature-about/components';

export const FeatureAbout = () => (
  <div className=".no-scrollbar flex h-screen w-screen flex-col bg-background-about">
    <div className="fixed top-0 z-[70] h-s88 w-full">
      <TopHeader />
    </div>
    {/* <div className="screen no-scrollbar overflow-hidden min-w-screen min-h-screen bg-red-500">Hello</div> */}
    <SectionScrollFirst />
  </div>
);
