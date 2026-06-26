"use client";

import { useEffect, useRef, useState } from "react";
import { Search, PenTool, Code, Rocket, ChevronRight } from "lucide-react";

const steps = [
  { number: "01", icon: Search, title: "Discovery", description: "We audit your current stack, interview stakeholders, and map the real bottlenecks. No assumptions. Only evidence.", color: "from-purple-600 to-violet-600", bg: "bg-purple-500/20", border: "border-purple-500/30", text: "text-purple-300" },
  { number: "02", icon: PenTool, title: "Architecture", description: "We design the system blueprint: tech stack, data models, API contracts, and AI integration points.", color: "from-blue-600 to-cyan-600", bg: "bg-blue-500/20", border: "border-blue-500/30", text: "text-blue-300" },
  { number: "03", icon: Code, title: "Development", description: "Weekly sprints with visible deliverables. Clean, documented code with full test coverage from week one.", color: "from-emerald-600 to-teal-600", bg: "bg-emerald-500/20", border: "border-emerald-500/30", text: "text-emerald-300" },
  { number: "04", icon: Rocket, title: "Deployment", description: "CI/CD pipelines, monitoring, and rollback strategies. We handle infrastructure so you focus on growth.", color: "from-amber-600 to-orange-600", bg: "bg-amber-500/20", border: "border-amber-500/30", text: "text-amber-300" },
];

export default function ProcessSection() {
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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
    <section id="process" ref={ref} className="relative px-6 py-24 sm:py-32 scroll-mt-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #1f140a 50%, #0f0a1a 100%)" }}>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-orange-600/15 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl relative">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            The <span className="gradient-text">Anti-BS</span> Process
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            No 50-page proposals. No scope creep. Just a clean process that ships results.
          </p>
        </div>

        <div className="hidden lg:block relative">
          <div className="absolute top-12 left-[12%] right-[12%] h-1 bg-white/[0.06] rounded-full">
            <div className="h-full bg-gradient-to-r from-purple-500 via-blue-500 via-emerald-500 to-amber-500 rounded-full transition-all duration-1000" style={{ width: visible ? "100%" : "0%", transitionDelay: "0.5s" }} />
          </div>

          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              return (
                <div key={step.number} className={`group relative cursor-pointer ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 150}ms` }} onMouseEnter={() => setActiveStep(i)}>
                  <div className="relative flex justify-center mb-8">
                    <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${step.color} text-white text-sm font-bold shadow-lg transition-all duration-300 ${isActive ? "scale-110 ring-4 ring-white/10" : ""}`}>
                      {step.number}
                    </div>
                  </div>
                  <div className={`relative rounded-2xl border ${step.border} p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${isActive ? "border-white/20" : ""}`} style={{ background: `linear-gradient(145deg, ${step.bg.replace('bg-', '').replace('/20', '')}33 0%, rgba(15,10,26,0.8) 100%)` }}>
                    <div className="flex items-center justify-end mb-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.bg} border ${step.border}`}>
                        <Icon className={`h-5 w-5 ${step.text}`} />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      {step.title}
                      <ChevronRight className="h-4 w-4 text-gray-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className={`group relative rounded-2xl border ${step.border} p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 150}ms`, background: `linear-gradient(145deg, ${step.bg.replace('bg-', '').replace('/20', '')}33 0%, rgba(15,10,26,0.8) 100%)` }}>
                <div className={`absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r ${step.color} text-white text-xs font-bold shadow-lg`}>{step.number}</div>
                <div className="mt-3 mb-5 flex items-center justify-end">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.bg} border ${step.border}`}>
                    <Icon className={`h-5 w-5 ${step.text}`} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
