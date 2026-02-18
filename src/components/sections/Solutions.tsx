"use client"

import { motion, useMotionValue } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { useRef, useEffect, useState } from "react"

const solutions = [
    {
        title: "Software And AI",
        image: "/webdata/app1.png",
        color: "from-blue-600/20 to-blue-900/40",
        hasSmallArrow: true
    },
    {
        title: "UI/UX Design",
        image: "/webdata/app2.png",
        color: "from-orange-600/20 to-orange-900/40"
    },
    {
        title: "App & Web Development",
        image: "/webdata/web.png",
        color: "from-indigo-600/20 to-indigo-900/40"
    },
    {
        title: "Digital Marketing",
        image: "/webdata/sco-16.png",
        color: "from-slate-600/20 to-slate-900/40"
    }
]

export default function Solutions() {
    const [isPaused, setIsPaused] = useState(false)
    const x = useMotionValue(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const [trackWidth, setTrackWidth] = useState(0)

    // Triple the solutions for a seamless infinite loop
    const displaySolutions = [...solutions, ...solutions, ...solutions]

    useEffect(() => {
        if (containerRef.current) {
            setTrackWidth(containerRef.current.scrollWidth / 3)
        }
    }, [])

    useEffect(() => {
        let lastTime = Date.now()
        let frame: number

        const animate = () => {
            const now = Date.now()
            const delta = now - lastTime
            lastTime = now

            if (!isPaused && trackWidth > 0) {
                let currentX = x.get()
                // Move by pixels per frame (adjust speed here)
                currentX -= 0.05 * delta

                // If we've scrolled past one full set, reset to start of next set
                if (currentX <= -trackWidth) {
                    currentX = 0
                }
                x.set(currentX)
            }
            frame = requestAnimationFrame(animate)
        }

        frame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frame)
    }, [isPaused, trackWidth, x])

    const scroll = (direction: "left" | "right") => {
        const currentX = x.get()
        const shift = 400
        const targetX = direction === "left" ? currentX + shift : currentX - shift
        x.set(targetX)
    }

    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-[40px] md:text-[56px] font-medium text-[#111111] leading-[1.1] tracking-tight mb-4">
                            Customized Solutions <br />
                            for Every Goal
                        </h2>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll("left")}
                            className="w-14 h-14 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform active:scale-95"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-all transform active:scale-95 shadow-lg shadow-blue-500/20"
                        >
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Cards Container */}
                <div
                    className="relative overflow-hidden cursor-grab active:cursor-grabbing pb-12"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <motion.div
                        ref={containerRef}
                        style={{ x }}
                        drag="x"
                        dragConstraints={{ left: -trackWidth * 2, right: 0 }}
                        onDragStart={() => setIsPaused(true)}
                        onDragEnd={() => setIsPaused(false)}
                        className="flex gap-6"
                    >
                        {displaySolutions.map((solution, index) => (
                            <motion.div
                                key={index}
                                className="relative flex-none w-[300px] md:w-[380px] aspect-[4/5] rounded-[2.5rem] overflow-hidden group select-none"
                            >
                                {/* Background Image */}
                                <img
                                    src={solution.image}
                                    alt={solution.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                                />

                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${solution.color} via-black/20 to-transparent pointer-events-none`} />

                                {/* Small Arrow (Optional based on image) */}
                                {solution.hasSmallArrow && (
                                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-900 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="absolute inset-x-0 bottom-0 p-8 pointer-events-none">
                                    <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight">
                                        {solution.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Footer Descriptive Text */}
                <div className="max-w-3xl mx-auto text-center mt-12 mb-12">
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        We combine modern technology with industry leading expertise <br className="hidden md:block" />
                        to deliver solutions that streamline operations.
                    </p>
                </div>

                {/* Bottom Button */}
                <div className="flex justify-center">
                    <button className="px-12 py-5 rounded-full bg-[#11aff9] text-white font-medium text-lg hover:bg-[#11aff991] transition-all transform active:scale-95 shadow-2xl shadow-blue-500/30">
                        View All Solutions
                    </button>
                </div>
            </div>
        </section>
    )
}
