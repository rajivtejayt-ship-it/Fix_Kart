"use client";

import React from "react";
import { motion } from "framer-motion";
import { TriangleAlert, X, CheckCircle2, Check } from "lucide-react";

export function ProblemSolution() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="about">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-heading font-extrabold mb-4 text-foreground"
        >
          The local service industry is broken. <br className="hidden sm:block" />
          We are here to <span className="text-gradient">Fix It</span>.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg"
        >
          Finding a reliable technician shouldn't feel like a gamble. Here is how we bridge the gap between customers and service providers.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* The Pain (Problem) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 sm:p-10 relative overflow-hidden group"
        >
          <div className="absolute top-6 right-6 bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <TriangleAlert size={14} /> The Broken Way
          </div>
          
          <h3 className="text-2xl font-bold mb-8 mt-4">Unorganized & Hazardous</h3>
          
          <ul className="space-y-8">
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive shrink-0 mt-0.5">
                <X size={16} />
              </div>
              <div>
                <strong className="text-foreground block mb-1 text-lg">Blind Pricing</strong>
                <span className="text-muted-foreground">No upfront rates; hidden charges and unfair post-service price inflation.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive shrink-0 mt-0.5">
                <X size={16} />
              </div>
              <div>
                <strong className="text-foreground block mb-1 text-lg">No Safety Check</strong>
                <span className="text-muted-foreground">Allowing unverified workers into your home with zero background screening.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive shrink-0 mt-0.5">
                <X size={16} />
              </div>
              <div>
                <strong className="text-foreground block mb-1 text-lg">Frustrating Delays</strong>
                <span className="text-muted-foreground">Spending hours calling, haggling, and waiting for callbacks that never arrive.</span>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* The Solution */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel-glow p-8 sm:p-10 relative overflow-hidden"
        >
          <div className="absolute top-6 right-6 bg-success/10 border border-success/20 text-success text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 size={14} /> The FixKart Solution
          </div>
          
          <h3 className="text-2xl font-bold mb-8 mt-4">Safe, Direct & Seamless</h3>
          
          <ul className="space-y-8">
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-success/10 border border-success/20 flex items-center justify-center text-success shrink-0 mt-0.5">
                <Check size={16} />
              </div>
              <div>
                <strong className="text-foreground block mb-1 text-lg">Hourly & Fixed Rates</strong>
                <span className="text-muted-foreground">Clear pricing with estimates provided before booking. Zero hidden markups.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-success/10 border border-success/20 flex items-center justify-center text-success shrink-0 mt-0.5">
                <Check size={16} />
              </div>
              <div>
                <strong className="text-foreground block mb-1 text-lg">Double-Verified Pros</strong>
                <span className="text-muted-foreground">Criminal records check, skill certification verification, and facial recognition checks.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-success/10 border border-success/20 flex items-center justify-center text-success shrink-0 mt-0.5">
                <Check size={16} />
              </div>
              <div>
                <strong className="text-foreground block mb-1 text-lg">Instant Proximity Match</strong>
                <span className="text-muted-foreground">Instantly discover professionals within a 5km radius ready for immediate dispatch.</span>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
