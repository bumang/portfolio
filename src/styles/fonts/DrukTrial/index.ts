import localFont from 'next/font/local';

// The site renders display text with Druk Cond Super only. Declared weight is
// 400; `font-synthesis: none` (globals.css) guarantees every browser renders
// the same glyphs instead of synthesizing bold from this single face.
export const drukTrail = localFont({
  src: [
    {
      path: './DrukCond-Super-Trial.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--druk-trail',
});
