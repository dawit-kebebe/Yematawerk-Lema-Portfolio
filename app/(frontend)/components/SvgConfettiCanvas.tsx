"use client";

import { useCallback, useEffect, useRef } from "react";

// SVG paths in /public to use as confetti material
const SVG_SOURCES = [
  "/art.svg",
  "/brush.svg",
  "/camera.svg",
  "/idea.svg",
  "/marketing.svg",
  "/photo.svg",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  fadeRate: number;
  image: HTMLImageElement;
}

/**
 * SvgConfettiCanvas
 *
 * Renders a full-size canvas behind the children. SVG confetti particles
 * burst from the cursor position only while the mouse is moving, then
 * drift downward with gravity, spin, and fade out.
 */
export default function SvgConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastEmitRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const prevMouseRef = useRef<{ x: number; y: number } | null>(null);

  // ── Load SVGs as Image elements ──────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    SVG_SOURCES.forEach((src) => {
      const img = new Image();
      img.src = src;
      images.push(img);
    });
    imagesRef.current = images;
  }, []);

  // ── Spawn a small burst of particles at (x, y) ──────────────────
  const emitParticles = useCallback(
    (x: number, y: number, speed: number) => {
      const images = imagesRef.current;
      if (images.length === 0) return;

      // Emit 2–4 particles per burst, more when the mouse moves faster
      const count = Math.min(4, 2 + Math.floor(speed / 60));

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 1.2 + Math.random() * 2.5;
        const size = 36 + Math.random() * 36;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 1.5, // slight upward bias
          size,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.12,
          opacity: 0.75 + Math.random() * 0.25,
          fadeRate: 0.004 + Math.random() * 0.004,
          image: images[Math.floor(Math.random() * images.length)],
        });
      }
    },
    []
  );

  // ── Animation loop ───────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size the canvas pixel buffer to match CSS size × devicePixelRatio.
    // Without this the browser stretches the smaller buffer to fit,
    // which squishes the SVGs and offsets mouse coordinates.
    const parent = canvas.parentElement;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Use ResizeObserver to track the parent section's size
    let resizeObserver: ResizeObserver | null = null;
    if (parent) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(parent);
    }

    const tick = () => {
      const cssW = canvas.getBoundingClientRect().width;
      const cssH = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, cssW, cssH);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics
        p.vy += 0.04; // gentle gravity
        p.vx *= 0.99; // air drag
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.fadeRate;

        // Remove dead particles
        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.drawImage(
          p.image,
          -p.size / 2,
          -p.size / 2,
          p.size,
          p.size
        );
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      resizeObserver?.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Mouse move handler — emit only when the mouse moves ──────────
  useEffect(() => {
    const EMIT_INTERVAL = 50; // ms between bursts

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Convert viewport coordinates to canvas-relative coordinates
      const rect = canvas.getBoundingClientRect();
      const now = Date.now();
      const curr = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      // Ignore if cursor is outside the canvas / section bounds
      if (curr.x < 0 || curr.y < 0 || curr.x > rect.width || curr.y > rect.height) return;
      mouseRef.current = curr;

      // Calculate speed from previous position
      let speed = 0;
      if (prevMouseRef.current) {
        const dx = curr.x - prevMouseRef.current.x;
        const dy = curr.y - prevMouseRef.current.y;
        speed = Math.sqrt(dx * dx + dy * dy);
      }
      prevMouseRef.current = curr;

      // Only emit if the mouse actually moved and enough time passed
      if (speed > 2 && now - lastEmitRef.current > EMIT_INTERVAL) {
        emitParticles(curr.x, curr.y, speed);
        lastEmitRef.current = now;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [emitParticles]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
