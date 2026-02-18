"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Calendar, User, Search, Filter } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const blogPosts = [
    {
        title: "The Future of Web Development in 2025",
        excerpt: "Discover the latest trends in AI-driven development, edge computing, and why Next.js remains the king of frameworks.",
        date: "Feb 15, 2024",
        author: "Alex Rivera",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Mastering UI/UX Design for SaaS",
        excerpt: "Learn how to build intuitive dashboards that users love. A deep dive into user psychology and modern design patterns.",
        date: "Feb 10, 2024",
        author: "Sarah Chen",
        category: "Design",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Scaling Your Digital Marketing ROI",
        excerpt: "Stop wasting budget on ineffective ads. We break down the data-testing strategies that drive 3x conversion rates.",
        date: "Feb 05, 2024",
        author: "Marcus Vane",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Why Cyber Security is Your #1 Priority",
        excerpt: "As cyber threats evolve, your business must adapt. A guide to the essential security protocols for modern enterprises.",
        date: "Jan 28, 2024",
        author: "Elena Petrova",
        category: "Security",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "The Rise of Minimalist Software",
        excerpt: "In a world of bloated software, simplicity wins. Why focus on core features can drive better user adoption.",
        date: "Jan 20, 2024",
        author: "David Kim",
        category: "Development",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "How to Build a High-Performance Team",
        excerpt: "Scaling technology is easy; scaling people is hard. The culture-first approach to building elite development teams.",
        date: "Jan 12, 2024",
        author: "Thomas Wright",
        category: "Culture",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    }
]

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-medium text-slate-900 mb-8 tracking-tight">
                            Insights & <span className="text-brand-blue">Innovation</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Stay ahead of the curve with our latest articles on technology, design, and growth strategies.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content & Filters */}
            <section className="pb-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    {/* Search and Filters Bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full bg-white pl-12 pr-4 py-3 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            {["All", "Technology", "Design", "Marketing", "Security"].map((cat) => (
                                <button
                                    key={cat}
                                    className={`px-6 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${cat === "All" ? "bg-brand-blue text-white shadow-lg shadow-blue-500/20" : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
                        {blogPosts.map((post, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-video rounded-[32px] overflow-hidden mb-6 bg-slate-100">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mb-4 px-2">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5" />
                                        <span>{post.author}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-medium text-slate-900 mb-4 leading-tight group-hover:text-brand-blue transition-colors line-clamp-2 px-2">
                                    {post.title}
                                </h3>

                                <p className="text-slate-500 line-clamp-2 mb-6 font-light px-2 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center gap-2 text-brand-blue font-bold px-2">
                                    Read Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="mt-20 flex justify-center">
                        <nav className="flex items-center gap-2">
                            <button className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button className="w-12 h-12 rounded-2xl bg-brand-blue text-white font-bold text-sm shadow-xl shadow-blue-500/20">1</button>
                            <button className="w-12 h-12 rounded-2xl border border-slate-100 font-bold text-sm text-slate-600 hover:bg-slate-50 transition-colors">2</button>
                            <button className="w-12 h-12 rounded-2xl border border-slate-100 font-bold text-sm text-slate-600 hover:bg-slate-50 transition-colors">3</button>
                            <button className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
