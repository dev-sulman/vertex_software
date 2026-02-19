"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView, useSpring, useTransform } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

// --- 3D Background Component ---
function StatsBackground() {
    const pointsRef = useRef<THREE.Points>(null)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (pointsRef.current) {
            pointsRef.current.rotation.y = t * 0.05
            pointsRef.current.rotation.x = t * 0.02
        }
    })

    return (
        <group>
            <Points positions={new Float32Array(1000 * 3).map(() => (Math.random() - 0.5) * 20)} stride={3}>
                <PointMaterial
                    transparent
                    color="#0C71C3"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    )
}

const stats = [
    {
        label: "Years of Experience",
        value: "7+",
        video: "/videos/hero.mp4"
    },
    {
        label: "Global Clientele",
        value: "320+",
        video: "/videos/dark-it-office-with-computers-2025-12-17-05-53-22-utc.mov"
    },
    {
        label: "Pool of Talent",
        value: "150+",
        video: "/videos/procurement-management-infographic-2026-01-28-04-16-56-utc.mov"
    },
    {
        label: "Happy Customers",
        value: "95%",
        video: "/videos/hero.mp4"
    }
]

function NumberCounter({ value, isHovered, isFirst }: { value: string, isHovered: boolean, isFirst: boolean }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const num = parseFloat(value.replace(/[^0-9.]/g, ''))
    const suffix = value.replace(/[0-9.]/g, '')

    const springValue = useSpring(0, {
        duration: 2000,
        bounce: 0,
    })

    const displayValue = useTransform(springValue, (latest) => {
        return Math.floor(latest).toString() + suffix
    })

    useEffect(() => {
        if (isInView) {
            springValue.set(num)
        }
    }, [isInView, num, springValue])

    return (
        <motion.span
            ref={ref}
            animate={{ scale: isHovered || isFirst ? 1.1 : 1 }}
            className={`text-6xl md:text-8xl font-bold tracking-tighter transition-colors duration-500 ${isHovered || isFirst ? 'text-white' : 'text-slate-900'}`}
        >
            <motion.span>{displayValue}</motion.span>
        </motion.span>
    )
}

export default function NextGenStats() {
    return (
        <section className="relative min-h-screen bg-white py-24 overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-10">
                <Canvas camera={{ position: [0, 0, 10] }}>
                    <StatsBackground />
                </Canvas>
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16 h-full">
                {/* Left Content */}
                <div className="lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-[#0557A0] rounded-full flex items-center justify-center p-2 shadow-[0_0_20px_rgba(12,113,195,0.4)]">
                                <div className="w-full h-full bg-white rounded-full" />
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-light text-slate-400 mb-2 tracking-tight">NextGen Solutions</h2>
                        <h3 className="text-4xl md:text-6xl font-medium text-[#0557A0] mb-8 leading-[1.1] tracking-tighter">
                            Powered by <br />
                            <span className="text-slate-800">Innovation + Ingenuity</span>
                        </h3>
                        <p className="text-slate-500 text-lg md:text-xl mb-12 max-w-lg leading-relaxed font-light">
                            We excel in delivering comprehensive business solutions using cutting edge technologies.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-4 border border-[#11aff9]/30 text-[#0557A0] rounded-xl hover:bg-[#0557A0]/10 transition-all text-lg font-medium"
                        >
                            Get Quote
                        </motion.button>
                    </motion.div>
                </div>

                {/* Right Grid */}
                <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                    {stats.map((stat, idx) => (
                        <StatCard key={idx} stat={stat} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function StatCard({ stat, index }: { stat: any, index: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const isFirst = index === 0
    const isActive = isHovered || isFirst

    useEffect(() => {
        if (isActive && videoRef.current) {
            videoRef.current.play().catch(() => { })
        } else if (videoRef.current && !isFirst) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }, [isActive, isFirst])

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative aspect-square rounded-[40px] overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -10, borderColor: "rgba(12,113,195,0.5)" }}
        >
            {/* Base Background (shown when NOT hovered) - Deep Black */}
            <div className={`absolute inset-0 bg-[white] transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`} />

            {/* Hover Glow */}
            <div className={`absolute inset-0  bg-white transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

            {/* Video Background (revealed on hover or first card) */}
            <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <video
                    ref={videoRef}
                    src={stat.video}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 " />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 p-10 flex flex-col justify-between">
                <motion.span
                    animate={{ y: isActive ? -5 : 0 }}
                    className={`text-xl md:text-2xl font-medium tracking-tight transition-colors duration-500 ${isActive ? 'text-white/30' : 'text-slate-600'}`}
                >
                    {stat.label}
                </motion.span>
                <NumberCounter value={stat.value} isHovered={isHovered} isFirst={isFirst} />
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>
    )
}
