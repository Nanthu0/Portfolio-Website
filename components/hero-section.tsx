"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const titles = [
  "Aspiring Data Scientist",
  "Full Stack Developer",
  "AI Enthusiast",
  "Problem Solver",
];

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentTitle.length) {
            setCharIndex((prev) => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setTitleIndex((prev) => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  const displayedText = titles[titleIndex].substring(0, charIndex);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/dawn-landscape-mountains-247478.jpg')",
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Greeting */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
          Available for opportunities
        </div>

        {/* Name */}
        <h1 className="mb-4 text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl">
          Nantha Kumaran{" "}
          <span className="text-primary">K</span>
        </h1>

        {/* Typing title */}
        <div className="mb-6 flex h-10 items-center justify-center">
          <span className="font-mono text-xl text-primary md:text-2xl">
            {displayedText}
          </span>
          <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-primary" />
        </div>

        {/* Tagline */}
        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Building intelligent and scalable digital solutions. Third-year B.Tech
          IT student passionate about Data Science, AI, and full-stack
          development.
        </p>

        {/* CTA buttons */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/25"
          >
            View Projects
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary"
          >
            Contact Me
          </a>
          <a
            href="#resume"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary"
          >
            Download Resume
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/Nanthu0"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border bg-card/60 p-3 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/nantha-kumaran-800047356"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border bg-card/60 p-3 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:kumarannantha63@gmail.com"
            className="rounded-full border border-border bg-card/60 p-3 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Scroll</span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-border p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
