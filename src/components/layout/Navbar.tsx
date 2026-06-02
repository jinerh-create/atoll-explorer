"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, User, LogOut, Settings, Award, Heart,
  Search, MapPin, Waves, Wind, Fish, Ship, Compass, Map, Hotel,
  Phone, Mail, Camera, Share2, MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/destinations", label: "Destinations", icon: MapPin },
  { href: "/map", label: "Map", icon: Map },
  { href: "/diving", label: "Diving", icon: Waves },
  { href: "/surfing", label: "Surfing", icon: Wind },
  { href: "/fishing", label: "Fishing", icon: Fish },
  { href: "/liveaboards", label: "Liveaboards", icon: Ship },
  { href: "/excursions", label: "Excursions", icon: Compass },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => { setMobileOpen(false); }, [pathname]);

  React.useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  return (
    <>
      {/* ── TOP UTILITY BAR ─────────────────────────────────────────────── */}
      <div className="gradient-primary hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6 text-white/90 text-xs">
            <a href="tel:+9603000000" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3 w-3" /> +960 300-0000
            </a>
            <a href="mailto:info@mth.mv" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="h-3 w-3" /> info@mth.mv
            </a>
          </div>
          <div className="flex items-center gap-4 text-white/80">
            <span className="text-xs">Follow us:</span>
            {[Camera, Share2, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-white transition-colors">
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
            <div className="h-3 w-px bg-white/30 mx-1" />
            <span className="text-xs font-medium">EN</span>
            <span className="text-xs text-white/50">|</span>
            <span className="text-xs">DV</span>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ─────────────────────────────────────────────────── */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(10,196,160,0.12)] border-b border-border/60"
            : "bg-white border-b border-border/40"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-primary shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-white font-black text-xs tracking-tight relative z-10">MTH</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-text-base text-[15px] leading-tight">Maldives Travel Hub</div>
                <div className="flex items-center gap-1.5">
                  <div className="h-1 w-1 rounded-full bg-primary" />
                  <span className="text-primary text-[10px] font-semibold tracking-wide uppercase">Explore Paradise</span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links — Connected Chevron Tabs */}
            <div className="hidden xl:flex items-center flex-1 justify-center">
              <div className="flex items-center" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.10))" }}>
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                  const isFirst = index === 0;
                  const isLast = index === navLinks.length - 1;
                  const A = 11;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        clipPath: isFirst
                          ? `polygon(0 0, calc(100% - ${A}px) 0, 100% 50%, calc(100% - ${A}px) 100%, 0 100%)`
                          : isLast
                          ? `polygon(${A}px 0, 100% 0, 100% 100%, 0 100%, ${A}px 50%)`
                          : `polygon(${A}px 0, calc(100% - ${A}px) 0, 100% 50%, calc(100% - ${A}px) 100%, 0 100%, ${A}px 50%)`,
                        marginLeft: isFirst ? 0 : -A,
                        paddingLeft: isFirst ? 16 : A + 12,
                        paddingRight: isLast ? 16 : A + 12,
                        zIndex: isActive ? 20 : navLinks.length - index + 1,
                        position: "relative",
                      }}
                      className={cn(
                        "flex items-center gap-1.5 py-[8px] text-[12px] font-semibold whitespace-nowrap transition-colors duration-150",
                        isActive
                          ? "bg-primary text-white"
                          : "bg-surface-2 text-text-muted hover:bg-primary-light hover:text-primary"
                      )}
                    >
                      <link.icon className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-white" : "text-text-light")} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5 shrink-0">

              {/* Search */}
              <div className="relative">
                <AnimatePresence>
                  {searchOpen ? (
                    <motion.div
                      initial={{ width: 40, opacity: 0 }}
                      animate={{ width: 220, opacity: 1 }}
                      exit={{ width: 40, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center bg-surface-2 rounded-xl border border-border overflow-hidden"
                    >
                      <Search className="h-4 w-4 text-primary ml-3 shrink-0" />
                      <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search islands, resorts…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent text-sm text-text-base placeholder:text-text-light focus:outline-none px-3 py-2 w-full"
                        onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                      />
                      {searchQuery && (
                        <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }} className="mr-2 text-text-light hover:text-text-muted">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </motion.div>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => setSearchOpen(true)}
                      className="p-2 rounded-xl text-text-muted hover:text-primary hover:bg-primary-light transition-colors"
                    >
                      <Search className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* List property CTA */}
              <Link
                href="/register"
                className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-primary text-primary text-[13px] font-bold hover:bg-primary-light transition-colors"
              >
                <Hotel className="h-3.5 w-3.5" />
                List Property
              </Link>

              {/* Auth */}
              {session?.user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-xl pl-2 pr-3 py-1.5 hover:bg-surface-2 transition-colors border border-border"
                  >
                    <div className="h-7 w-7 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {session.user.name?.charAt(0)?.toUpperCase() ?? "U"}
                    </div>
                    <span className="hidden sm:block text-[13px] font-semibold text-text-base max-w-[80px] truncate">
                      {session.user.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-text-muted" />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white border border-border shadow-lg overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-border gradient-primary">
                          <p className="text-sm font-bold text-white">{session.user.name}</p>
                          <p className="text-xs text-white/70 truncate">{session.user.email}</p>
                        </div>
                        <div className="p-1.5">
                          {[
                            { href: "/profile", icon: User, label: "My Profile" },
                            { href: "/rewards", icon: Award, label: "Rewards" },
                            { href: "/wishlist", icon: Heart, label: "Wishlist" },
                            { href: "/settings", icon: Settings, label: "Settings" },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 text-[13px] text-text-muted hover:text-primary hover:bg-primary-light rounded-xl transition-colors"
                            >
                              <item.icon className="h-4 w-4" />
                              {item.label}
                            </Link>
                          ))}
                          <button
                            onClick={() => signOut()}
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-[13px] text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/login" className="px-4 py-2 text-[13px] font-semibold text-text-muted hover:text-primary transition-colors rounded-xl hover:bg-primary-light">
                    Sign In
                  </Link>
                  <Link href="/register" className="btn-primary text-[13px] px-5 py-2.5 flex items-center gap-1.5">
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 rounded-xl text-text-muted hover:text-primary hover:bg-primary-light transition-colors"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* ── NAV CATEGORY STRIP (below main row, lg–xl) ── */}
        <div className="hidden lg:block xl:hidden border-t border-border/40 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center h-10 overflow-x-auto scrollbar-hide" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.06))" }}>
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                const isFirst = index === 0;
                const isLast = index === navLinks.length - 1;
                const A = 8;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      clipPath: isFirst
                        ? `polygon(0 0, calc(100% - ${A}px) 0, 100% 50%, calc(100% - ${A}px) 100%, 0 100%)`
                        : isLast
                        ? `polygon(${A}px 0, 100% 0, 100% 100%, 0 100%, ${A}px 50%)`
                        : `polygon(${A}px 0, calc(100% - ${A}px) 0, 100% 50%, calc(100% - ${A}px) 100%, 0 100%, ${A}px 50%)`,
                      marginLeft: isFirst ? 0 : -A,
                      paddingLeft: isFirst ? 12 : A + 8,
                      paddingRight: isLast ? 12 : A + 8,
                      zIndex: isActive ? 20 : navLinks.length - index + 1,
                      position: "relative",
                    }}
                    className={cn(
                      "flex items-center gap-1 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-colors",
                      isActive ? "bg-primary text-white" : "bg-surface-2 text-text-muted hover:bg-primary-light hover:text-primary"
                    )}
                  >
                    <link.icon className={cn("h-3 w-3 shrink-0", isActive ? "text-white" : "text-text-light")} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden border-t border-border bg-white overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {/* Mobile search */}
                <div className="flex items-center gap-3 bg-surface-2 rounded-2xl px-4 py-3 mb-3">
                  <Search className="h-4 w-4 text-primary shrink-0" />
                  <input
                    type="text"
                    placeholder="Search islands, resorts, dive sites…"
                    className="bg-transparent text-sm text-text-base placeholder:text-text-light focus:outline-none w-full"
                  />
                </div>

                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors",
                        isActive ? "bg-primary-light text-primary" : "text-text-muted hover:bg-surface-2"
                      )}
                    >
                      <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center", isActive ? "gradient-primary" : "bg-surface-2")}>
                        <link.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-text-muted")} />
                      </div>
                      {link.label}
                    </Link>
                  );
                })}

                {!session?.user && (
                  <div className="flex gap-2 pt-3 border-t border-border mt-3">
                    <Link href="/login" className="flex-1 text-center py-3 rounded-2xl text-sm font-bold text-text-muted border-2 border-border hover:border-primary hover:text-primary transition-colors">
                      Sign In
                    </Link>
                    <Link href="/register" className="flex-1 text-center py-3 rounded-2xl text-sm font-bold text-white gradient-primary shadow-primary">
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {userMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />}
    </>
  );
}
