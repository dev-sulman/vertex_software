"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export function MaintenancePopup() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-full max-w-[480px] bg-white rounded-sm p-8 shadow-[0_24px_48px_rgba(0,0,0,0.1)] border border-neutral-400"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {/* Content */}
                        <div className="pr-12">
                            <p className="text-[#1A1A1A] text-[15px] leading-[1.6] font-medium mb-8">
                                We are currently performing scheduled maintenance to improve our services.
                                Some features might be temporarily unavailable. Thank you for your patience while we upgrade your experience.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-6 sm:gap-8">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-[#1A1A1A] text-[15px] font-bold hover:opacity-70 transition-opacity"
                            >
                                Dismiss Info
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-[#0C71C3] text-white px-8 py-4 rounded-sm text-[15px] font-bold hover:bg-[#0C71C3]/80 transition-colors shadow-sm active:scale-95"
                            >
                                Understood
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
