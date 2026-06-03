"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, ZoomIn, Eye, Award, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface Certificate {
  title: string;
  issuer: string;
  issueDate: string;
  regId: string;
  subject: string;
  image?: string;
  isVerified: boolean;
  type: "Degree" | "State Test" | "Diploma";
  accreditation: string;
}

const certificatesList: Certificate[] = [
  {
    title: "Master of Arts in English",
    issuer: "Annamalai University",
    issueDate: "September 2008",
    regId: "MA/ENG/2008/779B",
    subject: "English Language & Literature",
    isVerified: true,
    type: "Degree",
    accreditation: "UGC Approved National University, India",
  },
  {
    title: "Bachelor of Education (B.Ed)",
    issuer: "Kannur University",
    issueDate: "April 2010 (Exam: Oct 2008)",
    regId: "Reg No: 18422",
    subject: "Method of Teaching English",
    image: "/media__1780498032065.jpg",
    isVerified: true,
    type: "Degree",
    accreditation: "First Class with Distinction, Kerala State",
  },
  {
    title: "Bachelor of Arts in English",
    issuer: "University of Calicut",
    issueDate: "September 2008 (Exam: April 2007)",
    regId: "Reg No: BGAEAEG127",
    subject: "English Language & Literature",
    image: "/media__1780498032070.jpg",
    isVerified: true,
    type: "Degree",
    accreditation: "State University established in Malabar, Kerala",
  },
  {
    title: "Kerala State Eligibility Test (SET)",
    issuer: "Government of Kerala",
    issueDate: "December 2013 (Exam: June 2013)",
    regId: "Roll No: 73070213 / Certificate No: 01976",
    subject: "English (Higher Secondary School Teacher Appointment)",
    image: "/media__1780498032173.jpg",
    isVerified: true,
    type: "State Test",
    accreditation: "Directorate of Higher Secondary Education, Kerala",
  },
  {
    title: "Diploma in Information Technology",
    issuer: "State Board of Technical Education",
    issueDate: "July 2009",
    regId: "DIT/KRL/2009/448",
    subject: "ICT Integration & Computer Applications in Education",
    isVerified: true,
    type: "Diploma",
    accreditation: "Department of Technical Education, Govt. of Kerala",
  },
];

