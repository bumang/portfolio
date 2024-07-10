import React from 'react';
import Image, { ImageProps } from 'next/image';

interface InfiniteVerticalSliderProps extends ImageProps {}

const InfiniteVerticalSlider: React.FC<InfiniteVerticalSliderProps> = ({
  src,
  alt,
  width,
  height,
  fill,
}) => (
  <div className="moon invisible absolute bottom-0 left-0 h-[38%] w-full before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,black_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,black_0%,rgba(255,255,255,0)_100%)] after:content-['']">
    <div className="absolute top-0 flex h-full w-full flex-col">
      <div className="flex-1 animate-infinite-vertical-slider">
        <Image src={src} alt={alt} width={width} height={height} fill={fill} />
      </div>
    </div>
  </div>
);

export default InfiniteVerticalSlider;
