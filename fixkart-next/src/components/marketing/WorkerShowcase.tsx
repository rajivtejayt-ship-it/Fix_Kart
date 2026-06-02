"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, MapPin, Clock, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Worker, CATEGORIES, Category } from "@/lib/types";
import { useLocation } from "@/components/shared/LocationProvider";

const categoryIcons: Record<string, string> = {
  electrician: "⚡", plumber: "🚿", mechanic: "🔩", carpenter: "🪵",
};

export function WorkerShowcase() {
  const { location } = useLocation();
  const [activeCat, setActiveCat] = useState<Category>("electrician");
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeWorkerIdx, setActiveWorkerIdx] = useState(0);

  useEffect(() => {
    setLoading(true);
    setActiveWorkerIdx(0);
    const params = new URLSearchParams({ category: activeCat });
    if (location !== "All Locations") params.set("location", location);
    fetch(`/api/workers?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => { setWorkers(data.slice(0, 4)); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCat, location]);

  const activeWorker = workers[activeWorkerIdx];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="showcase">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl font-heading font-extrabold mb-4 text-foreground"
        >
          E-Commerce style <span className="text-gradient">Worker Profiles</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg"
        >
          No more anonymous technicians. Review certifications, portfolios, rates, and verified trust scores before you hire.
        </motion.p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all shrink-0 capitalize flex items-center gap-2 ${
              activeCat === cat
                ? "bg-brand-indigo text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{categoryIcons[cat]}</span> {cat}s
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid lg:grid-cols-[350px_1fr] gap-8">
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => <div key={i} className="glass-panel h-24 animate-pulse" />)}
          </div>
          <div className="glass-panel animate-pulse" />
        </div>
      ) : workers.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No workers found in this category.</div>
      ) : (
        <div className="grid lg:grid-cols-[350px_1fr] gap-8 items-start">
          {/* Worker List */}
          <div className="flex flex-col gap-4 max-h-[700px] overflow-y-auto hide-scrollbar">
            {workers.map((worker, idx) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveWorkerIdx(idx)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  activeWorkerIdx === idx
                    ? "bg-white/10 border-brand-indigo/50 shadow-[0_0_20px_rgba(79,70,229,0.15)]"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0">
                    <Image src={worker.avatar} alt={worker.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-foreground truncate">{worker.name}</h4>
                      {worker.isVerified && (
                        <span className="bg-success/10 text-success border border-success/20 text-[9px] px-1.5 py-0.5 rounded-full font-bold shrink-0">
                          <CheckCircle2 size={9} className="inline" /> VER
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1.5">
                      <MapPin size={10} className="text-brand-indigo" />
                      <span className="truncate">{worker.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Star size={11} className="text-warning fill-warning" />
                      <span className="font-bold text-foreground">{worker.rating}</span>
                      <span className="text-muted-foreground">({worker.reviewsCount})</span>
                      <span className="text-muted-foreground">• {worker.experience}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <Link
              href={`/workers?category=${activeCat}`}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-dashed border-white/10 text-muted-foreground hover:text-foreground hover:border-brand-indigo/40 transition-all text-sm font-medium"
            >
              View all {activeCat}s <ArrowRight size={14} />
            </Link>
          </div>

          {/* Worker Detail Panel */}
          <AnimatePresence mode="wait">
            {activeWorker && (
              <motion.div
                key={activeWorker.id}
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25 }}
                className="glass-panel-glow overflow-hidden"
              >
                {/* Cover */}
                <div className="h-32 bg-gradient-to-r from-brand-indigo/20 to-brand-blue/20 relative">
                  <div className="absolute -bottom-12 left-8">
                    <div className="w-24 h-24 rounded-2xl border-4 border-[#09090B] overflow-hidden relative bg-card shadow-2xl">
                      <Image src={activeWorker.avatar} alt={activeWorker.name} fill className="object-cover" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-bold border border-white/10">
                    <ShieldCheck size={16} className="text-success" />
                    Trust: <span className="text-success">{activeWorker.trustScore}/100</span>
                  </div>
                </div>

                <div className="p-8 pt-16 flex flex-col lg:flex-row gap-8">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl font-bold text-foreground">{activeWorker.name}</h3>
                      <Zap size={18} className="text-brand-indigo fill-brand-indigo/20" />
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-brand-indigo" />{activeWorker.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} />{activeWorker.responseRate}</span>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{activeWorker.about}</p>

                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-foreground mb-3 uppercase tracking-wider">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeWorker.skills.map((skill) => (
                          <span key={skill} className="bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-xs px-3 py-1.5 rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-foreground mb-3 uppercase tracking-wider">Certifications</h4>
                      <ul className="space-y-2">
                        {activeWorker.certifications.map((cert) => (
                          <li key={cert} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 size={15} className="text-brand-indigo shrink-0 mt-0.5" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Booking card */}
                  <div className="lg:w-[280px] shrink-0">
                    <div className="bg-[#080B11] border border-white/10 rounded-2xl p-6">
                      <div className="text-center mb-5">
                        <span className="text-xs text-muted-foreground block mb-1">Standard Rate</span>
                        <span className="text-3xl font-bold text-foreground">{activeWorker.charge}</span>
                        <span className="text-muted-foreground text-sm">/hr</span>
                      </div>
                      <div className="space-y-3 mb-5 text-sm">
                        {[
                          { label: "Availability", value: activeWorker.availability, cls: "text-success" },
                          { label: "Reviews", value: `${activeWorker.reviewsCount} verified`, cls: "" },
                          { label: "Insurance", value: "₹10k Cover", cls: "text-brand-indigo" },
                        ].map(({ label, value, cls }) => (
                          <div key={label} className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-muted-foreground">{label}</span>
                            <span className={`font-semibold ${cls || "text-foreground"}`}>{value}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-brand-indigo to-brand-blue hover:opacity-90 rounded-xl h-11 text-sm mb-2 transition-transform hover:scale-105"
                        asChild
                      >
                        <Link href={`/book?worker=${activeWorker.id}`}>Book {activeWorker.name.split(" ")[0]}</Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-white/10 bg-white/5 hover:bg-white/10 rounded-xl h-9 text-sm"
                        asChild
                      >
                        <Link href={`/workers/${activeWorker.id}`}>View Full Profile →</Link>
                      </Button>
                      <p className="text-center text-[10px] text-muted-foreground mt-3">🔒 No charges until job is completed</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Browse All CTA */}
      <div className="text-center mt-12">
        <Button
          size="lg"
          className="bg-gradient-to-r from-brand-indigo to-brand-blue hover:opacity-90 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] h-14 px-10 text-base transition-transform hover:scale-105 gap-2"
          asChild
        >
          <Link href="/workers">
            Browse All Verified Workers <ArrowRight size={18} />
          </Link>
        </Button>
      </div>
    </section>
  );
}
