"use client";

import React from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section className="relative py-28 lg:py-36 bg-charcoal px-6 lg:px-12 overflow-hidden flex items-center justify-center border-b border-white/5">
      {/* Light Projection Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          {/* Quote icon wrapper */}
          <div className="w-12 h-12 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mb-8 shadow-inner">
            <Quote size={20} className="text-gold" />
          </div>

          {/* Large Quote Typography */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif italic font-medium text-ivory leading-[1.35] tracking-wide mb-10 text-center select-none">
            "Language is not merely a subject to be taught, but a bridge that connects ideas, cultures, and opportunities."
          </h2>

          <div className="w-16 h-[1px] bg-gold/40 mb-8" />

          {/* Supporting Narrative */}
          <p className="text-sm sm:text-base text-ivory/60 font-sans font-light max-w-2xl leading-relaxed">
            Education thrives when students understand the practical relevance of what they learn. By establishing context in grammar instruction, analyzing historical frameworks in literature, and encouraging active debate, I guide students to utilize language as a critical toolkit for their international journeys.
          </p>

          <span className="text-[10px] font-sans font-semibold tracking-[0.25em] text-gold uppercase mt-6">
            Sougandh Velikkakath
          </span>
        </motion.div>
      </div>
    </section>
  );
}
