"use client";

import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const contactLinks = [
  {
    label: "Email",
    value: "kumarannantha63@gmail.com",
    href: "mailto:kumarannantha63@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+91 6379778012",
    href: "tel:+916379778012",
    icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "Nantha Kumaran",
    href: "https://www.linkedin.com/in/nantha-kumaran-800047356",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "Nanthu0",
    href: "https://github.com/Nanthu0",
    icon: Github,
  },
  {
    label: "Location",
    value: "Thirunelveli, Tamil Nadu",
    href: "#",
    icon: MapPin,
  },
];

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="relative py-24 px-6">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-2 inline-block font-mono text-sm text-primary">
            {"// 05. Contact"}
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            {"Let's Connect"}
          </h2>
          <p className="mx-auto max-w-lg text-pretty leading-relaxed text-muted-foreground">
            {
              "I'm always open to new opportunities, collaborations, and conversations. Feel free to reach out!"
            }
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group relative flex items-center gap-4 rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              style={{
                transitionDelay: isVisible ? `${i * 80}ms` : "0ms",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(15px)",
              }}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <link.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {link.label}
                </p>
                <p className="truncate text-sm font-medium text-foreground">
                  {link.value}
                </p>
              </div>
              {link.href !== "#" && (
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              )}
            </a>
          ))}
        </div>

        {/* Resume download */}
        <div id="resume" className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/25"
          >
            Download Resume
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
