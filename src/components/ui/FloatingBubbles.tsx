"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function FloatingBubbles() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isMounted, setIsMounted] = useState(false)

    // Move random data generation into an effect to avoid hydration mismatch
    const [bubbles, setBubbles] = useState<{ id: number; size: number; left: string; top: string; opacity: number; duration: number; delay: number }[]>([])

    useEffect(() => {
        setIsMounted(true)
        const generatedBubbles = Array.from({ length: 40 }).map((_, i) => ({ // More bubbles since they are smaller
            id: i,
            size: Math.random() * 8 + 4, // Very small bubbles (4px to 12px)
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3, // Keep them visible
            duration: Math.random() * 6 + 4,
            delay: Math.random() * 10,
        }))
        setBubbles(generatedBubbles)
    }, [])

    useEffect(() => {
        if (!isMounted || !containerRef.current || bubbles.length === 0) return

        const ctx = gsap.context(() => {
            const items = containerRef.current?.querySelectorAll(".bubble")
            items?.forEach((item, i) => {
                const bubble = bubbles[i]
                if (!bubble) return

                gsap.to(item, {
                    y: "-=150",
                    x: "random(-30, 30)",
                    duration: bubble.duration,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: bubble.delay,
                })

                gsap.to(item, {
                    opacity: bubble.opacity * 0.4,
                    duration: bubble.duration / 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                })
            })
        }, containerRef)

        return () => ctx.revert()
    }, [isMounted, bubbles])

    if (!isMounted) return null

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-10 w-full h-full">
            {bubbles.map((bubble) => (
                <div
                    key={bubble.id}
                    className="bubble absolute rounded-full bg-linear-to-br from-[#3DBEF8] to-[#0C71C3] backdrop-blur-[3px] border border-white/20 shadow-[0_0_15px_rgba(61,190,248,0.3)]"
                    style={{
                        width: bubble.size,
                        height: bubble.size,
                        left: bubble.left,
                        top: bubble.top,
                        opacity: bubble.opacity,
                    }}
                />
            ))}
        </div>
    )
}
