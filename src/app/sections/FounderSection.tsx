"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, Briefcase, Users, Rocket, ArrowUpRight } from "lucide-react";
import { BOOKING_URL } from "../lib/site";

const facts = [
  { icon: Trophy, text: "4× national hackathon winner" },
  { icon: Briefcase, text: "5 internships, most recently IT & app development at MOL Oil & Gas" },
  { icon: Rocket, text: "Built and runs dish.ly, a live restaurant POS" },
  { icon: Users, text: "Vice President, GDGOC Air University" },
];

export default function FounderSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-6 py-24 sm:py-32 scroll-mt-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #1a0a1f 50%, #0f0a1a 100%)" }}
    >
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div
        className={`mx-auto max-w-5xl relative transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-4">
            Who You&apos;ll Work With
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            No account managers. <span className="gradient-text">Just the builder.</span>
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start rounded-3xl border border-white/10 p-6 sm:p-10"
          style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(15,10,26,0.9) 100%)" }}
        >
          <div className="flex md:flex-col items-center gap-4 md:w-44">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl btn-gradient text-3xl font-bold text-white shadow-lg shadow-purple-500/20">
              AM
            </div>
            <div className="md:text-center">
              <div className="text-lg font-semibold text-white">Ahmed Malik</div>
              <div className="text-sm text-gray-400">Founder &amp; Lead Engineer</div>
              <div className="mt-3 flex gap-3 md:justify-center text-sm">
                <a href="https://linkedin.com/in/ahhmedmalik" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-purple-300 hover:text-white">
                  LinkedIn <ArrowUpRight className="h-3 w-3" />
                </a>
                <a href="https://github.com/ahmedmalik07" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-purple-300 hover:text-white">
                  GitHub <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="text-base sm:text-lg leading-relaxed text-gray-300">
              I started Wyibe to build software that does real work for a business: web
              platforms that stay fast as you grow, and AI agents that run in production
              instead of in a demo video. When you book a call, you talk to me, and I stay on
              your project from the first sketch to launch day.
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {facts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-gray-300">
                  <Icon className="h-4 w-4 mt-0.5 shrink-0 text-purple-400" />
                  {text}
                </li>
              ))}
            </ul>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 btn-gradient px-6 py-3 rounded-xl text-white text-sm font-semibold transition-transform hover:scale-105"
            >
              Talk to Ahmed
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
