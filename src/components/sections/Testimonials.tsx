"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
    {
        name: "Alex Johnson",
        company: "TechFlow Systems",
        text: "Yellow Beam Tech transformed our legacy architecture into a high-performance cloud solution. Their expertise is unmatched.",
        stars: 5,
        avatar: "https://yt3.ggpht.com/kjDysDyGwhoX0qoXUB0k-hF_kJ-rD0Y_6Q6XSEetRZTrbxMqmEMDI2ruyJAw6aD-nFv0dUWC_g=s68-c-k-c0x00ffffff-no-rj",
    },
    {
        name: "Sarah Chen",
        company: "GreenScale AI",
        text: "The web application they built for us is not only beautiful but incredibly fast. Our user engagement has doubled since launch.",
        stars: 5,
        avatar: "https://yt3.ggpht.com/OojW40Ms0XLjG6j-3z91Fs72oAHZMz7tqUEwHjo205_H2g9FI62b4Jvn0QScXZickW3Sx6OOsA=s68-c-k-c0x00ffffff-no-rj",
    },
    {
        name: "Michael Ross",
        company: "Summit Logistics",
        text: "Professional, responsive, and innovative. They truly understand business problems and solve them with elegant code.",
        stars: 5,
        avatar: "https://yt3.ggpht.com/aqro6Y_ladVcRcC6pcliQBhJwNpRVGvaJCr6BIWtrUhIlO02erBj4yfKUDJV7HIuAUQJFcfn9g=s68-c-k-c0x00ffffff-no-rj",
    },
]

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black mb-4"
                    >
                        What Our <span className="text-gradient">Clients</span> Say
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="glass p-8 rounded-3xl flex flex-col gap-6"
                        >
                            <div className="flex gap-1">
                                {[...Array(item.stars)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-[#11aff9] text-[#11aff9]" />
                                ))}
                            </div>
                            <p className="text-lg italic text-black/90 leading-relaxed">
                                "{item.text}"
                            </p>
                            <div className="flex items-center gap-4 mt-auto">
                                <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full glass bg-white/10" />
                                <div>
                                    <div className="font-bold">{item.name}</div>
                                    <div className="text-xs text-white/50 uppercase tracking-wider">{item.company}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
