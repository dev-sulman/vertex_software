"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, ArrowRight } from "lucide-react"
import Image from "next/image"

import { Project } from "@/types"

interface ProjectModalProps {
    project: Project | null
    onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [project])

    return (
        <AnimatePresence>
            {project && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0A0A0A] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Left Side: Image/Media */}
                        <div className="md:w-3/5 relative aspect-video md:aspect-auto overflow-hidden bg-neutral-900">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
                        </div>

                        {/* Right Side: Details */}
                        <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto">
                            <div className="flex flex-col h-full">
                                <div>
                                    <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
                                        {project.category}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
                                        {project.title}
                                    </h2>
                                    <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                                        {project.description}
                                    </p>

                                    {/* Gallery/Features teaser */}
                                    {project.gallery && project.gallery.length > 0 && (
                                        <div className="space-y-4 mb-10">
                                            <h4 className="text-white text-sm font-bold uppercase tracking-widest">Key Features</h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                {project.gallery.map((item, i) => (
                                                    <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                        <p className="text-neutral-400 text-sm leading-snug">{item.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 px-8 py-4 bg-white text-black text-center font-black uppercase text-xs tracking-widest rounded-full hover:bg-primary transition-all flex items-center justify-center gap-2"
                                    >
                                        Live Preview <ExternalLink size={14} />
                                    </a>
                                    <button
                                        className="px-8 py-4 bg-white/5 border border-white/10 text-white text-center font-black uppercase text-xs tracking-widest rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                    >
                                        Case Study <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
