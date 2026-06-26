"use client";

import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  company: [
    { label: "Services", href: "#services" },
    { label: "Industries", href: "#industries" },
    { label: "Process", href: "#process" },
    { label: "Work", href: "#portfolio" },
  ],
  resources: [
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Approach", href: "#approach" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="relative border-t border-white/10 px-6 pt-16 pb-8 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0a1a 0%, #1a0a2e 100%)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/wyibe.png" alt="Wyibe" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-bold tracking-tight text-white">Wyibe</span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm mb-6 leading-relaxed">
              Full-stack engineering and Agentic AI systems for B2B leaders across the US, UK, Canada, and beyond. No fluff. Pure engineering.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              Serving clients in the United States, United Kingdom, Canada & more
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleNav(e, link.href)} className="group flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleNav(e, link.href)} className="group flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:ahmed.malik@wyibe.com" className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-3.5 w-3.5 text-purple-400" />
                  ahmed.malik@wyibe.com
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/wyibe" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <svg className="h-3.5 w-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  linkedin.com/company/wyibe
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/ahhmedmalik" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <svg className="h-3.5 w-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  linkedin.com/in/ahhmedmalik
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <span>&copy; {currentYear} Wyibe. All rights reserved.</span>
            {footerLinks.legal.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-gray-300 transition-colors">{link.label}</a>
            ))}
          </div>
          <a href="mailto:ahmed.malik@wyibe.com" className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-medium text-gray-300 transition-all hover:border-purple-500/30 hover:bg-white/[0.08]">
            <Mail className="h-3.5 w-3.5" />
            ahmed.malik@wyibe.com
          </a>
        </div>
      </div>
    </footer>
  );
}
