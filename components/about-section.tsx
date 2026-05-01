"use client";

import { Brain, Users, Dumbbell, Gamepad2, Target } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const softSkills = [
  { name: "Communication", icon: Users  },
  { name: "Teamwork",      icon: Users  },
  { name: "Leadership",    icon: Target },
];

const interests = [
  { name: "Gaming",        icon: Gamepad2 },
  { name: "Gym & Fitness", icon: Dumbbell },
  { name: "Kabaddi",       icon: Target   },
];

function reveal(isVisible: boolean, base = "") {
  return `${base} transition-all duration-700 ease-out ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;
}

export default function AboutSection() {
  const header = useScrollReveal({ delay: 0   });
  const card1  = useScrollReveal({ delay: 100 });
  const card2  = useScrollReveal({ delay: 200 });
  const card3  = useScrollReveal({ delay: 300 });

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div ref={header.ref} className={reveal(header.isVisible, "mb-16 text-center")}>
          <span className="mb-2 inline-block font-mono text-sm text-primary">
            {"// 01. About"}
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Get to know me
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Who I Am */}
          <div ref={card1.ref} className={reveal(card1.isVisible, "rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm")}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Who I Am</h3>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              I am a passionate third-year B.Tech Information Technology student at DMI
              Engineering College, focused on extracting meaningful insights from data and
              building intelligent AI solutions. I thrive on solving complex problems through
              data analysis, machine learning, and statistical modeling.
            </p>
          </div>

          {/* Career Objective */}
          <div ref={card2.ref} className={reveal(card2.isVisible, "rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm")}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Career Objective</h3>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              To build a strong career in Data Science and AI by leveraging analytical
              thinking, programming skills, and problem-solving abilities to deliver
              impactful solutions.
            </p>
          </div>

          {/* Soft Skills + Interests */}
          <div ref={card3.ref} className={reveal(card3.isVisible, "grid grid-cols-2 gap-4 lg:col-span-2")}>
            <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Soft Skills
              </h4>
              <div className="flex flex-col gap-2">
                {softSkills.map((s) => (
                  <div key={s.name} className="flex items-center gap-2 text-sm text-foreground">
                    <s.icon className="h-3.5 w-3.5 text-primary" />
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Interests
              </h4>
              <div className="flex flex-col gap-2">
                {interests.map((i) => (
                  <div key={i.name} className="flex items-center gap-2 text-sm text-foreground">
                    <i.icon className="h-3.5 w-3.5 text-primary" />
                    {i.name}
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
