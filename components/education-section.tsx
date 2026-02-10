"use client";

import { GraduationCap, Calendar, Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function EducationSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="education" className="relative py-24 px-6">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-2 inline-block font-mono text-sm text-primary">
            {"// 02. Education"}
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Academic Background
          </h2>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="group relative rounded-xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-primary/60" />

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              {/* Icon */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>

              {/* Details */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-foreground">
                  B.Tech Information Technology
                </h3>
                <p className="text-lg text-muted-foreground">
                  DMI Engineering College
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Expected 2027</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4 text-primary" />
                    <span>
                      CGPA:{" "}
                      <span className="font-semibold text-foreground">
                        8.0
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    "Data Science",
                    "Machine Learning",
                    "Web Development",
                    "Python",
                    "Algorithms",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
