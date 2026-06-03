"use client";

import React, { useRef, useEffect } from "react";
import { ArrowRight, Download, Award, MessageSquare } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for the 3D mouse parallax on the image card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });
  
  // Parallax offsets for overlay items
  const overlayX = useTransform(x, [-0.5, 0.5], [-15, 15]);
  const overlayY = useTransform(y, [-0.5, 0.5], [-15, 15]);
  const shadowX = useTransform(x, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(y, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    
    // Normalize to range [-0.5, 0.5]
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Letter reveal animation using GSAP for the name
  const nameRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (!nameRef.current) return;
    const text = nameRef.current.innerText;
    nameRef.current.innerHTML = "";
    
    // Split text into words and letters
    const words = text.split(" ");
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";
      
      const letters = word.split("");
      letters.forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.innerText = char;
        charSpan.className = "hero-letter inline-block translate-y-[105%]";
        wordSpan.appendChild(charSpan);
      });
      
      nameRef.current?.appendChild(wordSpan);
      
      // Add space between words
      if (wordIndex < words.length - 1) {
        const space = document.createTextNode(" ");
        nameRef.current?.appendChild(space);
      }
    });

    // Reveal letters
    gsap.to(".hero-letter", {
      y: "0%",
      duration: 1,
      ease: "power4.out",
      stagger: 0.03,
      delay: 0.2,
    });
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 lg:px-12 overflow-hidden bg-charcoal">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Side: 3D Layered Portrait */}
        <div className="lg:col-span-5 flex justify-center w-full" ref={containerRef}>
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            className="relative w-full max-w-[380px] aspect-[4/5] rounded-2xl cursor-pointer perspective-1000 interactive-card group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Parallax Shadow */}
            <motion.div
              style={{ x: shadowX, y: shadowY }}
              className="absolute inset-0 bg-gold/10 rounded-2xl blur-2xl -z-10 group-hover:bg-gold/15 transition-colors duration-500"
            />

            {/* Glowing Accent Border */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-gold/30 transition-colors duration-500 z-20 pointer-events-none" />

            {/* Cinematic Portrait Card */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl bg-navy border border-white/5 shadow-2xl flex items-center justify-center">
              {/* Photo Backdrop Shader overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80 z-10 pointer-events-none" />
              
              <img
                src="/media__1780497999259.jpg"
                alt="Sougandh Velikkakath"
                className="w-full h-full object-cover object-left scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Floating Academic Badges */}
            <motion.div
              style={{ x: overlayX, y: overlayY }}
              className="absolute -bottom-6 -right-6 z-25 glass-panel-gold py-3 px-5 rounded-xl flex items-center gap-3 shadow-xl pointer-events-none"
            >
              <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30">
                <Award size={16} className="text-gold" />
              </div>
              <div>
                <p className="text-[10px] text-white/50 tracking-wider uppercase font-sans font-semibold">Experience</p>
                <p className="text-sm text-ivory font-serif font-semibold">16+ Years Intl</p>
              </div>
            </motion.div>

            <motion.div
              style={{ x: useTransform(x, [-0.5, 0.5], [15, -15]), y: useTransform(y, [-0.5, 0.5], [15, -15]) }}
              className="absolute -top-6 -left-6 z-25 glass-panel py-2.5 px-4 rounded-xl flex items-center gap-2.5 shadow-xl pointer-events-none"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-sans font-semibold tracking-widest text-ivory/80 uppercase">
                IGCSE / CBSE EXPERT
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Editorial Introduction */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Section subtitle tag */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase font-sans">
              Curriculum Expert & ESL Specialist
            </span>
          </motion.div>

          {/* Name Header */}
          <h1
            ref={nameRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-ivory tracking-wide leading-[1.1] mb-5 overflow-hidden flex flex-wrap gap-x-4"
          >
            SOUGANDH VELIKKAKATH
          </h1>

          {/* Title and Academic Tags */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <p className="text-lg sm:text-xl text-ivory/90 font-sans font-light">
              English Language & Literature Educator
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] bg-white/5 border border-white/10 text-ivory/70 px-2.5 py-1 rounded-md uppercase font-sans font-semibold tracking-wider">
                MA English
              </span>
              <span className="text-[10px] bg-white/5 border border-white/10 text-ivory/70 px-2.5 py-1 rounded-md uppercase font-sans font-semibold tracking-wider">
                B.Ed
              </span>
              <span className="text-[10px] bg-gold/10 border border-gold/20 text-gold px-2.5 py-1 rounded-md uppercase font-sans font-semibold tracking-wider">
                SET Qualified
              </span>
            </div>
          </motion.div>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg text-ivory/75 font-sans font-light leading-relaxed mb-10 max-w-xl"
          >
            Dedicated to empowering learners through language, literature, communication, and critical thinking across diverse international educational environments. Facilitating academic success through structured methodologies.
          </motion.p>

          {/* CTA Buttons Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollToSection("journey")}
              className="px-6 py-3.5 bg-gold hover:bg-gold/90 text-charcoal font-sans font-semibold text-xs tracking-widest uppercase rounded-full shadow-lg flex items-center gap-2 group transition-all duration-300 transform active:scale-95"
            >
              Explore Experience
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button
              onClick={() => scrollToSection("credentials")}
              className="px-6 py-3.5 border border-white/20 hover:border-gold/50 text-ivory hover:text-gold font-sans font-medium text-xs tracking-widest uppercase rounded-full flex items-center gap-2 bg-white/2 transition-all duration-300 transform active:scale-95"
            >
              View Credentials
            </button>

            <a
              href="mailto:sougandh.v@email.com?subject=Inquiry%20regarding%20teaching%20position"
              className="px-6 py-3.5 border border-white/20 hover:border-gold/50 text-ivory hover:text-gold font-sans font-medium text-xs tracking-widest uppercase rounded-full flex items-center gap-2 bg-white/2 transition-all duration-300"
            >
              <Download size={14} />
              Download CV
            </a>

            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3.5 border border-gold/40 hover:bg-gold/5 text-gold font-sans font-semibold text-xs tracking-widest uppercase rounded-full flex items-center gap-2 transition-all duration-300 transform active:scale-95"
            >
              <MessageSquare size={14} />
              Contact
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
