"use client"

import WorkflowNetwork from "@/components/ui/WorkflowNetwork"
import { motion } from "framer-motion"
import { Settings } from "lucide-react"

export default function Technologies() {
    return (
        <section className="relative py-32 px-6 bg-white overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-cyan-400/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 text-center">
                {/* Header Icon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-blue-600 shadow-xl shadow-blue-500/10 mb-8 border border-slate-200"
                >
                    <Settings className="w-8 h-8 animate-spin-slow" />
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-[42px] md:text-[72px] font-medium text-slate-900 leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto"
                >
                    Built with a <span className="text-blue-600">Future-Proof</span> <br className="hidden md:block" />
                    Technology Ecosystem
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-16 font-normal"
                >
                    We leverage the most powerful tools and modern frameworks to ensure
                    your digital products are scalable, secure, and lightning-fast.
                </motion.p>

                {/* Interactive Workflow Network */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative mb-20"
                >
                    <WorkflowNetwork />
                </motion.div>

                {/* Bottom Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="max-w-2xl mx-auto relative z-20"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button className="group relative px-12 py-5 rounded-full bg-blue-600 text-white font-medium text-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] active:scale-95">
                            <span className="relative z-10">Get Free Quote</span>
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>

                        <div className="flex items-center gap-4 p-6 rounded-full border border-none bg-transparent shadow-sm">
                           
                            <span className="text-slate-400 text-sm font-normal">Trusted by 50+ Global Brands</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
