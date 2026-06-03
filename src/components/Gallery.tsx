"use client";

import React from "react";
import { Camera, BookOpen, Award, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const galleryItems = [
  {
    title: "English Classroom",
    category: "Teaching Environment",
    image: "/classroom_lecture.png",
    icon: Camera,
    cols: "col-span-12 md:col-span-8",
    height: "h-[300px] md:h-[400px]",
    desc: "A premium classroom environment facilitating interactive lecture delivery.",
  },
  {
    title: "Chalkboard Session",
    category: "Academic Lecture",
    image: "/media__1780497999259.jpg",
    icon: BookOpen,
    cols: "col-span-12 md:col-span-4",
    height: "h-[300px] md:h-[400px]",
    desc: "Instruction of grammatical structures, tenses, and literary concepts.",
  },
  {
    title: "University Library",
    category: "Literature Research",
    image: "/literature_library.png",
    icon: Award,
    cols: "col-span-12 md:col-span-4",
    height: "h-[300px] md:h-[300px]",
    desc: "Stack of classical literary texts supporting research in English literature.",
  },
  {
    title: "State Eligibility Test Certificate",
    category: "Academic Credential",
    image: "/media__1780498032173.jpg",
    icon: GraduationCap,
    cols: "col-span-12 md:col-span-8",
    height: "h-[300px] md:h-[300px]",
    desc: "Accreditation by Directorate of Higher Secondary Education, Kerala.",
  },
];

export default function Gallery() {
  return (
    <section className="relative py-24 lg:py-32 bg-charcoal px-6 lg:px-12 overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase font-sans">
            Visual Storytelling
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-ivory mt-2 mb-4">
            Educational Gallery
          </h2>
          <p className="text-sm font-sans font-light text-ivory/60 max-w-md mx-auto">
            A visual documentation of teaching environments, classroom lectures, literary research material, and academic honors.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-12 gap-6">
          {galleryItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`${item.cols} group relative rounded-2xl overflow-hidden border border-white/5 shadow-lg bg-navy/20 cursor-pointer`}
              >
                {/* Image Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 z-10 pointer-events-none" />

                {/* Main Image */}
                <div className={`relative w-full ${item.height} overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Floating Tags (Top Left) */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="text-[9px] font-sans font-semibold tracking-wider bg-charcoal/80 border border-white/10 text-white/80 px-2.5 py-1 rounded-md uppercase flex items-center gap-1.5 backdrop-blur-md">
                    <Icon size={10} className="text-gold" />
                    {item.category}
                  </span>
                </div>

                {/* Bottom Text Panel */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-ivory tracking-wide leading-snug group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50 font-sans font-light mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
