import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Education from "@/components/Education";
import CertificateVault from "@/components/CertificateVault";
import Philosophy from "@/components/Philosophy";
import Skills from "@/components/Skills";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import ChalkboardCanvas from "@/components/ChalkboardCanvas";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      
      {/* Hero & Background Canvas Block */}
      <div className="relative overflow-hidden chalkboard-container min-h-screen">
        <ChalkboardCanvas />
        <Navbar />
        <Hero />
      </div>

      {/* Structured Sections */}
      <main className="relative z-10 bg-charcoal">
        <About />
        <Timeline />
        <Philosophy />
        <Education />
        <Skills />
        <CertificateVault />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
