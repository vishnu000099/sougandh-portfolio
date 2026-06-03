"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Journey", href: "#journey" },
  { name: "Education", href: "#education" },
  { name: "Credentials", href: "#credentials" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Active section tracking
      const sections = ["about", "journey", "education", "credentials", "skills", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 lg:px-12 py-4 ${
          isScrolled ? "mt-4" : "mt-0"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-full py-3 px-6 ${
            isScrolled
              ? "glass-panel bg-charcoal/80 shadow-[0_8px_30px_rgb(0,0,0,0.3)] border-white/5"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 text-ivory font-serif text-lg tracking-wider font-semibold select-none group"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-gold/30 bg-gold/5 transition-transform duration-300 group-hover:scale-110">
              <GraduationCap size={16} className="text-gold transition-colors duration-300 group-hover:text-ivory" />
            </div>
            <span className="hidden sm:inline-block">S. VELIKKAKATH</span>
            <span className="inline-block sm:hidden">SV</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href.slice(1))}
                className={`nav-link text-xs tracking-[0.15em] uppercase font-sans font-medium transition-all duration-300 hover:text-gold relative py-1 ${
                  activeSection === item.href.slice(1) ? "text-gold font-semibold" : "text-ivory/60"
                }`}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="border border-gold text-gold hover:bg-gold hover:text-charcoal px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 uppercase shadow-sm"
            >
              Inquire Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-ivory/80 hover:text-gold focus:outline-none transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-0 z-40 bg-charcoal/95 backdrop-blur-lg border-b border-white/5 pt-28 pb-8 px-8 flex flex-col gap-6 shadow-2xl"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href.slice(1))}
                className="text-ivory/80 hover:text-gold font-sans font-medium text-sm tracking-widest uppercase transition-colors py-2 border-b border-white/5"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="w-full text-center border border-gold text-gold hover:bg-gold hover:text-charcoal py-3 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300"
            >
              Inquire Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
