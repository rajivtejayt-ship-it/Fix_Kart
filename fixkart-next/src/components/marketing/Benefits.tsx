"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Users, CheckCircle2 } from "lucide-react";

export function Benefits() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="benefits">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-heading font-extrabold mb-4 text-foreground"
        >
          Empowering the <span className="text-gradient">Whole Ecosystem</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg"
        >
          FixKart is structured symmetrically. We offer premium features that elevate domestic living standards and unlock economic potential for service workers.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* For Customers */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-brand-indigo/20 text-brand-indigo rounded-2xl flex items-center justify-center">
              <Home size={28} />
            </div>
            <h3 className="text-2xl font-bold text-foreground">For Customers</h3>
          </div>

          <ul className="space-y-6">
            <li className="flex gap-4">
              <CheckCircle2 className="text-brand-indigo shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-lg font-bold text-foreground mb-1">Fast Emergency Booking</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Find nearby professionals and see dispatch confirmations in under 90 seconds flat.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle2 className="text-brand-indigo shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-lg font-bold text-foreground mb-1">Transparent Pricing</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">No unexpected bills. Pay exactly what was quoted dynamically in the profile upfront.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle2 className="text-brand-indigo shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-lg font-bold text-foreground mb-1">Rigorous Safety Framework</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Verified background clearance details and OTP-secured visit access for maximum safety.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle2 className="text-brand-indigo shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-lg font-bold text-foreground mb-1">Satisfaction Guarantee</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Free re-execution or refund protection if the job is not completed to standard.</p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* For Workers */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-panel-glow p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-success/20 text-success rounded-2xl flex items-center justify-center">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-bold text-foreground">For Local Workers</h3>
          </div>

          <ul className="space-y-6">
            <li className="flex gap-4">
              <CheckCircle2 className="text-success shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-lg font-bold text-foreground mb-1">Zero Middlemen</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Retain 90% of service booking values directly. Say goodbye to exploitative job agents.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle2 className="text-success shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-lg font-bold text-foreground mb-1">Steady Stream of Leads</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Our localized recommendation algorithm continuously brings hyper-local leads straight to your device.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle2 className="text-success shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-lg font-bold text-foreground mb-1">Dynamic E-Commerce Profile</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Own your digital brand with certification uploads, job portfolios, custom pricing, and ratings.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle2 className="text-success shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-lg font-bold text-foreground mb-1">Instant Escrow Payouts</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Receive earnings directly to your UPI bank account immediately within hours of job sign-off.</p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