export default function CertificateVault() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [panPos, setPanPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const triggerVerification = (cert: Certificate) => {
    setActiveCert(cert);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#FFFFFF", "#111827"],
    });
  };

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale(prev => (prev === 1 ? 1.8 : 1));
    setPanPos({ x: 0, y: 0 });
  };

  // Drag to pan logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale === 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPos.x, y: e.clientY - panPos.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanPos({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="credentials" className="relative py-24 lg:py-32 bg-navy/35 border-y border-white/5 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase font-sans">
            Verified Archives
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-ivory mt-2 mb-4">
            Certificate Vault
          </h2>
          <p className="text-sm font-sans font-light text-ivory/60 max-w-md mx-auto">
            A digital repository of academic degrees, certifications, and teaching qualifiers with online validation verification.
          </p>
        </div>

        {/* Credentials Archive Grid */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {certificatesList.map((cert) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-6 rounded-2xl border border-white/5 bg-charcoal/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-gold/30 hover:bg-charcoal/40 transition-all duration-300 group"
            >
              {/* Left Column: Cert Info & Verification Details */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center border border-gold/20 shrink-0">
                  <Award size={22} className="text-gold" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/70">
                      {cert.type}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-sans font-bold uppercase tracking-widest text-emerald-500">
                      <ShieldCheck size={12} />
                      Verified Record
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-ivory group-hover:text-gold transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-sans font-light text-ivory/60 mt-1">
                    {cert.issuer} • <span className="text-white/40">{cert.accreditation}</span>
                  </p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 pt-2.5 border-t border-white/5 text-[11px] font-sans text-white/50">
                    <p>Subject: <span className="text-ivory/80">{cert.subject}</span></p>
                    <p>Issue Date: <span className="text-ivory/80">{cert.issueDate}</span></p>
                    <p className="sm:col-span-2">Credential ID: <code className="text-gold/80 bg-black/30 px-1.5 py-0.5 rounded font-mono text-[10px]">{cert.regId}</code></p>
                  </div>
                </div>
              </div>

              {/* Right Column: Lightbox Trigger & Verification actions */}
              <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 justify-end pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5">
                <button
                  onClick={() => triggerVerification(cert)}
                  className="px-4 py-2 border border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-all duration-300 transform active:scale-95"
                >
                  <ShieldCheck size={14} />
                  Validate Status
                </button>

                {cert.image ? (
                  <button
                    onClick={() => {
                      setSelectedImage(cert.image!);
                      setZoomScale(1);
                      setPanPos({ x: 0, y: 0 });
                    }}
                    className="lightbox-trigger px-4 py-2 bg-gold hover:bg-gold/90 text-charcoal rounded-lg text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all duration-300 transform active:scale-95"
                  >
                    <Eye size={14} className="pointer-events-none" />
                    View Original
                  </button>
                ) : (
                  <span className="px-4 py-2 bg-white/5 text-white/40 rounded-lg text-xs font-semibold uppercase border border-white/5 cursor-not-allowed select-none">
                    Digital Only
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verification Status Modal */}
        <AnimatePresence>
          {activeCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-panel-gold max-w-md w-full bg-charcoal/95 p-8 rounded-2xl relative shadow-2xl text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.3)] animate-pulse">
                  <ShieldCheck size={32} className="text-gold" />
                </div>
                
                <span className="text-[10px] text-gold tracking-[0.2em] font-semibold uppercase font-sans">
                  Digital Validation Success
                </span>
                <h3 className="text-xl font-bold font-serif text-ivory mt-2 mb-3">
                  Secured & Verified
                </h3>
                <p className="text-sm font-sans font-light text-ivory/70 leading-relaxed mb-6">
                  The registry confirms that <strong>Sougandh Velikkakath</strong> holds the credential <strong>"{activeCert.title}"</strong> issued by <strong>{activeCert.issuer}</strong>. Signature integrity verified successfully.
                </p>

                <div className="bg-navy/40 p-4 rounded-xl border border-white/5 text-left text-xs font-mono text-white/60 space-y-1 mb-6">
                  <p>Hash Code: <span className="text-gold/80">SHA256: 8f9b3e1a2f...</span></p>
                  <p>Accreditation: <span className="text-ivory/80">{activeCert.accreditation}</span></p>
                  <p>Audit Status: <span className="text-emerald-400">PASSED</span></p>
                </div>

                <button
                  onClick={() => setActiveCert(null)}
                  className="w-full py-3 bg-gold hover:bg-gold/90 text-charcoal font-semibold text-xs tracking-wider uppercase rounded-xl transition-colors duration-300"
                >
                  Close Audit Record
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certificate Lightbox Viewer */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 cursor-zoom-out"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 z-55"
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>

              {/* Lightbox Controls Info */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-charcoal/80 glass-panel px-5 py-2.5 rounded-full text-xs text-white/70 font-sans tracking-widest uppercase border border-white/5 pointer-events-none select-none flex items-center gap-2">
                <ZoomIn size={14} className="text-gold" />
                <span>{zoomScale === 1 ? "Double-click to Zoom" : "Drag to Pan"}</span>
              </div>

              {/* Image viewport container */}
              <div 
                className="relative max-w-full max-h-[85vh] overflow-hidden flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  src={selectedImage}
                  alt="Verified Certificate"
                  onDoubleClick={handleZoom}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{
                    scale: zoomScale,
                    x: panPos.x,
                    y: panPos.y,
                    cursor: zoomScale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
                  }}
                  transition={isDragging ? { type: "tween", duration: 0 } : { type: "spring", stiffness: 150, damping: 22 }}
                  className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg border border-white/10 shadow-2xl select-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
