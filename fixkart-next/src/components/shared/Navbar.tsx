"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wrench, Menu, X, ArrowRight, UserCircle, Briefcase,
  MapPin, ChevronDown, LayoutDashboard, Users, Home, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@/components/shared/LocationProvider";
import { authService, AuthUser } from "@/lib/auth";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const { location, setLocation, locations } = useLocation();
  const locationRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const refreshUser = () => setUser(authService.getCurrentUser());
    refreshUser();
    window.addEventListener("fk-auth-change", refreshUser);
    return () => window.removeEventListener("fk-auth-change", refreshUser);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={16} /> },
    { name: "Find Workers", href: "/workers", icon: <Users size={16} /> },
    { name: "Join as Partner", href: "/join", icon: <Briefcase size={16} /> },
    ...(user?.role === "admin"
      ? [{ name: "Admin", href: "/admin", icon: <LayoutDashboard size={16} /> }]
      : []),
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleSignOut = async () => {
    await authService.signOut();
    setUser(null);
    window.dispatchEvent(new Event("fk-auth-change"));
  };

  const shortLocation = location === "All Locations"
    ? "All Locations"
    : location.split(",")[0];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/90 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">

        {/* Logo + Location */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-indigo to-brand-blue rounded-xl flex items-center justify-center text-white shadow-glow transition-transform group-hover:scale-105">
              <Wrench size={18} />
            </div>
            <span className="font-heading font-extrabold text-xl text-foreground hidden sm:block">
              Fix<span className="text-brand-indigo">Kart</span>
            </span>
          </Link>

          {/* Location Dropdown */}
          <div className="relative" ref={locationRef}>
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-brand-indigo/40 rounded-xl px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
            >
              <MapPin size={13} className="text-brand-indigo" />
              <span className="max-w-[110px] truncate">{shortLocation}</span>
              <ChevronDown size={13} className={`transition-transform ${locationOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {locationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 left-0 w-56 bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-1.5">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { setLocation(loc); setLocationOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center gap-2 ${
                          location === loc
                            ? "bg-brand-indigo/20 text-brand-indigo font-semibold"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                        }`}
                      >
                        <MapPin size={13} />
                        {loc}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive(link.href)
                  ? "bg-brand-indigo/15 text-brand-indigo"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-xs text-muted-foreground font-medium truncate max-w-[120px]">
                {user.displayName}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl gap-1.5"
                onClick={handleSignOut}
              >
                <LogOut size={14} />
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl gap-1.5"
              asChild
            >
              <Link href="/login">
                <UserCircle size={14} />
                Login
              </Link>
            </Button>
          )}
          <Button
            size="sm"
            className="bg-gradient-to-r from-brand-indigo to-brand-blue hover:opacity-90 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all hover:scale-105 gap-1.5"
            asChild
          >
            <Link href="/workers">
              Book Now <ArrowRight size={14} />
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-card/95 backdrop-blur-xl border-b border-white/10 shadow-2xl p-6 flex flex-col gap-4"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-brand-indigo/15 text-brand-indigo"
                      : "text-muted-foreground hover:bg-white/5"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <Button
                className="w-full justify-center bg-gradient-to-r from-brand-indigo to-brand-blue"
                asChild
              >
                <Link href="/workers" onClick={() => setMobileMenuOpen(false)}>
                  Find a Worker <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
