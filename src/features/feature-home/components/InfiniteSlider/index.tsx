import React from 'react';
import Image, { ImageProps } from 'next/image';

interface InfiniteSliderProps extends ImageProps {}

const InfiniteSlider = ({ src, alt, width, height, fill }: InfiniteSliderProps) => (
  <div className="absolute bottom-0 left-0 h-full w-full before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,black_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,black_0%,rgba(255,255,255,0)_100%)] after:content-['']">
    <div className="lg:min-w-screen absolute left-0 flex h-[27vh] w-[200vw] xs:bottom-[-10%] md:bottom-[-5%] lg:bottom-[-4%] xl:bottom-[0]">
      <div className="flex-1 animate-infinite-slider-mountain">
        <Image
          src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/mountain.svg`}
          alt="mountain"
          loading="lazy"
          fill
        />
      </div>
      <div className="flex-1 animate-infinite-slider-mountain">
        <Image
          src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/mountain.svg`}
          alt="mountain"
          loading="lazy"
          fill
        />
      </div>
      <div className="flex-1 animate-infinite-slider-mountain">
        <Image
          src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/mountain.svg`}
          alt="mountain"
          loading="lazy"
          // width={1}
          // height={1}
          fill
        />
      </div>
    </div>
    <div className="absolute bottom-[-4%] left-0 flex h-[12vh] w-[200%] md:bottom-[-2%] lg:bottom-[-2%] lg:w-[150vw] xl:bottom-[-1%]">
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
