"use client";

import React, { useState } from "react";
import { MessageSquare, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Mr. Sougandh's guidance during IGCSE preparation was transformative. He breaks down complex Shakespearean dramas into themes we can easily relate to, helping me secure an A* in English Literature.",
    author: "Fathimath Shaza",
    role: "IGCSE Student",
    affiliation: "Kihaadhoo School, Maldives",
    avatar: "FS",
  },
  {
    quote: "Sougandh possesses a rare combination of pedagogical precision and deep literary knowledge. His leadership in designing the school's English language curriculum significantly elevated student achievement scores.",
    author: "Ahmed Naseem",
    role: "School Principal",
    affiliation: "Ministry of Education, Maldives",
    avatar: "AN",
  },
  {
    quote: "Under his mentorship, our son's writing skills improved dramatically. He learned not just how to pass examinations, but how to construct persuasive arguments and communicate confidently.",
    author: "Deepa Nair",
    role: "Parent of CBSE Student",
    affiliation: "Kannur, India",
    avatar: "DN",
  },
  {
    quote: "An outstanding educator who inspires academic excellence. His methodologies in ESL/EFL teaching are highly innovative, making computer-aided learning and language exercises engaging for all students.",
    author: "Dr. K. Radhakrishnan",
    role: "Academic Superintendent",
    affiliation: "DHSE Board, Kerala",
    avatar: "KR",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 lg:py-32 bg-navy/20 border-y border-white/5 px-6 lg:px-12 overflow-hidden">
      {/* Background Soft Gold Glow */}
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase font-sans">
            Client & Student Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-ivory mt-2 mb-4">
            Educational Endorsements
          </h2>
          <p className="text-sm font-sans font-light text-ivory/60 max-w-md mx-auto">
            Read perspectives from administrators, parents, and students who have experienced my English modules.
          </p>
        </div>

        {/* Carousel Slider Component */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          
          <div className="relative overflow-hidden min-h-[300px] sm:min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 bg-charcoal/40 text-center relative max-w-3xl w-full"
              >
                {/* Large Background Quote Symbol */}
                <Quote size={80} className="text-white/2 absolute -top-4 left-6 pointer-events-none select-none" />

                <p className="text-base sm:text-xl font-serif italic text-ivory/90 leading-relaxed mb-8 select-none">
                  "{testimonials[activeIndex].quote}"
                </p>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-3">
                    <span className="text-xs font-bold text-gold tracking-wider uppercase font-sans">
                      {testimonials[activeIndex].avatar}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-ivory tracking-wide font-sans">
                    {testimonials[activeIndex].author}
                  </h4>
                  <p className="text-[10px] text-white/50 tracking-wider uppercase font-sans font-semibold mt-0.5">
                    {testimonials[activeIndex].role} • <span className="text-gold/80">{testimonials[activeIndex].affiliation}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-gold/50 bg-white/5 hover:bg-gold/5 text-white/80 hover:text-gold flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft size={16} />
            </button>
            
            {/* Carousel Dot Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "w-4 bg-gold" : "bg-white/20"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-gold/50 bg-white/5 hover:bg-gold/5 text-white/80 hover:text-gold flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
