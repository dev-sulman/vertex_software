'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
    x: number;
    y: number;
    age: number;
}

interface MouseTrailProps {
    color?: string;
    lineWidth?: number;
    trailLength?: number;
    className?: string;
}

export function MouseTrail({
    color = '#111111', // Primary color
    lineWidth = 4,
    trailLength = 10,
    className = "fixed inset-0 pointer-events-none z-9999"
}: MouseTrailProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointsRef = useRef<Point[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const handleResize = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };

            // Add a new point
            pointsRef.current.push({
                x: e.clientX,
                y: e.clientY,
                age: 0
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update points
            // We limit the number of points for performance
            if (pointsRef.current.length > 0) {
                // Only add point if mouse moved enough or on every frame to maintain "trail"
                // For simplicity, handleMouseMove adds them, we just age them here.
            }

            pointsRef.current = pointsRef.current
                .map(p => ({ ...p, age: p.age + 1 }))
                .filter(p => p.age < trailLength);

            if (pointsRef.current.length > 1) {
                for (let i = 1; i < pointsRef.current.length; i++) {
                    const p1 = pointsRef.current[i - 1];
                    const p2 = pointsRef.current[i];

                    // Calculate opacity based on position in trail (i/length)
                    const opacity = i / pointsRef.current.length;

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);

                    ctx.strokeStyle = color;
                    ctx.lineWidth = lineWidth * opacity; // Tail gets thinner
                    ctx.globalAlpha = opacity;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, lineWidth, trailLength]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
