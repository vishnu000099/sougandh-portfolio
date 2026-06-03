"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ChalkboardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = canvas.parentElement || document.body;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a2a22, 0.08); // matches Forest Chalkboard color

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const spotlight = new THREE.SpotLight(0xd4af37, 8, 30, Math.PI / 4, 0.5, 1); // Gold spotlight
    spotlight.position.set(0, 10, 10);
    scene.add(spotlight);

    // Mouse movement vector for parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Helper to generate text texture dynamically
    const createTextTexture = (text: string, fontStyle = "italic 32px Georgia", color = "#d4af37") => {
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d");
      if (!ctx) return null;
      
      ctx.font = fontStyle;
      const metrics = ctx.measureText(text);
      const textWidth = Math.ceil(metrics.width) + 16;
      const textHeight = 48;
      
      c.width = textWidth;
      c.height = textHeight;
      
      // Clear
      ctx.clearRect(0, 0, c.width, c.height);
      // Redraw font after canvas resize
      ctx.font = fontStyle;
      ctx.fillStyle = color;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      
      // Shadow for cinematic depth
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      ctx.fillText(text, c.width / 2, c.height / 2);
      
      const texture = new THREE.CanvasTexture(c);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    // 5. Creating Floating Academic Elements
    const elementsGroup = new THREE.Group();
    scene.add(elementsGroup);

    // Dynamic Literatures, Quotes, and symbols
    const literatureItems = [
      { text: "Shakespeare", size: "italic 36px 'Playfair Display', Georgia", color: "rgba(248, 248, 245, 0.6)" },
      { text: "Hamlet", size: "italic 28px 'Playfair Display', Georgia", color: "rgba(212, 175, 55, 0.5)" },
      { text: "Literature", size: "32px Inter, sans-serif", color: "rgba(248, 248, 245, 0.4)" },
      { text: "¶", size: "bold 44px 'Playfair Display', Georgia", color: "rgba(212, 175, 55, 0.6)" },
      { text: "&", size: "bold 48px 'Playfair Display', Georgia", color: "rgba(248, 248, 245, 0.3)" },
      { text: "Poetry", size: "italic 32px 'Playfair Display', Georgia", color: "rgba(248, 248, 245, 0.5)" },
      { text: "Metaphor", size: "28px Inter, sans-serif", color: "rgba(212, 175, 55, 0.4)" },
      { text: "A", size: "bold 40px 'Playfair Display', Georgia", color: "rgba(248, 248, 245, 0.5)" },
      { text: "Ω", size: "bold 36px Georgia", color: "rgba(212, 175, 55, 0.4)" },
      { text: "To be or not to be...", size: "italic 24px 'Playfair Display', Georgia", color: "rgba(248, 248, 245, 0.35)" },
    ];

    const elementMeshes: Array<{
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speedX: number;
      speedY: number;
      speedRot: number;
      amplitude: number;
    }> = [];

    literatureItems.forEach((item, index) => {
      const texture = createTextTexture(item.text, item.size, item.color);
      if (!texture) return;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const aspect = texture.image.width / texture.image.height;
      const width = aspect * 0.8;
      const height = 0.8;
      
      const geometry = new THREE.PlaneGeometry(width, height);
      const mesh = new THREE.Mesh(geometry, material);

      // Distribute in space
      const baseX = (Math.random() - 0.5) * 12;
      const baseY = (Math.random() - 0.5) * 8;
      const baseZ = (Math.random() - 0.5) * 4; // depth layer

      mesh.position.set(baseX, baseY, baseZ);
      elementsGroup.add(mesh);

      elementMeshes.push({
        mesh,
        baseX,
        baseY,
        baseZ,
        speedX: (Math.random() - 0.5) * 0.005,
        speedY: (Math.random() - 0.5) * 0.005,
        speedRot: (Math.random() - 0.5) * 0.002,
        amplitude: 0.1 + Math.random() * 0.2,
      });
    });

    // 6. Floating Books (Programmatic 3D Geometry)
    const booksGroup = new THREE.Group();
    elementsGroup.add(booksGroup);

    const bookObjects: Array<{
      group: THREE.Group;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      swaySpeed: number;
      swayAmt: number;
    }> = [];

    const bookColors = [
      0x111827, // Navy
      0x4d3221, // Brown leather
      0x2c4a3e, // Deep green
      0x1f2937, // Charcoal
    ];

    for (let i = 0; i < 4; i++) {
      const book = new THREE.Group();

      // Cover (thin outer box)
      const coverGeo = new THREE.BoxGeometry(1.2, 1.6, 0.25);
      const coverMat = new THREE.MeshStandardMaterial({
        color: bookColors[i],
        roughness: 0.7,
        metalness: 0.1,
      });
      const cover = new THREE.Mesh(coverGeo, coverMat);
      book.add(cover);

      // Pages (slightly smaller white block)
      const pagesGeo = new THREE.BoxGeometry(1.1, 1.5, 0.2);
      const pagesMat = new THREE.MeshStandardMaterial({
        color: 0xf3f4f6, // cream-white
        roughness: 0.9,
      });
      const pages = new THREE.Mesh(pagesGeo, pagesMat);
      pages.position.set(0.04, 0, 0); // offset slightly
      book.add(pages);

      // Spine gold trim (visual detail)
      const spineGeo = new THREE.BoxGeometry(0.12, 1.6, 0.26);
      const spineMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37, // gold trim
        roughness: 0.3,
        metalness: 0.8,
      });
      const spine = new THREE.Mesh(spineGeo, spineMat);
      spine.position.set(-0.58, 0, 0);
      book.add(spine);

      // Distribute
      const baseX = (i % 2 === 0 ? -1.5 : 1.5) * 2 + (Math.random() - 0.5) * 1.5;
      const baseY = (i < 2 ? -1.2 : 1.2) * 1.5 + (Math.random() - 0.5) * 1;
      const baseZ = -1 - Math.random() * 2; // Keep in the background

      book.position.set(baseX, baseY, baseZ);
      book.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      booksGroup.add(book);
      bookObjects.push({
        group: book,
        baseX,
        baseY,
        baseZ,
        rotSpeedX: (Math.random() - 0.5) * 0.003,
        rotSpeedY: (Math.random() - 0.5) * 0.005,
        rotSpeedZ: (Math.random() - 0.5) * 0.002,
        swaySpeed: 0.5 + Math.random() * 0.8,
        swayAmt: 0.15 + Math.random() * 0.15,
      });
    }

    // 7. Chalk Dust Particles (Particle system)
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // position
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      // drift speed
      speeds[i * 3] = (Math.random() - 0.5) * 0.004; // x speed
      speeds[i * 3 + 1] = -Math.random() * 0.005 - 0.001; // falling y speed
      speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.003; // z speed
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Dynamic dot canvas for particle texture
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(0.5, "rgba(212, 175, 55, 0.3)"); // slightly gold
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 8. Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Lerp mouse coordinates for smooth lag-effect
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Subtle scene parallax based on mouse
      elementsGroup.position.x = mouse.x * 0.5;
      elementsGroup.position.y = mouse.y * 0.3;
      
      spotlight.position.x = mouse.x * 5;
      spotlight.position.y = 10 + mouse.y * 2;

      // Animate floating text/symbols
      elementMeshes.forEach((item, index) => {
        // Slowly float and sway
        const yOffset = Math.sin(time + index) * item.amplitude;
        item.mesh.position.y = item.baseY + yOffset;
        
        // Horizontal drift
        item.mesh.position.x += item.speedX;
        if (Math.abs(item.mesh.position.x - item.baseX) > 1.5) {
          item.speedX = -item.speedX;
        }

        // Tiny rotation
        item.mesh.rotation.z += item.speedRot;
      });

      // Animate books
      bookObjects.forEach((item) => {
        item.group.rotation.x += item.rotSpeedX;
        item.group.rotation.y += item.rotSpeedY;
        item.group.rotation.z += item.rotSpeedZ;

        // Sway up and down
        item.group.position.y = item.baseY + Math.sin(time * item.swaySpeed) * item.swayAmt;
        // Parallax depth offset
        item.group.position.x = item.baseX + mouse.x * 0.2;
      });

      // Animate particles (chalk dust drifting down and wrapping)
      const positionsAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const array = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        array[i * 3] += speeds[i * 3]; // X drift
        array[i * 3 + 1] += speeds[i * 3 + 1]; // Y falling
        array[i * 3 + 2] += speeds[i * 3 + 2]; // Z drift

        // Wrap around when boundaries are exceeded
        if (array[i * 3 + 1] < -5) {
          array[i * 3 + 1] = 5; // respawn at top
          array[i * 3] = (Math.random() - 0.5) * 15; // random x
        }
        if (Math.abs(array[i * 3]) > 10) {
          speeds[i * 3] = -speeds[i * 3]; // reverse x drift
        }
      }
      positionsAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      
      // Dispose textures & geometries
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      
      elementMeshes.forEach(item => {
        item.mesh.geometry.dispose();
        if (Array.isArray(item.mesh.material)) {
          item.mesh.material.forEach(m => m.dispose());
        } else {
          item.mesh.material.dispose();
        }
      });

      bookObjects.forEach(b => {
        b.group.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 bg-transparent block"
    />
  );
}
