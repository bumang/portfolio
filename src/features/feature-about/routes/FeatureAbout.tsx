import React from 'react';

import { TopHeader } from '@/components';
import { SectionScrollFirst } from '@/features/feature-about/components';

export const FeatureAbout = () => {
  return (
    <div className="flex h-full w-screen flex-col overflow-y-scroll bg-background-about">
      <div className="fixed top-0 z-[70] h-s88 w-full">
        <TopHeader />
      </div>
      <div className="screen min-w-screen min-h-screen bg-red-500">Hello</div>
      <SectionScrollFirst />
      <div className="screen min-w-screen min-h-screen bg-red-500">Hello</div>
    </div>
  );
};
