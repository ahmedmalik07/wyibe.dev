"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Bot, BarChart3, Cloud, ShieldCheck, Cpu, Smartphone, Database } from "lucide-react";

const services = [
  { icon: Code2, title: "Full-Stack Web Engineering", description: "Scalable web apps with Next.js, Node.js, cloud-native infrastructure, and CI/CD pipelines.", tags: ["Next.js", "TypeScript", "AWS", "PostgreSQL"], gradient: "from-violet-600 to-purple-600", bg: "bg-purple-500/20", border: "border-purple-500/30", span: "md:col-span-2" },
  { icon: Bot, title: "Agentic AI Systems", description: "Autonomous digital employees and multi-agent workflows powered by LLMs that drive real ROI.", tags: ["LangChain", "OpenAI", "Python", "Vector DBs"], gradient: "from-blue-600 to-cyan-600", bg: "bg-blue-500/20", border: "border-blue-500/30", span: "md:col-span-1" },
  { icon: BarChart3, title: "Operations Intelligence", description: "Data pipelines, internal dashboards, and AI-enhanced process automation.", tags: ["ETL", "LLM Orchestration", "Analytics"], gradient: "from-emerald-600 to-teal-600", bg: "bg-emerald-500/20", border: "border-emerald-500/30", span: "md:col-span-1" },
  { icon: Cloud, title: "Cloud Architecture", description: "AWS, GCP, Azure infrastructure design with 99.99% uptime SLA.", tags: ["AWS", "Kubernetes", "Terraform"], gradient: "from-amber-600 to-orange-600", bg: "bg-amber-500/20", border: "border-amber-500/30", span: "md:col-span-1" },
  { icon: ShieldCheck, title: "Security & Compliance", description: "SOC 2, GDPR, HIPAA-aligned security architecture and pen testing.", tags: ["SOC 2", "GDPR", "HIPAA"], gradient: "from-rose-600 to-pink-600", bg: "bg-rose-500/20", border: "border-rose-500/30", span: "md:col-span-1" },
  { icon: Cpu, title: "AI Strategy Consulting", description: "Feasibility studies, ROI modeling, and implementation roadmaps.", tags: ["ROI Analysis", "Roadmapping"], gradient: "from-indigo-600 to-violet-600", bg: "bg-indigo-500/20", border: "border-indigo-500/30", span: "md:col-span-1" },
  { icon: Smartphone, title: "Mobile & Cross-Platform", description: "React Native and Flutter apps that feel native on iOS and Android.", tags: ["React Native", "Flutter", "iOS", "Android"], gradient: "from-sky-600 to-blue-600", bg: "bg-sky-500/20", border: "border-sky-500/30", span: "md:col-span-1" },
  { icon: Database, title: "Data Engineering", description: "Real-time streaming, data lakes, and warehouse architectures.", tags: ["Spark", "Kafka", "Snowflake"], gradient: "from-fuchsia-600 to-pink-600", bg: "bg-fuchsia-500/20", border: "border-fuchsia-500/30", span: "md:col-span-2" },
];

export default function ServicesSection() {
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
    <section id="services" ref={ref} className="relative px-6 py-24 sm:py-32 scroll-mt-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #0a1628 50%, #0f0a1a 100%)" }}>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl relative">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-4">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Services That <span className="gradient-text">Scale</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Eight disciplines. One mission: ship production-grade systems that move the needle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative rounded-2xl border ${service.border} p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${service.span} ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  background: `linear-gradient(145deg, ${service.bg.replace('bg-', '').replace('/20', '')}33 0%, rgba(15,10,26,0.8) 100%)`,
                }}
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400 mb-5">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className={`inline-flex items-center rounded-full ${service.bg} border ${service.border} px-3 py-1 text-[11px] font-medium text-gray-300`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
