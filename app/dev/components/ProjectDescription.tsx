'use client';

import { useRef } from 'react';
import { motion, type MotionValue, useTransform } from 'framer-motion';
import { timing } from '../config/timing';

type ProjectDescriptionProps = {
  project: {
    title: string;
    description: string;
    technologies: string[];
  };
  sectionProgress: MotionValue<number>;
};

export default function ProjectDescription({ project, sectionProgress }: ProjectDescriptionProps) {
  const ref = useRef(null);

  // Description animations
  const contentY = useTransform(
    sectionProgress,
    [timing.projects.description.animStart, timing.projects.description.animEnd],
    [50, 0]
  );

  return (
    <div ref={ref} className='fixed top-0 left-0 w-full h-screen flex items-center justify-center'>
      <motion.div
        className='flex flex-col items-center justify-center'
        style={{
          y: contentY,
        }}
      >
        {/* Content Container with Card Styling */}
        <div
          className="flex flex-col items-center justify-center gap-12 max-w-4xl px-8 py-10 mx-4 
             bg-black/80 backdrop-blur-sm
             border border-gray-600
             rounded-xl
             shadow-[0_0_25px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.3)]
             relative
             before:content-[''] before:absolute before:inset-0 before:border-t before:border-l before:border-gray-500/30 before:rounded-xl
             after:content-[''] after:absolute before:inset-0 after:border-b after:border-r after:border-gray-800/50 after:rounded-xl"
        >
          {/* Description */}
          <div className='w-full'>
            <p className='text-lg text-white/90 leading-relaxed whitespace-pre-line text-center'>
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className='w-full'>
            <h3 className='text-xl font-semibold text-center text-[#00ffaa] mb-4'>
              Technologies Used
            </h3>
            <div className='flex flex-wrap justify-center gap-3'>
              {project.technologies.map((tech, index) => (
                <div
                  key={index}
                  className='px-4 py-2 bg-white/10 rounded-full text-white backdrop-blur-sm border border-gray-700/50'
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
