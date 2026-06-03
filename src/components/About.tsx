"use client";

import React, { useEffect, useState, useRef } from "react";
import { BookOpen, Globe2, Users2, Compass, CheckCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";

const stats = [
  { id: 1, label: "Years Teaching", limit: 16, suffix: "+", icon: BookOpen },
  { id: 2, label: "Countries Served", limit: 2, suffix: "", icon: Globe2 },
  { id: 3, label: "Students Guided", limit: 1000, suffix: "+", icon: Users2 },
];

function CountUp({ limit, suffix, inView }: { limit: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const duration = 1.5; // seconds
    const steps = 60;
    const increment = limit / steps;
    const stepTime = (duration * 1000) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= limit) {
        setCount(limit);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [limit, inView]);

  return (
    <span className="font-serif text-5xl sm:text-6xl text-gold font-bold">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { title: "International Educator", desc: "Expertise in working with multicultural classrooms, integrating global educational standards, and expanding student horizons." },
    { title: "ESL / EFL Specialist", desc: "Crafting custom syllabus frameworks targeting English comprehension, conversational fluency, and examination proficiency." },
    { title: "Curriculum Expert", desc: "Profound proficiency in structuring IGCSE (Cambridge) and CBSE (India) curriculums, ensuring robust academic benchmarking." },
    { title: "Student Mentor", desc: "Committed to fostering critical thinking, literature appreciation, and public speaking confidence to enable life-long learning." },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-navy/35 border-y border-white/5 px-6 lg:px-12 overflow-hidden">
      {/* Background soft blur accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Editorial Intro & Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase font-sans">
                Professional Bio
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-ivory mt-2 mb-6">
                Shaping Minds Through Literature & Language
              </h2>
              <div className="space-y-6 text-ivory/80 font-sans font-light leading-relaxed text-base sm:text-lg">
                <p>
                  As an educator with over 16 years of international classroom experience, I view English not just as a set of rules and vocabularies, but as an expansive medium for critical thought, global connection, and self-expression.
                </p>
                <p>
                  My career has crossed cultures and academic structures, from Kerala, India, to the Maldives. Throughout this journey, I have specialized in directing students through Cambridge IGCSE and CBSE English frameworks, preparing them not only to achieve outstanding exam results but also to navigate the global landscape with linguistic confidence.
                </p>
              </div>
            </motion.div>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-panel p-5 rounded-xl border border-white/5 hover:border-gold/20 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle size={16} className="text-gold group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-sm font-semibold text-ivory tracking-wide">{h.title}</h3>
                  </div>
                  <p className="text-xs text-ivory/60 leading-relaxed font-sans font-light">
                    {h.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Statistics Deck */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full" ref={ref}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 shadow-2xl relative space-y-8 bg-charcoal/40"
            >
              {/* Gold corners to emphasize the premium university design */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold/40 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold/40 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold/40 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold/40 rounded-br-xl" />

              <h3 className="text-center font-serif text-lg text-ivory/90 tracking-widest uppercase border-b border-white/10 pb-4">
                Career at a Glance
              </h3>

              <div className="space-y-8">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.id} className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-full bg-gold/5 flex items-center justify-center border border-gold/20 shadow-inner">
                        <Icon size={24} className="text-gold" />
                      </div>
                      <div className="flex flex-col">
                        <CountUp limit={stat.limit} suffix={stat.suffix} inView={isInView} />
                        <span className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-ivory/50 mt-1">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/10 pt-5 text-center">
                <p className="text-xs font-sans text-gold/80 italic tracking-wider">
                  "Distinguished teaching career spanning two nations."
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
