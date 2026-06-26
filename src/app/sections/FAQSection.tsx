"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  { question: "What industries do you specialize in?", answer: "We primarily serve B2B companies in fintech, healthcare, SaaS, logistics, e-commerce, insurance, and cybersecurity across the US, UK, and Canada. Our team has deep domain expertise in regulated industries requiring HIPAA, SOC 2, and GDPR compliance." },
  { question: "How long does a typical project take?", answer: "MVP engagements typically run 6–10 weeks. Full platform builds range from 3–6 months depending on scope complexity. We ship to staging weekly so you see progress from day one, not at a final reveal." },
  { question: "Do you work with existing teams or replace them?", answer: "We integrate with your existing engineering team. Our code is clean, documented, and handed over with knowledge-transfer sessions. We act as a force multiplier, not a replacement." },
  { question: "What tech stacks do you work with?", answer: "Modern, proven stacks: Next.js, React, Node.js, Python, TypeScript, PostgreSQL, AWS/GCP/Azure, Kubernetes, Terraform, and AI frameworks like LangChain and OpenAI. We pick the right tool for your scale and team." },
  { question: "How do you handle AI / LLM integrations?", answer: "We architect AI-native systems from day one — not as bolt-ons. This includes reasoning chains, RAG pipelines, vector databases, multi-agent workflows, and robust evaluation frameworks to ensure reliability at scale." },
  { question: "What does ongoing support look like?", answer: "Post-launch, we offer retainer plans covering monitoring, incident response, feature iteration, and performance optimization. Most clients stay with us for years because we treat their product like our own." },
  { question: "How do we get started?", answer: "Book a free 30-minute strategy call via the link above. We'll audit your current setup, identify quick wins, and outline a roadmap — no commitment required." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
    <section id="faq" ref={ref} className="relative px-6 py-24 sm:py-32 scroll-mt-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #0a0f28 50%, #0f0a1a 100%)" }}>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-3xl relative">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Questions? <span className="gradient-text">Answered.</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Everything you need to know before we build something extraordinary together.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/15 ${
                openIndex === i ? "border-white/20 shadow-lg" : ""
              } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 80}ms`, background: openIndex === i ? "linear-gradient(145deg, rgba(99,102,241,0.1) 0%, rgba(15,10,26,0.9) 100%)" : "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(15,10,26,0.8) 100%)" }}
            >
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left group">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${openIndex === i ? "bg-indigo-500/20" : "bg-white/[0.06] group-hover:bg-white/[0.1]"}`}>
                    <HelpCircle className={`h-4 w-4 shrink-0 transition-colors ${openIndex === i ? "text-indigo-400" : "text-gray-500 group-hover:text-gray-300"}`} />
                  </div>
                  <span className={`text-sm sm:text-base font-semibold transition-colors ${openIndex === i ? "text-indigo-300" : "text-white group-hover:text-indigo-300"}`}>
                    {faq.question}
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 shrink-0 transition-all duration-300 ${openIndex === i ? "rotate-180 text-indigo-400" : "group-hover:text-gray-300"}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96" : "max-h-0"}`}>
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pl-[4.5rem] sm:pl-[4.5rem]">
                  <p className="text-sm leading-relaxed text-gray-400">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
