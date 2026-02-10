"use client";

import { Briefcase, MapPin, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="relative py-24 px-6">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-2 inline-block font-mono text-sm text-primary">
            {"// 03. Experience"}
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Professional Experience
          </h2>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="group relative rounded-xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
            {/* Left accent line */}
            <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full bg-primary/60" />

            <div className="pl-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Full Stack Python Developer
                  </h3>
                  <p className="text-sm text-primary">
                    AK Info Park, Nagercoil
                  </p>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>15 Days Internship</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Nagercoil, Tamil Nadu</span>
                </div>
              </div>

              <p className="mb-4 leading-relaxed text-muted-foreground">
                Gained hands-on experience in full-stack web development using
                Python. Worked on building and deploying web applications,
                understanding backend architecture, and collaborating with a
                development team.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Python", "Django", "HTML/CSS", "JavaScript", "SQL"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
