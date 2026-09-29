import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { useMyContext, useTransitionContext } from '@/context';
import { cn } from '@/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP, ScrollToPlugin);
}

const projects = [
  {
    name: 'diversio',
    src: 'diversio.svg',
    bgColor: '#5B34E9',
    position: 'left-[27%] top-[5%]',
  },
  {
    name: 'optimo-teams',
    src: 'optimo-teams.svg',
    bgColor: '#7B61FF',
    position: 'left-[65%] top-[5%]',
  },
  { name: 'skyleap', src: 'skyleap.svg', bgColor: '#167DCE', position: 'left-[8%] top-[37%]' },
  { name: 'tigg', src: 'tigg.svg', bgColor: '#8483CE', position: 'left-[46%] top-[37%]' },
  { name: 'xuno', src: 'xuno.svg', bgColor: '#00A6A6', position: 'left-[27%] top-[69%]' },
  { name: 'space', src: 'space.svg', bgColor: '#F4B21A', position: 'left-[65%] top-[69%]' },
];

export const FeatureProject = () => {
  const { timeline } = useTransitionContext();
  const { mousePosition, setFromProjectsPage } = useMyContext();
  const router = useRouter();

  const projectPageRef = useRef<HTMLDivElement>(null);
  const projectSlideOut = useRef<HTMLDivElement>(null);

  const projectRefs = useRef<HTMLDivElement[]>([]);

  const setProjectRef = (ref: HTMLDivElement | null, index: number) => {
    if (ref) projectRefs.current[index] = ref;
  };

  // Initial animations on load
  useGSAP(() => {
    gsap.set('.project-name', {
      transform: 'translate(0px, 100%)',
      visibility: 'hidden',
    });
    gsap.set(projectRefs.current, {
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      opacity: 0,
    });

    gsap.to(projectRefs.current, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      opacity: 1,
      delay: 1.2,
      duration: 1,
      ease: 'power2.out',
    });

    gsap.to('.project-name', {
      autoAlpha: 1,
      visibility: 'visible',
      transform: 'translate(0px, 0%)',
      delay: 1.2,
      stagger: {
        each: 0.05,
      },
      duration: 0.5,
    });

    timeline.add(
      gsap.to('.project-name', {
        autoAlpha: 1,
        visibility: 'visible',
        transform: 'translate(0px, -100%)',
        stagger: {
          each: 0.05,
        },
        duration: 0.5,
      }),
      0
    );
  }, []);

  // Handle project click for animation and routing
  const handleProjectClick = (projectName: string) => {
    if (!projectPageRef.current) return;
    const clickedIndex = projects.findIndex((project) => project.name === projectName);
    const selectedRef = projectRefs.current[clickedIndex];

    // Get the background color of the selected project
    const selectedProject = projects[clickedIndex];
    const { bgColor } = selectedProject;

    const rect = selectedRef.getBoundingClientRect(); // Get the current position of the image
    const containerRect = projectPageRef.current.getBoundingClientRect();

    setFromProjectsPage(true);

    timeline.add(
      gsap.to('.project-name', {
        autoAlpha: 1,
        visibility: 'visible',
        transform: 'translate(0px, -100%)',
        stagger: {
          each: 0.05,
        },
        duration: 0.5,
      }),
      0
    );

    // Set the dynamic background color of projectSlideOut
    timeline.to(projectSlideOut.current, { backgroundColor: `${bgColor}` }, '-=0.6');

    timeline.to(
      projectSlideOut.current,
      {
        transform: 'translateY(100%)',
        visibility: 'visible',
        display: 'block',
        duration: 0.8,
        ease: 'power4.inOut',
      },
      '-=0.5'
    );

    // Non-selected projects fade out
    projectRefs.current.forEach((projectRef, index) => {
      if (index !== clickedIndex) {
        timeline.add(
          gsap.to(projectRef, {
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
            opacity: 1,
            duration: 0.8,
            ease: 'power2.in',
          }),
          0.2
        );
      }
    });

    const targetX = -(rect.left - containerRect.left) + (window.innerWidth * 0.25 - rect.width / 2);
    const targetY = -(rect.top - containerRect.top) + (window.innerHeight / 2 - rect.height / 2);

    // Scroll to ensure the selected project image is centered in the left-middle of the viewport
    gsap.set(projectPageRef.current, {
      overflow: 'hidden',
      position: 'relative',
    });

    timeline.add(
      gsap.to(selectedRef, {
        duration: 2,
        ease: 'power2.out',
        width: '611px',
        zIndex: 9999, // Ensure the image is above projectSlideOut
      }),
      0
    );
    timeline.add(
      gsap.to(projectPageRef.current, {
        x: targetX, // Align the image to the left quarter of the viewport
        y: targetY,
        duration: 1.6,
        ease: 'power2.out',
      }),
      0.2
    );

    router.push(`/project/${projectName}`);
  };

  // Handle mouse move effect for the project container
  useEffect(() => {
    const handleMouseMove = () => {
      if (!projectPageRef.current) return;

      const projectPageRect = projectPageRef.current.getBoundingClientRect();
      const maxX = projectPageRect.width - window.innerWidth;
      const maxY = projectPageRect.height - window.innerHeight;
      const offsetY = 88;

      // Normalize the pointer position so the whole canvas is reachable:
      // pointer at top-left shows the canvas origin, pointer at bottom-right
      // shows the canvas end (compensating for the fixed header padding).
      const normX = Math.min(1, Math.max(0, mousePosition.x / window.innerWidth));
      const normY = Math.min(1, Math.max(0, mousePosition.y / window.innerHeight));

      gsap.to(projectPageRef.current, {
        duration: 1,
        x: -maxX * normX,
        y: -(maxY + offsetY) * normY,
        ease: 'power2.out',
        force3D: true,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <div className="relative h-full w-full">
      <div ref={projectPageRef} className="relative h-[210vh] w-[140vw]">
        <div className="absolute left-[8%] top-[44%] flex-nowrap font-trial text-h1 font-heavy leading-bold tracking-[1rem] text-text-off-white/10">
          SELECT PROJECT
        </div>
        {projects.map((project, index) => (
          <div
            className={cn('absolute flex w-[500px] flex-col gap-s16', project.position)}
            key={project.name}
          >
            <div
              className="cursor-pointer overflow-hidden"
              tabIndex={0}
              onClick={() => handleProjectClick(project.name)}
              ref={(ref) => setProjectRef(ref, index)}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleProjectClick(project.name);
                }
              }}
            >
              <Image
                alt={project.name}
                width={500}
                height={500}
                priority
                className="w-full object-contain"
                src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/${project.src}`}
              />
            </div>
            <div className="relative h-fit overflow-y-hidden">
              <div className="project-name invisible font-trial text-h2 font-heavy leading-medium text-text-default">
                {project.name.toUpperCase().replace('-', ' ')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamically set the background color using cn and project-specific class */}
      <div
        ref={projectSlideOut}
        className={cn('invisible fixed left-0 top-[-100vh] z-[70] hidden h-full w-full')}
      />
    </div>
  );
};
