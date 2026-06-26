"use client";

import { useEffect, useRef, useState } from "react";
import { Landmark, Stethoscope, ShoppingCart, Truck, Cpu, Shield, BarChart3, GraduationCap } from "lucide-react";

const industries = [
  { icon: Landmark, title: "Fintech", description: "Secure, high-throughput platforms for payments, lending, and real-time analytics.", countries: "US · UK · Canada", gradient: "from-cyan-500 to-blue-600", bg: "bg-cyan-500/20", border: "border-cyan-500/30" },
  { icon: Stethoscope, title: "Healthcare", description: "HIPAA-compliant systems, patient portals, and AI-powered diagnostics.", countries: "US · Canada", gradient: "from-emerald-500 to-teal-600", bg: "bg-emerald-500/20", border: "border-emerald-500/30" },
  { icon: ShoppingCart, title: "E-commerce", description: "Scalable storefronts, inventory intelligence, and conversion-optimized UX.", countries: "US · UK · Canada", gradient: "from-amber-500 to-orange-600", bg: "bg-amber-500/20", border: "border-amber-500/30" },
  { icon: Truck, title: "Logistics", description: "Real-time tracking, warehouse optimization, and predictive demand forecasting.", countries: "US · UK · Canada", gradient: "from-rose-500 to-pink-600", bg: "bg-rose-500/20", border: "border-rose-500/30" },
  { icon: Cpu, title: "SaaS & Technology", description: "Multi-tenant architectures, API platforms, and AI-native product features.", countries: "US · UK · Canada · Global", gradient: "from-violet-500 to-purple-600", bg: "bg-violet-500/20", border: "border-violet-500/30" },
  { icon: Shield, title: "Cybersecurity", description: "Threat detection pipelines, SIEM integrations, and compliance automation.", countries: "US · UK", gradient: "from-red-500 to-orange-600", bg: "bg-red-500/20", border: "border-red-500/30" },
  { icon: BarChart3, title: "Insurance", description: "Risk modeling platforms, claims automation, and policy management.", countries: "US · UK · Canada", gradient: "from-indigo-500 to-blue-600", bg: "bg-indigo-500/20", border: "border-indigo-500/30" },
  { icon: GraduationCap, title: "EdTech", description: "Learning management systems, AI tutoring agents, and student analytics.", countries: "US · UK · Canada", gradient: "from-sky-500 to-cyan-600", bg: "bg-sky-500/20", border: "border-sky-500/30" },
];

export default function IndustriesSection() {
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
    <section id="industries" ref={ref} className="relative px-6 py-24 sm:py-32 scroll-mt-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #0a1f1a 50%, #0f0a1a 100%)" }}>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-teal-600/15 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl relative">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
            Industries
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Built for Your <span className="gradient-text">Vertical</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            We don&apos;t do generic. Every solution is tailored to your industry&apos;s demands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.title}
                className={`group relative rounded-2xl border ${industry.border} p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${i * 75}ms`,
                  background: `linear-gradient(145deg, ${industry.bg.replace('bg-', '').replace('/20', '')}33 0%, rgba(15,10,26,0.8) 100%)`,
                }}
              >
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${industry.gradient} shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{industry.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400 mb-4">{industry.description}</p>
                <div className="text-[11px] font-medium text-gray-500 tracking-wide uppercase">{industry.countries}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
