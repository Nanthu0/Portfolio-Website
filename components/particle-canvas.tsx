"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Mote {
  x: number;
  y: number;
  baseVy: number;   // natural fall speed for this mote
  vy: number;       // current fall speed (boosted by scroll)
  vx: number;
  driftPhase: number;
  radius: number;
  opacity: number;
  // fade-in / fade-out near top and bottom edges
  age: number;      // 0→1 fade-in progress
}

// ─── Config ───────────────────────────────────────────────────────────────────

const COUNT       = 35;
const COLOR       = "34,211,238";
// 3 depth layers: back (slow/dim) → front (faster/brighter)
const BASE_VY     = [0.18, 0.32, 0.52] as const;  // faster so motion is obvious
const MAX_OPACITY = [0.28, 0.42, 0.55] as const;  // clearly visible above content
// How much scroll velocity adds to fall speed
const SCROLL_BOOST = 0.006;
// How fast the scroll boost decays each frame
const SCROLL_DECAY = 0.88;

// ─── Factory ──────────────────────────────────────────────────────────────────

function makeMote(w: number, h: number, randomY = true): Mote {
  const layer = Math.floor(Math.random() * 3) as 0 | 1 | 2;
  const baseVy = BASE_VY[layer] * (0.8 + Math.random() * 0.4);
  return {
    x:          Math.random() * w,
    y:          randomY ? Math.random() * h : -(Math.random() * 80 + 4),
    baseVy,
    vy:         baseVy,
    vx:         0,
    driftPhase: Math.random() * Math.PI * 2,
    radius:     1.5 + Math.random() * (layer === 2 ? 2.5 : 1.5),  // 1.5–4px, clearly visible
    opacity:    MAX_OPACITY[layer] * (0.65 + Math.random() * 0.35),
    age:        randomY ? 1 : 0,   // pre-spawned motes start fully visible
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ParticleCanvas() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const motesRef     = useRef<Mote[]>([]);
  const scrollBoost  = useRef(0);   // extra vy added by scroll velocity
  const lastScrollY  = useRef(0);
  const rafRef       = useRef<number>(0);
  const lastTRef     = useRef<number>(0);

  const init = useCallback((w: number, h: number) => {
    motesRef.current = Array.from({ length: COUNT }, () => makeMote(w, h, true));
  }, []);

  const animate = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dt = Math.min(ts - lastTRef.current, 32) / 16.67;
    lastTRef.current = ts;

    const { width: W, height: H } = canvas;
    ctx.clearRect(0, 0, W, H);

    // Decay scroll boost smoothly toward zero
    scrollBoost.current *= Math.pow(SCROLL_DECAY, dt);

    for (const m of motesRef.current) {
      // Organic horizontal sway
      m.driftPhase += 0.005 * dt;
      const targetVx = Math.sin(m.driftPhase) * 0.06;
      m.vx += (targetVx - m.vx) * 0.04 * dt;
      m.vx *= 0.97;

      // Fall speed = base + scroll boost (back layer gets less boost = parallax)
      const layerBoostFactor = m.baseVy / BASE_VY[2]; // 0.3–1.0 range
      m.vy = m.baseVy + scrollBoost.current * layerBoostFactor;

      m.x += m.vx * dt;
      m.y += m.vy * dt;

      // Fade in over first 60px of travel
      if (m.age < 1) m.age = Math.min(1, m.age + 0.016 * dt);

      // Wrap horizontally
      if (m.x < -4)    m.x = W + 4;
      if (m.x > W + 4) m.x = -4;

      // Recycle when off bottom
      if (m.y > H + 4) Object.assign(m, makeMote(W, H, false));

      // Edge fade: fade out in bottom 60px
      const bottomFade = m.y > H - 60 ? (H - m.y) / 60 : 1;
      const alpha = m.opacity * m.age * bottomFade;
      if (alpha <= 0) continue;

      ctx.beginPath();
      ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR},${alpha.toFixed(3)})`;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      init(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    lastTRef.current = performance.now();
    rafRef.current   = requestAnimationFrame(animate);

    // Scroll → boost fall speed proportional to scroll velocity
    const onScroll = () => {
      const delta = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;
      // Only boost on downward scroll; cap the boost
      if (delta > 0) {
        scrollBoost.current = Math.min(
          scrollBoost.current + delta * SCROLL_BOOST,
          0.6   // max boost cap
        );
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [init, animate]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",   // never blocks clicks, inputs, or links
        zIndex:        9999,     // above all content
      }}
    />
  );
}
