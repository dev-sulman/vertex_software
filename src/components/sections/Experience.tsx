"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ScrollRadiusMedia from "@/components/ui/ScrollRadiusMedia"
import Image from "next/image"

const stats = [
    { number: "30+", label: "Years of Experience in Technology" },
    { number: "5k+", label: "Worldwide Happy Customers" },
]

export default function Experience() {
    return (
        <section className=" bg-[#ffffff] overflow-hidden">
            <div className="max-w-9xl mx-auto">
                <div className="space-y-4 mb-4">



                </div>

                {/* Info Block (Glassmorphism) */}
                <div className="relative rounded-[3rem] bg-white border border-slate-200 shadow-xl p-12 lg:p-24 overflow-hidden">
                    {/* Abstract Background Icon */}
                    <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-5 pointer-events-none select-none">
                        <svg viewBox="0 0 400 300" className="w-full h-full text-white fill-current">
                            <path d="M120,100 C80,100 50,130 50,170 C50,210 80,240 120,240 L180,240 C180,240 220,240 220,200 L220,195 C220,175 205,160 185,160 C165,160 150,175 150,195 L150,200 C150,200 150,210 120,210 C100,210 85,195 85,175 C85,155 100,140 120,140 L180,140 C220,140 250,170 250,210 C250,250 220,280 180,280 L120,280 C60,280 20,240 20,180 C20,120 60,80 120,80 L180,80 C180,80 220,80 220,120 L220,125 C220,145 235,160 255,160 C275,160 290,145 290,125 L290,120 C290,120 290,110 320,110 C340,110 355,125 355,145 C355,165 340,180 320,180 L260,180 C220,180 190,150 190,110 C190,70 220,40 260,40 L320,40 C380,40 420,80 420,140 C420,200 380,240 320,240 L260,240 C260,240 220,240 220,280" />
                        </svg>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        {/* Stats Column */}
                        <div className="lg:col-span-4 flex flex-col gap-12 border-slate-200 lg:border-r lg:pr-12">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="text-6xl lg:text-7xl font-medium text-[#0557A0] mb-3 text-glow">
                                        {stat.number}
                                    </div>
                                    <div className="text-slate-800 text-lg font-medium leading-tight max-w-[200px]">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Content Column */}
                        <div className="lg:col-span-8 lg:pl-12">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-4xl lg:text-7xl font-medium text-slate-900 mb-10 leading-[1.1] tracking-tight"
                            >
                                Turning Ideas Into <br />
                                <span className="text-gradient">Cutting Edge Technology</span>
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="space-y-8 text-slate-700 text-xl leading-relaxed max-w-3xl font-medium"
                            >
                                <p>
                                    We don't just build software — we craft digital experiences that <span className="text-[#0557A0] font-semibold">inspire users</span> and accelerate business growth through smart, scalable technology.
                                </p>
                                <p>
                                    Our solutions are designed with precision, blending creativity, innovation, and functionality to deliver <span className="text-[#0557A0] font-bold">seamless performance</span> across every platform.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final Full Width Image Transition */}
            <div className="w-screen relative left-1/2 -translate-x-1/2 mt-4">
                <Image
                    src="/traffic-trail-with-building-2026-01-09-08-43-52-utc.jpg"
                    alt="Hero Wave"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
            </div>
        </section>
    )
}
