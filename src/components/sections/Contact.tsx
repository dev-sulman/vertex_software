"use client"

import { motion } from "framer-motion"
import { Send, MapPin, Mail, Phone } from "lucide-react"

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-8">
                        Let's <span className="text-gradient-blue">Talk</span> Projects
                    </h2>
                    <p className="text-slate-500 text-lg mb-12 max-w-md">
                        Have a question or looking to start a new project? Drop us a message and our team will get back to you within 24 hours.
                    </p>

                    <div className="space-y-8">
                        <ContactInfo Icon={MapPin} title="Address" text="XYZ" />
                        <ContactInfo Icon={Mail} title="Email" text="XYZ.com" />
                        <ContactInfo Icon={Phone} title="Phone" text="+1 123 567 8901" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white border border-slate-200 shadow-xl p-8 md:p-12 rounded-[32px]"
                >
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold opacity-50 ml-2">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#11aff9] outline-none transition-colors text-slate-900 placeholder:text-slate-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold opacity-50 ml-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#11aff9] outline-none transition-colors text-slate-900 placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-50 ml-2">Message</label>
                            <textarea
                                rows={5}
                                placeholder="Tell us about your project..."
                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#11aff9] outline-none transition-colors resize-none text-slate-900 placeholder:text-slate-400"
                            />
                        </div>

                        <button className="w-full py-5 rounded-2xl bg-[#0557A0] text-white font-black text-lg hover:bg-[#0557A0] transition-colors flex items-center justify-center gap-3">
                            Send Message <Send className="w-5 h-5" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}

function ContactInfo({ Icon, title, text }: { Icon: any, title: string, text: string }) {
    return (
        <div className="flex items-start gap-6 group">
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 group-hover:bg-[#0557A0] group-hover:text-white transition-all">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="text-sm font-bold opacity-40 uppercase tracking-widest mb-1">{title}</div>
                <div className="text-xl font-bold text-slate-900">{text}</div>
            </div>
        </div>
    )
}
