"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, CalendarCheck, CarFront, CheckCircle2, Wallet, ChevronLeft, Plug, Droplets, Wrench, Hammer } from "lucide-react";

const steps = [
  {
    num: 1,
    label: "Search",
    title: "Step 1: Choose Your Service",
    desc: "Pick from a wide list of domestic and commercial repairs like plumbers, carpenters, device technicians, and vehicle mechanics instantly using the intelligent category finder.",
    icon: <Search size={20} />
  },
  {
    num: 2,
    label: "Select",
    title: "Step 2: Compare Local Specialists",
    desc: "Instantly see matching workers in your exact proximity. Compare rates, response limits, background clearance details, and certifications on one screen.",
    icon: <MapPin size={20} />
  },
  {
    num: 3,
    label: "Review",
    title: "Step 3: Review Verified History",
    desc: "Examine detailed review cards from other home-owners. Read about behavior, cleanliness, and value fairness to build confidence before dispatching.",
    icon: <Star size={20} />
  },
  {
    num: 4,
    label: "Book",
    title: "Step 4: Book or Schedule Instantly",
    desc: "Schedule according to your personal availability window or request immediate dispatch. Transparent billing calculations are locked down dynamically.",
    icon: <CalendarCheck size={20} />
  },
  {
    num: 5,
    label: "Dispatch",
    title: "Step 5: Accept & Dispatch",
    desc: "A nearby professional receives the push request and starts journey. You receive tracking notifications, secure credentials validation, and expected arrival codes.",
    icon: <CarFront size={20} />
  },
  {
    num: 6,
    label: "Execute",
    title: "Step 6: Executed Safely & Cleanly",
    desc: "The verified professional completes the task, handles surrounding areas with tidiness guidelines, and submits completed job metrics details.",
    icon: <CheckCircle2 size={20} />
  },
  {
    num: 7,
    label: "Pay",
    title: "Step 7: Escrow Release & Review",
    desc: "Verify that work meets standards, unlock direct payment transfers, and rate experience levels across reliability, cleanliness, and value pricing.",
    icon: <Wallet size={20} />
  }
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="how-it-works">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-heading font-extrabold mb-4 text-foreground"
        >
          Simplicity in <span className="text-gradient">Action</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg"
        >
          Seven intuitive steps connecting a customer needing assistance to a local expert executing the task perfectly.
        </motion.p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Stepper Navigation */}
        <div className="flex justify-between border-b border-white/5 pb-4 overflow-x-auto gap-8 hide-scrollbar">
          {steps.map(step => (
            <button 
              key={step.num} 
              onClick={() => setActiveStep(step.num)} 
              className={`flex flex-col items-center gap-2 cursor-pointer pb-3 shrink-0 border-b-2 transition-all duration-300 ${activeStep === step.num ? "border-brand-indigo text-foreground" : "border-transparent text-muted-foreground hover:text-foreground/80"}`}
            >
              <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${activeStep === step.num ? "bg-brand-indigo text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]" : "bg-white/5 text-muted-foreground"}`}>
                {step.icon}
              </span>
              <span className="text-xs font-semibold whitespace-nowrap">{step.label}</span>
            </button>
          ))}
        </div>

        {/* Step Card Content */}
        <div className="glass-panel-glow p-8 md:p-12 overflow-hidden relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-12 items-center h-full"
            >
              <div>
                <h3 className="text-3xl font-bold mb-4">{steps[activeStep - 1].title}</h3>
                <p className="text-muted-foreground text-base mb-8 leading-relaxed max-w-md">
                  {steps[activeStep - 1].desc}
                </p>
                <div className="flex gap-2">
                  {steps.map(step => (
                    <button 
                      key={step.num}
                      onClick={() => setActiveStep(step.num)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeStep === step.num ? "w-8 bg-brand-indigo" : "w-2 bg-white/10 hover:bg-white/20"}`}
                      aria-label={`Go to step ${step.num}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end">
                {/* Simulated Phone screen */}
                <div className="w-[260px] h-[480px] bg-[#080B11] border-[8px] border-[#18181B] rounded-[36px] shadow-2xl relative overflow-hidden shrink-0 flex flex-col">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[18px] bg-[#18181B] rounded-b-xl z-20"></div>
                  
                  {/* Dynamic Content Based on Step */}
                  <div className="w-full flex-1 pt-8 px-4 pb-4 flex flex-col relative z-10">
                    
                    {activeStep === 1 && (
                      <div className="animate-in fade-in zoom-in duration-500">
                        <div className="flex items-center gap-3 mb-6">
                          <ChevronLeft size={20} className="text-muted-foreground" />
                          <span className="font-semibold text-sm">Find Services</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-muted-foreground flex items-center gap-2 mb-6">
                          <Search size={14} /> Search services...
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-brand-indigo/20 border border-brand-indigo/30 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-brand-indigo">
                            <Plug size={24} />
                            <span className="text-xs font-semibold">Electrical</span>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <Droplets size={24} />
                            <span className="text-xs font-medium">Plumbing</span>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <Wrench size={24} />
                            <span className="text-xs font-medium">Mechanic</span>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <Hammer size={24} />
                            <span className="text-xs font-medium">Carpentry</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeStep !== 1 && (
                      <div className="flex items-center justify-center h-full text-muted-foreground text-sm text-center px-4 animate-in fade-in duration-500">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2">
                            {steps[activeStep - 1].icon}
                          </div>
                          <p>Interactive mock for <strong className="text-foreground">{steps[activeStep - 1].label}</strong> flow.</p>
                        </div>
                      </div>
                    )}
                    
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
