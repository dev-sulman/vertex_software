"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { GravityText } from "@/components/ui/gravity-text"

export default function CTA() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative glass rounded-[40px] p-12 md:p-24 overflow-hidden group"
                >
                    {/* Background Blobs */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#0C71C3] blur-[100px] -z-10 transition-colors" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#004F8A] blur-[100px] -z-10" />

                    <div className="max-w-3xl flex flex-col items-center text-center mx-auto">
                        <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
                            <GravityText text="Take Your Business to the" />
                            <span className="text-gradient">Next Level</span> Right Now!
                        </h2>
                        <p className="text-xl text-black/90 mb-12 max-w-xl">
                            Don't let your technology hold you back. Partner with Yellow Beam Tech and build the future today.
                        </p>
                        <button className="px-10 py-5 rounded-full bg-[#0557A0] text-white font-black text-xl hover:scale-105 transition-transform flex items-center gap-3">
                            Start Now <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
