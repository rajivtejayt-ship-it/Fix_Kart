"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star, CheckCircle2, MapPin, Clock, ShieldCheck, Zap, ChevronRight,
  ArrowLeft, MessageCircle, Calendar, Award, Briefcase, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Worker } from "@/lib/types";

export default function WorkerProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageToast, setMessageToast] = useState(false);

  useEffect(() => {
    fetch(`/api/workers/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setWorker)
      .catch(() => router.push("/workers"))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-brand-indigo border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!worker) return null;

  const categoryIcon: Record<string, string> = {
    electrician: "⚡", plumber: "🚿", mechanic: "🔩", carpenter: "🪵"
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/workers" className="hover:text-foreground transition-colors">Find Workers</Link>
          <ChevronRight size={14} />
          <span className="text-foreground capitalize">{worker.name}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* Left Column: Profile */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            {/* Cover + Avatar */}
            <div className="glass-panel overflow-hidden mb-6">
              <div className="h-40 bg-gradient-to-r from-brand-indigo/30 to-brand-blue/30 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.3),transparent)]" />
                {/* Trust Score */}
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-bold border border-white/10">
                  <ShieldCheck size={16} className="text-success" />
                  Trust Score: <span className="text-success">{worker.trustScore}/100</span>
                </div>
                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-semibold border border-white/10 capitalize">
                  {categoryIcon[worker.category]} {worker.category} Specialist
                </div>
              </div>

              <div className="px-8 pb-8 pt-0 relative">
                {/* Avatar */}
                <div className="absolute -top-14 left-8">
                  <div className="w-28 h-28 rounded-2xl border-4 border-[#09090B] overflow-hidden relative shadow-2xl">
                    <Image src={worker.avatar} alt={worker.name} fill className="object-cover" />
                  </div>
                </div>

                <div className="pt-16">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-heading font-extrabold text-foreground">{worker.name}</h1>
                        <Zap size={20} className="text-brand-indigo fill-brand-indigo/20" />
                        {worker.isVerified && (
                          <span className="bg-success/10 text-success border border-success/20 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                            <CheckCircle2 size={12} /> ML Verified
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-brand-indigo" />{worker.location}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} />{worker.responseRate}</span>
                        <span className="flex items-center gap-1.5"><Briefcase size={14} />{worker.experience} Experience</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-warning/10 border border-warning/20 px-4 py-2 rounded-xl">
                      <Star size={18} className="text-warning fill-warning" />
                      <span className="text-xl font-bold text-foreground">{worker.rating}</span>
                      <span className="text-sm text-muted-foreground">({worker.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="glass-panel p-6 mb-6">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award size={16} className="text-brand-indigo" /> About this Pro
              </h2>
              <p className="text-muted-foreground leading-relaxed">{worker.about}</p>
            </div>

            {/* Skills */}
            <div className="glass-panel p-6 mb-6">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap size={16} className="text-brand-indigo" /> Expertise & Skills
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {worker.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-sm px-4 py-2 rounded-xl font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="glass-panel p-6 mb-6">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-indigo" /> Certifications
              </h2>
              <ul className="space-y-3">
                {worker.certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Portfolio */}
            {worker.portfolio.length > 0 && (
              <div className="glass-panel p-6 mb-6">
                <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Portfolio</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {worker.portfolio.map((img, i) => (
                    <div key={i} className="aspect-video rounded-xl overflow-hidden relative bg-white/5">
                      <Image src={img} alt={`Portfolio ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft size={16} /> Back to Workers
            </Button>
          </motion.div>

          {/* Right Column: Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-card border border-white/10 rounded-2xl p-6 shadow-2xl mb-4">
              <div className="text-center mb-6">
                <span className="text-sm text-muted-foreground block mb-1">Standard Rate</span>
                <span className="text-4xl font-extrabold text-foreground">{worker.charge}</span>
                <span className="text-muted-foreground text-sm">/hr</span>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: "Availability", value: worker.availability, highlight: "text-success" },
                  { label: "Response Rate", value: worker.responseRate, highlight: "" },
                  { label: "Reviews", value: `${worker.reviewsCount} verified`, highlight: "" },
                  { label: "Insurance", value: "₹10k Cover", highlight: "text-brand-indigo" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className={`font-semibold ${row.highlight || "text-foreground"}`}>{row.value}</span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full bg-gradient-to-r from-brand-indigo to-brand-blue hover:opacity-90 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.4)] h-12 text-base transition-transform hover:scale-105 mb-3"
                asChild
              >
                <Link href={`/book?worker=${worker.id}`}>
                  <Calendar size={18} className="mr-2" />
                  Book {worker.name.split(" ")[0]}
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full border-white/10 bg-white/5 hover:bg-white/10 rounded-xl h-10 gap-2"
                onClick={() => {
                  setMessageToast(true);
                  setTimeout(() => setMessageToast(false), 3000);
                }}
              >
                <MessageCircle size={16} />
                Send Message
              </Button>
              {messageToast && (
                <p className="text-center text-xs text-brand-indigo mt-2">
                  Chat coming soon — sandbox demo
                </p>
              )}
              <p className="text-center text-[11px] text-muted-foreground mt-3">
                🔒 No charges until job is completed
              </p>
            </div>

            {/* Quick Stats */}
            <div className="glass-panel p-5">
              <h3 className="text-sm font-bold text-foreground mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Jobs Done", value: String(worker.reviewsCount * 3) + "+" },
                  { label: "Trust Score", value: `${worker.trustScore}/100` },
                  { label: "Experience", value: worker.experience },
                  { label: "On Platform", value: worker.joinedAt ? new Date(worker.joinedAt).getFullYear().toString() : "2022" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
