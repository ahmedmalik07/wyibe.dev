"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Calendar, MapPin } from "lucide-react";

export default function CTASection() {
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
    <section id="contact" ref={ref} className="relative px-6 py-24 sm:py-32 scroll-mt-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #1a0a2e 50%, #0f0a1a 100%)" }}>
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/25 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-4xl relative">
        <div
          className={`relative overflow-hidden rounded-3xl border border-purple-500/30 p-8 sm:p-12 lg:p-16 text-center transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ background: "linear-gradient(145deg, rgba(139,92,246,0.15) 0%, rgba(15,10,26,0.95) 50%, rgba(59,130,246,0.1) 100%)" }}
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-600/30 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 right-0 h-48 w-48 rounded-full bg-blue-600/25 blur-[80px]" />

          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-6">
              Start Your Project
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Ready to Build Something
              <br />
              <span className="gradient-text">Extraordinary?</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10">
              Book a free 30-minute strategy call. We&apos;ll audit your current setup and outline a roadmap — no commitment required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://calendly.com/ahmed-usman7615/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 btn-gradient px-8 py-4 rounded-2xl text-white font-semibold text-base overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                <Calendar className="w-5 h-5" />
                Book a Strategy Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:ahmed.malik@wyibe.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Send an Email
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {[
                { icon: Mail, label: "Email", value: "ahmed.malik@wyibe.com", href: "mailto:ahmed.malik@wyibe.com" },
                { icon: () => <svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, label: "Company", value: "linkedin.com/company/wyibe", href: "https://linkedin.com/company/wyibe" },
                { icon: () => <svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, label: "Founder", value: "linkedin.com/in/ahhmedmalik", href: "https://linkedin.com/in/ahhmedmalik" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-all hover:border-purple-500/30 hover:bg-white/[0.08]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                    <item.icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                    <div className="text-sm font-medium text-white">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              Serving clients across the United States, United Kingdom, and Canada
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
