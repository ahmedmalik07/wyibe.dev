"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, GitBranch, Layers, MessageSquare, Gauge } from "lucide-react";

const principles = [
  { icon: GitBranch, title: "Clean, Owned Code", description: "No black-box builders. Every line is written, documented, and transferred to your team.", color: "from-purple-600 to-violet-600", bg: "bg-purple-500/20", border: "border-purple-500/30" },
  { icon: MessageSquare, title: "Transparent Communication", description: "Daily async updates, shared Slack channels, and direct access to your engineer.", color: "from-blue-600 to-cyan-600", bg: "bg-blue-500/20", border: "border-blue-500/30" },
  { icon: Gauge, title: "Rapid Deployment", description: "MVPs in weeks, not quarters. We ship to production early and iterate fast.", color: "from-emerald-600 to-teal-600", bg: "bg-emerald-500/20", border: "border-emerald-500/30" },
  { icon: Layers, title: "AI-Native Architecture", description: "Systems designed with LLM integration from day one, not bolted on after.", color: "from-amber-600 to-orange-600", bg: "bg-amber-500/20", border: "border-amber-500/30" },
];

export default function TechnicalApproachSection() {
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
    <section id="approach" ref={ref} className="relative px-6 py-24 sm:py-32 scroll-mt-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #1f0a14 50%, #0f0a1a 100%)" }}>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-4">
              Our Approach
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              The <span className="gradient-text">Anti-BS</span> Guarantee
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-lg">
              We don&apos;t do decks. We don&apos;t do scope creep. We write code, deploy it, and optimize until it hits the KPI.
            </p>

            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative" style={{ background: "linear-gradient(145deg, #111 0%, #0a0a0a 100%)" }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="ml-2 flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                  <Terminal className="h-3 w-3" />
                  approach.md
                </div>
              </div>
              <div className="p-4 font-mono text-sm space-y-2">
                <div className="flex gap-3"><span className="text-purple-400">$</span><span className="text-gray-300">cat principles.md</span></div>
                <div className="text-gray-500 text-xs pl-6">- Clean, owned code</div>
                <div className="text-gray-500 text-xs pl-6">- Transparent communication</div>
                <div className="text-gray-500 text-xs pl-6">- Rapid deployment</div>
                <div className="text-gray-500 text-xs pl-6">- AI-native architecture</div>
                <div className="flex gap-3 pt-1"><span className="text-purple-400">$</span><span className="text-gray-300">git status</span></div>
                <div className="text-emerald-400 text-xs pl-6">✓ everything committed, nothing staged</div>
              </div>
              <div className="absolute bottom-4 left-4 flex gap-3">
                <span className="text-purple-400">$</span>
                <span className="w-2 h-4 bg-purple-400 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {principles.map((p, index) => (
              <div
                key={p.title}
                className={`group relative rounded-2xl border ${p.border} p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  background: `linear-gradient(145deg, ${p.bg.replace('bg-', '').replace('/20', '')}33 0%, rgba(15,10,26,0.8) 100%)`,
                }}
              >
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} shadow-lg`}>
                  <p.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
