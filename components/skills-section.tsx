"use client";

import {
  Code2, Database, Wrench, FlaskConical,
  Users, Languages, Lightbulb, MessageSquare,
  GitBranch, Terminal, Globe, BarChart2,
} from "lucide-react";
import {
  siPython, siMysql, siPandas,
  siFlask, siStreamlit, siApacheairflow,
  siGit, siGithub, siLinux, siUbuntu,
  siPytest,
} from "simple-icons";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { SimpleIcon } from "simple-icons";

// ─── Types ────────────────────────────────────────────────────────────────────

type SkillIcon =
  | { kind: "si";     icon: SimpleIcon }
  | { kind: "lucide"; Icon: React.ElementType };

interface Skill {
  name:  string;
  icon?: SkillIcon;
}

// ─── Skill icon helpers ───────────────────────────────────────────────────────

function si(icon: SimpleIcon): SkillIcon   { return { kind: "si", icon }; }
function lu(Icon: React.ElementType): SkillIcon { return { kind: "lucide", Icon }; }

// ─── Data ─────────────────────────────────────────────────────────────────────

const SKILL_GROUPS: {
  id:     string;
  label:  string;
  Icon:   React.ElementType;
  skills: Skill[];
}[] = [
  {
    id:    "technical",
    label: "Technical Skills",
    Icon:  Code2,
    skills: [
      { name: "Python",      icon: si(siPython)     },
      { name: "SQL",         icon: lu(Database)     },
      { name: "MySQL",       icon: si(siMysql)      },
      { name: "Pandas",      icon: si(siPandas)     },
      { name: "Matplotlib",  icon: lu(BarChart2)    },
      { name: "Flask",       icon: si(siFlask)      },
      { name: "Streamlit",   icon: si(siStreamlit)  },
      { name: "Tkinter",     icon: lu(Code2)        },
    ],
  },
  {
    id:    "data-ai",
    label: "Data & AI",
    Icon:  Database,
    skills: [
      { name: "Data Science",     icon: lu(Database)  },
      { name: "Data Analysis",    icon: lu(Database)  },
      { name: "Data Engineering", icon: lu(Wrench)    },
      { name: "Big Data",         icon: lu(Database)  },
    ],
  },
  {
    id:    "tools",
    label: "Tools & Technologies",
    Icon:  Wrench,
    skills: [
      { name: "Apache Airflow", icon: si(siApacheairflow) },
      { name: "Cron",           icon: lu(Terminal)        },
      { name: "Git",            icon: si(siGit)           },
      { name: "GitHub",         icon: si(siGithub)        },
      { name: "Linux",          icon: si(siLinux)         },
      { name: "Ubuntu",         icon: si(siUbuntu)        },
      { name: "Putty",          icon: lu(Terminal)        },
      { name: "WinSCP",         icon: lu(GitBranch)       },
      { name: "Notepad++",      icon: lu(Code2)           },
    ],
  },
  {
    id:    "testing",
    label: "Testing & Practices",
    Icon:  FlaskConical,
    skills: [
      { name: "pytest",                          icon: si(siPytest) },
      { name: "Object-Oriented Programming (OOP)", icon: lu(Code2)  },
    ],
  },
  {
    id:    "soft",
    label: "Soft Skills",
    Icon:  Users,
    skills: [
      { name: "Problem Solving",   icon: lu(Lightbulb)      },
      { name: "Critical Thinking", icon: lu(Lightbulb)      },
      { name: "Communication",     icon: lu(MessageSquare)  },
    ],
  },
  {
    id:    "languages",
    label: "Languages",
    Icon:  Languages,
    skills: [
      { name: "Tamil",   icon: lu(Globe) },
      { name: "English", icon: lu(Globe) },
      { name: "German",  icon: lu(Globe) },
    ],
  },
];

// ─── SkillBadge ───────────────────────────────────────────────────────────────

function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <span
      className={[
        "group inline-flex items-center gap-1.5",
        "rounded-full border border-border bg-card/60",
        "px-3 py-1.5 text-xs font-medium text-foreground",
        "backdrop-blur-sm cursor-default select-none",
        // hover: teal tint + scale + glow
        "transition-all duration-200 ease-out",
        "hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
        "hover:scale-[1.06] hover:shadow-md hover:shadow-primary/15",
      ].join(" ")}
    >
      {/* Icon */}
      {skill.icon && (
        <span
          className="shrink-0 opacity-60 transition-opacity duration-200 group-hover:opacity-100"
          aria-hidden="true"
        >
          {skill.icon.kind === "si" ? (
            // Simple-icons: render raw SVG path
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-3 w-3 fill-current"
            >
              <path d={skill.icon.icon.path} />
            </svg>
          ) : (
            // Lucide icon
            <skill.icon.Icon className="h-3 w-3" />
          )}
        </span>
      )}
      {skill.name}
    </span>
  );
}

// ─── GroupCard ────────────────────────────────────────────────────────────────

interface GroupCardProps {
  label:   string;
  Icon:    React.ElementType;
  skills:  Skill[];
  visible: boolean;
  delay:   number;
}

function GroupCard({ label, Icon, skills, visible, delay }: GroupCardProps) {
  return (
    <div
      className={[
        "group/card rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm",
        "transition-all duration-300",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
      ].join(" ")}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0px)" : "translateY(22px)",
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     border-color 300ms ease, box-shadow 300ms ease`,
        willChange: "opacity, transform",
      }}
    >
      {/* Card header */}
      <div className="mb-5 flex items-center gap-3">
        <div
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            "bg-primary/10 transition-all duration-300",
            "group-hover/card:bg-primary/20 group-hover/card:scale-110",
          ].join(" ")}
        >
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </h3>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <SkillBadge key={s.name} skill={s} />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SkillsSection() {
  const header = useScrollReveal({ delay: 0  });
  const grid   = useScrollReveal({ delay: 80 });

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div
          ref={header.ref}
          className="mb-16 text-center"
          style={{
            opacity:    header.isVisible ? 1 : 0,
            transform:  header.isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="mb-2 inline-block font-mono text-sm text-primary">
            {"// 02. Skills"}
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            What I Work With
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            A structured overview of my technical toolkit, from languages and
            frameworks to tools and practices.
          </p>
        </div>

        {/* Grid — 1 col → 2 col → 3 col */}
        <div
          ref={grid.ref}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILL_GROUPS.map((group, i) => (
            <GroupCard
              key={group.id}
              label={group.label}
              Icon={group.Icon}
              skills={group.skills}
              visible={grid.isVisible}
              delay={i * 75}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
