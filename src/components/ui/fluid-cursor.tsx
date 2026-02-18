'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const OUTER_SEGMENTS = 14;
const INNER_SEGMENTS = 8;

export function FluidCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Outer "Fluid" segments
    const outerSprings = Array.from({ length: OUTER_SEGMENTS }).map((_, i) => {
        const config = {
            damping: 30 + i * 2,
            stiffness: 220 - i * 8,
            mass: 1.1 + i * 0.1
        };
        return {
            x: useSpring(mouseX, config),
            y: useSpring(mouseY, config)
        };
    });

    // Inner "Plasma" segments (Faster, tighter)
    const innerSprings = Array.from({ length: INNER_SEGMENTS }).map((_, i) => {
        const config = {
            damping: 20 + i * 1.5,
            stiffness: 300 - i * 15,
            mass: 0.8 + i * 0.05
        };
        return {
            x: useSpring(mouseX, config),
            y: useSpring(mouseY, config)
        };
    });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            setIsHovered(!!target.closest('a, button, [role="button"], input, textarea, .interactive'));
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    return (
        <>
            <svg style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="fluid-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 32 -12"
                            result="goo"
                        />
                    </filter>
                </defs>
            </svg>

            <div
                className="fixed inset-0 pointer-events-none z-[99999]"
                style={{ filter: 'url(#fluid-goo)' }}
            >
                <AnimatePresence>
                    {isVisible && (
                        <>
                            {/* Outer Layer */}
                            {outerSprings.map((spring, i) => (
                                <motion.div
                                    key={`outer-${i}`}
                                    className="absolute top-0 left-0 rounded-full bg-primary"
                                    style={{
                                        x: spring.x,
                                        y: spring.y,
                                        translateX: '-50%',
                                        translateY: '-50%',
                                        width: isHovered ? (50 - i * 3) : (42 - i * 2.5),
                                        height: isHovered ? (50 - i * 3) : (42 - i * 2.5),
                                        opacity: 1 - (i / OUTER_SEGMENTS) * 0.5,
                                    }}
                                    animate={{
                                        scale: isHovered ? [1.1, 1.2, 1.1] : [1, 1.08, 1],
                                        rotate: [0, 90, 180, 270, 360],
                                    }}
                                    transition={{
                                        scale: { duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut" },
                                        rotate: { duration: 15 + i, repeat: Infinity, ease: "linear" }
                                    }}
                                />
                            ))}

                            {/* Inner Hot Layer */}
                            {innerSprings.map((spring, i) => (
                                <motion.div
                                    key={`inner-${i}`}
                                    className="absolute top-0 left-0 rounded-full bg-white/40"
                                    style={{
                                        x: spring.x,
                                        y: spring.y,
                                        translateX: '-50%',
                                        translateY: '-50%',
                                        width: isHovered ? (25 - i * 2) : (20 - i * 2),
                                        height: isHovered ? (25 - i * 2) : (20 - i * 2),
                                        opacity: (1 - (i / INNER_SEGMENTS)) * 0.6,
                                    }}
                                    animate={{
                                        scale: [1, 1.15, 1],
                                    }}
                                    transition={{
                                        scale: { duration: 1.5 + i * 0.1, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Precision Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[100000] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? (isHovered ? 0 : 0.9) : 0,
                }}
            />
        </>
    );
}
