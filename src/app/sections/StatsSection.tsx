"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, Rocket, Award, Building2, GraduationCap, Medal } from "lucide-react";

// Real, checkable credentials only. No invented client numbers.
const stats = [
  { icon: Trophy, value: "4×", label: "National Hackathon Winner", sub: "Incl. Google × Systems Ltd Agentic AI and NACTA 2026 AI hackathons", accent: "bg-amber-500" },
  { icon: Medal, value: "Top 5", label: "Build with Fastn Hackathon", sub: "Selected for the judges' live demo round, 2026", accent: "bg-purple-500" },
  { icon: Award, value: "Winner", label: "Hult Prize, Air University", sub: "Campus round, with the Wyibe concept", accent: "bg-rose-500" },
  { icon: Rocket, value: "NTS H8", label: "Incubated in Islamabad", sub: "Wyibe is part of the NTS H8 incubator", accent: "bg-blue-500" },
  { icon: GraduationCap, value: "Samsung", label: "AI Training Bootcamp", sub: "Selected participant", accent: "bg-cyan-500" },
  { icon: Building2, value: "SECP", label: "Registered Company", sub: "WYIBE.DEV (SMC-Private) Limited, 2026", accent: "bg-emerald-500" },
];

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative px-6 py-20 sm:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #1a1033 50%, #0f0a1a 100%)" }}>
      {/* Gradient mesh */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl relative">
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
            Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Small team, <span className="gradient-text">proven builders</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`group relative rounded-2xl border border-white/10 p-6 sm:p-8 text-center transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  background: "linear-gradient(145deg, rgba(139,92,246,0.1) 0%, rgba(30,27,75,0.4) 50%, rgba(15,10,26,0.6) 100%)",
                }}
              >
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.accent} shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-300 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
