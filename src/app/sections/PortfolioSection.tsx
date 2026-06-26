"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Smartphone, Bot, Brain, Globe, Home, Dumbbell, Workflow, MessageSquareCode, Cpu, ShoppingCart, Zap } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Wakey Wakey AI",
    client: "Wyibe · Android App",
    outcome: "AI-powered alarm app with step challenges, shake detection, and math problems. Premium morning routine with zero ads.",
    link: "#",
    tags: ["Android", "Kotlin", "AI"],
    gradient: "from-purple-600/50 to-pink-600/50",
    icon: Smartphone,
    accent: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 2,
    title: "WhatsApp → ERP AI Bridge",
    client: "SME Automation · n8n",
    outcome: "AI booking agent for 8,000+ SMEs. Bridges WhatsApp orders directly into ERP systems, eliminating manual data entry.",
    link: "#",
    tags: ["n8n", "AI Automation", "ERP"],
    gradient: "from-emerald-600/50 to-cyan-600/50",
    icon: Bot,
    accent: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Medical Chatbot RAG",
    client: "Healthcare AI · Flask",
    outcome: "RAG medical chatbot with LangChain, Pinecone, and Gemini. Accurate medical responses with source attribution.",
    link: "https://github.com/ahmedmalik07/langchain_rag_medical_bot",
    tags: ["LangChain", "Pinecone", "RAG"],
    gradient: "from-blue-600/50 to-indigo-600/50",
    icon: Brain,
    accent: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Kurtos i8 Islamabad",
    client: "E-commerce · Next.js",
    outcome: "Chimney cakes e-commerce with smooth animations, responsive design, and optimized Vercel performance.",
    link: "https://kurtos-we4bears.vercel.app/",
    tags: ["Next.js", "Vercel", "E-commerce"],
    gradient: "from-amber-600/50 to-orange-600/50",
    icon: Globe,
    accent: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Smart Home Web App",
    client: "IoT Dashboard · Next.js",
    outcome: "Smart home control dashboard with real-time device management and Google Apps Script automation.",
    link: "#",
    tags: ["Next.js", "IoT", "Dashboard"],
    gradient: "from-cyan-600/50 to-blue-600/50",
    icon: Home,
    accent: "bg-cyan-500",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Air University Gym System",
    client: "MERN Stack · Full-Stack",
    outcome: "Gym management with attendance tracking, memberships, reports, and payments. React + Node.js + MongoDB.",
    link: "#",
    tags: ["React", "Node.js", "MongoDB"],
    gradient: "from-rose-600/50 to-purple-600/50",
    icon: Dumbbell,
    accent: "bg-rose-500",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 7,
    title: "Autonomous Lead Gen Agent",
    client: "Agentic AI · CrewAI",
    outcome: "Multi-agent pipeline that autonomously researches prospects, drafts personalised outreach, and logs qualified leads into a CRM — end-to-end without human input.",
    link: "#",
    tags: ["CrewAI", "OpenAI", "Agentic AI"],
    gradient: "from-violet-600/50 to-fuchsia-600/50",
    icon: Workflow,
    accent: "bg-violet-500",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 8,
    title: "AI Code Review Agent",
    client: "DevTools · LangGraph",
    outcome: "Agentic code reviewer built on LangGraph that analyses PRs, flags security issues, suggests refactors, and posts inline GitHub comments automatically.",
    link: "#",
    tags: ["LangGraph", "GitHub API", "LLM"],
    gradient: "from-sky-600/50 to-indigo-600/50",
    icon: MessageSquareCode,
    accent: "bg-sky-500",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 9,
    title: "Real-Time AI Trading Signals",
    client: "FinTech · FastAPI + React Native",
    outcome: "Mobile app delivering real-time AI-generated trading signals with sentiment analysis, candlestick pattern detection, and push notifications.",
    link: "#",
    tags: ["React Native", "FastAPI", "AI"],
    gradient: "from-green-600/50 to-teal-600/50",
    icon: Zap,
    accent: "bg-green-500",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 10,
    title: "Multi-Agent Customer Support",
    client: "SaaS Platform · AutoGen",
    outcome: "AutoGen-powered support system with triage, billing, and tech agents that collaborate to resolve tickets, escalate edge cases, and learn from resolved chats.",
    link: "#",
    tags: ["AutoGen", "RAG", "Multi-Agent"],
    gradient: "from-orange-600/50 to-red-600/50",
    icon: Cpu,
    accent: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 11,
    title: "AI-Powered Shopping App",
    client: "Retail · Flutter",
    outcome: "Cross-platform Flutter app with an AI shopping assistant, visual search, personalised recommendations, and one-tap checkout with Stripe.",
    link: "#",
    tags: ["Flutter", "Dart", "Stripe"],
    gradient: "from-pink-600/50 to-rose-600/50",
    icon: ShoppingCart,
    accent: "bg-pink-500",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop&q=80",
  },
];

export default function PortfolioSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={ref} className="relative px-6 py-24 sm:py-32 scroll-mt-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #0a1a28 50%, #0f0a1a 100%)" }}>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl relative">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-4">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Proof of <span className="gradient-text">Work</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Real projects shipped for real clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <article
                key={project.id}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms`, background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(15,10,26,0.9) 100%)" }}
              >
                <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* dark gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />
                  {/* icon badge */}
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/40 backdrop-blur-md shadow-lg">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  {/* external link */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/20">
                      <ExternalLink className="h-3.5 w-3.5 text-white" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">{project.title}</h3>
                    <p className="text-xs text-gray-500">{project.client}</p>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-gray-400 mb-4">{project.outcome}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className={`inline-flex items-center rounded-full ${project.accent}/20 border border-${project.accent.replace('bg-', '')}/30 px-3 py-1 text-[11px] font-medium text-gray-300`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
