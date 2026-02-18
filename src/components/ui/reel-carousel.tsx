
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types';
import { ProjectModal } from '@/components/ui/project-modal';

interface ReelCarouselProps {
  projects: Project[];
  autoplayDuration?: number;
}


export function ReelCarousel({ projects, autoplayDuration = 6000 }: ReelCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }, autoplayDuration);
    }

    return () => {
      resetTimeout();
    };
  }, [currentIndex, isPlaying, projects.length, autoplayDuration]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const slideVariants = {
    hidden: { opacity: 0, scale: 1.1, filter: 'blur(20px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.95, filter: 'blur(20px)' },
  };

  return (
    <section className="w-full py-32 overflow-hidden bg-[white] flex flex-col items-center">
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Header Section */}
      <div className="container mx-auto px-4 mb-24 relative z-10 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="premium-badge"
        >
          Selected Works
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl sm:text-8xl font-black font-display italic tracking-tighter uppercase text-center"
        >
          Masterpieces <br />
          <span className="text-primary italic">Done</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-500 font-inter mt-8 max-w-lg text-center leading-relaxed"
        >
          Merging technical precision with artistic vision to build digital experiences that redefine the benchmark.
        </motion.p>
      </div>

      <div className="w-full max-w-6xl px-4 flex flex-col items-center">
        {/* Navigation & Progress */}
        <div className="w-full flex justify-between items-end mb-8 px-4">
          <div className="reel-carousel__progress-bars">
            {projects.map((_, index) => (
              <div key={index} className="reel-carousel__progress-bar-container">
                <motion.div
                  key={`${index}-${currentIndex}`}
                  className="reel-carousel__progress-bar"
                  initial={{ width: index < currentIndex ? '100%' : '0%' }}
                  animate={{
                    width: index === currentIndex && isPlaying ? '100%' : (index < currentIndex ? '100%' : '0%')
                  }}
                  transition={{
                    duration: index === currentIndex && isPlaying ? autoplayDuration / 1000 : 0.4,
                    ease: index === currentIndex && isPlaying ? 'linear' : 'easeInOut'
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors mb-4"
          >
            {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
          </button>
        </div>

        {/* Display Frame */}
        <div className="reel-carousel__frame w-full">
          <div className="reel-carousel-container">
            <div className='reel-carousel__slides'>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  className="reel-carousel__slide"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Parallax Image Overlay */}
                  <motion.div
                    initial={{ scale: 1.2, x: 20 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={projects[currentIndex].imageUrl}
                      alt={projects[currentIndex].title}
                      fill
                      className="object-cover z-0"
                      data-ai-hint={projects[currentIndex].aiHint}
                      priority
                    />
                  </motion.div>

                  <div className="reel-carousel__content">
                    <motion.div
                      className="reel-carousel__glass-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2 block">
                        {projects[currentIndex].category}
                      </span>
                      <h3 className="premium-title">{projects[currentIndex].title}</h3>
                      <div className="flex gap-4 mt-8">
                        <button
                          onClick={() => setSelectedProject(projects[currentIndex])}
                          className="bg-white text-black text-xs font-black uppercase px-6 py-3 rounded-full hover:bg-primary transition-all tracking-widest"
                        >
                          View Case
                        </button>
                        <a
                          href={projects[currentIndex].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group hover:bg-primary transition-all"
                        >
                          <ArrowUpRight className="w-5 h-5 group-hover:text-black transition-colors" />
                        </a>
                      </div>
                    </motion.div>

                    <nav className="reel-carousel__nav">
                      <button onClick={handlePrev} className="group">
                        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                      <button onClick={handleNext} className="group">
                        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </nav>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
