"use client"

import React, { useState, useMemo, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Points, PointMaterial, Center, Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"
import { Compass, FileText, Code2, Rocket, ArrowRight } from "lucide-react"

// --- 3D Background Component ---
function MorphingCore({ activeStep }: { activeStep: number }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const stepColors = ["#11aff9", "#11aff9", "#11aff9", "#11aff9"]

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.3
            meshRef.current.rotation.x = t * 0.2

            // Pulsing effect
            const pulse = 1 + Math.sin(t * 2) * 0.05
            meshRef.current.scale.setScalar(pulse)
        }
    })

    return (
        <group>
            {/* Main Morphing Sphere */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Sphere ref={meshRef} args={[4, 64, 64]}>
                    <MeshDistortMaterial
                        color={stepColors[activeStep]}
                        speed={3}
                        distort={0.4 + activeStep * 0.1}
                        radius={1}
                        metalness={0.4}
                        roughness={0.4}
                        transparent
                        opacity={0.3}
                    />
                </Sphere>
            </Float>

            {/* Orbiting Particles */}
            <Points positions={new Float32Array(500 * 3).map(() => (Math.random() - 0.5) * 20)} stride={3}>
                <PointMaterial
                    transparent
                    color={stepColors[activeStep]}
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    )
}

// --- Data ---
const PROCESS_STEPS = [
    {
        id: "discover",
        title: "Discover",
        subtitle: "Learn before we leap",
        description: "Research and narrow down your development objectives. Define a solution that can disrupt market dynamics.",
        icon: Compass,
        details: [
            { id: "01", title: "Market Analysis", desc: "We dive deep into your industry trends and competitor landscapes." },
            { id: "02", title: "User Research", desc: "Understanding the pain points and desires of your target audience." },
            { id: "03", title: "Feature Mapping", desc: "Prioritizing the most impactful features for your initial launch." }
        ]
    },
    {
        id: "define",
        title: "Define",
        subtitle: "Blueprint for success",
        description: "See your vision take shape. Revise proof of concepts, skeletal wireframes before becoming market-ready.",
        icon: FileText,
        details: [
            { id: "01", title: "Platform Validation", desc: "Uncover the right tech platform that combines framework and architecture." },
            { id: "02", title: "Enterprise Architecture", desc: "Structure a development framework where data seamlessly adapts." },
            { id: "03", title: "Rapid Prototyping", desc: "Simulate the end-product experience with interactive prototypes and wireframes." }
        ]
    },
    {
        id: "develop",
        title: "Develop",
        subtitle: "Coding with precision",
        description: "Transform designs into scalable, high-performance software solutions using modern tech stacks.",
        icon: Code2,
        details: [
            { id: "01", title: "Frontend & Backend", desc: "Building robust systems with clean, maintainable and documented code." },
            { id: "02", title: "Quality Assurance", desc: "Rigorous testing phases to ensure every feature works flawlessly." },
            { id: "03", title: "Performance Tuning", desc: "Optimizing load times and server response for a lightning-fast experience." }
        ]
    },
    {
        id: "evolve",
        title: "Evolve",
        subtitle: "Turn progress into a lifecycle",
        description: "Continuously attain perfection by integrating with the evolving standards of people, processes, and technology.",
        icon: Rocket,
        details: [
            { id: "01", title: "Continuous Integration", desc: "Seize every opportunity to merge innovative data modules across platforms." },
            { id: "02", title: "Continuous Development", desc: "Incrementally feature critical updates without starting from scratch." },
            { id: "03", title: "MVP Releases", desc: "Consistently launch the best version of your product with versatility." }
        ]
    }
]

export default function BusinessProcesses() {
    const [activeIndex, setActiveIndex] = useState(0)
    const currentStep = PROCESS_STEPS[activeIndex]

    useEffect(() => {
        console.log("BusinessProcesses mounted")
    }, [])

    return (
        <section id="business-processes-section" className="relative min-h-screen bg-white py-24 overflow-hidden selection:bg-blue-500/10">
            {/* 3D Canvas Background */}
            <div className="absolute inset-0 z-0 opacity-20">
                <Canvas camera={{ position: [0, 0, 15], fov: 50 }} >
                    <MorphingCore activeStep={activeIndex} />
                </Canvas>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-medium text-slate-900 mb-6"
                    >
                        Our Business Processes
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        At VertxSoft, we develop and deploy cutting-edge experiences for our clients
                        using a proven developmental strategy.
                    </motion.p>
                </div>

                {/* Stepped Navigation */}
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-24">
                    {PROCESS_STEPS.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <motion.button
                                onClick={() => setActiveIndex(index)}
                                className={`group relative flex flex-col items-center justify-center w-28 h-28 md:w-40 md:h-40 rounded-2xl border-2 transition-all duration-500 ${activeIndex === index
                                    ? "bg-[#11aff9]/10 border-[#11aff9] shadow-xl shadow-[#11aff9]/10"
                                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                                    }`}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className={`mb-3 transition-colors duration-500 ${activeIndex === index ? "text-[#11aff9]" : "text-slate-400 group-hover:text-slate-600"}`}>
                                    <step.icon size={32} strokeWidth={1.5} />
                                </div>
                                <span className={`text-sm md:text-lg font-medium transition-colors duration-500 ${activeIndex === index ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"}`}>
                                    {step.title}
                                </span>

                                {/* Active Indicator Glow */}
                                {activeIndex === index && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute inset-0 rounded-2xl bg-blue-500/5 blur-xl -z-10"
                                    />
                                )}
                            </motion.button>

                            {/* Arrow between steps */}
                            {index < PROCESS_STEPS.length - 1 && (
                                <div className="hidden md:block text-[#11aff9]">
                                    <div className="w-8 h-px bg-current relative">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-current" />
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center max-w-5xl mx-auto"
                    >
                        <h3 className="text-[#11aff9] text-3xl font-medium mb-4 text-glow">{currentStep.title}</h3>
                        <h4 className="text-slate-800 text-2xl font-medium mb-6">{currentStep.subtitle}</h4>
                        <p className="text-slate-500 text-xl max-w-3xl mx-auto mb-20 leading-relaxed font-light">
                            {currentStep.description}
                        </p>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                            {currentStep.details.map((detail, i) => (
                                <motion.div
                                    key={detail.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                                    className="group"
                                >
                                    <div className="text-blue-600 font-medium text-2xl mb-4 group-hover:translate-x-1 transition-transform">
                                        {detail.id}
                                    </div>
                                    <h5 className="text-slate-900 text-xl font-medium mb-4 leading-snug">
                                        {detail.title}
                                    </h5>
                                    <p className="text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                                        {detail.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-blue-900/10 to-transparent pointer-events-none" />
        </section>
    )
}
