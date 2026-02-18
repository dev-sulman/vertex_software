
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GravityTextProps {
  text: string;
  className?: string;
}

export function GravityText({ text, className }: GravityTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getAnimation = (index: number): any => {
    const angle = Math.random() * 360;
    const radius = 80 + Math.random() * 50;
    const x = Math.cos(angle * (Math.PI / 180)) * radius;
    const y = Math.sin(angle * (Math.PI / 180)) * radius;

    return {
      initial: {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
      },
      hover: {
        x: x,
        y: y,
        rotate: Math.random() * 180 - 90,
        scale: 1.2,
        transition: {
          type: 'spring',
          stiffness: 150,
          damping: 15,
          delay: Math.random() * 0.2,
        },
      },
    };
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('relative h-20 flex items-center justify-center', className)}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block relative cursor-pointer"
          variants={getAnimation(index)}
          initial="initial"
          animate={isHovered ? 'hover' : 'initial'}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
