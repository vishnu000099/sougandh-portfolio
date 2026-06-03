"use client";

import React, { useRef } from "react";
import { GraduationCap, Milestone, Landmark, Check } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface TimelineItemProps {
  role: string;
  institution: string;
  location: string;
  period: string;
  highlights: string[];
  icon: React.ComponentType<{ size: number; className?: string }>;
  side: "left" | "right";
  index: number;
}

function TimelineItem({
  role,
  institution,
  location,
  period,
  highlights,
  icon: Icon,
  side,
  index,
}: TimelineItemProps) {
  const isLeft = side === "left";
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={`relative mb-16 flex flex-col md:flex-row items-center justify-between w-full ${
        isLeft ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Spacer to push card to the side on desktop */}
      <div className="w-full md:w-[45%]" />

      {/* Central Node Circle */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 w-10 h-10 rounded-full bg-charcoal border-2 border-gold flex items-center justify-center z-20 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
        <Icon size={16} className="text-gold" />
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="w-[calc(100%-48px)] md:w-[45%] ml-12 md:ml-0 glass-panel p-6 rounded-2xl border border-white/5 relative bg-charcoal/30 shadow-xl group hover:border-gold/30 hover:bg-charcoal/40 transition-all duration-300"
      >
        {/* Subtle decorative banner inside card */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex justify-between items-start gap-4 mb-3">
          <div>
            <span className="text-[10px] text-gold tracking-widest uppercase font-semibold block mb-1">
              {period}
            </span>
            <h3 className="text-lg font-bold font-serif text-ivory tracking-wide leading-snug group-hover:text-gold transition-colors duration-300">
              {role}
            </h3>
            <p className="text-sm font-sans font-light text-ivory/80 mt-0.5">
              {institution}
            </p>
          </div>
          <span className="text-[10px] font-sans text-white/50 tracking-wider uppercase bg-white/5 px-2.5 py-1 rounded border border-white/5 whitespace-nowrap">
            {location}
          </span>
        </div>

        {/* Highlights List */}
        <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
          <p className="text-[10px] font-sans text-gold/80 tracking-widest uppercase font-semibold">
            Key Focus Areas
          </p>
          <ul className="space-y-2">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 mt-0.5 shrink-0">
                  <Check size={9} className="text-gold" />
                </div>
                <span className="text-xs text-ivory/70 font-sans font-light leading-normal">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use scroll percentage of container to draw timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const pathHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 80,
    damping: 18,
  });

  const jobs: Omit<TimelineItemProps, "side" | "index">[] = [
    {
      role: "English Language & Literature Educator",
      institution: "Kihaadhoo School",
      location: "Maldives",
      period: "2012 – 2025",
      icon: Landmark,
      highlights: [
        "IGCSE English instruction, focusing on grammar comprehension, lexical resources, and writing skills.",
        "Facilitated language development curriculums for diverse ESL students to foster native-level reading fluency.",
        "Conducted literature instruction analyzing poetry and drama to cultivate interpretive capabilities.",
        "Systematic examination preparation, achieving high test score performance and school academic praise.",
        "Mentored individual student achievements, directing candidates to top-tier university admissions.",
      ],
    },
    {
      role: "CBSE English Teacher",
      institution: "Crescent English Medium School",
      location: "Kannur, Kerala",
      period: "2010 – 2011",
      icon: GraduationCap,
      highlights: [
        "Delivered CBSE English curriculums covering functional grammar, vocabulary modules, and critical writing skills.",
        "Coordinated student writing skill workshops, enhancing essay structure, style coherence, and formatting.",
        "Directed remedial grammar workshops to bridge student comprehension gaps effectively.",
        "Facilitated active reading comprehension modules evaluating literary and non-literary text compositions.",
      ],
    },
  ];

  return (
    <section id="journey" className="relative py-24 lg:py-32 bg-charcoal px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10 relative" ref={containerRef}>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase font-sans">
            Professional Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-ivory mt-2 mb-4">
            A Journey of Pedagogical Excellence
          </h2>
          <p className="text-sm font-sans font-light text-ivory/60 max-w-lg mx-auto">
            Reviewing my sixteen-year teaching itinerary across various state educational departments and international schools.
          </p>
        </div>

        {/* Timeline Path Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Main timeline center stem */}
          <div className="absolute left-10 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/5 z-0" />
          
          {/* Active scroll drawing line */}
          <motion.div
            style={{ height: pathHeight }}
            className="absolute left-10 md:left-1/2 md:-translate-x-1/2 top-4 w-[2px] bg-gold origin-top z-10 shadow-[0_0_10px_rgba(212,175,55,0.4)]"
          />

          {jobs.map((job, idx) => (
            <TimelineItem
              key={idx}
              {...job}
              side={idx % 2 === 0 ? "left" : "right"}
              index={idx}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
