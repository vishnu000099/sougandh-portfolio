"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const skills = [
  "English Language",
  "English Literature",
  "ESL/EFL Instruction",
  "IGCSE Curriculum",
  "CBSE Curriculum",
  "Lesson Planning",
  "Assessment",
  "Academic Writing",
  "Communication Skills",
  "ICT Integration",
  "Classroom Management",
  "Student Mentorship",
];

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  width: number;
  height: number;
  isHovered: boolean;
  baseColor: string;
  hoverColor: string;
}

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = container.clientWidth;
    let height = 500; // fixed landscape container height for nodes

    canvas.width = width;
    canvas.height = height;

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    // Initializing nodes
    ctx.font = "12px Inter, sans-serif";
    const nodes: Node[] = skills.map((text, idx) => {
      const textWidth = ctx.measureText(text).width;
      const w = textWidth + 32; // padding
      const h = 36; // height

      // Position nodes in a circle or randomly scattered
      const angle = (idx / skills.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.35;
      const x = width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 80;
      const y = height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 80;

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        text,
        width: w,
        height: h,
        isHovered: false,
        baseColor: "rgba(255, 255, 255, 0.04)",
        hoverColor: "rgba(212, 175, 55, 0.15)",
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Rounded rectangle helper
    const drawRoundRect = (
      cContext: CanvasRenderingContext2D,
      xPos: number,
      yPos: number,
      w: number,
      h: number,
      r: number,
      fill: boolean,
      stroke: boolean
    ) => {
      cContext.beginPath();
      cContext.moveTo(xPos + r, yPos);
      cContext.lineTo(xPos + w - r, yPos);
      cContext.quadraticCurveTo(xPos + w, yPos, xPos + w, yPos + r);
      cContext.lineTo(xPos + w, yPos + h - r);
      cContext.quadraticCurveTo(xPos + w, yPos + h, xPos + w - r, yPos + h);
      cContext.lineTo(xPos + r, yPos + h);
      cContext.quadraticCurveTo(xPos, yPos + h, xPos, yPos + h - r);
      cContext.lineTo(xPos, yPos + r);
      cContext.quadraticCurveTo(xPos, yPos, xPos + r, yPos);
      cContext.closePath();
      if (fill) cContext.fill();
      if (stroke) cContext.stroke();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.18;
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      let currentHovered: string | null = null;

      // Update and draw nodes
      nodes.forEach((node) => {
        // Collision / boundaries
        node.x += node.vx;
        node.y += node.vy;

        if (node.x - node.width / 2 < 0 || node.x + node.width / 2 > width) {
          node.vx = -node.vx;
        }
        if (node.y - node.height / 2 < 0 || node.y + node.height / 2 > height) {
          node.vy = -node.vy;
        }

        // Mouse interaction
        const mdx = mouse.x - node.x;
        const mdy = mouse.y - node.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        // Hover checking
        if (
          mouse.x >= node.x - node.width / 2 &&
          mouse.x <= node.x + node.width / 2 &&
          mouse.y >= node.y - node.height / 2 &&
          mouse.y <= node.y + node.height / 2
        ) {
          node.isHovered = true;
          currentHovered = node.text;
          // Slowly bring speed to 0
          node.vx *= 0.8;
          node.vy *= 0.8;
        } else {
          node.isHovered = false;
          // Apply a gentle force towards center if straying too far
          const cx = width / 2;
          const cy = height / 2;
          const toCenterX = cx - node.x;
          const toCenterY = cy - node.y;
          const centerDist = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY);
          
          if (centerDist > Math.min(width, height) * 0.45) {
            node.vx += toCenterX * 0.0001;
            node.vy += toCenterY * 0.0001;
          }

          // Gentle gravity repulsion from mouse if mouse is close
          if (mdist < 120 && mdist > 0) {
            const force = (120 - mdist) * 0.005;
            node.vx -= (mdx / mdist) * force;
            node.vy -= (mdy / mdist) * force;
          }

          // Bound velocity
          const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
          const maxSpeed = 0.8;
          if (speed > maxSpeed) {
            node.vx = (node.vx / speed) * maxSpeed;
            node.vy = (node.vy / speed) * maxSpeed;
          }
        }

        // Render node capsule
        const xPos = node.x - node.width / 2;
        const yPos = node.y - node.height / 2;

        ctx.shadowColor = node.isHovered ? "rgba(212, 175, 55, 0.2)" : "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = node.isHovered ? 12 : 6;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;

        ctx.fillStyle = node.isHovered ? "rgba(11, 15, 20, 0.95)" : "rgba(17, 24, 39, 0.75)";
        ctx.strokeStyle = node.isHovered ? "#d4af37" : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = node.isHovered ? 1.5 : 1;

        drawRoundRect(ctx, xPos, yPos, node.width, node.height, 18, true, true);

        // Reset shadow
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";

        // Render text
        ctx.fillStyle = node.isHovered ? "#d4af37" : "#F8F8F5";
        ctx.font = "500 12px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.text, node.x, node.y);
      });

      setHoveredSkill(currentHovered);
      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    const handleResize = () => {
      width = container.clientWidth;
      canvas.width = width;
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="skills" className="relative py-24 lg:py-32 bg-charcoal px-6 lg:px-12 overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase font-sans">
            Skill Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-ivory mt-2 mb-4">
            Areas of Pedagogical Expertise
          </h2>
          <p className="text-sm font-sans font-light text-ivory/60 max-w-md mx-auto">
            Interact with the skill nodes. Hover over them to highlight their connections and stabilize their movements.
          </p>
        </div>

        {/* Dynamic Canvas Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[500px] rounded-2xl border border-white/5 glass-panel bg-navy/10 overflow-hidden hidden md:block"
        >
          {/* Faint Grid Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-pointer" />

          {/* Interactive instruction status overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none glass-panel px-4 py-2 rounded-full text-[10px] tracking-widest text-white/50 uppercase font-sans border border-white/5">
            {hoveredSkill ? (
              <span>Focused: <strong className="text-gold">{hoveredSkill}</strong></span>
            ) : (
              "Hover to lock node"
            )}
          </div>
        </div>

        {/* Mobile Static Fallback Grid */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {skills.map((skill) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl border border-white/5 bg-navy/20 text-center text-xs font-sans text-ivory font-medium hover:border-gold/30 hover:text-gold transition-all duration-300"
            >
              {skill}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
