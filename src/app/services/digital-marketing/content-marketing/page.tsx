"use client"

import { motion } from "framer-motion"
import { ArrowRight, PenTool, CheckCircle2, BookOpen, Video, Share2, Award, ChevronDown } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useState } from "react"

export default function ContentMarketing() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-orange-50/40 rounded-full blur-[100px] -translate-x-1/2" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-50 border border-yellow-100/50 text-yellow-600 font-medium text-sm mb-8">
                            <PenTool className="w-4 h-4" />
                            <span>Storytelling that Sells</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-medium text-slate-900 mb-8 leading-[1.1] tracking-tight">
                            Strategic <br />
                            <span className="text-yellow-500">Content Marketing</span>
                        </h1>

                        <p className="text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
                            Content is king, but context is queen. We create compelling, valuable content that resonates with your audience, builds authority, and drives profitable customer action.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 rounded-full bg-yellow-500 text-white font-bold text-lg hover:bg-yellow-600 transition-all shadow-xl shadow-yellow-500/20 active:scale-95 flex items-center justify-center gap-2">
                                Start Brand Story <ArrowRight className="w-5 h-5" />
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
                                <BookOpen className="w-32 h-32 text-yellow-500 opacity-10" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="grid grid-cols-2 gap-4 p-8">
                                        {[
                                            { icon: Video, label: "Video" },
                                            { icon: Share2, label: "Viral" },
                                            { icon: Award, label: "Authority" },
                                            { icon: PenTool, label: "Writing" }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-50 flex flex-col items-center gap-3">
                                                <item.icon className="w-8 h-8 text-yellow-500" />
                                                <span className="text-sm font-medium text-slate-900">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight">
                                Engage, Inform, Convert
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                                We develop a holistic content strategy that aligns with your buyer's journey. From blog posts and whitepapers to videos and infographics, we ensure your message is heard and understood by the right people.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Deep Editorial Blog Writing & Management",
                                    "High-Impact Video Scripting & Production",
                                    "Authoritative Case Studies & E-books",
                                    "Social Media Micro-Content Creation",
                                    "Strategic Email Lifecycle Campaigns"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 group">
                                        <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 flex-shrink-0 mt-0.5 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-lg font-medium text-slate-700 group-hover:text-yellow-600 transition-colors">{item}</span>
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
                        <h2 className="text-3xl md:text-5xl font-medium text-slate-900 mb-4">Content Creation Workflow</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Creating content that builds long-term brand equity.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Research", desc: "Understanding topics your audience craves." },
                            { step: "02", title: "Creation", desc: "Crafting high-quality, authentic content." },
                            { step: "03", title: "Distribution", desc: "Amplifying reach across the right channels." },
                            { step: "04", title: "Measurement", desc: "Tracking engagement and attribution." }
                        ].map((item, i) => (
                            <div key={i} className="relative p-8 rounded-3xl bg-slate-50 hover:bg-yellow-50 transition-colors group">
                                <div className="text-4xl font-black text-slate-200 mb-4 group-hover:text-yellow-500 transition-colors">{item.step}</div>
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
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Content Ecosystem</h2>
                        <p className="text-yellow-200/60 max-w-2xl mx-auto">We use best-in-class creation and distribution platforms.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 opacity-50">
                        {["Wordpress", "Ghost", "Medium", "Substack", "Vimeo", "YouTube", "Canva", "Buffer"].map((tech) => (
                            <span key={tech} className="text-2xl md:text-4xl font-black">{tech}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-medium text-slate-900 mb-12 text-center">Content Marketing FAQs</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Why should I invest in content marketing?", a: "Content marketing costs 62% less than outbound marketing and generates 3x as many leads, while building long-term brand authority." },
                            { q: "How often should I publish content?", a: "Consistency is key. We typically recommend 2-4 high-quality blog posts per month and daily social media updates to stay top-of-mind." },
                            { q: "Do you provide video production services?", a: "Yes, we handle everything from scriptwriting to final editing for promotional videos, explainer videos, and social media clips." },
                            { q: "How do you measure content success?", a: "We track engagement metrics like time on page, social shares, and more importantly, conversion attribution to see how content drives revenue." }
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
