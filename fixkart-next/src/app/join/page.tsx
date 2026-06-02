"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Briefcase, MapPin, Phone, Mail, FileText, Award,
  ChevronRight, CheckCircle2, Loader2, Zap, ShieldCheck, Star, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, LOCATIONS } from "@/lib/types";

const steps = ["Personal Info", "Trade Details", "Skills & Bio", "Review"];

interface FormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  experience: string;
  charge: string;
  availability: string;
  location: string;
  skills: string;
  certifications: string;
  about: string;
  avatar: string;
}

export default function JoinPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "",
    category: "electrician", experience: "1 Year",
    charge: "₹199", availability: "Mon-Fri, 9 AM - 6 PM",
    location: LOCATIONS[1],
    skills: "", certifications: "", about: "",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
  });

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
          certifications: form.certifications.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error("Registration failed");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel-glow max-w-lg w-full p-10 text-center"
        >
          <div className="w-20 h-20 bg-brand-indigo/10 border border-brand-indigo/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-brand-indigo" />
          </div>
          <h2 className="text-2xl font-heading font-extrabold text-foreground mb-3">
            Application Submitted! 🎉
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Welcome to FixKart, <strong className="text-foreground">{form.name}</strong>! Your application is under review.
            Our team will verify your credentials and notify you within 24-48 hours.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-left space-y-2">
            {[
              { label: "Category", value: form.category },
              { label: "Location", value: form.location },
              { label: "Status", value: "Pending Verification" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold text-foreground capitalize">{item.value}</span>
              </div>
            ))}
          </div>
          <Button className="w-full bg-gradient-to-r from-brand-indigo to-brand-blue rounded-xl" asChild>
            <Link href="/">Back to Home <ArrowRight size={16} className="ml-2" /></Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight size={14} />
          <span className="text-foreground">Join as Partner</span>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap size={13} /> Partner Registration
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-foreground mb-3">
            Join <span className="text-gradient">FixKart</span> as a Pro
          </h1>
          <p className="text-muted-foreground text-lg">
            Build your digital brand, reach thousands of customers, and earn more with zero middlemen.
          </p>
        </div>

        {/* Benefits bar */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { icon: <Star size={18} className="text-warning" />, label: "Build Your Reputation", sub: "Earn reviews & ratings" },
            { icon: <ShieldCheck size={18} className="text-success" />, label: "Get ML Verified", sub: "Boost trust score fast" },
            { icon: <Zap size={18} className="text-brand-indigo" />, label: "Instant Leads", sub: "Hyper-local bookings" },
          ].map((b) => (
            <div key={b.label} className="glass-panel p-4 text-center">
              <div className="flex justify-center mb-2">{b.icon}</div>
              <p className="text-xs font-bold text-foreground">{b.label}</p>
              <p className="text-[11px] text-muted-foreground">{b.sub}</p>
            </div>
          ))}
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/10 -z-0" />
          {steps.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-2 relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < step ? "bg-success text-white" : i === step ? "bg-brand-indigo text-white shadow-[0_0_12px_rgba(79,70,229,0.5)]" : "bg-white/10 text-muted-foreground"
              }`}>
                {i < step ? <CheckCircle2 size={16} /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-brand-indigo" : "text-muted-foreground"}`}>{s}</span>
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="glass-panel p-8"
          >
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <User size={20} className="text-brand-indigo" /> Personal Information
                </h2>
                {[
                  { label: "Full Name", field: "name" as const, type: "text", icon: <User size={14} />, placeholder: "e.g. Rajesh Kumar" },
                  { label: "Email Address", field: "email" as const, type: "email", icon: <Mail size={14} />, placeholder: "rajesh@example.com" },
                  { label: "Phone Number", field: "phone" as const, type: "tel", icon: <Phone size={14} />, placeholder: "+91 98765 43210" },
                ].map(({ label, field, type, icon, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                      <span className="text-brand-indigo">{icon}</span> {label}
                    </label>
                    <input type={type} required value={form[field]} onChange={set(field)} placeholder={placeholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-indigo/50 transition-colors" />
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <Briefcase size={20} className="text-brand-indigo" /> Trade Details
                </h2>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Service Category *</label>
                  <select value={form.category} onChange={set("category")}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground focus:outline-none focus:border-brand-indigo/50 capitalize">
                    {CATEGORIES.map((c) => <option key={c} value={c} className="bg-card capitalize">{c}</option>)}
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
                    <select value={form.experience} onChange={set("experience")}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground focus:outline-none focus:border-brand-indigo/50">
                      {["0-1 Years", "1 Year", "2 Years", "3 Years", "5 Years", "7 Years", "10 Years", "12+ Years", "15+ Years", "20+ Years"].map((e) =>
                        <option key={e} value={e} className="bg-card">{e}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Hourly Charge (₹)</label>
                    <select value={form.charge} onChange={set("charge")}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground focus:outline-none focus:border-brand-indigo/50">
                      {["₹149", "₹199", "₹249", "₹299", "₹349", "₹399", "₹450", "₹499", "₹550+"].map((c) =>
                        <option key={c} value={c} className="bg-card">{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <MapPin size={14} className="text-brand-indigo" /> Service Area
                  </label>
                  <select value={form.location} onChange={set("location")}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground focus:outline-none focus:border-brand-indigo/50">
                    {LOCATIONS.filter((l) => l !== "All Locations").map((l) =>
                      <option key={l} value={l} className="bg-card">{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Availability</label>
                  <input type="text" value={form.availability} onChange={set("availability")} placeholder="e.g. Mon-Sat, 9 AM - 6 PM"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-indigo/50" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <Award size={20} className="text-brand-indigo" /> Skills & Bio
                </h2>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Skills (comma-separated)</label>
                  <input type="text" value={form.skills} onChange={set("skills")}
                    placeholder="e.g. Wiring, Short Circuit Repair, Fan Installation"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-indigo/50" />
                  <p className="text-xs text-muted-foreground mt-1.5">Add your top specializations, separated by commas.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Certifications (comma-separated)</label>
                  <input type="text" value={form.certifications} onChange={set("certifications")}
                    placeholder="e.g. ITI Diploma, NSDC Level 4"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-indigo/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <FileText size={14} className="text-brand-indigo" /> About You
                  </label>
                  <textarea rows={5} value={form.about} onChange={set("about")}
                    placeholder="Describe your experience, approach to work, and what makes you the best choice..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-indigo/50 resize-none" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-brand-indigo" /> Review & Submit
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "Name", value: form.name },
                    { label: "Email", value: form.email },
                    { label: "Phone", value: form.phone },
                    { label: "Category", value: form.category },
                    { label: "Experience", value: form.experience },
                    { label: "Charge", value: `${form.charge}/hr` },
                    { label: "Location", value: form.location },
                    { label: "Availability", value: form.availability },
                    { label: "Skills", value: form.skills || "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start text-sm border-b border-white/5 pb-2">
                      <span className="text-muted-foreground w-28 shrink-0">{label}</span>
                      <span className="font-medium text-foreground text-right capitalize">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-brand-indigo/5 border border-brand-indigo/20 rounded-xl p-4 text-sm text-muted-foreground">
                  <ShieldCheck size={16} className="text-brand-indigo inline mr-2" />
                  After submission, your profile will undergo manual verification within <strong className="text-foreground">24-48 hours</strong>. You will be notified once approved and listed on the platform.
                </div>
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-xl">{error}</div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl"
            onClick={() => setStep((s) => s - 1)} disabled={step === 0}
          >
            ← Previous
          </Button>
          {step < steps.length - 1 ? (
            <Button
              className="bg-gradient-to-r from-brand-indigo to-brand-blue hover:opacity-90 rounded-xl gap-2"
              onClick={() => setStep((s) => s + 1)}
            >
              Next Step <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-r from-brand-indigo to-brand-blue hover:opacity-90 rounded-xl gap-2"
              onClick={handleSubmit} disabled={submitting}
            >
              {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><Zap size={16} /> Submit Application</>}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
