export const generateRandomStarProperties = (secondSet?: string) => {
  const translateEnd = `${-Math.floor(Math.random() * 600 + 800)}px`;
  const animationDuration = `${Math.floor(Math.random() * 2000 + 5500)}ms`;
  const tailWidth = `${Math.floor(Math.random() * 200 + 5)}px`;
  const animationDelayLeft = `${Math.floor(Math.random() * 7000)}ms`;
  const animationDelay = `${Math.floor(Math.random() * 4000)}ms`;

  const tailHeight = `${(Math.random() * (2.5 - 0.5) + 0.5).toFixed(1)}px`;

  return {
    '--translate-end': translateEnd,
    '--animation-duration': animationDuration,
    '--tail-width': tailWidth,
    '--tail-height': tailHeight,
    '--animation-delay': secondSet ? animationDelay : animationDelayLeft,
  } as any;
};

export const generateRandomPositions = (secondSet?: string) => {
  const rightValuesForLeft = ['65%', '45%', '55%', '50%', '40%', '30%', '20%', '15%'];

  const rightValuesForRight = [
    '40%',
    '35%',
    '30%',
    '25%',
    '20%',
    '15%',
    '10%',
    '0%',
    '-10%',
    '-20%',
  ];
  const right = secondSet
    ? rightValuesForRight[Math.floor(Math.random() * rightValuesForRight.length)]
    : rightValuesForLeft[Math.floor(Math.random() * rightValuesForLeft.length)];

  return secondSet
    ? {
        right: `${right}`,
      }
    : {
        left: `${right}`,
      };
};
