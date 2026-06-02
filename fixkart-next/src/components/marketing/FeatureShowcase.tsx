"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  UserSquare2, 
  Star, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Wallet, 
  Siren, 
  BrainCircuit, 
  Languages, 
  ShieldAlert, 
  BarChart3
} from "lucide-react";

const features = [
  {
    icon: <MapPin className="text-brand-indigo" size={24} />,
    title: "Proximity Search",
    description: "Search workers by micro-location and service categories with real-time availability filters."
  },
  {
    icon: <UserSquare2 className="text-brand-indigo" size={24} />,
    title: "Worker E-Commerce Pages",
    description: "Detailed worker portfolios displaying charges, certifications, availability calendar, and ratings."
  },
  {
    icon: <Star className="text-brand-indigo" size={24} />,
    title: "Granular Rating Matrix",
    description: "Multi-dimensional review scores for reliability, cleanliness, behavior, and cost fairness."
  },
  {
    icon: <Clock className="text-brand-indigo" size={24} />,
    title: "Instant or Scheduled",
    description: "Book emergency repairs instantly or schedule appointments in advance around your timeline."
  },
  {
    icon: <MessageSquare className="text-brand-indigo" size={24} />,
    title: "Encrypted Live Chat",
    description: "Discuss job requirements, share photos of repair tasks, and share locations directly inside the app."
  },
  {
    icon: <ShieldCheck className="text-brand-indigo" size={24} />,
    title: "Trust Score Badge",
    description: "A dynamic, machine-learning based Trust Index scoring worker safety, completion rate, and quality."
  },
  {
    icon: <Wallet className="text-brand-indigo" size={24} />,
    title: "Flexible Digital Payments",
    description: "Integrated UPI, digital wallets, secure credit/debit escrow, or pay cash post-service."
  },
  {
    icon: <Siren className="text-brand-indigo" size={24} />,
    title: "Emergency SOS Alerts",
    description: "One-tap SOS alerts dispatch immediate emergency service backup if unexpected issues arise."
  },
  {
    icon: <BrainCircuit className="text-brand-indigo" size={24} />,
    title: "AI Recommendation",
    description: "Smart algorithms recommending best-suited, top-rated workers based on project budgets and history."
  },
  {
    icon: <Languages className="text-brand-indigo" size={24} />,
    title: "Multi-Language UI",
    description: "Supports English, Hindi, Kannada, Tamil, Telugu, and custom regional languages for technicians."
  },
  {
    icon: <ShieldAlert className="text-brand-indigo" size={24} />,
    title: "Fraud Detection Guard",
    description: "Protects workers and customers from fake bookings, spam accounts, and unsafe off-platform deals."
  },
  {
    icon: <BarChart3 className="text-brand-indigo" size={24} />,
    title: "Rich Admin Dashboard",
    description: "Powerful internal tooling for worker approvals, verification, complaint management, and revenue flows."
  }
];

export function FeatureShowcase() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="features">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-heading font-extrabold mb-4 text-foreground"
        >
          Packed with <span className="text-gradient">Superpowers</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg"
        >
          Designed with industry-first features that ensure transparency, reliability, and security for both sides of the marketplace.
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass-panel p-6 hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-brand-indigo/10 border border-brand-indigo/20 rounded-xl flex items-center justify-center mb-5">
              {feature.icon}
            </div>
            <h4 className="text-lg font-bold text-foreground mb-2">{feature.title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
