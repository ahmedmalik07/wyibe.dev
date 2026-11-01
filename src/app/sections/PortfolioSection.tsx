"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Smartphone, Brain, Globe, Home, Dumbbell, UtensilsCrossed, PhoneCall, Gamepad2 } from "lucide-react";

// Only real work goes here. "status" is shown on the card so visitors can tell
// a live product from something still being built.
const projects = [
  {
    id: 1,
    title: "dish.ly",
    client: "Wyibe product · Restaurant POS",
    status: "Live",
    outcome: "Point of sale built for Pakistani restaurants: QR table ordering, counter sales, kitchen display, customer khata and FBR-ready tax. Keeps working offline when the internet drops.",
    link: "https://dishly.wyibe.com",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    icon: UtensilsCrossed,
    image: "/work/dishly.webp",
    featured: true,
  },
  {
    id: 2,
    title: "AI Receptionist",
    client: "Wyibe product · Voice AI",
    status: "In development",
    outcome: "Voice agent that answers the phone, qualifies the job and books it into the calendar for US home-service businesses like HVAC, plumbing and roofing.",
    link: "#",
    tags: ["Vapi", "FastAPI", "Twilio"],
    icon: PhoneCall,
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Kurtos I-8 Islamabad",
    client: "Client website · Café",
    status: "Live",
    outcome: "Website and online menu for a Hungarian chimney-cake café in Islamabad, with smooth animations and fast loading on mobile.",
    link: "https://kurtos-we4bears.vercel.app/",
    tags: ["Next.js", "Vercel"],
    icon: Globe,
    image: "/work/kurtos.webp",
  },
  {
    id: 4,
    title: "JAKSA Smart Home",
    client: "Client website · E-commerce",
    status: "Live",
    outcome: "Storefront for JAKSA, a smart-home products brand, with a product catalogue, cart and WhatsApp ordering.",
    link: "https://smart-home-inky.vercel.app/",
    tags: ["Next.js", "E-commerce"],
    icon: Home,
    image: "/work/jaksa.webp",
  },
  {
    id: 5,
    title: "Campus Dash",
    client: "Browser game · Campaign",
    status: "Live",
    outcome: "Instant-play runner game built for a university election campaign, with lane switching, quiz hurdles, combo chains and achievements. Works on phones and desktop.",
    link: "https://ahmadmalik.wyibe.com",
    tags: ["Web game", "Mobile-first"],
    icon: Gamepad2,
    image: "/work/campus-dash.webp",
  },
  {
    id: 6,
    title: "Medical Chatbot RAG",
    client: "Open source · Healthcare AI",
    status: "Open source",
    outcome: "Retrieval-augmented medical chatbot using LangChain, Pinecone and Gemini, answering with references to its sources.",
    link: "https://github.com/ahmedmalik07/langchain_rag_medical_bot",
    tags: ["LangChain", "Pinecone", "RAG"],
    icon: Brain,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 7,
    title: "Wakey Wakey AI",
    client: "Wyibe · Android app",
    status: "Android",
    outcome: "Alarm app that makes you prove you are awake with step challenges, shake detection and math problems. No ads.",
    link: "#",
    tags: ["Android", "Kotlin", "AI"],
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 8,
    title: "Air University Gym System",
    client: "University project · MERN",
    status: "Built",
    outcome: "Gym management with attendance tracking, memberships, payments and reports, built on React, Node.js and MongoDB.",
    link: "#",
    tags: ["React", "Node.js", "MongoDB"],
    icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&q=80",
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
            Products we run, sites we shipped for clients, and open-source work. All of it is real and most of it is live.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <article
                key={project.id}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${project.featured ? "lg:col-span-2" : ""} ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms`, background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(15,10,26,0.9) 100%)" }}
              >
                <div className={`relative overflow-hidden bg-[#140d24] ${project.featured ? "h-48 lg:h-64" : "h-48"}`}>
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* soft bottom fade so the icon badge stays readable on bright screenshots */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                    {project.status}
                  </span>
                  {/* icon badge */}
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/40 backdrop-blur-md shadow-lg">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  {/* external link: only for projects that actually have a live URL or repo */}
                  {project.link !== "#" && (
                    <div className="absolute top-3 right-3 transition-all md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/20"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-white" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {project.link !== "#" ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <p className="text-xs text-gray-500">{project.client}</p>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-gray-400 mb-4">{project.outcome}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-full bg-white/[0.06] border border-white/10 px-3 py-1 text-[11px] font-medium text-gray-300">
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
