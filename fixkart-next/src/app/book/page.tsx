"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Phone, User, FileText,
  CheckCircle2, ChevronRight, Clock, Loader2, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Worker, LOCATIONS } from "@/lib/types";
import { authService } from "@/lib/auth";

interface BookingResult {
  id: string;
  securityPin: string;
  workerName: string;
  status: string;
}

function BookPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const workerId = searchParams.get("worker");

  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(!!workerId);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    location: LOCATIONS[1],
    description: "",
    scheduledTime: "",
  });

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user?.displayName) {
      setForm((f) => ({ ...f, customerName: f.customerName || user.displayName }));
    }
  }, []);

  useEffect(() => {
    if (!workerId) { setLoading(false); return; }
    fetch(`/api/workers/${workerId}`)
      .then((r) => r.json())
      .then(setWorker)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [workerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerId && !worker) { setError("Please select a worker first."); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId: workerId || "", ...form }),
      });
      if (!res.ok) throw new Error("Booking failed");
      const data: BookingResult = await res.json();
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel-glow max-w-md w-full p-10 text-center"
        >
          <div className="w-20 h-20 bg-success/10 border border-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-success" />
          </div>
          <h2 className="text-2xl font-heading font-extrabold text-foreground mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Your booking with <strong className="text-foreground">{result.workerName}</strong> has been placed successfully.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Booking ID</span>
              <span className="font-mono text-xs text-foreground">{result.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Security PIN</span>
              <span className="text-2xl font-extrabold tracking-widest text-brand-indigo">{result.securityPin}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="text-success font-semibold">{result.status}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            🔒 Share the Security PIN <strong className="text-foreground">only after the job is completed</strong> to release payment.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 border-white/10 bg-white/5" onClick={() => router.push("/workers")}>
              Find More Workers
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-brand-indigo to-brand-blue" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/workers" className="hover:text-foreground transition-colors">Workers</Link>
          <ChevronRight size={14} />
          <span className="text-foreground">Book a Service</span>
        </div>

        <h1 className="text-3xl font-heading font-extrabold text-foreground mb-2">
          Book a <span className="text-gradient">Service</span>
        </h1>
        <p className="text-muted-foreground mb-8">Fill in your details below and we'll confirm your booking instantly.</p>

        {/* Selected Worker */}
        {loading ? (
          <div className="glass-panel p-4 mb-6 animate-pulse h-20" />
        ) : worker ? (
          <div className="glass-panel p-4 mb-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0">
              <Image src={worker.avatar} alt={worker.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-foreground">{worker.name}</h3>
                <span className="bg-success/10 text-success border border-success/20 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  <CheckCircle2 size={9} className="inline mr-0.5" />Verified
                </span>
              </div>
              <p className="text-xs text-muted-foreground capitalize">{worker.category} • {worker.experience} • {worker.charge}/hr</p>
            </div>
            <Link href="/workers" className="text-xs text-brand-indigo hover:underline">Change</Link>
          </div>
        ) : (
          <div className="glass-panel p-4 mb-6 flex items-center gap-3 border-dashed">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground">
              <User size={18} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">No worker selected.</p>
              <Link href="/workers" className="text-xs text-brand-indigo hover:underline">Browse workers →</Link>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                <User size={14} className="text-brand-indigo" /> Your Name *
              </label>
              <input
                type="text" required placeholder="e.g. Ananya Hegde"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-indigo/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                <Phone size={14} className="text-brand-indigo" /> Phone Number *
              </label>
              <input
                type="tel" required placeholder="+91 98765 43210"
                value={form.customerPhone}
                onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-indigo/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
              <MapPin size={14} className="text-brand-indigo" /> Service Location *
            </label>
            <select
              required value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground focus:outline-none focus:border-brand-indigo/50 transition-colors"
            >
              {LOCATIONS.filter(l => l !== "All Locations").map((loc) => (
                <option key={loc} value={loc} className="bg-card">{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
              <Calendar size={14} className="text-brand-indigo" /> Preferred Date & Time
            </label>
            <input
              type="datetime-local"
              value={form.scheduledTime}
              onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground focus:outline-none focus:border-brand-indigo/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
              <FileText size={14} className="text-brand-indigo" /> Describe Your Problem *
            </label>
            <textarea
              required rows={4} placeholder="e.g. The main circuit breaker keeps tripping when I use the microwave..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-indigo/50 transition-colors resize-none"
            />
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 rounded-xl px-4 py-3">
            <ShieldCheck size={14} className="text-brand-indigo shrink-0" />
            Your payment is held in secure escrow and released only after you approve the completed work.
          </div>

          <Button
            type="submit" disabled={submitting || (!workerId && !worker)}
            className="w-full h-12 bg-gradient-to-r from-brand-indigo to-brand-blue hover:opacity-90 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.4)] text-base gap-2 transition-transform hover:scale-[1.02] disabled:opacity-50"
          >
            {submitting ? (
              <><Loader2 size={18} className="animate-spin" /> Confirming Booking...</>
            ) : (
              <><Calendar size={18} /> Confirm Booking</>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-indigo border-t-transparent animate-spin" />
        </div>
      }
    >
      <BookPageContent />
    </Suspense>
  );
}
