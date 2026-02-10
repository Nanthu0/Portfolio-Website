"use client";

import { Code, Brain, Users, Dumbbell, Gamepad2, Target } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const technicalSkills = [
  { name: "Python", level: 85 },
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "UI/UX Design", level: 75 },
];

const softSkills = [
  { name: "Communication", icon: Users },
  { name: "Teamwork", icon: Users },
  { name: "Leadership", icon: Target },
];

const interests = [
  { name: "Gaming", icon: Gamepad2 },
  { name: "Gym & Fitness", icon: Dumbbell },
  { name: "Kabaddi", icon: Target },
];

export default function AboutSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="relative py-24 px-6">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-2 inline-block font-mono text-sm text-primary">
            {"// 01. About"}
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Get to know me
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Bio */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Who I Am
                </h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                I am a passionate third-year B.Tech Information Technology
                student at DMI Engineering College, focused on building
                intelligent and scalable digital solutions. I thrive on turning
                complex data into actionable insights and building full-stack
                applications.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Career Objective
                </h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                To build a strong career in Data Science and AI by leveraging
                analytical thinking, programming skills, and problem-solving
                abilities to deliver impactful solutions.
              </p>
            </div>

            {/* Soft Skills + Interests */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Soft Skills
                </h4>
                <div className="flex flex-col gap-2">
                  {softSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <skill.icon className="h-3.5 w-3.5 text-primary" />
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Interests
                </h4>
                <div className="flex flex-col gap-2">
                  {interests.map((interest) => (
                    <div
                      key={interest.name}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <interest.icon className="h-3.5 w-3.5 text-primary" />
                      {interest.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Skills */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Technical Skills
                </h3>
              </div>
              <div className="flex flex-col gap-5">
                {technicalSkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
