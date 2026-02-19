"use client"

import { motion } from "framer-motion"

const benefits = [
    {
        id: "01",
        title: "All Sizes Business",
        desc: "Each business needs a unique approach to grow. We tailor our strategies to fit your specific scale and goals.",
    },
    {
        id: "02",
        title: "Keep You in the Loop",
        desc: "Transparency is our priority. We keep clients informed during the entire development and deployment process.",
    },
    {
        id: "03",
        title: "Continuous Support",
        desc: "We don't just build and leave. We provide long-term technical support and maintenance to ensure your success.",
    },
    {
        id: "04",
        title: "Awesome Results",
        desc: "We deliver measurable improvements in performance, user engagement, and overall business growth.",
    },
]

export default function Benefits() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black"
                    >
                        Grow Your <span className="text-gradient">Business</span> with Us
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100 border border-slate-200 rounded-3xl overflow-hidden">
                    {benefits.map((benefit, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-10 md:p-16 hover:bg-slate-50 transition-colors group"
                        >
                            <div className="text-6xl font-black text-zinc-200 mb-8 group-hover:text-[#0557A0]/80 transition-colors">
                                {benefit.id}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">{benefit.title}</h3>
                            <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                                {benefit.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
