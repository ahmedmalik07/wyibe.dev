"use client";

import { tintBg } from "../lib/tint";
import { useEffect, useRef, useState } from "react";
import { Code2, Bot, PhoneCall, Smartphone, Cpu, Workflow } from "lucide-react";

const services = [
  { icon: Code2, title: "Full-Stack Web Engineering", description: "Web apps, SaaS products and dashboards built on Next.js and Node.js, deployed with CI/CD so every change ships safely.", tags: ["Next.js", "TypeScript", "PostgreSQL", "Vercel"], gradient: "from-violet-600 to-purple-600", bg: "bg-purple-500/20", border: "border-purple-500/30", span: "md:col-span-2" },
  { icon: Bot, title: "Agentic AI Systems", description: "AI agents that research, decide and act inside your tools, with guardrails and logs so you can trust what they do.", tags: ["LangChain", "OpenAI", "Claude", "Python"], gradient: "from-blue-600 to-cyan-600", bg: "bg-blue-500/20", border: "border-blue-500/30", span: "md:col-span-1" },
  { icon: PhoneCall, title: "Voice AI Agents", description: "Phone agents that answer calls, qualify leads and book appointments around the clock.", tags: ["Vapi", "Twilio", "FastAPI"], gradient: "from-emerald-600 to-teal-600", bg: "bg-emerald-500/20", border: "border-emerald-500/30", span: "md:col-span-1" },
  { icon: Workflow, title: "Workflow Automation", description: "Connect the apps you already use and remove the copy-paste work between them.", tags: ["n8n", "APIs", "Webhooks"], gradient: "from-amber-600 to-orange-600", bg: "bg-amber-500/20", border: "border-amber-500/30", span: "md:col-span-1" },
  { icon: Smartphone, title: "Mobile Apps", description: "Android and cross-platform apps that feel native and ship to the stores.", tags: ["Kotlin", "React Native", "Android"], gradient: "from-sky-600 to-blue-600", bg: "bg-sky-500/20", border: "border-sky-500/30", span: "md:col-span-1" },
  { icon: Cpu, title: "AI Adoption Strategy", description: "Figure out where AI pays off in your company, which tools to use, and how to keep company data safe, including self-hosted models.", tags: ["Roadmaps", "Self-hosted LLMs", "Data policy"], gradient: "from-indigo-600 to-violet-600", bg: "bg-indigo-500/20", border: "border-indigo-500/30", span: "md:col-span-3" },
];

export default function ServicesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="relative px-6 py-24 sm:py-32 scroll-mt-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #0a1628 50%, #0f0a1a 100%)" }}>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl relative">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-4">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Services That <span className="gradient-text">Scale</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            What we build, end to end: from the first call to a system running in production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative rounded-2xl border ${service.border} p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${service.span} ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  background: tintBg(service.bg),
                }}
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400 mb-5">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className={`inline-flex items-center rounded-full ${service.bg} border ${service.border} px-3 py-1 text-[11px] font-medium text-gray-300`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
