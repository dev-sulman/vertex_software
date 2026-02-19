import Navbar from "@/components/Navbar"
import Hero from "@/components/sections/Hero"
import { ReelCarousel } from "@/components/ui/reel-carousel"
import { projects } from "@/lib/constants"
import Experience from "@/components/sections/Experience"
import Solutions from "@/components/sections/Solutions"
import SelectedWork from "@/components/sections/SelectedWork"
import About from "@/components/sections/About"
import Services from "@/components/sections/Services"
import Benefits from "@/components/sections/Benefits"
import BusinessProcesses from "@/components/sections/BusinessProcesses"
import NextGenStats from "@/components/sections/NextGenStats"
import Technologies from "@/components/sections/Technologies"
import Blog from "@/components/sections/Blog"
import Testimonials from "@/components/sections/Testimonials"
import CTA from "@/components/sections/CTA"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/Footer"
import VelocityScroll from "@/components/ui/VelocityScroll"
import { MouseTrail } from "@/components/ui/mouse-trail"

export default function Home() {
  return (
    <main className="min-h-screen">
      <MouseTrail color="#3DBEF8" trailLength={30} className="absolute inset-0 pointer-events-none z-0 opacity-40" />
      <Navbar />
      <Hero />
      <VelocityScroll text="Digital Innovation • Immersive Experiences • Future Ready •" default_velocity={3} className="text-[#0557A0]/10" />
      <Experience />
      <Solutions />
      <VelocityScroll text="Pioneering Solutions • Seamless Integration • Boundless Creativity •" default_velocity={-3} className="text-[#0557A0]/10" />
      {/* <SelectedWork /> */}
      {/* <ReelCarousel projects={projects} /> */}
      <About />
      {/* <Services /> */}
      <Benefits />
      <BusinessProcesses />
      <NextGenStats />
      <Technologies />
      <Blog />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}
