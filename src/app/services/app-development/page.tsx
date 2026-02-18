"use client"

import { motion } from "framer-motion"
import { ArrowRight, Smartphone, CheckCircle2, Tablet, Layers, Zap, Shield, ChevronDown } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useState } from "react"

export default function AppDevelopment() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-50/40 rounded-full blur-[100px] -translate-x-1/2" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/50 text-brand-blue font-medium text-sm mb-8">
                            <Smartphone className="w-4 h-4" />
                            <span>Mobile-First Innovation</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-medium text-slate-900 mb-8 leading-[1.1] tracking-tight">
                            Start-of-the-Art <br />
                            <span className="text-brand-blue">App Development</span>
                        </h1>

                        <p className="text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
                            Reach your audience anywhere, anytime. We design and develop intuitive, high-performance mobile applications for iOS and Android that users love.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 rounded-full bg-brand-blue text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2">
                                Launch Your App <ArrowRight className="w-5 h-5" />
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
                                <Tablet className="w-32 h-32 text-brand-blue opacity-10" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="grid grid-cols-2 gap-4 p-8">
                                        {[
                                            { icon: Layers, label: "Scalable" },
                                            { icon: Shield, label: "Secure" },
                                            { icon: Zap, label: "Performant" },
                                            { icon: Smartphone, label: "Responsive" }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-50 flex flex-col items-center gap-3">
                                                <item.icon className="w-8 h-8 text-brand-blue" />
                                                <span className="text-sm font-medium text-slate-900">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight">
                                Native & Cross-Platform Excellence
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                                Whether you need performant native apps or versatile cross-platform solutions, our team delivers seamless mobile experiences. We focus on smooth navigation, quick load times, and engaging interfaces.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "iOS Development (Swift & SwiftUI)",
                                    "Android Development (Kotlin)",
                                    "React Native & Flutter Solutions",
                                    "High-Performance App Backend",
                                    "App Store Optimization (ASO)"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 group">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue flex-shrink-0 mt-0.5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-lg font-medium text-slate-700 group-hover:text-brand-blue transition-colors">{item}</span>
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
                        <h2 className="text-3xl md:text-5xl font-medium text-slate-900 mb-4">Our App Development Lifecycle</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">From concept to deployment, we follow a rigorous process to ensure success.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Product Discovery", desc: "Defining user personas and core features." },
                            { step: "02", title: "UI/UX Design", desc: "Crafting intuitive mobile interfaces." },
                            { step: "03", title: "Agile Sprints", desc: "Iterative development and testing." },
                            { step: "04", title: "App Store Launch", desc: "Compliance checks and global release." }
                        ].map((item, i) => (
                            <div key={i} className="relative p-8 rounded-3xl bg-slate-50 hover:bg-blue-50 transition-colors group">
                                <div className="text-4xl font-black text-slate-200 mb-4 group-hover:text-brand-blue transition-colors">{item.step}</div>
                                <h3 className="text-xl font-medium text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent " />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-medium mb-4">Leading Mobile Technologies</h2>
                        <p className="text-blue-200/60 max-w-2xl mx-auto">We leverage industry-leading tools for native and hybrid apps.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 opacity-50">
                        {["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "Node.js", "MongoDB", "Azure"].map((tech) => (
                            <span key={tech} className="text-2xl md:text-4xl font-black">{tech}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-medium text-slate-900 mb-12 text-center">App Development FAQs</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Native vs Cross-platform: Which one should I choose?", a: "Native apps offer the best performance and device integration, while cross-platform (React Native/Flutter) is more cost-effective for reaching both iOS and Android simultaneously." },
                            { q: "Do you handle the App Store and Play Store submission?", a: "Yes, we handle the entire submission process, including metadata optimization and ensuring compliance with store guidelines." },
                            { q: "Can you upgrade my existing app?", a: "Definitely. We can modernize your legacy app, add new features, or migrate it to a newer technology stack like Flutter or React Native." },
                            { q: "How do you ensure app security?", a: "We implement industry-standard encryption, secure API communication, and regular security audits to protect user data and privacy." }
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
