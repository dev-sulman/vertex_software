"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function About() {
    const stats = [
        { value: "4+", label: "Years Exp", color: "text-[#0C71C3]" },
        { value: "37+", label: "Projects", color: "text-[#004F8A]", offset: true },
        { value: "42+", label: "Developers", color: "text-white" },
        { value: "99%", label: "Satisfaction", color: "text-[#0C71C3]", offset: true },
    ]

    return (
        <section id="about" className="py-24 px-6 relative overflow-hidden bg-[#0557A0]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-[#e8eaec] font-medium tracking-widest uppercase mb-4 text-sm">
                        About VertxSoft
                    </div>
                    <h2 className="text-4xl md:text-6xl font-medium mb-8 leading-tight text-white">
                        We solve business <br />
                        problems with <span className="text-white bg-clip-text">technology</span>
                    </h2>
                    <div className="space-y-6 text-white/70 text-lg md:text-xl leading-relaxed">
                        <p>
                            From web and mobile app development to AI and automation, our team helps businesses streamline operations, improve user experiences, and scale efficiently.
                        </p>
                        <p>
                            We combine cutting-edge technology with industry expertise to accelerate growth. Our mission is to transform complex challenges into seamless digital experiences.
                        </p>
                    </div>
                    <button className="mt-10 px-8 py-4 rounded-full glass font-bold hover:bg-white/10 transition-colors flex items-center gap-2 group text-white">
                        Know More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-square glass rounded-3xl overflow-hidden shadow-2xl"
                >
                    <img
                        src="/newlogoimages/logo1.png"
                        alt="About VertxSoft"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 p-8 flex items-center justify-center overflow-hidden z-20">
                        {/* Decorative Elements */}
                        <div className="absolute top-10 left-10 w-20 h-20 bg-[#0C71C3]/30 rounded-full blur-xl animate-pulse" />
                        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#004F8A]/30 rounded-full blur-2xl animate-pulse delay-700" />

                        <div className="grid grid-cols-2 gap-6 w-full h-full relative z-30">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: stat.offset ? 32 : 0 }}
                                    whileHover={{
                                        scale: 1.05,
                                        y: (stat.offset ? 32 : 0) - 10,
                                        backgroundColor: "rgba(255, 255, 255, 0.15)"
                                    }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`glass rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer border border-white/10 shadow-xl`}
                                >
                                    <span className={`text-5xl md:text-7xl font-black ${stat.color} mb-2 drop-shadow-lg`}>
                                        {stat.value}
                                    </span>
                                    <span className="text-sm md:text-lg uppercase tracking-[0.2em] font-bold text-white/90">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
