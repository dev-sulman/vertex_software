"use client"

import React, { useRef } from "react"
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useAnimationFrame,
    useMotionValue,
} from "framer-motion"
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

interface VelocityScrollProps {
    text: string
    default_velocity?: number
    className?: string
}

interface ParallaxProps extends VelocityScrollProps {
    baseVelocity: number
}

function ParallaxText({ text, baseVelocity = 100, className = "" }: ParallaxProps) {
    const distX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    })

    const x = useTransform(distX, (v) => `${wrap(-20, -45, v)}%`)

    const directionFactor = useRef<number>(1)
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get()

        distX.set(distX.get() + moveBy)
    })

    return (
        <div className="overflow-hidden whitespace-nowrap flex flex-nowrap py-4">
            <motion.div
                className={`flex whitespace-nowrap text-[8vw] font-medium uppercase tracking-tighter ${className}`}
                style={{ x }}
            >
                <span className="mr-8">{text} </span>
                <span className="mr-8">{text} </span>
                <span className="mr-8">{text} </span>
                <span className="mr-8">{text} </span>
            </motion.div>
        </div>
    )
}

export default function VelocityScroll({ text, default_velocity = 5, className = "" }: VelocityScrollProps) {
    return (
        <section className="relative z-10 py-12">
            <ParallaxText text={text} baseVelocity={default_velocity} className={className} />
            <ParallaxText text={text} baseVelocity={-default_velocity} className={className} />
        </section>
    )
}
