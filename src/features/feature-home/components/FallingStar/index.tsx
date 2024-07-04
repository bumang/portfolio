import React from 'react';

import { generateRandomPositions, generateRandomStarProperties } from '@/utils/fallingStar';

const FallingStar = () => {
  const starStylesFirstSet = {
    ...generateRandomStarProperties(),
    ...generateRandomPositions(),
  };
  const starStylesSecondSet = {
    ...generateRandomStarProperties('secondSet'),
    ...generateRandomPositions('secondSet'),
  };
  return (
    <div className="absolute left-0 top-[6%] h-[80%] w-screen animate-pulse">
      <div
        className="shooting-star absolute top-[-9%] h-s3 w-s3 animate-shooting-star rounded-circle bg-white shadow-shadow-star dark:bg-white"
        style={starStylesFirstSet}
      />
      <div
        className="shooting-star absolute top-[-9%] h-s3 w-s3 animate-shooting-star rounded-circle bg-white shadow-shadow-star dark:bg-white"
        style={starStylesSecondSet}
      />
    </div>
  );
};

export default FallingStar;
