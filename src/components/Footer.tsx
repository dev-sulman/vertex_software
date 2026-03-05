import Link from "next/link"
import { Github, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Facebook } from "lucide-react"

const footerLinks = {
    services: [
        { name: "Software Development", href: "#services" },
        { name: "Web Development", href: "#services" },
        { name: "App Development", href: "#services" },
        { name: "UI/UX Design", href: "#services" },
    ],
    company: [
        { name: "About Us", href: "#about" },
        { name: "Our Work", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-white border-t border-white/5 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="p-1  rounded-lg w-50 h-30 flex items-center justify-center overflow-hidden">
                                <img src="/newlogoimages/showonhover.png" alt="VertxSoft Logo" className="w-full h-auto object-contain" />
                            </div>

                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                            Innovative custom software solutions that drive real business results.
                            Accelerate your growth with our expertise.
                        </p>
                        <div className="flex gap-4">
                            <社会Icon Icon={Twitter} />
                            <社会Icon Icon={Facebook} />
                            <社会Icon Icon={Linkedin} />
                            <社会Icon Icon={Instagram} />
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-medium mb-6">Services</h4>
                        <ul className="flex flex-col gap-4">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-black/50 hover:text-[#0C71C3] transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-6">Company</h4>
                        <ul className="flex flex-col gap-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-black/50 hover:text-[#0C71C3] transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-6">Address</h4>
                        <div className="text-black/50 text-sm leading-relaxed">
                            XYZ<br />
                            <span className="ext-black/50">Email:</span> info@xyz.com<br />
                            <span className="ext-black/50">Phone:</span> +1 (234) 567 8901
                        </div>
                    </div>
                </div>

                <div className="border-t border-black pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-black/30 text-xs">
                    <p>Copyright © 2026 VertxSoft. All rights reserved.</p>
                    <div className="flex gap-8">
                        <button className="hover:text-white transition-colors">Terms of Service</button>
                        <button className="hover:text-white transition-colors">Sitemap</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function 社会Icon({ Icon }: { Icon: any }) {
    return (
        <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-[#0C71C3] hover:text-white transition-all group">
            <Icon className="w-5 h-5" />
        </button>
    )
}
