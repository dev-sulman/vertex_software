"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

const categories = ["All", "Website Development", "Mobile Application", "Software Development"]

const projects = [
    {
        id: "01",
        category: "Software Development",
        title: "Customer Relationship Management",
        description: "CRM software helps businesses manage customer interactions track sales.",
        image: "/crm_dashboard_showcase_png_1771375620503.png",
        tags: ["Transform Customer Relationships with Ease", "Ultimate tool to simplify lead management", "Boost sales efficiency, and enhance customer"]
    },
    {
        id: "02",
        category: "Mobile Application",
        title: "Digital Banking Solution",
        description: "A secure and intuitive mobile banking app for modern financial needs.",
        image: "/mobile_app_showcase_png_1771375633735.png",
        tags: ["Secure transactions", "User-friendly UI", "Real-time analytics"]
    }
]

export default function SelectedWork() {
    const [activeCategory, setActiveCategory] = useState("All")

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory)

    return (
        <section className="py-24 px-6 bg-deep-obsidian overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-20">
                    <h2 className="text-[42px] md:text-[56px] font-medium text-white leading-[1.1] tracking-tight max-w-xl">
                        Selected Work That <br />
                        Proves Our Capabilities.
                    </h2>

                    {/* Filter Categories */}
                    <div className="flex flex-wrap gap-6 md:pt-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-lg font-medium transition-all relative  pb-1 ${activeCategory === cat ? "text-black" : "text-gray-400 hover:text-gray-700"
                                    }`}
                            >
                                {cat}
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563eb]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Showcase */}
                <div className="flex flex-col gap-24">
                    <AnimatePresence mode="wait">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                viewport={{ once: true }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                            >
                                {/* Left Content */}
                                <div className="flex flex-col items-start">
                                    <div className="mb-6">
                                        <span className="text-[64px] font-medium text-[#2563eb] leading-none inline-block border-b-4 border-[#2563eb] pb-2">
                                            {project.id}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-medium text-black mb-8">
                                        {project.title}
                                    </h3>

                                    <p className="text-xl text-gray-400 font-medium mb-10 max-w-md leading-relaxed">
                                        {project.description}
                                    </p>

                                    <button className="px-10 py-4 rounded-full border-2 border-[#2563eb]/20 text-white font-medium text-lg bg-blue-500 hover:border-[#2563eb] hover:bg-white/5 transition-all active:scale-95 hover:text-black">
                                        More Info
                                    </button>
                                </div>

                                {/* Right Image Showcase */}
                                <div className="relative group">
                                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(37,99,235,0.15)] aspect-[16/10]">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Tag Overlays (as seen in CRM image) */}
                                        {project.id === "01" && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-6 pointer-events-none">
                                                {project.tags?.map((tag, i) => (
                                                    <div
                                                        key={i}
                                                        className="px-6 py-3 bg-[#2563eb] text-white text-sm font-medium rounded-r-full shadow-lg transform translate-x-[-100%] animate-slide-in"
                                                        style={{ animationDelay: `${i * 0.2}s`, animationFillMode: "forwards" }}
                                                    >
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Bottom Shadow Glow */}
                                    <div className="absolute -bottom-8 left-12 right-12 h-12 bg-[#0557A0]/10 blur-[60px] -z-10 rounded-full" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
