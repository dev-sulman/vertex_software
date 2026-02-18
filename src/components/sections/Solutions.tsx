"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { useRef } from "react"

const solutions = [
    {
        title: "Medication Abortion",
        image: "/solution_ai_jpg_1771375317844.png",
        color: "from-blue-600/20 to-blue-900/40",
        hasSmallArrow: true
    },
    {
        title: "UI/UX Design",
        image: "/solution_uiux_jpg_1771375333531.png",
        color: "from-orange-600/20 to-orange-900/40"
    },
    {
        title: "App & Web Development",
        image: "/solution_webdev_jpg_1771375348741.png",
        color: "from-indigo-600/20 to-indigo-900/40"
    },
    {
        title: "Digital Marketing",
        image: "/solution_marketing_jpg_1771375364573.png",
        color: "from-slate-600/20 to-slate-900/40"
    }
]

export default function Solutions() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current
            const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
        }
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
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-12 scrollbar-none snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {solutions.map((solution, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative flex-none w-[300px] md:w-[380px] aspect-[4/5] rounded-[2.5rem] overflow-hidden group snap-start cursor-pointer transition-transform duration-500 hover:scale-[0.98]"
                        >
                            {/* Background Image */}
                            <img
                                src={solution.image}
                                alt={solution.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${solution.color} via-black/20 to-transparent`} />

                            {/* Small Arrow (Optional based on image) */}
                            {solution.hasSmallArrow && (
                                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-900 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            )}

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-8">
                                <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight">
                                    {solution.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
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
                    <button className="px-12 py-5 rounded-full bg-[#2563eb] text-white font-medium text-lg hover:bg-blue-700 transition-all transform active:scale-95 shadow-2xl shadow-blue-500/30">
                        View All Solutions
                    </button>
                </div>
            </div>
        </section>
    )
}
