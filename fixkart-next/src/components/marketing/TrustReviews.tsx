"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, StarHalf } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const reviews = [
  { stars: 5, reviewer: "Rajiv C.", text: "Amit Sharma did an exceptional job hydro-jetting our clogged drain line. Transparent pricing and complete professional equipment.", date: "15 Mins Ago" },
  { stars: 5, reviewer: "Meera N.", text: "Rajesh Kumar arrived in 10 minutes flat! Fixed the sparkling distribution board quickly. Having certified experts with background clearance is highly comforting.", date: "1 Hour Ago" },
  { stars: 4, reviewer: "Rohit D.", text: "Tuned my bike perfectly. The throttle response feels like a brand-new machine. Docked one star because the payment gateway was lagging.", date: "3 Hours Ago" },
  { stars: 5, reviewer: "Ananya H.", text: "Installed our new eco-inverter system. Extremely tidy work, neat cables, and explained the battery maintenance rules clearly.", date: "Yesterday" },
];

export function TrustReviews() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="trust">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-heading font-extrabold mb-4 text-foreground"
        >
          The Gold Standard of <span className="text-gradient">Trust & Reviews</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg"
        >
          Our multi-dimensional scoring ensures total security and premium quality ratings. No fake reviews, only verified customer submissions.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Trust Score Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel-glow p-8"
        >
          <div className="flex justify-between items-start mb-8">
            <span className="font-bold text-foreground text-lg">FixKart Algorithmic Trust Score</span>
            <span className="bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck size={14} /> ML Moderated
            </span>
          </div>
          
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="stroke-white/10 fill-none" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="45" 
                  className="stroke-brand-indigo fill-none" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  strokeDasharray="282.7" 
                  strokeDashoffset="11.3" // roughly 96%
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-5xl font-heading font-extrabold text-foreground">95.8</span>
                <span className="text-success text-xs font-bold uppercase tracking-widest mt-1">Excellent</span>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm text-center mb-8 px-4 leading-relaxed">
            Our ML-driven Trust Score is continuously calculated based on user ratings, verified certifications, dispute frequencies, and background check milestones.
          </p>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm bg-white/5 p-3 rounded-xl">
              <span className="text-muted-foreground">Background Check Clear Rate</span>
              <span className="font-bold text-success">100%</span>
            </div>
            <div className="flex justify-between items-center text-sm bg-white/5 p-3 rounded-xl">
              <span className="text-muted-foreground">Job Completion Rate</span>
              <span className="font-bold text-foreground">98.2%</span>
            </div>
            <div className="flex justify-between items-center text-sm bg-white/5 p-3 rounded-xl">
              <span className="text-muted-foreground">Response Time (under 10m)</span>
              <span className="font-bold text-foreground">94.5%</span>
            </div>
          </div>
        </motion.div>

        {/* Reviews Dashboard */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8 flex flex-col"
        >
          <h3 className="text-xl font-bold mb-6 text-foreground">Verified Customer Matrix</h3>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="text-6xl font-heading font-extrabold text-foreground">4.8</div>
            <div>
              <div className="flex gap-1 text-warning mb-2">
                <Star size={20} className="fill-warning" />
                <Star size={20} className="fill-warning" />
                <Star size={20} className="fill-warning" />
                <Star size={20} className="fill-warning" />
                <StarHalf size={20} className="fill-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Based on 145,200 reviews</span>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3 mb-10">
            <div className="flex items-center gap-4 text-sm">
              <span className="w-12 text-muted-foreground">5 Star</span>
              <Progress value={82} className="h-2 flex-1 bg-white/10" />
              <span className="w-10 text-right font-medium text-foreground">82%</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="w-12 text-muted-foreground">4 Star</span>
              <Progress value={12} className="h-2 flex-1 bg-white/10" />
              <span className="w-10 text-right font-medium text-foreground">12%</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="w-12 text-muted-foreground">3 Star</span>
              <Progress value={4} className="h-2 flex-1 bg-white/10" />
              <span className="w-10 text-right font-medium text-foreground">4%</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="w-12 text-muted-foreground">2 Star</span>
              <Progress value={1} className="h-2 flex-1 bg-white/10" />
              <span className="w-10 text-right font-medium text-foreground">1%</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="w-12 text-muted-foreground">1 Star</span>
              <Progress value={1} className="h-2 flex-1 bg-white/10" />
              <span className="w-10 text-right font-medium text-foreground">1%</span>
            </div>
          </div>

          {/* Live Reviews Scroller */}
          <div className="flex-1 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#18181B] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#18181B] to-transparent z-10 pointer-events-none"></div>
            
            <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 hide-scrollbar">
              {reviews.map((rev, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm text-foreground">{rev.reviewer}</span>
                    <div className="flex gap-0.5 text-warning">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={12} className={idx < rev.stars ? "fill-warning" : "fill-white/10 text-white/10"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">"{rev.text}"</p>
                  <span className="text-[10px] text-muted-foreground/60">{rev.date}</span>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
