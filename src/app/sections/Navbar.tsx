"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 group"
          >
            <Image
              src="/wyibe.png"
              alt="Wyibe"
              width={36}
              height={36}
              className="rounded-lg"
              priority
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Wyibe
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="https://calendly.com/ahmed-usman7615/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-gradient px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/20"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-2xl border border-white/[0.08] bg-[#111]/95 backdrop-blur-xl p-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://calendly.com/ahmed-usman7615/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-center btn-gradient px-5 py-3 rounded-xl text-white text-sm font-semibold"
          >
            Book a Strategy Call
          </a>
        </div>
      </div>
    </header>
  );
}
