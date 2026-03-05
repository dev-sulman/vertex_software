
import { ArrowRight } from "lucide-react"

export default function About() {
    return (
        <section id="about" className="py-24 px-6 relative overflow-hidden bg-[#0557A0]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ">
                <div>
                    <div className="text-[#e8eaec] font-medium tracking-widest uppercase mb-4 text-sm">
                        About VertxSoft
                    </div>
                    <h2 className="text-4xl md:text-6xl font-medium mb-8 leading-tight">
                        We solve business <br />
                        problems with <span className="text-gradient">technology</span>
                    </h2>
                    <div className="space-y-6 text-white/60 text-lg md:text-xl leading-relaxed">
                        <p>
                            From web and mobile app development to AI and automation, our team helps businesses streamline operations, improve user experiences, and scale efficiently.
                        </p>
                        <p>
                            We combine cutting-edge technology with industry expertise to accelerate growth. Our mission is to transform complex challenges into seamless digital experiences.
                        </p>
                    </div>
                    <button className="mt-10 px-8 py-4 rounded-full glass font-bold hover:bg-white/10 transition-colors flex items-center gap-2 group">
                        Know More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="relative aspect-square glass rounded-3xl overflow-hidden">
                    <img
                        src="/newlogoimages/logo1.png"
                        alt="About VertxSoft"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 p-8 flex items-center justify-center overflow-hidden z-20">
                        {/* Decorative Elements */}
                        <div className="absolute top-10 left-10 w-20 h-20 bg-[#0C71C3]/20 rounded-full blur-xl" />
                        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#004F8A]/20 rounded-full blur-2xl" />

                        <div className="grid grid-cols-2 gap-4 w-full h-full relative z-30">
                            <div className="glass rounded-2xl flex flex-col items-center justify-center p-6 transition-transform">
                                <span className="text-3xl font-black text-[#0C71C3] mb-2">10+</span>
                                <span className="text-xs uppercase tracking-wider opacity-50">Years Exp</span>
                            </div>
                            <div className="glass rounded-2xl flex flex-col items-center justify-center p-6 translate-y-8 transition-transform">
                                <span className="text-3xl font-black text-[#004F8A] mb-2">200+</span>
                                <span className="text-xs uppercase tracking-wider opacity-50">Projects</span>
                            </div>
                            <div className="glass rounded-2xl flex flex-col items-center justify-center p-6 transition-transform">
                                <span className="text-3xl font-black text-white mb-2">50+</span>
                                <span className="text-xs uppercase tracking-wider opacity-50">Developers</span>
                            </div>
                            <div className="glass rounded-2xl flex flex-col items-center justify-center p-6 translate-y-8 transition-transform">
                                <span className="text-3xl font-black text-[#0C71C3] mb-2">99%</span>
                                <span className="text-xs uppercase tracking-wider opacity-50">Satisfaction</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
