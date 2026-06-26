"use client";

import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "FinRoute Analytics",
    outcome:
      "Reduced reporting latency by 94% for a fintech serving 2M+ monthly transactions.",
    tags: ["Next.js", "Node.js", "AWS Lambda", "ClickHouse"],
    gradient: "from-cyan-500/20 to-blue-600/20",
    imagePlaceholder: "Analytics Dashboard",
  },
  {
    id: 2,
    title: "Meridian AI Support",
    outcome:
      "Deployed a multi-agent support system resolving 78% of tickets without human intervention.",
    tags: ["LangChain", "OpenAI", "Python", "Redis"],
    gradient: "from-violet-500/20 to-fuchsia-600/20",
    imagePlaceholder: "Agent Architecture",
  },
  {
    id: 3,
    title: "Vertex Supply Chain",
    outcome:
      "Real-time inventory intelligence platform cutting stockout rates by 43% across 12 warehouses.",
    tags: ["React", "GraphQL", "PostgreSQL", "Kafka"],
    gradient: "from-emerald-500/20 to-teal-600/20",
    imagePlaceholder: "Supply Chain Map",
  },
];

export default function CaseStudiesSection() {
  return (
    <section id="work" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Selected Work
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Proof of Work
            </h2>
            <p className="mt-4 text-muted">
              Production systems deployed for teams that measure success in
              metrics, not meetings.
            </p>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-border-hover hover:shadow-[0_0_40px_rgba(6,182,212,0.06)]"
            >
              {/* Image placeholder with gradient */}
              <div
                className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${project.gradient}`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <span className="text-xs font-mono text-white/40">
                    {project.id}
                  </span>
                </div>
                {/* Subtle grid overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted">
                  {project.outcome}
                </p>

                {/* Tech stack tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-surface-elevated px-3 py-1 text-[11px] font-medium text-muted ring-1 ring-inset ring-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
