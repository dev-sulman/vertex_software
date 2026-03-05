"use client"

import React, { useRef, useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Zap, Database, Globe, Layers, Shield, Box, Code2, Layout, Smartphone } from "lucide-react"
import Link from "next/link"

interface Node {
    id: string
    label: string
    sublabel: string
    icon: string
    color: string
    position: { x: number; y: number }
}

const nodes: Node[] = [
    { id: "react", label: "React", sublabel: "Frontend Library", icon: "/icons/react.svg", color: "#61DAFB", position: { x: 75, y: 15 } },
    { id: "nextjs", label: "Next.js", sublabel: "React Framework", icon: "/icons/next.svg", color: "#000000", position: { x: 80, y: 35 } },
    { id: "typescript", label: "TypeScript", sublabel: "Type Safety", icon: "/icons/typescripta.svg", color: "#3178C6", position: { x: 75, y: 55 } },
    { id: "tailwind", label: "Tailwind CSS", sublabel: "Styling", icon: "/icons/tailwind.svg", color: "#06B6D4", position: { x: 80, y: 75 } },
    { id: "nodejs", label: "Node.js", sublabel: "Backend Runtime", icon: "/icons/node.svg", color: "#339933", position: { x: 25, y: 15 } },
    { id: "mongodb", label: "MongoDB", sublabel: "Database", icon: "/icons/mongodb.svg", color: "#47A248", position: { x: 20, y: 35 } },
    { id: "express", label: "Express", sublabel: "Web Server", icon: "/icons/Express.svg", color: "#000000", position: { x: 25, y: 55 } },
    { id: "js", label: "JavaScript", sublabel: "Logic", icon: "/icons/JS.svg", color: "#F7DF1E", position: { x: 20, y: 75 } },
]

export default function WorkflowNetwork() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        if (!containerRef.current) return

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0]
            if (entry) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height
                })
            }
        })

        observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])

    const paths = useMemo(() => {
        if (dimensions.width === 0) return null

        return nodes.map((node) => {
            const isLeft = node.position.x < 50
            const startX = dimensions.width * 0.5
            const startY = dimensions.height * 0.45
            const endX = dimensions.width * (node.position.x / 100)
            const endY = dimensions.height * (node.position.y / 100)

            const controlX = isLeft ? startX - dimensions.width * 0.15 : startX + dimensions.width * 0.15
            const pixelPath = `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`

            const isActive = hoveredNode === null || hoveredNode === node.id

            return (
                <React.Fragment key={node.id}>
                    {/* Base Path */}
                    <motion.path
                        d={pixelPath}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: isActive ? 0.2 : 0.05,
                            transition: { duration: 1.5, delay: 0.2 }
                        }}
                    />

                    {/* Animated Beam */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.path
                                d={pixelPath}
                                fill="none"
                                stroke={node.color}
                                strokeWidth="2"
                                strokeDasharray="10 40"
                                initial={{ strokeDashoffset: 100, opacity: 0 }}
                                animate={{
                                    strokeDashoffset: 0,
                                    opacity: hoveredNode === node.id ? 0.8 : 0.3,
                                    transition: {
                                        strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
                                        opacity: { duration: 0.3 }
                                    }
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Moving Dot */}
                    {isActive && (
                        <motion.circle
                            r="3"
                            fill={node.color}
                            animate={{
                                offsetDistance: ["0%", "100%"]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 2
                            }}
                            style={{
                                offsetPath: `path("${pixelPath}")`,
                            }}
                        />
                    )}
                </React.Fragment>
            )
        })
    }, [dimensions, hoveredNode])

    return (
        <div ref={containerRef} className="relative w-full h-[600px] md:h-[800px] bg-white rounded-[40px] border border-slate-200 overflow-hidden group/network shadow-2xl shadow-blue-500/5">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#0c71c3_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05]" />

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {paths}
            </svg>

            {/* Central Source Node */}
            <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative px-10 py-6 rounded-[32px] flex items-center gap-5"
                >

                    <div className="text-left">
                        <Link href="/" className="flex justify-center h-auto w-auto items-center text-center  gap-3 group">
                            <img src="/newlogoimages/logo1.png" alt="VertxSoft Logo" className="h-40 w-60 object-cover opacity-80 z-index-900" />
                        </Link>
                    </div>

                    {/* Digital Glow */}
                    <div className="absolute -inset-1  rounded-[33px] blur-sm -z-10" />
                </motion.div>
            </div>

            {/* Target Nodes */}
            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: hoveredNode === null || hoveredNode === node.id ? 1 : 0.2,
                        scale: hoveredNode === node.id ? 1.05 : 1,
                        x: "-50%",
                        y: "-50%"
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{
                        left: `${node.position.x}%`,
                        top: `${node.position.y}%`,
                        position: 'absolute'
                    }}
                    className="z-30 cursor-pointer"
                >
                    <div className="transition-all flex items-center gap-4 group/node backdrop-blur-md">
                        <div className="">
                            <img src={node.icon} alt={node.label} className="w-35 h-25 object-contain" />
                        </div>

                    </div>
                </motion.div>
            ))}
        </div>
    )
}
