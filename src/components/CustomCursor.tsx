"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    // Track mouse coordinates
    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Spring interpolation loop for the outer ring
    let frameId: number;
    const updateCursor = () => {
      // Smoothly interpolate ring position towards mouse position
      const ease = 0.15;
      ringPos.x += (mouse.x - ringPos.x) * ease;
      ringPos.y += (mouse.y - ringPos.y) * ease;

      // Update styles directly to avoid React rerender latency
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;

      frameId = requestAnimationFrame(updateCursor);
    };

    frameId = requestAnimationFrame(updateCursor);

    // Set up hover states for buttons, links, cards
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or parent is interactive
      const interactive = target.closest("a, button, [role='button'], .interactive-card, .lightbox-trigger");
      
      if (interactive) {
        setIsHovered(true);
        if (interactive.classList.contains("lightbox-trigger")) {
          setCursorText("ZOOM");
        } else if (interactive.classList.contains("nav-link")) {
          setCursorText("");
          ring.style.transform += " scale(1.5)";
        } else {
          setCursorText("");
        }
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRingRef}
        className={`custom-cursor flex items-center justify-center transition-[width,height,background-color,border-color] duration-300 ${
          isHovered
            ? "w-[70px] h-[70px] bg-gold/10 border-gold border-2"
            : "w-[30px] h-[30px] bg-white/5 border-white/40 border-[1.5px]"
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-bold text-gold tracking-widest uppercase select-none font-sans animate-fade-in">
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner Solid Dot */}
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot transition-transform duration-200 ${
          isHovered ? "scale-0" : "scale-100"
        }`}
      />
    </>
  );
}
