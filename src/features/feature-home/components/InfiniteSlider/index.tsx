import React from 'react';
import Image, { ImageProps } from 'next/image';

interface InfiniteSliderProps extends ImageProps {}

const InfiniteSlider = ({ src, alt, width, height, fill }: InfiniteSliderProps) => (
  <div className="absolute bottom-0 left-0 h-full w-full before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,black_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,black_0%,rgba(255,255,255,0)_100%)] after:content-['']">
    <div className="absolute bottom-[-4%] left-0 h-[20vh] w-[120vw] md:bottom-[-10%] lg:bottom-[-3%] lg:h-[45vh] lg:w-full">
      <Image
        src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/mountain.svg`}
        alt="mountain"
        fill
      />
    </div>
    <div className="absolute bottom-[-4%] left-0 flex h-[12vh] w-[200%] md:bottom-[-3%] lg:bottom-[-1%] lg:w-[150vw]">
      <div className="flex-1 animate-infinite-slider bg-transparent">
        <Image src={src} alt={alt} width={width} height={height} fill={fill} />
      </div>
      <div className="z-99 flex-1 animate-infinite-slider">
        <Image src={src} alt={alt} width={width} height={height} fill={fill} />
      </div>
      <div className="z-99 flex-1 animate-infinite-slider">
        <Image src={src} alt={alt} width={width} height={height} fill={fill} />
      </div>
      <div className="z-99 flex-1 animate-infinite-slider">
        <Image src={src} alt={alt} width={width} height={height} fill={fill} />
      </div>
    </div>
  </div>
);

export default InfiniteSlider;
