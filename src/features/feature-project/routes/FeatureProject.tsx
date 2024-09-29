import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useMyContext, useTransitionContext } from '@/context';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const projects = [
  { name: 'skyleap', src: 'skyleap.svg' },
  { name: 'space', src: 'space.svg' },
  { name: 'tigg', src: 'tigg.svg' },
  { name: 'xuno', src: 'xuno.svg' },
];

export const FeatureProject = () => {
  const { timeline } = useTransitionContext();
  const { mousePosition, setFromProjectsPage } = useMyContext();

  const router = useRouter();

  const projectPageRef = useRef<HTMLDivElement>(null);

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
  }, []);

  // Handle project click for animation and routing
  const handleProjectClick = (projectName: string) => {
    const clickedIndex = projects.findIndex((project) => project.name === projectName);
    const selectedRef = projectRefs.current[clickedIndex];

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
    timeline.add(
      gsap.to(selectedRef, {
        width: '50vw',
        height: '100vh',
        x: '0vw',
        duration: 1.2,
        ease: 'power2.out',
      }),
      0.6
    );

    router.push(`/project/${projectName}`);
  };

  // Handle mouse move effect for the project container
  useEffect(() => {
    const handleMouseMove = () => {
      if (!projectPageRef.current) return;
      const moveX = -mousePosition.x;
      const moveY = -mousePosition.y;

      const projectPageRect = projectPageRef.current.getBoundingClientRect();
      const maxX = projectPageRect.width - window.innerWidth;
      const maxY = projectPageRect.height - window.innerHeight;

      const offsetY = 88;
      gsap.to(projectPageRef.current, {
        duration: 1,
        x: Math.min(0, Math.max(-maxX, moveX)),
        y: Math.min(offsetY, Math.max(-maxY - offsetY, moveY)),
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
    <div
      ref={projectPageRef}
      className="relative flex h-[160vh] w-[130vw] items-center justify-center"
    >
      <div className="absolute left-[20%] top-[40%] flex-nowrap font-trial text-h1 font-heavy leading-bold tracking-[1rem] text-text-off-white/10">
        SELECT PROJECT
      </div>
      <div className="flex h-[95%] min-w-[95%] flex-col items-end justify-between">
        <div className="flex w-full justify-end">
          <div className="flex w-full max-w-[75%] justify-between">
            {projects.slice(0, 2).map((project, index) => (
              <div className="flex flex-col gap-s16" key={project.name}>
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
                    style={{ width: 'auto', height: 'auto' }}
                    src={`${process.env.NEXT_PUBLIC_PATH_PREFIX ?? ''}/${project.src}`}
                  />
                </div>
                <div className="relative h-fit overflow-y-hidden">
                  <div className="project-name font-trial text-h2 font-heavy leading-medium text-text-default">
                    {project.name.toUpperCase().replace('-', ' ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full">
          <div className="flex w-[90%] justify-around">
            {projects.slice(2).map((project, index) => (
              <div className="flex flex-col gap-s16" key={project.name}>
                <div
                  tabIndex={0}
                  onClick={() => handleProjectClick(project.name)}
                  role="button"
                  ref={(ref) => setProjectRef(ref, index + 2)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleProjectClick(project.name);
                    }
                  }}
                  className="cursor-pointer overflow-hidden"
                >
                  <Image
                    alt={project.name}
                    width={500}
                    height={500}
                    priority
                    style={{ width: 'auto', height: 'auto' }}
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
        </div>
      </div>
    </div>
  );
};
