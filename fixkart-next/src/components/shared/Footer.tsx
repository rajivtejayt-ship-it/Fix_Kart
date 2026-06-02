"use client";

import React from "react";
import Link from "next/link";
import { Wrench, MapPin, Phone, Mail, Globe, MessageCircle, Camera } from "lucide-react";
import { CATEGORIES } from "@/lib/types";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09090B] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-indigo to-brand-blue rounded-xl flex items-center justify-center text-white">
                <Wrench size={18} />
              </div>
              <span className="font-heading font-extrabold text-xl text-foreground">
                Fix<span className="text-brand-indigo">Kart</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              India&apos;s smartest local services marketplace. Connecting verified
              professionals with customers who need them, instantly.
            </p>
            <div className="flex gap-3">
              {[<Globe key="gl" size={16} />, <MessageCircle key="mc" size={16} />, <Camera key="cam" size={16} />].map(
                (icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                  >
                    {icon}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/workers?category=${cat}`}
                    className="text-sm text-muted-foreground hover:text-foreground capitalize transition-colors"
                  >
                    {cat}s
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "Browse Workers", href: "/workers" },
                { label: "Join as Partner", href: "/join" },
                { label: "Admin Dashboard", href: "/admin" },
                { label: "About FixKart", href: "/#about" },
                { label: "How It Works", href: "/#how-it-works" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="text-brand-indigo shrink-0" />
                Indiranagar, Bangalore 560038
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={14} className="text-brand-indigo shrink-0" />
                +91 99014 38220
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={14} className="text-brand-indigo shrink-0" />
                support@fixkart.in
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2025 FixKart Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
