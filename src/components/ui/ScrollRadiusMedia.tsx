"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface ScrollRadiusMediaProps {
    src: string
    type: "image" | "video"
    startRadius?: number
    endRadius?: number
    startPadding?: number
    endPadding?: number
    className?: string
}

export default function ScrollRadiusMedia({
    src,
    type,
    startRadius = 48,
    endRadius = 12,
    startPadding = 40,
    endPadding = 0,
    className = "",
}: ScrollRadiusMediaProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    // Raw scroll-driven values
    const rawBorderRadius = useTransform(scrollYProgress, [0.1, 0.4], [startRadius, endRadius])
    const rawPadding = useTransform(scrollYProgress, [0.1, 0.4], [startPadding, endPadding])
    const rawScale = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1])
    const rawOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

    // Smooth them with springs
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
    const borderRadius = useSpring(rawBorderRadius, springConfig)
    const padding = useSpring(rawPadding, springConfig)
    const scale = useSpring(rawScale, springConfig)
    const opacity = useSpring(rawOpacity, springConfig)

    return (
        <div
            ref={containerRef}
            className={`relative w-full overflow-hidden ${className}`}
            style={{ padding: "0" }} // We control padding via inner motion div
        >
            <motion.div
                style={{
                    borderRadius,
                    padding,
                    scale,
                    opacity,
                }}
                className="w-full h-full overflow-hidden"
            >
                <div className="relative w-full h-full overflow-hidden rounded-[inherit]">
                    {type === "image" ? (
                        <img
                            src={src}
                            alt="Scroll Media"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <video
                            src={src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            </motion.div>
        </div>
    )
}
