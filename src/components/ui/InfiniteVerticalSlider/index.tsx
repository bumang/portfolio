import React from 'react';
import Image from 'next/image';

interface InfiniteVerticalSliderProps {
  src: string;
  alt: string;
}

/**
 * The moon as a sphere rising from the bottom of the menu: the disc is 80vh
 * with its centre on the viewport's bottom edge, so exactly its top half
 * (40% of the screen height) shows. It rotates about its horizontal axis,
 * surface travelling top to bottom. Technique: the asset is a tileable
 * equirectangular surface texture rotated 90° (1:2) — a fixed circular mask
 * + vertical texture slide is what a sphere rolling toward the viewer looks
 * like, and it is transform-only (compositor, 60fps). The track carries two
 * tileable copies and starts one copy above the window, so the loop never
 * runs out of image. Shading and rim glow are pre-baked CSS gradients
 * (globals.css); the glow only pulses opacity. (Component name kept for
 * minimal diff.)
 */
const InfiniteVerticalSlider = ({ src, alt }: InfiniteVerticalSliderProps) => (
  <div className="moon pointer-events-none invisible absolute bottom-0 left-0 h-[48vh] w-full overflow-hidden">
    {/* Rising rim glow — static gradient, opacity-only animation. Sized to
        the disc centre, with headroom above the moon so it is never cut. */}
    <div className="moon-glow absolute bottom-[-46.5vh] left-1/2 aspect-square h-[93vh] -translate-x-1/2 rounded-full" />
    <div className="moon-roll absolute bottom-[-40vh] left-1/2 aspect-square h-[80vh] -translate-x-1/2 overflow-hidden rounded-full">
      {/* Two tileable texture copies; sliding by one copy height = one full
          rotation of the surface around the horizontal axis. */}
      <div className="moon-track flex h-[400%] w-full flex-col will-change-transform">
        <Image
          src={src}
          alt={alt}
          width={1024}
          height={2048}
          draggable={false}
          decoding="async"
          className="h-1/2 w-full select-none"
        />
        <Image
          src={src}
          alt=""
          width={1024}
          height={2048}
          draggable={false}
          decoding="async"
          className="h-1/2 w-full select-none"
        />
      </div>
      {/* Baked sphere shading: top-left key light + darkened limb. */}
      <div className="moon-shading pointer-events-none absolute inset-0" />
    </div>
  </div>
);

export default InfiniteVerticalSlider;
