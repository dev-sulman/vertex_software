"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Image from "next/image"

import { MouseTrail } from "@/components/ui/mouse-trail"
import { AssemblingText } from "@/components/ui/assembling-text"

const WireframeHuman = dynamic(() => import("@/components/ui/WireframeHuman"), {
    ssr: false,
})

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-reveal", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.3
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-20"
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Base Layer: Background Image with Premium Overlays */}
                <div className="absolute inset-0">
                    <Image
                        src="/newlogoimages/herobgmain.png"
                        alt="VertxSoft Hero Background"
                        fill
                        className="object-cover opacity-[0.65]"
                        priority
                        quality={100}
                    />
                    {/* Linear Gradients for depth and readability - Using standard Tailwind 4 syntax */}
                    <div className="absolute inset-0 bg-linear-to-b from-white/30 via-transparent to-white/95" />
                    <div className="absolute inset-0 bg-linear-to-r from-white/50 via-transparent to-white/50" />
                </div>

                {/* Decorative Elements Layer */}
                <div className="absolute inset-0">
                    {/* Geometric curved shapes */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-[0.25]">
                            <path d="M-100 0C100 200 200 400 0 800" stroke="#f1f5f9" strokeWidth="80" />
                            <path d="M-200 100C0 300 100 500 -100 900" stroke="#f1f5f9" strokeWidth="120" />
                        </svg>
                    </div>

                </div>
            </div>

            {/* Foreground Content Section */}
            <div className="max-w-5xl mx-auto w-full relative z-10 px-6 text-center">
                {/* Subtitle */}
                <div className="hero-reveal mb-8">
                    <span className="text-gray-400 text-lg md:text-xl font-medium tracking-wide">
                        One Stop Solution For All Your Business Needs
                    </span>
                </div>

                {/* Main Headline */}
                <AssemblingText
                    text="Creating Software's <br /> & Digital Excellence"
                    className="text-[42px] md:text-[85px] font-medium leading-[1.05] tracking-tight text-[#111111] mb-8"
                    delay={0.5}
                />

                {/* Description Text */}
                <p className="hero-reveal text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
                    We design and develop scalable digital solutions that help businesses grow <span className="text-black">faster, smarter, and stronger.</span>
                </p>

                {/* Call to Action Buttons */}
                <div className="hero-reveal flex flex-wrap justify-center gap-6">
                    <button className="px-10 py-4 rounded-full border-2 border-[#0557A0] text-[#0557A0] font-medium text-lg hover:bg-blue-50 transition-all active:scale-95">
                        Our Services
                    </button>
                    <button className="px-10 py-4 rounded-full bg-[#0557A0] text-white font-medium text-lg hover:bg-[#0557A0]/90 transition-all active:scale-95 shadow-xl shadow-blue-500/20">
                        Get Free Quote
                    </button>
                </div>
            </div>
        </section>
    )
}
