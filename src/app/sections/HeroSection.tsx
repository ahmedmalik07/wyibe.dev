"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, Globe, Zap, Shield } from "lucide-react";

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / 80,
          y: (e.clientY - rect.top - rect.height / 2) / 80,
        });
      }
      rafRef.current = 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden flex flex-col"
    >
      {/* ═══════ BACKGROUND ═══════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Solid dark base */}
        <div className="absolute inset-0 bg-[#06000e]" />

        {/* ── THE ORB: conic gradient sphere ── */}
        <div
          className="absolute top-[-35%] sm:top-[-30%] left-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] lg:w-[1100px] lg:h-[1100px]"
          style={{
            transform: `translateX(-50%) translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
            willChange: "transform",
          }}
        >
          <div
            className="absolute inset-[10%] rounded-full hero-orb-drift"
            style={{
              background:
                "conic-gradient(from 230deg, #7b2ffc, #4f46e5, #6d28d9, #a855f7, #c084fc, #7c3aed, #7b2ffc)",
              filter: "blur(80px)",
              opacity: 0.7,
              willChange: "transform",
            }}
          />
          <div
            className="absolute inset-[30%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(196,167,255,0.8) 0%, rgba(139,92,246,0.4) 40%, transparent 70%)",
              filter: "blur(40px)",
              willChange: "transform",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(109,40,217,0.5) 0%, rgba(88,28,235,0.2) 40%, transparent 65%)",
              filter: "blur(60px)",
              willChange: "transform",
            }}
          />
        </div>

        {/* ── Accent glow — blue left ── */}
        <div className="absolute top-[10%] left-[2%] w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-blue-700/30 blur-[130px] hero-accent-float" />

        {/* ── Accent glow — pink right ── */}
        <div
          className="absolute top-[5%] right-[5%] w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full bg-fuchsia-700/20 blur-[110px] hero-accent-float"
          style={{ animationDelay: "-4s" }}
        />

        {/* ── Orbital ring 1 — main ellipse ── */}
        <div
          className="absolute top-[10%] sm:top-[6%] left-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] rounded-full"
          style={{
            border: "1.5px solid rgba(139,92,246,0.25)",
            boxShadow:
              "0 0 80px rgba(139,92,246,0.12), inset 0 0 80px rgba(139,92,246,0.06)",
            transform: "translateX(-50%) rotateX(75deg)",
          }}
        />
        {/* ── Orbital ring 2 — wider ── */}
        <div
          className="absolute top-[5%] sm:top-[2%] left-1/2 w-[520px] h-[520px] sm:w-[750px] sm:h-[750px] lg:w-[1000px] lg:h-[1000px] rounded-full"
          style={{
            border: "1px solid rgba(99,102,241,0.12)",
            transform: "translateX(-50%) rotateX(78deg) rotateZ(12deg)",
          }}
        />

        {/* ── PLANET ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2 }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="arcPathGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.06" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <path
              d="M 80 60 Q 300 550, 1520 820"
              stroke="url(#arcPathGrad)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="8 20"
              className="hero-arc-path-line"
            />
            <path
              d="M 80 60 Q 300 550, 1520 820"
              stroke="rgba(139,92,246,0.03)"
              strokeWidth="40"
              fill="none"
            />
          </svg>

          <div className="hero-sweep-trail" />
          <div className="hero-sweep-trail-glow" />

          <div className="hero-planet-trail hero-planet-trail-1" />
          <div className="hero-planet-trail hero-planet-trail-2" />
          <div className="hero-planet-trail hero-planet-trail-3" />
          <div className="hero-planet-trail hero-planet-trail-4" />
          <div className="hero-planet-trail hero-planet-trail-5" />
          <div className="hero-planet-trail hero-planet-trail-6" />

          <div className="hero-comet-tail">
            <div className="hero-comet-tail-streak" />
          </div>

          <div className="hero-planet-arc-motion">
            <div
              style={{
                transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="hero-planet w-[110px] h-[110px] sm:w-[160px] sm:h-[160px] lg:w-[220px] lg:h-[220px]">
                <div className="hero-planet-atmosphere" />
                <div className="hero-planet-body" />
                <div className="hero-planet-surface-marks" />
                <div className="hero-planet-bands" />
                <div className="hero-planet-craters" />
                <div className="hero-planet-storm" />
                <div className="hero-planet-specular" />
                <div className="hero-planet-terminator" />
                <div className="hero-planet-rim" />
                <div className="hero-planet-ring hero-planet-ring-inner" />
                <div className="hero-planet-ring hero-planet-ring-outer" />
              </div>
            </div>
          </div>
        </div>

        {/* ── LIGHTNING BOLTS ── */}
        <svg
          className="hero-lightning-bolt absolute top-[5%] left-[15%] w-[120px] h-[260px] sm:w-[160px] sm:h-[340px]"
          viewBox="0 0 160 340"
          fill="none"
        >
          <path
            d="M80 0 L65 60 L95 65 L55 140 L85 145 L40 220 L75 225 L20 340"
            stroke="url(#bolt1Grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#boltGlow1)"
          />
          <path
            d="M80 0 L65 60 L95 65 L55 140 L85 145 L40 220 L75 225 L20 340"
            stroke="rgba(196,167,255,0.6)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#boltBlur1)"
          />
          <defs>
            <linearGradient id="bolt1Grad" x1="80" y1="0" x2="20" y2="340" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c4a7ff" />
              <stop offset="0.5" stopColor="#a855f7" />
              <stop offset="1" stopColor="#6d28d9" />
            </linearGradient>
            <filter id="boltGlow1"><feGaussianBlur stdDeviation="2" /></filter>
            <filter id="boltBlur1"><feGaussianBlur stdDeviation="6" /></filter>
          </defs>
        </svg>

        <svg
          className="hero-lightning-bolt absolute top-[8%] right-[18%] w-[90px] h-[200px] sm:w-[120px] sm:h-[260px]"
          viewBox="0 0 120 260"
          fill="none"
        >
          <path
            d="M40 0 L55 50 L30 55 L70 120 L45 125 L85 200 L55 210 L100 260"
            stroke="url(#bolt2Grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#boltGlow2)"
          />
          <path
            d="M40 0 L55 50 L30 55 L70 120 L45 125 L85 200 L55 210 L100 260"
            stroke="rgba(139,92,246,0.5)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#boltBlur2)"
          />
          <defs>
            <linearGradient id="bolt2Grad" x1="40" y1="0" x2="100" y2="260" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e9d5ff" />
              <stop offset="0.5" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#4f46e5" />
            </linearGradient>
            <filter id="boltGlow2"><feGaussianBlur stdDeviation="1.5" /></filter>
            <filter id="boltBlur2"><feGaussianBlur stdDeviation="5" /></filter>
          </defs>
        </svg>

        <svg
          className="hero-lightning-bolt absolute top-[12%] left-[40%] w-[70px] h-[180px] sm:w-[100px] sm:h-[240px]"
          viewBox="0 0 100 240"
          fill="none"
          style={{ animationDelay: "4.5s" }}
        >
          <path
            d="M50 0 L40 45 L65 50 L35 110 L60 115 L30 180 L55 185 L45 240"
            stroke="url(#bolt3Grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#boltGlow3)"
          />
          <path
            d="M50 0 L40 45 L65 50 L35 110 L60 115 L30 180 L55 185 L45 240"
            stroke="rgba(99,102,241,0.4)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#boltBlur3)"
          />
          <defs>
            <linearGradient id="bolt3Grad" x1="50" y1="0" x2="45" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c4b5fd" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
            <filter id="boltGlow3"><feGaussianBlur stdDeviation="1.5" /></filter>
            <filter id="boltBlur3"><feGaussianBlur stdDeviation="4" /></filter>
          </defs>
        </svg>

        <div className="hero-lightning-ambient" />
        <div className="hero-lightning-ambient" />
        <div className="hero-lightning-ambient" />

        {/* ── Line grid ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 35%, transparent 65%)",
            WebkitMaskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 35%, transparent 65%)",
          }}
        />

        {/* ── Fade to page background ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 55%, rgb(var(--background-start-rgb)) 90%)",
          }}
        />
      </div>

      {/* ═══════ CONTENT ═══════ */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 min-h-screen px-4 sm:px-6 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-7 sm:mb-8 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          <Globe className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="text-xs sm:text-sm text-gray-300">
            Trusted by US, UK & Canadian Businesses
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-5 sm:mb-6 tracking-tight max-w-5xl transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Engineering Intelligence
          <br />
          <span className="gradient-text relative inline-block mt-1">
            For Global Business
            <svg
              className="absolute -bottom-2 sm:-bottom-3 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8"
                stroke="url(#heroGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="heroGrad" x1="0" y1="0" x2="300" y2="0">
                  <stop stopColor="#a855f7" />
                  <stop offset="1" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-sm sm:text-base lg:text-lg text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Wyibe partners with B2B leaders across the US, UK, and Canada to build
          scalable web platforms and deploy autonomous Agentic AI systems. No
          fluff. Pure engineering.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <a
            href="https://calendly.com/ahmed-usman7615/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 btn-gradient px-8 py-4 rounded-2xl text-white font-semibold text-base sm:text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book a Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base sm:text-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
          >
            View Our Work
          </a>
        </div>

        {/* Trust indicators */}
        <div
          className={`mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10 transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {[
            { icon: Zap, label: "Full-Stack Engineering" },
            { icon: Shield, label: "Agentic AI Systems" },
            { icon: Globe, label: "US · UK · Canada" },
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
};

export default HeroSection;
