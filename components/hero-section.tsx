"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useParallax } from "@/hooks/use-scroll-reveal";

// Apple expo-out easing — defined locally, not imported
const EASE_REVEAL = "cubic-bezier(0.16, 1, 0.3, 1)";

const titles = [
  "Aspiring Data Scientist",
  "Machine Learning Engineer",
  "AI Enthusiast",
  "Data Analyst",
];

function heroStyle(delay: number, visible: boolean): React.CSSProperties {
  return {
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0px)" : "translateY(18px)",
    transition: `opacity 1000ms ${EASE_REVEAL} ${delay}ms, transform 1000ms ${EASE_REVEAL} ${delay}ms`,
    willChange: "opacity, transform",
  };
}

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex,  setCharIndex]  = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const parallaxY = useParallax(0.2);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const current = titles[titleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < current.length) setCharIndex((p) => p + 1);
          else setTimeout(() => setIsDeleting(true), 1800);
        } else {
          if (charIndex > 0) setCharIndex((p) => p - 1);
          else { setIsDeleting(false); setTitleIndex((p) => (p + 1) % titles.length); }
        }
      },
      isDeleting ? 35 : 75
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  const displayedText = titles[titleIndex].substring(0, charIndex);

  return (
    <>
      <section
        id="hero"
        style={{
          position:       "relative",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          minHeight:      "100vh",
          overflow:       "hidden",
          padding:        "0 1.5rem",
          zIndex:         1,          // sits above the fixed canvas (z-index: 0)
        }}
      >
        {/*
          ── Layer 1: Background image + overlay (absolute, fills section only)
          z-index 1 within the stacking context of the section.
        */}
        <div
          aria-hidden="true"
          style={{
            position:      "absolute",
            inset:         0,
            zIndex:        1,
            pointerEvents: "none",
          }}
        >
          {/* Background image with parallax */}
          <div
            style={{
              position:           "absolute",
              inset:              0,
              backgroundImage:    "url('/assets/dawn-landscape-mountains-247478.jpg')",
              backgroundSize:     "cover",
              backgroundPosition: "center",
              backgroundRepeat:   "no-repeat",
              transform:          `translateY(${parallaxY}px)`,
              willChange:         "transform",
            }}
          />
          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)" }} />
        </div>

        {/*
          ── Layer 2: Hero content (relative, z-index 10 — always on top)
        */}
        <div
          style={{
            position:  "relative",
            zIndex:    10,
            width:     "100%",
            maxWidth:  "56rem",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div style={heroStyle(100, mounted)} className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Available for opportunities
            </div>
          </div>

          {/* Name */}
          <div style={heroStyle(220, mounted)} className="relative mb-5 inline-block">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 scale-125 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(34,211,238,0.10) 0%, transparent 70%)",
              }}
            />
            <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl">
              Nantha Kumaran <span className="text-primary">K</span>
            </h1>
          </div>

          {/* Typewriter */}
          <div style={heroStyle(340, mounted)} className="mb-6 flex h-10 items-center justify-center">
            <span className="font-mono text-xl text-primary md:text-2xl">{displayedText}</span>
            <span
              className="ml-0.5 inline-block h-5 w-px bg-primary"
              style={{ animation: "pulse 1.1s cubic-bezier(0.4,0,0.6,1) infinite" }}
            />
          </div>

          {/* Tagline */}
          <p
            style={heroStyle(440, mounted)}
            className="mx-auto mb-10 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Transforming data into actionable insights. Third-year B.Tech IT student
            passionate about Data Science, Machine Learning, and AI-driven solutions.
          </p>

          {/* CTA buttons */}
          <div style={heroStyle(540, mounted)} className="mb-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-105 hover:shadow-lg hover:shadow-primary/20"
            >
              View Projects
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:text-primary"
            >
              Contact Me
            </a>
            <a
              href="/Resume.pdf"
              download="Nantha_Kumaran_K_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:text-primary"
            >
              Download Resume
            </a>
          </div>

          {/* Social links */}
          <div style={heroStyle(620, mounted)} className="flex items-center justify-center gap-3">
            {[
              { href: "https://github.com/Nanthu0",                           Icon: Github,   label: "GitHub"   },
              { href: "https://www.linkedin.com/in/nantha-kumaran-800047356", Icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:kumarannantha63@gmail.com",                     Icon: Mail,     label: "Email"    },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="rounded-full border border-border bg-card/50 p-3 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{ ...heroStyle(800, mounted), position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground/60">Scroll</span>
            <div className="flex h-8 w-5 items-start justify-center rounded-full border border-border/60 p-1">
              <div
                className="h-1.5 w-0.5 rounded-full bg-primary/60"
                style={{ animation: "float 2.8s cubic-bezier(0.45,0.05,0.55,0.95) infinite" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
