import React from 'react';
import Image, { ImageProps } from 'next/image';

interface InfiniteVerticalSliderProps extends ImageProps {}

/**
 * The moon is a full textured disc (the SVG is a complete circle; its old
 * viewBox cropped it to a horizon strip). It sits anchored at the bottom,
 * rotating about its own center (the disc spins in place — surface texture
 * drifting past reads as flying over a rotating moon) and drifts slowly inward.
 * The glow is a blurred copy of the exact silhouette, so the pulsating light
 * hugs the moon's circumference precisely. Only transform/opacity animate.
 * (Component name kept for minimal diff.)
 */
const InfiniteVerticalSlider = ({ src, alt, width, height, fill }: InfiniteVerticalSliderProps) => (
  <div className="moon invisible absolute bottom-0 left-0 h-[38%] w-full overflow-hidden">
    <div className="moon-roll absolute left-0 top-0 aspect-square w-full will-change-transform">
      <div className="moon-glow absolute inset-0 blur-[24px] brightness-125">
        <Image src={src} priority alt="" fill className="object-cover" />
      </div>
      <Image
        src={src}
        priority
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className="object-cover"
      />
    </div>
  </div>
);

export default InfiniteVerticalSlider;
