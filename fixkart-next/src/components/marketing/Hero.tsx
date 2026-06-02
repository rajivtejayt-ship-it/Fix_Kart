"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, CalendarCheck, Briefcase, ArrowDown, MapPin, Search, Plug, Droplets, Wrench } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center min-h-[90vh]">
      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
          <Zap size={14} className="text-brand-indigo" /> 
          Smart Local Services Marketplace
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-foreground leading-[1.1] mb-6">
          Your Local Service Experts, Connected <span className="text-gradient">Instantly</span>
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-lg">
          Tired of unverified, expensive, and delayed repairs? FixKart matches you with verified local plumbers, electricians, mechanics, and technicians within minutes with transparent pricing.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-10">
          <Button size="lg" className="bg-gradient-to-r from-brand-indigo to-brand-blue hover:opacity-90 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] h-14 px-8 text-base transition-transform hover:scale-105" asChild>
            <Link href="/workers"><CalendarCheck className="mr-2 h-5 w-5" /> Book a Service</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl h-14 px-8 text-base" asChild>
            <Link href="/join"><Briefcase className="mr-2 h-5 w-5" /> Join as Partner</Link>
          </Button>
        </div>
        
        <div className="flex gap-10 border-t border-white/5 pt-8">
          <div>
            <div className="text-3xl font-extrabold text-foreground">15k+</div>
            <div className="text-xs text-muted-foreground mt-1">Verified Pros</div>
          </div>
          <div className="w-px h-10 bg-white/10 self-center"></div>
          <div>
            <div className="text-3xl font-extrabold text-foreground">250k+</div>
            <div className="text-xs text-muted-foreground mt-1">Jobs Completed</div>
          </div>
          <div className="w-px h-10 bg-white/10 self-center"></div>
          <div>
            <div className="text-3xl font-extrabold text-foreground">4.9/5</div>
            <div className="text-xs text-muted-foreground mt-1">Avg Trust Rating</div>
          </div>
        </div>
      </motion.div>

      {/* Visual Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/20 to-brand-blue/20 blur-3xl rounded-full" />
        
        <div className="glass-panel p-3 shadow-2xl relative max-w-md mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
          <div className="flex justify-between items-center border-b border-white/5 pb-3 px-2 mb-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-warning"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-success"></span>
            </div>
            <span className="text-[10px] text-muted-foreground tracking-wider font-mono">FIXKART PROXIMITY ENGINE</span>
          </div>
          
          <div className="bg-[#080B11] rounded-xl p-4 overflow-hidden relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <span className="text-xs font-semibold flex items-center gap-1.5">
                <MapPin size={14} className="text-brand-indigo" /> Indiranagar, Bangalore
              </span>
              <div className="w-8 h-8 bg-gradient-to-br from-brand-indigo to-brand-blue rounded-full flex items-center justify-center text-xs font-bold text-white shadow-glow">
                R
              </div>
            </div>
            
            {/* Search */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-4 text-muted-foreground text-xs flex items-center gap-2">
              <Search size={14} /> Search for electrician, plumber...
            </div>
            
            {/* Categories */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1 hide-scrollbar">
              <span className="bg-brand-indigo/20 border border-brand-indigo/30 text-brand-indigo text-[10px] font-semibold px-3 py-1.5 rounded-full flex items-center shrink-0">
                <Plug size={12} className="mr-1" /> Electrician
              </span>
              <span className="bg-white/5 text-muted-foreground text-[10px] px-3 py-1.5 rounded-full flex items-center shrink-0 border border-transparent">
                <Droplets size={12} className="mr-1" /> Plumber
              </span>
              <span className="bg-white/5 text-muted-foreground text-[10px] px-3 py-1.5 rounded-full flex items-center shrink-0 border border-transparent">
                <Wrench size={12} className="mr-1" /> Mechanic
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-4 text-[10px] text-muted-foreground">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></span>
              <span>32 Electricians online nearby</span>
            </div>
            
            {/* Worker Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4 shadow-lg hover:border-brand-indigo/50 transition-colors cursor-pointer relative z-10 backdrop-blur-md"
            >
              <div className="flex gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden relative shrink-0">
                  <Image src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=100&auto=format&fit=crop&q=80" alt="Worker" fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 className="text-sm font-bold text-foreground">Rajesh Kumar</h4>
                    <span className="bg-success/10 text-success border border-success/20 text-[8px] px-1.5 py-0.5 rounded-full">VERIFIED</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mb-1">Senior Electrician • 8 Yrs Exp</div>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="text-warning font-medium">★ 4.9</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-success font-medium">99% Match</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-2">
                <span className="text-sm font-bold">₹299<span className="text-[10px] text-muted-foreground font-normal">/hr</span></span>
                <Button size="sm" className="h-7 text-[10px] px-3 bg-brand-indigo hover:bg-brand-blue rounded-md">Book Now</Button>
              </div>
            </motion.div>
            
            {/* Map Overlay Graphic */}
            <div className="bg-[#05070A]/80 absolute bottom-0 left-0 right-0 h-32 rounded-b-xl border-t border-white/5 overflow-hidden z-0">
              <svg viewBox="0 0 400 160" className="w-full h-full opacity-40">
                {/* Map lines */}
                <path d="M 0 40 L 400 40" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                <path d="M 0 120 L 400 120" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
                <path d="M 120 0 L 120 160" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                <path d="M 280 0 L 280 160" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
                
                {/* User location */}
                <circle cx="120" cy="40" r="15" fill="rgba(79, 70, 229, 0.2)" />
                <circle cx="120" cy="40" r="5" fill="#4F46E5" />
                
                {/* Worker locations */}
                <circle cx="280" cy="120" r="15" fill="rgba(16, 185, 129, 0.2)" className="animate-pulse-slow" />
                <circle cx="280" cy="120" r="5" fill="#10B981" />
                
                <circle cx="120" cy="100" r="10" fill="rgba(245, 158, 11, 0.2)" />
                <circle cx="120" cy="100" r="4" fill="#F59E0B" />
                
                {/* Connection line */}
                <path d="M 120 40 Q 200 80 280 120" stroke="#4F46E5" strokeWidth="2" strokeDasharray="5 5" fill="none" className="animate-[dash_10s_linear_infinite]" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
