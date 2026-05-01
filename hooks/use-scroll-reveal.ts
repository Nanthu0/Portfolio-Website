"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
  /** IntersectionObserver threshold — 0 to 1 (default 0.15) */
  threshold?: number;
  /** Delay before the reveal animation starts, in ms (default 0) */
  delay?: number;
  /** Only trigger once (default true) */
  once?: boolean;
}

export function useScrollReveal({
  threshold = 0.15,
  delay     = 0,
  once      = true,
}: ScrollRevealOptions = {}) {
  const ref       = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            const id = setTimeout(() => setIsVisible(true), delay);
            if (once) observer.unobserve(el);
            return () => clearTimeout(id);
          } else {
            setIsVisible(true);
            if (once) observer.unobserve(el);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay, once]);

  return { ref, isVisible };
}

// ─── Parallax hook ────────────────────────────────────────────────────────────
// Returns a translateY value (px) based on scroll position.
// speed: 0 = no movement, 1 = moves with scroll, 0.3 = 30% of scroll speed

export function useParallax(speed = 0.3) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setOffsetY(window.scrollY * speed);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return offsetY;
}
