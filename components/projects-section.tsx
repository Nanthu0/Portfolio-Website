"use client";

import { ExternalLink, Github, Folder } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const projects = [
  {
    title: "AI Sentiment Analyzer",
    description:
      "A machine learning application that analyzes text sentiment using NLP techniques. Built with Python, scikit-learn, and a Flask web interface.",
    tags: ["Python", "ML", "NLP", "Flask"],
    github: "https://github.com/Nanthu0",
  },
  {
    title: "Portfolio Website",
    description:
      "Modern, responsive personal portfolio built with Next.js and Tailwind CSS featuring smooth animations and a dark theme.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    github: "https://github.com/Nanthu0",
  },
  {
    title: "Data Visualization Dashboard",
    description:
      "Interactive dashboard for visualizing complex datasets with filtering, sorting, and real-time chart updates.",
    tags: ["Python", "Pandas", "Matplotlib", "Streamlit"],
    github: "https://github.com/Nanthu0",
  },
  {
    title: "Task Management App",
    description:
      "Full-stack task management application with user authentication, CRUD operations, and a responsive UI.",
    tags: ["Python", "Django", "JavaScript", "SQL"],
    github: "https://github.com/Nanthu0",
  },
];

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="projects" className="relative py-24 px-6">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-2 inline-block font-mono text-sm text-primary">
            {"// 04. Projects"}
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Things I Have Built
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="group relative rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              style={{
                transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Folder className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    aria-label={`Open ${project.title}`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Nanthu0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary"
          >
            <Github className="h-4 w-4" />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
