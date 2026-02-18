"use client"

import { motion } from "framer-motion"
import { ArrowRight, Layout, CheckCircle2, Eye, PenTool, MousePointer2, Palette, ChevronDown } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useState } from "react"

export default function UiUxDesign() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px] -translate-x-1/2" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100/50 text-purple-600 font-medium text-sm mb-8">
                            <Layout className="w-4 h-4" />
                            <span>User-Centric Design</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-medium text-slate-900 mb-8 leading-[1.1] tracking-tight">
                            Intuitive & Engaging <br />
                            <span className="text-purple-600">UI/UX Design</span>
                        </h1>

                        <p className="text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
                            We craft digital experiences that are not only visually stunning but also intuitive and user-friendly. Our design process focuses on user needs to drive engagement and satisfaction.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 rounded-full bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-500/20 active:scale-95 flex items-center justify-center gap-2">
                                Start Designing <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="py-24 px-6 bg-slate-50/50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-[2rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex items-center justify-center">
                                <Palette className="w-32 h-32 text-purple-600 opacity-10" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="grid grid-cols-2 gap-4 p-8">
                                        {[
                                            { icon: Eye, label: "Visuals" },
                                            { icon: MousePointer2, label: "Interactive" },
                                            { icon: PenTool, label: "Creative" },
                                            { icon: Layout, label: "Layouts" }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-50 flex flex-col items-center gap-3">
                                                <item.icon className="w-8 h-8 text-purple-600" />
                                                <span className="text-sm font-medium text-slate-900">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight">
                                Design That Works
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                                Great design is about problem-solving. We use research, prototyping, and testing to ensure that every pixel serves a purpose and enhances the user journey from start to finish.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Deep User Research & Persona Mapping",
                                    "Interactive Wireframing & Prototyping",
                                    "Modern Visual Design & Brand Identity",
                                    "Usability Testing & Conversion Optimization",
                                    "Scalable Design Systems & Style Guides"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 group">
                                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0 mt-0.5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-lg font-medium text-slate-700 group-hover:text-purple-600 transition-colors">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-medium text-slate-900 mb-4">Our Creative Journey</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Blending art and science to create exceptional digital products.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Empathize", desc: "Understanding user needs and challenges." },
                            { step: "02", title: "Ideate", desc: "Brainstorming and sketching solutions." },
                            { step: "03", title: "Prototype", desc: "Building interactive high-fidelity models." },
                            { step: "04", title: "Validate", desc: "Testing with real users for feedback." }
                        ].map((item, i) => (
                            <div key={i} className="relative p-8 rounded-3xl bg-slate-50 hover:bg-purple-50 transition-colors group">
                                <div className="text-4xl font-black text-slate-200 mb-4 group-hover:text-purple-600 transition-colors">{item.step}</div>
                                <h3 className="text-xl font-medium text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Design Ecosystem */}
            <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent " />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Professional Design Ecosystem</h2>
                        <p className="text-purple-200/60 max-w-2xl mx-auto">We use best-in-class tools to bring your vision to life.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 opacity-50">
                        {["Figma", "Adobe XD", "Sketch", "Photoshop", "After Effects", "Framer", "Lottie", "Zeplin"].map((tech) => (
                            <span key={tech} className="text-2xl md:text-4xl font-black">{tech}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-medium text-slate-900 mb-12 text-center">UI/UX Design FAQs</h2>
                    <div className="space-y-4">
                        {[
                            { q: "What is the difference between UI and UX?", a: "UI (User Interface) focuses on the visual elements of a product, while UX (User Experience) focuses on the overall feel and usability of the interaction." },
                            { q: "How long does the design process take?", a: "A typical UI/UX project can range from 2 weeks for a small feature to 8-12 weeks for a complete platform redesign." },
                            { q: "Do you provide Figma files?", a: "Yes, we provide fully organized and layered Figma source files, including all components, styles, and assets." },
                            { q: "Can you redesign my existing website or app?", a: "Definitely. We specialize in revamping legacy interfaces to improve usability, accessibility, and modern aesthetics." }
                        ].map((faq, i) => (
                            <FAQItem key={i} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
            >
                <span className="text-lg font-medium text-slate-900">{question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}>
                <div className="p-6 pt-0 text-slate-500 leading-relaxed border-t border-slate-50 bg-slate-50/30">
                    {answer}
                </div>
            </div>
        </div>
    )
}
