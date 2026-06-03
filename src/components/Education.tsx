"use client";

import React from "react";
import { GraduationCap, Award, BookOpen, Star } from "lucide-react";
import { motion } from "framer-motion";

const degrees = [
  {
    degree: "Master of Arts in English",
    institution: "Annamalai University",
    location: "Chidambaram, Tamil Nadu",
    details: "Advanced Study in English Literature, Linguistics, Critical Literary Theory, Post-Colonial Writing, and Drama. Focus on curriculum structure and literary analysis.",
    icon: Star,
    badge: "MA English",
  },
  {
    degree: "Bachelor of Education (B.Ed)",
    institution: "Kannur University",
    location: "Kannur, Kerala",
    details: "Specialization in methods of teaching English. Comprehensive studies in Educational Psychology, Classroom Management, Lesson Planning, and ICT Integration.",
    icon: GraduationCap,
    badge: "B.Ed",
  },
  {
    degree: "Bachelor of Arts in English",
    institution: "University of Calicut",
    location: "Calicut, Kerala",
    details: "English Language & Literature core. Extensive coverage of British Literature, History of Britain, Political Science, and Malayalam language studies.",
    icon: BookOpen,
    badge: "BA English",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 lg:py-32 bg-navy/20 border-y border-white/5 px-6 lg:px-12 overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase font-sans">
            Academic Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-ivory mt-2 mb-4">
            Education Showcase
          </h2>
          <p className="text-sm font-sans font-light text-ivory/60 max-w-md mx-auto">
            Honored academic background establishing linguistic expertise and pedagogical foundation.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {degrees.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.badge}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="glass-panel p-8 rounded-2xl border border-white/5 relative bg-charcoal/40 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-gold/30 hover:shadow-[0_12px_40px_rgba(212,175,55,0.08)] group"
              >
                {/* Academic Brand Frame */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-gold/40 rounded-tl-xl transition-colors duration-300" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-gold/40 rounded-tr-xl transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-gold/40 rounded-bl-xl transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-gold/40 rounded-br-xl transition-colors duration-300" />

                <div>
                  {/* Top row */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center border border-gold/20 shadow-inner group-hover:bg-gold/10 transition-colors duration-300">
                      <Icon size={20} className="text-gold" />
                    </div>
                    <span className="text-[10px] text-gold tracking-widest font-sans font-bold uppercase border border-gold/20 bg-gold/5 px-2.5 py-1 rounded">
                      {card.badge}
                    </span>
                  </div>

                  {/* Institution Details */}
                  <h3 className="text-lg font-bold font-serif text-ivory tracking-wide leading-snug group-hover:text-gold transition-colors duration-300">
                    {card.degree}
                  </h3>
                  <p className="text-sm font-sans font-medium text-white/80 mt-1">
                    {card.institution}
                  </p>
                  <p className="text-[10px] font-sans text-white/40 tracking-wider uppercase mt-0.5 mb-5">
                    {card.location}
                  </p>

                  {/* Details */}
                  <p className="text-xs text-ivory/65 leading-relaxed font-sans font-light">
                    {card.details}
                  </p>
                </div>

                {/* Micro Verified Seal */}
                <div className="border-t border-white/5 pt-4 mt-6 flex items-center gap-2 pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/80" />
                  <span className="text-[9px] font-sans font-semibold tracking-widest text-gold/80 uppercase">
                    Verified Academic Credential
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
