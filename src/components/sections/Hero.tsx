"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Image from "next/image"

import { MouseTrail } from "@/components/ui/mouse-trail"

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
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-20"
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-[0.10]">
                    <Image
                        src="/herosvgicon/herowave.png"
                        alt="VertxSoft"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    {/* Immersive background stars */}

                    {/* Localized mouse trail in the background */}
                    <MouseTrail color="#3DBEF8" trailLength={60} className="absolute inset-0 pointer-events-none z-0 opacity-100" />
                    {/* Left side curved shapes / shadows */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-[0.4]">
                            <path d="M-100 0C100 200 200 400 0 800" stroke="#f1f5f9" strokeWidth="80" />
                            <path d="M-200 100C0 300 100 500 -100 900" stroke="#f1f5f9" strokeWidth="120" />
                        </svg>
                    </div>


                    {/* Right side grid */}
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.12]">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage: `linear-gradient(#0C71C3 1px, transparent 1px), linear-gradient(90deg, #0C71C3 1px, transparent 1px)`,
                                backgroundSize: '50px 50px'
                            }}
                        />
                    </div>
                </div>
            </div>



            <div className="max-w-5xl mx-auto w-full relative z-10 px-6 text-center">
                {/* Subtitle */}
                <div className="hero-reveal mb-8">
                    <span className="text-gray-400 text-lg md:text-xl font-medium tracking-wide">
                        One Stop Solution For All Your Business Needs
                    </span>
                </div>

                {/* Headline */}
                <h1 className="hero-reveal text-[42px] md:text-[85px] font-medium leading-[1.05] tracking-tight text-[#111111] mb-8">
                    Creating <span className="text-[#0557A0]">Software's</span><br />
                    & Digital Excellence
                </h1>

                {/* Description */}
                <p className="hero-reveal text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
                    We design and develop scalable digital solutions that help businesses grow <span className="text-black">faster, smarter, and stronger.</span>
                </p>
                {/* Logo Section */}


                {/* Buttons */}
                <div className="hero-reveal flex flex-wrap justify-center gap-6">
                    <button className="px-10 py-4 rounded-full border-2 border-[#0557A0] text-[#0557A0] font-medium text-lg hover:bg-blue-50 transition-all active:scale-95">
                        Our Services
                    </button>
                    <button className="px-10 py-4 rounded-full bg-[#0557A0] text-white font-medium text-lg hover:bg-[#0557A0] transition-all active:scale-95 shadow-xl shadow-blue-500/20">
                        Get Free Quote
                    </button>
                </div>
            </div>
        </section>
    )
}
