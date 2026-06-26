"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Clock, CheckCircle2, Phone } from "lucide-react";

const regions = [
  { flag: "🇺🇸", country: "United States", cities: "New York · San Francisco · Austin · Chicago", timezone: "EST / CST / PST", availability: "Same-day response", gradient: "from-blue-600 to-indigo-600", bg: "bg-blue-500/20", border: "border-blue-500/30" },
  { flag: "🇬🇧", country: "United Kingdom", cities: "London · Manchester · Edinburgh", timezone: "GMT / BST", availability: "Same-day response", gradient: "from-purple-600 to-violet-600", bg: "bg-purple-500/20", border: "border-purple-500/30" },
  { flag: "🇨🇦", country: "Canada", cities: "Toronto · Vancouver · Montreal · Calgary", timezone: "EST / PST / MST", availability: "Same-day response", gradient: "from-red-600 to-rose-600", bg: "bg-red-500/20", border: "border-red-500/30" },
  { flag: "🌍", country: "Global Remote", cities: "Europe · Middle East · APAC", timezone: "24/7 Coverage", availability: "Always-on support", gradient: "from-emerald-600 to-teal-600", bg: "bg-emerald-500/20", border: "border-emerald-500/30" },
];

export default function GlobalPresenceSection() {
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
    <section ref={ref} className="relative px-6 py-24 sm:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #140a1f 50%, #0f0a1a 100%)" }}>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl relative">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
            Global Reach
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Wherever You Are, <span className="gradient-text">We Deliver</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Time zones don&apos;t slow us down. We work async, communicate clearly, and ship on your schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {regions.map((region, i) => (
            <div
              key={region.country}
              className={`group relative rounded-2xl border ${region.border} p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms`, background: `linear-gradient(145deg, ${region.bg.replace('bg-', '').replace('/20', '')}33 0%, rgba(15,10,26,0.8) 100%)` }}
            >
              <div className={`h-1 w-10 rounded-full bg-gradient-to-r ${region.gradient} mb-4 transition-all duration-300 group-hover:w-full`} />
              <div className="text-3xl mb-4">{region.flag}</div>
              <h3 className="text-base font-semibold text-white mb-1">{region.country}</h3>
              <p className="text-xs text-gray-500 mb-4">{region.cities}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="h-3.5 w-3.5 text-purple-400" />
                  {region.timezone}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  {region.availability}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {[
            { icon: Globe, label: "Remote-First Since Day One" },
            { icon: Phone, label: "Direct Slack / Zoom Access" },
            { icon: CheckCircle2, label: "Enterprise SLA Available" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-gray-500">
              <Icon className="w-4 h-4 text-purple-400" />
              <span className="text-xs sm:text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
