"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Camera, Share2, MessageCircle, Play } from "lucide-react";

const footerLinks = {
  explore: [
    { href: "/destinations", label: "Destinations" },
    { href: "/map", label: "Interactive Map" },
    { href: "/diving", label: "Scuba Diving" },
    { href: "/surfing", label: "Surfing" },
    { href: "/fishing", label: "Fishing" },
    { href: "/liveaboards", label: "Liveaboards" },
    { href: "/excursions", label: "Excursions" },
  ],
  company: [
    { href: "/about", label: "About MTH" },
    { href: "/blog", label: "Travel Blog" },
    { href: "/partners", label: "Partners" },
    { href: "/careers", label: "Careers" },
  ],
  support: [
    { href: "/help", label: "Help Center" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-0">
      {/* Top teal bar */}
      <div className="gradient-primary py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-white text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+9603000000" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Phone className="h-3.5 w-3.5" /> +960 300-0000
            </a>
            <a href="mailto:info@mth.mv" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Mail className="h-3.5 w-3.5" /> info@mth.mv
            </a>
          </div>
          <div className="flex items-center gap-3">
            {[Camera, Share2, MessageCircle, Play].map((Icon, i) => (
              <a key={i} href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-primary">
                <span className="text-white font-black text-sm">MTH</span>
              </div>
              <div>
                <div className="font-bold text-text-base text-base leading-none">Maldives Travel Hub</div>
                <div className="text-primary text-xs mt-0.5 font-medium">Your Paradise Guide</div>
              </div>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed mb-5 max-w-xs">
              The Maldives&apos; most complete travel platform. Discover 1,200+ islands, 150+ dive sites, luxury resorts, and authentic local experiences.
            </p>
            <div className="flex items-center gap-2 text-sm text-text-muted mb-2">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              Malé, Republic of Maldives 20026
            </div>

            {/* Newsletter */}
            <div className="mt-5">
              <p className="text-xs font-semibold text-text-base uppercase tracking-wider mb-2">Stay Updated</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input-base flex-1 text-xs py-2.5"
                />
                <button type="submit" className="btn-primary text-xs px-4 py-2.5 shrink-0">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Explore", links: footerLinks.explore },
            { title: "Company", links: footerLinks.company },
            { title: "Support", links: footerLinks.support },
          ].map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-xs font-bold text-text-base uppercase tracking-widest mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-muted hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-light">
            &copy; {new Date().getFullYear()} MTH — Maldives Travel Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {["EN", "DV", "AR"].map((lang) => (
              <button key={lang} className="text-xs px-2.5 py-1 rounded-lg text-text-muted hover:text-primary hover:bg-primary-light transition-colors font-medium">
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
