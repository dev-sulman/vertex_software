"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface NavLink {
    name: string
    href: string
    hasDropdown?: boolean
    subItems?: NavLink[]
}

const navLinks: NavLink[] = [

    { name: "About us", href: "/#about" },
    {
        name: "Services",
        href: "#",
        hasDropdown: true,
        subItems: [
            { name: "Software Development", href: "/services/software-development" },
            { name: "Web Development", href: "/services/web-development" },
            { name: "App Development", href: "/services/app-development" },
            {
                name: "Digital Marketing",
                href: "/services/digital-marketing",
                hasDropdown: true,
                subItems: [
                    { name: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
                    { name: "Search Engine Optimization", href: "/services/digital-marketing/seo" }
                ]
            },
            { name: "UX/UI Design", href: "/services/ui-ux-design" },
            { name: "Software Quality Assurance", href: "/services/sqa" },
        ]
    },
    { name: "Blog", href: "/blog" },
    { name: "Contact us", href: "/#contact" },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [logoHovered, setLogoHovered] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null)

    // Mobile specific states
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
    const [mobileSubExpanded, setMobileSubExpanded] = useState<string | null>(null)


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                "bg-transparent  border-b border-black/5",
                scrolled ? "py-3 shadow-md bg-white" : "py-5"
            )}
            onMouseLeave={() => {
                setActiveDropdown(null)
                setActiveSubDropdown(null)
            }}
        >
            <div className="max-w-9xl mx-auto px-6 flex items-center justify-between">
                {/* Logo Section */}
                <Link
                    href="/"
                    className="group flex items-center"
                    onMouseEnter={() => setLogoHovered(true)}
                    onMouseLeave={() => setLogoHovered(false)}
                >
                    <div className="relative flex items-center overflow-hidden h-14">
                        <img
                            src="/newlogoimages/logo1.png"
                            alt="VertxSoft Logo"
                            className={cn(
                                "h-22 w-auto object-cover opacity-90 transition-transform duration-500",
                                logoHovered ? "scale-110" : "scale-100"
                            )}
                        />
                        <div className={cn(
                            "flex items-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
                            logoHovered ? "max-w-[300px] opacity-100" : "max-w-0 opacity-0"
                        )}>
                            <img
                                src="/newlogoimages/Crafted-Vetx-1th.png"
                                alt="Vertex Software"
                                className={cn(
                                    "h-12 w-auto object-contain pl-3 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
                                    logoHovered ? "translate-x-0" : "translate-x-[-20px]"
                                )}
                            />
                        </div>
                    </div>
                </Link>


                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative"
                            onMouseEnter={() => {
                                if (link.hasDropdown) setActiveDropdown(link.name)
                            }}
                        >
                            <Link
                                href={link.href}
                                className="relative group flex items-center gap-1 text-[18px] font-medium text-[#133848] hover:text-blue-900 transition-colors py-2"
                            >
                                {link.name}
                                {link.hasDropdown && <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === link.name ? "rotate-180" : ""}`} />}
                            </Link>

                            {/* Main Dropdown */}
                            <AnimatePresence>
                                {link.hasDropdown && activeDropdown === link.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50"
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        {link.subItems?.map((subItem) => (
                                            <div
                                                key={subItem.name}
                                                className="relative group/sub"
                                                onMouseEnter={() => matchMedia('(min-width: 1024px)').matches && subItem.hasDropdown && setActiveSubDropdown(subItem.name)}
                                                onMouseLeave={() => matchMedia('(min-width: 1024px)').matches && subItem.hasDropdown && setActiveSubDropdown(null)}
                                            >
                                                <Link
                                                    href={subItem.href}
                                                    className="flex items-center justify-between px-5 py-3 text-slate-600 hover:text-[#0557A0] hover:bg-slate-50 transition-colors text-[15px] font-medium"
                                                >
                                                    {subItem.name}
                                                    {subItem.hasDropdown && <ChevronRight className="w-4 h-4 text-slate-400" />}
                                                </Link>

                                                {/* Nested Dropdown (Flyout) */}
                                                {subItem.hasDropdown && activeSubDropdown === subItem.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 10 }}
                                                        className="absolute top-0 left-full ml-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2"
                                                    >
                                                        {subItem.subItems?.map((nestedItem) => (
                                                            <Link
                                                                key={nestedItem.name}
                                                                href={nestedItem.href}
                                                                className="block px-5 py-3 text-slate-600 hover:text-[#0557A0] hover:bg-slate-50 transition-colors text-[15px] font-medium"
                                                            >
                                                                {nestedItem.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden lg:block">
                    <button className="px-8 py-3 rounded bg-[#0557A0] text-white text-[15px] hover:bg-[#0557A0] hover:shadow-[0_0_30px_rgba(12,113,195,0.4)] transition-all transform active:scale-95 font-medium">
                        Get Free Quote
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-[#2d3436]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="fixed inset-x-0 top-[73px] bg-white border-b shadow-xl lg:hidden max-h-[calc(100vh-73px)] overflow-y-auto"
                    >
                        <div className="p-6 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    <div
                                        className="flex items-center justify-between py-3 text-lg font-medium text-[#2d3436]"
                                        onClick={() => {
                                            if (link.hasDropdown) {
                                                setMobileExpanded(mobileExpanded === link.name ? null : link.name)
                                            } else {
                                                setIsOpen(false)
                                            }
                                        }}
                                    >
                                        <Link href={link.href} onClick={(e) => link.hasDropdown && e.preventDefault()}>
                                            {link.name}
                                        </Link>
                                        {link.hasDropdown && (
                                            <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpanded === link.name ? "rotate-180" : ""}`} />
                                        )}
                                    </div>

                                    {/* Mobile dropdown content */}
                                    <AnimatePresence>
                                        {link.hasDropdown && mobileExpanded === link.name && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-slate-50 rounded-xl mb-2"
                                            >
                                                {link.subItems?.map((subItem) => (
                                                    <div key={subItem.name}>
                                                        <div
                                                            className="flex items-center justify-between px-5 py-3 text-slate-600 hover:text-[#0557A0] font-medium"
                                                            onClick={() => {
                                                                if (subItem.hasDropdown) {
                                                                    setMobileSubExpanded(mobileSubExpanded === subItem.name ? null : subItem.name)
                                                                } else {
                                                                    setIsOpen(false)
                                                                }
                                                            }}
                                                        >
                                                            <Link href={subItem.href} onClick={(e) => subItem.hasDropdown && e.preventDefault()}>
                                                                {subItem.name}
                                                            </Link>
                                                            {subItem.hasDropdown && (
                                                                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubExpanded === subItem.name ? "rotate-180" : ""}`} />
                                                            )}
                                                        </div>

                                                        {/* Mobile nested dropdown */}
                                                        {subItem.hasDropdown && mobileSubExpanded === subItem.name && (
                                                            <div className="bg-slate-100 pl-8 rounded-b-xl border-t border-slate-200">
                                                                {subItem.subItems?.map((nestedItem) => (
                                                                    <Link
                                                                        key={nestedItem.name}
                                                                        href={nestedItem.href}
                                                                        className="block px-5 py-3 text-slate-500 hover:text-[#0557A0] text-sm font-medium"
                                                                        onClick={() => setIsOpen(false)}
                                                                    >
                                                                        {nestedItem.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                            <button className="w-full mt-4 py-4 rounded-xl bg-brand-blue text-white font-medium text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-transform">
                                Get Free Quote
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
