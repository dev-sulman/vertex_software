"use client"

import { motion, Variants } from 'framer-motion'
import { useState, useEffect } from 'react'

interface AssemblingTextProps {
    text: string
    className?: string
    delay?: number
}

export function AssemblingText({ text, className, delay = 0 }: AssemblingTextProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const getAnimation = (index: number): Variants => {
        const angle = Math.random() * 360
        const radius = 150 + Math.random() * 100
        const x = Math.cos(angle * (Math.PI / 180)) * radius
        const y = Math.sin(angle * (Math.PI / 180)) * radius

        return {
            initial: {
                x: x,
                y: y,
                opacity: 0,
                rotate: Math.random() * 90 - 45,
                scale: 2,
            },
            animate: {
                x: 0,
                y: 0,
                opacity: 1,
                rotate: 0,
                scale: 1,
                transition: {
                    type: "spring" as const,
                    stiffness: 70,
                    damping: 12,
                    delay: delay + Math.random() * 0.4 + index * 0.02,
                },
            },
        }
    }

    // Split text into lines, then each line into words, then characters
    const lines = text.split("<br />")

    if (!isMounted) {
        return (
            <h1 className={className}>
                {lines.map((line, idx) => (
                    <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />
                ))}
            </h1>
        )
    }

    return (
        <h1 className={className}>
            {lines.map((line, lineIdx) => (
                <div key={lineIdx} className="flex flex-wrap justify-center items-center gap-x-[0.2em]">
                    {line.trim().split(/\s+/).map((word, wordIdx) => (
                        <span key={`${lineIdx}-${wordIdx}`} className="inline-flex whitespace-nowrap">
                            {word.split("").map((char, charIdx) => (
                                <motion.span
                                    key={`${lineIdx}-${wordIdx}-${charIdx}`}
                                    className="inline-block relative"
                                    variants={getAnimation(charIdx + wordIdx * 10 + lineIdx * 100)}
                                    initial="initial"
                                    animate="animate"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    ))}
                    {lineIdx < lines.length - 1 && <div className="w-full h-0" />}
                </div>
            ))}
        </h1>
    )
}
