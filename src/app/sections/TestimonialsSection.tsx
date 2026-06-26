"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { quote: "Wyibe rebuilt our entire analytics pipeline in 8 weeks. What used to take our team 3 days now runs in under 10 minutes. That's not an improvement — it's a transformation.", author: "Sarah Chen", role: "VP of Engineering", company: "FinRoute Corp · USA", rating: 5, avatar: "SC", accent: "bg-purple-500", border: "border-purple-500/30" },
  { quote: "The Agentic AI system Wyibe deployed handles 78% of our support tickets without human intervention. Our CSAT actually went up. I didn't think that was possible.", author: "James Morrison", role: "Chief Revenue Officer", company: "Meridian SaaS · UK", rating: 5, avatar: "JM", accent: "bg-cyan-500", border: "border-cyan-500/30" },
  { quote: "We interviewed 6 agencies. Wyibe was the only one who asked about our business metrics before talking about tech stack. That mindset difference is why we chose them.", author: "Priya Patel", role: "Head of Digital Transformation", company: "Vertex Logistics · Canada", rating: 5, avatar: "PP", accent: "bg-amber-500", border: "border-amber-500/30" },
];

export default function TestimonialsSection() {
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
    <section id="testimonials" ref={ref} className="relative px-6 py-24 sm:py-32 scroll-mt-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #1a0a1f 50%, #0f0a1a 100%)" }}>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl relative">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-4">
            Client Voices
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Trusted by <span className="gradient-text">Leaders</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Don&apos;t take our word for it. Here&apos;s what founders and executives say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`group relative rounded-2xl border ${t.border} p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms`, background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(15,10,26,0.9) 100%)" }}
            >
              <Quote className="h-8 w-8 text-purple-500/40 mb-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-gray-300 mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-white/[0.06] pt-4 flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${t.accent} text-xs font-bold text-white`}>{t.avatar}</div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.author}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                  <div className="text-xs text-purple-400/80 mt-0.5">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
