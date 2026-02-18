'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface NightSkyParticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  particleCount?: number;
  shootingStarCount?: number;
  particleColor?: string;
  particleBaseSize?: number;
  speed?: number;
  glow?: [number, number, number]; // [r, g, b]
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  twinkleSpeed: number;
  isShootingStar: boolean;
  trail: { x: number; y: number }[];
}

export function NightSkyParticles({
  particleCount = 600,
  shootingStarCount = 4, // Reduced quantity further
  particleColor = '#FFFFFF',
  particleBaseSize = 1,
  speed = 0.05,
  glow = [255, 255, 255],
  className,
  id,
  ...props
}: NightSkyParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(undefined);

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const { width, height } = canvas;
    particlesRef.current = [];
    const totalParticles = particleCount + shootingStarCount;

    for (let i = 0; i < totalParticles; i++) {
      const isShootingStar = i < shootingStarCount;
      const size = isShootingStar
        ? Math.random() * 1.5 + 1
        : Math.random() * particleBaseSize + 0.5;

      const newParticle: Particle = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        size: size,
        alpha: Math.random() * 0.5 + 0.2,
        maxAlpha: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.015,
        isShootingStar: isShootingStar,
        trail: [],
      };

      if (isShootingStar) {
        // Start in the top-right quadrant
        newParticle.x = Math.random() * width * 0.5 + width * 0.5;
        newParticle.y = Math.random() * height * 0.5;
        // Angle points towards bottom-left (between 90 and 180 degrees)
        const angle = Math.random() * (Math.PI / 2) + (Math.PI / 2);
        const velocity = Math.random() * 8 + 4; // Much faster
        newParticle.vx = Math.cos(angle) * velocity;
        newParticle.vy = Math.sin(angle) * velocity;
      } else {
        newParticle.vx = (Math.random() - 0.5) * speed;
        newParticle.vy = (Math.random() - 0.5) * speed;
      }

      particlesRef.current.push(newParticle);
    }
  }, [particleCount, shootingStarCount, particleBaseSize, speed]);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const { width, height } = canvas;
    // Use a semi-transparent fill to create a subtle trail effect for everything
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, width, height);

    particlesRef.current.forEach(p => {
      // Add current position to trail for shooting stars
      if (p.isShootingStar) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 15) { // Keep trail length manageable
          p.trail.shift();
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      // Reset shooting stars when they go off-screen
      if (p.isShootingStar && (p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50)) {
        // Restart in the top-right
        p.x = Math.random() * width * 0.5 + width * 0.5;
        p.y = Math.random() * height * 0.2; // Start higher up

        // New velocity towards bottom-left
        const angle = Math.random() * (Math.PI / 2) + (Math.PI / 2);
        const velocity = Math.random() * 8 + 4;
        p.vx = Math.cos(angle) * velocity;
        p.vy = Math.sin(angle) * velocity;
        p.trail = []; // Clear trail
      } else if (!p.isShootingStar) {
        // Wrap around for normal stars
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }

      // Twinkling for normal stars
      if (!p.isShootingStar) {
        p.alpha += p.twinkleSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
          p.twinkleSpeed *= -1;
        }
      }

      // Draw trail for shooting stars
      if (p.isShootingStar) {
        for (let i = 0; i < p.trail.length; i++) {
          const trailPos = p.trail[i];
          const trailAlpha = (i / p.trail.length) * 0.5; // Fade out
          ctx.beginPath();
          const g = ctx.createRadialGradient(trailPos.x, trailPos.y, 0, trailPos.x, trailPos.y, p.size);
          g.addColorStop(0, `rgba(${glow[0]}, ${glow[1]}, ${glow[2]}, ${trailAlpha})`);
          g.addColorStop(1, `rgba(${glow[0]}, ${glow[1]}, ${glow[2]}, 0)`);
          ctx.fillStyle = g;
          ctx.arc(trailPos.x, trailPos.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw particle
      ctx.beginPath();
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
      g.addColorStop(0, `rgba(${glow[0]}, ${glow[1]}, ${glow[2]}, ${p.alpha * 0.7})`);
      g.addColorStop(1, `rgba(${glow[0]}, ${glow[1]}, ${glow[2]}, 0)`);
      ctx.fillStyle = g;
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = particleColor;
      ctx.globalAlpha = p.alpha;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }, [glow, particleColor]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawParticles(ctx, canvas);
    animationFrameId.current = requestAnimationFrame(animate);
  }, [drawParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const { devicePixelRatio: ratio = 1 } = window;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      initParticles(canvas);
    };

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate, initParticles]);

  return (
    <div id={id} className={cn("absolute inset-0 w-full h-full", className)} {...props}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
