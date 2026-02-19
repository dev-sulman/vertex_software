"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar, User, MessageCircle } from "lucide-react"
import Link from "next/link"

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
        image: "/blogmain.png"
    },
    {
        title: "Scaling Your Digital Marketing ROI",
        excerpt: "Stop wasting budget on ineffective ads. We break down the data-testing strategies that drive 3x conversion rates.",
        date: "Feb 05, 2024",
        author: "Marcus Vane",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    }
]

export default function BlogSection() {
    return (
        <section id="blog" className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/50 text-[#0557A0] font-medium text-sm mb-6"
                        >
                            <span>Our Insights</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-medium text-slate-900 leading-tight tracking-tight">
                            Latest from <br />
                            <span className="text-[#0557A0]">Our Blog</span>
                        </h2>
                    </div>
                    <Link href="/blog">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-slate-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                        >
                            Explore All News <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#11aff9] via-transparent to-transparent " />
                                </div>
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

                            <h3 className="text-2xl font-medium text-slate-900 mb-4 leading-tight group-hover:text-[#0557A0] transition-colors line-clamp-2 px-2">
                                {post.title}
                            </h3>

                            <p className="text-slate-500 line-clamp-2 mb-6 font-light px-2">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-2 text-[#0557A0] font-medium px-2">
                                Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
