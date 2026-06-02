"use client";

import React, { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Star, CheckCircle2, MapPin, Clock, Search,
  ChevronRight, SlidersHorizontal, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Worker, CATEGORIES, Category } from "@/lib/types";
import { useLocation } from "@/components/shared/LocationProvider";

const categoryIcons: Record<string, string> = {
  all: "🔧",
  electrician: "⚡",
  plumber: "🚿",
  mechanic: "🔩",
  carpenter: "🪵",
};

function WorkersPageContent() {
  const searchParams = useSearchParams();
  const { location } = useLocation();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(
    searchParams.get("category") || "all"
  );
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "trust" | "charge">("rating");
  const [minTrust, setMinTrust] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const fetchWorkers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (location !== "All Locations") params.set("location", location);
    const res = await fetch(`/api/workers?${params.toString()}`);
    const data = await res.json();
    setWorkers(data);
    setLoading(false);
  }, [activeCategory, location]);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const filtered = useMemo(() => {
    let list = workers.filter((w) => {
      if (w.trustScore < minTrust) return false;
      if (!debouncedSearch) return true;
      const q = debouncedSearch.toLowerCase();
      return (
        w.name.toLowerCase().includes(q) ||
        w.skills.some((s) => s.toLowerCase().includes(q))
      );
    });

    list = [...list].sort((a, b) => {
      if (sortBy === "trust") return b.trustScore - a.trustScore;
      if (sortBy === "charge") {
        const parseCharge = (c: string) => parseInt(c.replace(/\D/g, ""), 10) || 0;
        return parseCharge(a.charge) - parseCharge(b.charge);
      }
      return parseFloat(b.rating) - parseFloat(a.rating);
    });

    return list;
  }, [workers, debouncedSearch, minTrust, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-foreground">Find Workers</span>
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-foreground mb-2">
            Browse <span className="text-gradient">Verified Professionals</span>
          </h1>
          <p className="text-muted-foreground text-lg flex items-center gap-2">
            <MapPin size={16} className="text-brand-indigo" />
            {location === "All Locations" ? "Showing workers across all Bangalore locations" : `Showing workers near ${location}`}
          </p>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-indigo/50 transition-colors"
            />
          </div>
          <Button
            variant="outline"
            className={`border-white/10 bg-white/5 hover:bg-white/10 rounded-xl gap-2 shrink-0 ${filtersOpen ? "border-brand-indigo/40 text-brand-indigo" : ""}`}
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal size={16} />
            Filters
          </Button>
        </div>

        {filtersOpen && (
          <div className="glass-panel p-4 mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1.5 block">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "rating" | "trust" | "charge")}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground focus:outline-none focus:border-brand-indigo/50"
              >
                <option value="rating">Highest Rating</option>
                <option value="trust">Highest Trust Score</option>
                <option value="charge">Lowest Price</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Min Trust Score: {minTrust}
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={minTrust}
                onChange={(e) => setMinTrust(Number(e.target.value))}
                className="w-full accent-brand-indigo"
              />
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["all", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all shrink-0 flex items-center gap-2 capitalize ${
                activeCategory === cat
                  ? "bg-brand-indigo text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                  : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
              }`}
            >
              <span>{categoryIcons[cat]}</span>
              {cat === "all" ? "All Categories" : `${cat}s`}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading..." : `${filtered.length} professional${filtered.length !== 1 ? "s" : ""} found`}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-brand-indigo font-medium">
            <Zap size={13} className="fill-brand-indigo/20" />
            All verified & background-checked
          </div>
        </div>

        {/* Worker Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-panel p-5 animate-pulse">
                <div className="w-full h-40 bg-white/5 rounded-xl mb-4" />
                <div className="h-4 bg-white/5 rounded mb-2 w-3/4" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-foreground mb-2">No workers found</h3>
            <p className="text-muted-foreground">Try changing your location or category filter.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((worker, idx) => (
                <WorkerCard key={worker.id} worker={worker} idx={idx} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function WorkerCard({ worker, idx }: { worker: Worker; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: idx * 0.05 }}
      layout
    >
      <Link href={`/workers/${worker.id}`} className="block group">
        <div className="glass-panel p-0 overflow-hidden hover:border-brand-indigo/40 hover:shadow-[0_0_20px_rgba(79,70,229,0.15)] transition-all duration-300 h-full">
          {/* Avatar Banner */}
          <div className="h-36 bg-gradient-to-br from-brand-indigo/20 to-brand-blue/20 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white/10 relative shadow-xl group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={worker.avatar}
                  alt={worker.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Verified badge */}
            <div className="absolute top-3 right-3">
              <span className="bg-success/20 text-success border border-success/30 text-[10px] px-2 py-1 rounded-full flex items-center gap-1 font-bold backdrop-blur-sm">
                <CheckCircle2 size={10} /> Verified
              </span>
            </div>
            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-background/70 text-foreground border border-white/10 text-[10px] px-2 py-1 rounded-full capitalize font-medium backdrop-blur-sm">
                {categoryIcons[worker.category]} {worker.category}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-5">
            <h3 className="font-bold text-foreground mb-1 group-hover:text-brand-indigo transition-colors">
              {worker.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <MapPin size={11} className="text-brand-indigo" />
              <span className="truncate">{worker.location}</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-xs">
                <Star size={12} className="text-warning fill-warning" />
                <span className="font-bold text-foreground">{worker.rating}</span>
                <span className="text-muted-foreground">({worker.reviewsCount})</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={11} />
                {worker.experience}
              </div>
            </div>

            {/* Skills preview */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {worker.skills.slice(0, 2).map((skill) => (
                <span
                  key={skill}
                  className="bg-white/5 border border-white/10 text-[10px] text-muted-foreground px-2 py-1 rounded-lg"
                >
                  {skill}
                </span>
              ))}
              {worker.skills.length > 2 && (
                <span className="text-[10px] text-muted-foreground px-2 py-1">
                  +{worker.skills.length - 2}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-foreground">
                {worker.charge}
                <span className="text-xs text-muted-foreground font-normal">/hr</span>
              </span>
              <Button
                size="sm"
                className="h-8 text-xs bg-brand-indigo hover:bg-brand-blue rounded-lg gap-1 transition-all group-hover:shadow-[0_0_10px_rgba(79,70,229,0.4)]"
              >
                View Profile <ChevronRight size={12} />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorkersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-indigo border-t-transparent animate-spin" />
        </div>
      }
    >
      <WorkersPageContent />
    </Suspense>
  );
}
