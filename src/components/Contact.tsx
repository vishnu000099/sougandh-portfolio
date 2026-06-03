"use client";

import React, { useState } from "react";
import { Mail, Phone, MessageSquare, Download, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Linkedin = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Recruiter",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", role: "Recruiter", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      title: "Email Address",
      value: "sougandh.v@email.com",
      link: "mailto:sougandh.v@email.com?subject=Educational%20Portfolio%20Inquiry",
      icon: Mail,
      desc: "Response within 24 hours",
    },
    {
      title: "WhatsApp & Call",
      value: "+91 9447 184 220",
      link: "https://wa.me/919447184220?text=Hello%20Sougandh,%20I%20viewed%20your%20portfolio...",
      icon: Phone,
      desc: "Available for teaching offers",
    },
    {
      title: "LinkedIn Profile",
      value: "linkedin.com/in/sougandh-v",
      link: "https://linkedin.com/in/sougandh-v", // placeholder
      icon: Linkedin,
      desc: "Professional networks",
    },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-charcoal px-6 lg:px-12 overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase font-sans">
            Networking Center
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-ivory mt-2 mb-4">
            Connect & Collaborate
          </h2>
          <p className="text-sm font-sans font-light text-ivory/60 max-w-md mx-auto">
            Get in touch for school postings, classroom guest lectures, curriculum advisory, or ESL consulting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct Networking Cards */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold font-serif text-ivory mb-4 tracking-wide">
              Direct Communication
            </h3>
            
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.title}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="glass-panel p-5 rounded-2xl border border-white/5 bg-charcoal/30 flex items-center gap-4 transition-all duration-300 hover:border-gold/30 hover:bg-charcoal/40 group cursor-pointer block"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/5 flex items-center justify-center border border-gold/20 shrink-0 group-hover:bg-gold/10 transition-colors duration-300">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white/50 tracking-widest uppercase font-sans">
                      {method.title}
                    </h4>
                    <p className="text-sm font-semibold text-ivory mt-0.5 tracking-wide group-hover:text-gold transition-colors duration-300">
                      {method.value}
                    </p>
                    <p className="text-[10px] text-white/40 font-sans mt-0.5 font-light">
                      {method.desc}
                    </p>
                  </div>
                </motion.a>
              );
            })}

            {/* CV Download Large Card */}
            <motion.a
              href="mailto:sougandh.v@email.com?subject=Requesting%20Teaching%20CV"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel-gold p-6 rounded-2xl border border-gold/20 bg-charcoal/30 flex items-center justify-between gap-4 transition-all duration-300 hover:bg-gold/5 cursor-pointer block group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/30 shrink-0">
                  <Download size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-serif text-ivory tracking-wide">
                    Curriculum Vitae (CV)
                  </h4>
                  <p className="text-xs text-white/50 font-sans mt-0.5 font-light">
                    Request full resume in PDF format
                  </p>
                </div>
              </div>
              <Send size={16} className="text-gold group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </div>

          {/* Right Column: Premium Inquiry Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 bg-charcoal/40 relative shadow-xl"
            >
              <h3 className="text-lg font-bold font-serif text-ivory mb-6 tracking-wide border-b border-white/5 pb-4">
                Send an Inquiry
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans font-semibold tracking-widest text-white/50 uppercase">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Principal Naseem"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-black/30 border border-white/5 hover:border-white/15 focus:border-gold focus:outline-none rounded-xl py-3 px-4 text-sm font-sans tracking-wide text-ivory transition-all duration-300"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans font-semibold tracking-widest text-white/50 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. principal@school.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-black/30 border border-white/5 hover:border-white/15 focus:border-gold focus:outline-none rounded-xl py-3 px-4 text-sm font-sans tracking-wide text-ivory transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Role select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-semibold tracking-widest text-white/50 uppercase">
                    Your Relationship / Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="bg-black/30 border border-white/5 hover:border-white/15 focus:border-gold focus:outline-none rounded-xl py-3 px-4 text-sm font-sans tracking-wide text-ivory transition-all duration-300 cursor-pointer"
                  >
                    <option value="Recruiter">School Recruiter / Administrator</option>
                    <option value="Parent">Parent of Student</option>
                    <option value="Student">Literature / ESL Student</option>
                    <option value="Other">Other Professional Network</option>
                  </select>
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-semibold tracking-widest text-white/50 uppercase">
                    Inquiry Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter details about teaching offers, tutoring programs, or collaborations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-black/30 border border-white/5 hover:border-white/15 focus:border-gold focus:outline-none rounded-xl py-3 px-4 text-sm font-sans tracking-wide text-ivory transition-all duration-300 resize-none leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                    isSuccess
                      ? "bg-emerald-500 text-charcoal hover:bg-emerald-400"
                      : "bg-gold hover:bg-gold/90 text-charcoal shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 rounded-full border-2 border-charcoal border-t-transparent animate-spin" />
                  ) : isSuccess ? (
                    <>
                      <CheckCircle size={16} />
                      Message Sent Successfully
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>

        {/* Footer copyright */}
        <div className="mt-24 border-t border-white/5 pt-8 text-center text-[10px] font-sans text-white/30 tracking-widest uppercase">
          <p>© 2026 SOUGANDH VELIKKAKATH. ALL RIGHTS RESERVED.</p>
          <p className="mt-1">HANDCRAFTED FOR ACADEMIC PRESTIGE</p>
        </div>

      </div>
    </section>
  );
}
