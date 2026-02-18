'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [cursorText, setCursorText] = useState('');

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const outerSpringConfig = { damping: 20, stiffness: 200, mass: 0.8 };
    const outerX = useSpring(cursorX, outerSpringConfig);
    const outerY = useSpring(cursorY, outerSpringConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [role="button"], input, textarea, .interactive');
            setIsHovered(!!isInteractive);

            // For special text data attributes
            const textElement = target.closest('[data-cursor]') as HTMLElement;
            if (textElement) {
                setCursorText(textElement.getAttribute('data-cursor') || '');
            } else {
                setCursorText('');
            }
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
    }, [cursorX, cursorY, isVisible]);

    return (
        <>
            {/* Outer Circle */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center overflow-hidden"
                style={{
                    translateX: outerX,
                    translateY: outerY,
                    x: '-50%',
                    y: '-50%',
                    scale: isHovered ? 2.5 : 1,
                    opacity: isVisible ? 1 : 0,
                    backgroundColor: isHovered ? 'rgba(225, 255, 1, 0.1)' : 'transparent',
                }}
                transition={{
                    scale: { type: 'spring', stiffness: 300, damping: 20 },
                    opacity: { duration: 0.2 }
                }}
            >
                {cursorText && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[6px] font-bold text-black uppercase tracking-widest whitespace-nowrap"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </motion.div>

            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: springX,
                    translateY: springY,
                    x: '-50%',
                    y: '-50%',
                    scale: isHovered ? 0 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
            />
        </>
    );
}
