import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const SectionFifth = () => {
  const text = 'I AM AVAILABLE TO COLLABORATE ON A PROJECT OR NEW OPPORTUNITIES';

  const useArrayRef = () => {
    const lettersRef = useRef<HTMLSpanElement[]>([]);
    lettersRef.current = [];
    const setLettersRef = (ref: HTMLSpanElement | null) => {
      if (ref) lettersRef.current.push(ref);
    };
    return [lettersRef, setLettersRef] as const;
  };

  const [lettersRef, setLettersRef] = useArrayRef();
  const triggerTextRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const reveal = gsap.to(lettersRef.current, {
      scrollTrigger: {
        trigger: triggerTextRef.current,
        scrub: true,
        markers: false,
        start: 'top 70%',
        end: 'bottom center',
      },
      color: '#8DAEB6',
      duration: 5,
      stagger: 1,
    });
    return () => {
      reveal.kill();
    };
  });

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-text-default">
      <div className="flex h-full w-full max-w-[650px] items-center justify-center text-center font-trial text-[120px] font-heavy leading-[120px] text-background-about/10">
        <div ref={triggerTextRef}>
          {text.split('').map((letter, index) => (
            <span ref={setLettersRef} key={`${index + 1}`}>
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
