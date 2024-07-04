import React from 'react';
import Image, { ImageProps } from 'next/image';

interface InfiniteSliderProps extends ImageProps {}

const InfiniteSlider: React.FC<InfiniteSliderProps> = ({ src, alt, width, height, fill }) => (
  <div className="absolute bottom-0 left-0 h-[38%] w-full before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,black_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,black_0%,rgba(255,255,255,0)_100%)] after:content-['']">
    <div className="absolute flex h-full w-[200%] animate-pulse">
      <div className="flex-1 animate-infinite-slider bg-transparent">
        <Image src={src} alt={alt} width={width} height={height} fill={fill} />
      </div>
      <div className="z-99 flex-1 animate-infinite-slider">
        <Image src={src} alt={alt} width={width} height={height} fill={fill} />
      </div>
    </div>
  </div>
);

export default InfiniteSlider;
