"use client"

import { motion } from "framer-motion"
import { Code2, Globe, Smartphone, Palette, ArrowRight } from "lucide-react"

const services = [
    {
        title: "Software Development",
        desc: "Your software must engage users instantly with an intuitive experience.",
        icon: Code2,
        color: "#0C71C3",
    },
    {
        title: "Web Development",
        desc: "Your website has to impress visitors within seconds.",
        icon: Globe,
        color: "#004F8A",
    },
    {
        title: "App Development",
        desc: "Your app must capture users’ attention immediately.",
        icon: Smartphone,
        color: "white",
    },
    {
        title: "UI/UX & Marketing",
        desc: "Strategic design and digital marketing to scale your reach.",
        icon: Palette,
        color: "#0C71C3",
    },
]

export default function Services() {
    return (
        <section id="services" className="py-24 px-6 bg-blue-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black mb-4 text-black/90"
                    >
                        Best <span className="text-gradient">Services</span> for Business
                    </motion.h2>
                    <p className="text-black/50 text-lg">We provide comprehensive solutions tailored to your needs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                    {services.map((service, idx) => (
                        <ServiceCard key={idx} service={service} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ServiceCard({ service, index }: { service: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl group b hover:border-[#0C71C3]/50 transition-all duration-500 relative overflow-hidden"
        >
            <div className="mb-6 p-4 w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-400 group-hover:text-white transition-all">
                <service.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-white/50 leading-relaxed mb-8">
                {service.desc}
            </p>
            <button className="text-sm font-bold flex items-center gap-2 group/btn hover:text-[#0C71C3] transition-colors">
                Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>

            {/* Decorative Gradient */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#0C71C3]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    )
}
