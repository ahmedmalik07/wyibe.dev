"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  { question: "What industries do you specialize in?", answer: "We build for small and growing businesses: restaurants and retail, home services, SaaS startups and local brands. If your team does repetitive work by hand or your website is holding you back, we are a good fit." },
  { question: "How long does a typical project take?", answer: "A website usually takes 1 to 3 weeks. An MVP or an AI agent usually takes 4 to 8 weeks, depending on scope. You get a live preview link from the first week, so you see progress as it happens." },
  { question: "Do you work with existing teams or replace them?", answer: "Either works. We can build the whole thing, or plug into your team. The code lives in your GitHub, is documented, and you own all of it." },
  { question: "What tech stacks do you work with?", answer: "Mostly Next.js, React, TypeScript, Node.js, Python and PostgreSQL, deployed on Vercel or similar. For AI we use OpenAI, Claude, Gemini and LangChain, plus Vapi and Twilio for voice. We pick what fits your size and budget." },
  { question: "How do you handle AI / LLM integrations?", answer: "We start with one job the AI should do well, test it on your real data, and only then automate it. That covers RAG over your documents, agents that act in your tools, and voice agents, with logs so you can see every decision." },
  { question: "What does ongoing support look like?", answer: "After launch we offer a monthly plan for fixes, small features and monitoring. If you would rather take it in-house, we hand everything over." },
  { question: "How do we get started?", answer: "Book a free 30-minute strategy call using the button below. We'll audit your current setup, identify quick wins, and outline a roadmap. No commitment required." },
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
      <div className="mx-auto max-w-3xl relative">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Questions? <span className="gradient-text">Answered.</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Straight answers before you book a call.
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
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left group"
              >
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
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-button-${i}`}
                className={`grid transition-all duration-300 ${openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pl-5 sm:pl-[4.5rem]">
                  <p className="text-sm leading-relaxed text-gray-400">{faq.answer}</p>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
