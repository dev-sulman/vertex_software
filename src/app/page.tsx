import Navbar from "@/components/Navbar"
import Hero from "@/components/sections/Hero"
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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Experience />
      <Solutions />
      <SelectedWork />
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
