import React from 'react';

// interface HomePreLoaderProps {
//   onExitAnimation?: () => void;
// }

export const HomePreLoader = () => (
  // const [percentageValue, setPercentageValue] = useState(0);
  // const [transformValue, setTransformValue] = useState(1);

  // const containerVariantsTopDiv = {
  //   initial: { translateY: '0' },
  //   animate: { translateY: '0' },
  //   exit: { translateY: '-100%' },
  // };

  // const containerVariantsBottomDiv = {
  //   initial: { translateY: '0' },
  //   animate: { translateY: '0' },
  //   exit: { translateY: '100%' },
  // };

  // const containerVariantsText = {
  //   initial: { translateY: '0' },
  //   animate: { translateY: '0' },
  //   exit: { translateY: '-100%' },
  // };

  // useEffect(() => {
  //   if (percentageValue === 100) {
  //     const controlledAnimation = async () => {
  //       await controls.start('exit');
  //       onExitAnimation();
  //     };
  //     controlledAnimation();
  //   }
  // }, [percentageValue, onExitAnimation]);

  // const handleScroll: React.WheelEventHandler<HTMLDivElement> = (e) => {
  //   e.preventDefault();
  //   const scrollDelta = e.deltaY;

  //   if (scrollDelta > 0) {
  //     // Scrolling down, increase percentage and decrease transform
  //     setPercentageValue((prevValue) => Math.min(prevValue + 3, 100));
  //     setTransformValue((prevValue) => Math.max(prevValue - 0.03, 0));
  //   } else if (scrollDelta < 0) {
  //     // Scrolling up, decrease percentage and increase transform
  //     setPercentageValue((prevValue) => Math.max(prevValue - 3, 0));
  //     setTransformValue((prevValue) => Math.min(prevValue + 0.03, 1));
  //   }
  // };

  <div
    // onWheel={handleScroll}
    className="relative h-screen w-screen bg-transparent"
  >
    <div className="flex h-full w-full flex-col justify-between">
      <div
        className="h-[49.3vh] w-full bg-background-preLoader"
        // variants={containerVariantsTopDiv}
        // transition={{ duration: 1, ease: 'easeOut' }}
      />
      <div
        className="h-[49.3vh] w-full bg-background-preLoader"
        // variants={containerVariantsBottomDiv}
        // transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
    <div
      className="preloader-line absolute left-[50%] top-[50%] h-[2vh] w-full bg-background-preLoader"
      style={{
        transform: `translate(-50%, -50%) scale3d(${
          // transformValue
          '10'
        }, 1, 1)`,
      }}
    />
    <div className="absolute left-0 top-[5vh] w-full">
      <div
        // variants={containerVariantsText}
        // transition={{ duration: 1, ease: 'easeOut' }}
        className="mx-auto my-0 flex w-[90%] justify-between text-text-default"
      >
        <div className="relative block overflow-hidden font-trial text-[8vw]">
          <span className="opacity-1 font-normal">
            {`${// percentageValue
            '10'?.toString().padStart(3, '0')}%`}
          </span>
        </div>
        <div className="mt-[5.2vw] animate-bounce overflow-hidden font-inter text-[1.03123rem]">
          <span className="opacity-1 h-full">Scroll to see this website</span>
        </div>
      </div>
    </div>
  </div>
);
