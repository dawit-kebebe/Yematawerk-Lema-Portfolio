"use client";

import { useEffect, useRef } from "react";

// ── Grid configuration ─────────────────────────────────────────────
const COLS = 24;
const ROWS = 16;
const MOUSE_RADIUS = 140; // influence radius in CSS px
const WARP_STRENGTH = 28; // max displacement in CSS px
const SPRING_BACK = 0.08; // how fast nodes return (0–1)

interface Node {
  /** Rest position */
  rx: number;
  ry: number;
  /** Current (warped) position */
  x: number;
  y: number;
}

/**
 * WarpWebCanvas
 *
 * Draws a mesh/web grid that warps toward the mouse pointer.
 * Line colour inverts with the theme: light lines on dark bg, dark on light.
 */
export default function WarpWebCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  // ── Animation loop + setup ───────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;

    // ── Build / rebuild grid ────────────────────────────────────────
    const buildGrid = (w: number, h: number) => {
      const nodes: Node[] = [];
      for (let row = 0; row <= ROWS; row++) {
        for (let col = 0; col <= COLS; col++) {
          const rx = (col / COLS) * w;
          const ry = (row / ROWS) * h;
          nodes.push({ rx, ry, x: rx, y: ry });
        }
      }
      nodesRef.current = nodes;
      sizeRef.current = { w, h };
    };

    // ── Resize canvas to match parent section ───────────────────────
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid(rect.width, rect.height);
    };
    resize();

    let resizeObserver: ResizeObserver | null = null;
    if (parent) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(parent);
    }

    // ── Detect dark mode for line colour ────────────────────────────
    const getLineColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark
        ? "rgba(255, 255, 255, 0.18)"
        : "rgba(0, 0, 0, 0.15)";
    };

    // ── Tick ─────────────────────────────────────────────────────────
    const tick = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update node positions
      for (const n of nodes) {
        let tx = n.rx;
        let ty = n.ry;

        if (mouse) {
          const dx = n.rx - mouse.x;
          const dy = n.ry - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS && dist > 0) {
            // Push nodes away from cursor (distortion)
            const force = (1 - dist / MOUSE_RADIUS) * WARP_STRENGTH;
            tx += (dx / dist) * force;
            ty += (dy / dist) * force;
          }
        }

        // Spring back toward target
        n.x += (tx - n.x) * SPRING_BACK;
        n.y += (ty - n.y) * SPRING_BACK;
      }

      // Draw lines
      const lineColor = getLineColor();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      const idx = (r: number, c: number) => r * (COLS + 1) + c;

      // Horizontal lines
      for (let row = 0; row <= ROWS; row++) {
        ctx.beginPath();
        for (let col = 0; col <= COLS; col++) {
          const n = nodes[idx(row, col)];
          if (col === 0) ctx.moveTo(n.x, n.y);
          else ctx.lineTo(n.x, n.y);
        }
        ctx.stroke();
      }

      // Vertical lines
      for (let col = 0; col <= COLS; col++) {
        ctx.beginPath();
        for (let row = 0; row <= ROWS; row++) {
          const n = nodes[idx(row, col)];
          if (row === 0) ctx.moveTo(n.x, n.y);
          else ctx.lineTo(n.x, n.y);
        }
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      resizeObserver?.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Mouse tracking (relative to canvas) ──────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only track when inside the section
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = null;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
