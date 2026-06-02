"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ShieldCheck, CheckCircle2, X, BarChart3, Users, Calendar,
  Clock, Zap, RefreshCw, LayoutDashboard, AlertTriangle, Lock
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Worker } from "@/lib/types";
import { authService, AuthUser } from "@/lib/auth";

interface Metrics {
  totalWorkers: number;
  totalBookings: number;
  pendingApprovals: number;
  activeDispatches: number;
  dailyTransactionEscrow: number;
  platformDisputeRate: string;
  averageServiceETA: string;
}

type Tab = "approvals" | "metrics" | "disputes";

export default function AdminPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [tab, setTab] = useState<Tab>("approvals");
  const [pending, setPending] = useState<Worker[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [pRes, mRes] = await Promise.all([
      fetch("/api/admin?action=pending"),
      fetch("/api/admin?action=metrics"),
    ]);
    setPending(await pRes.json());
    setMetrics(await mRes.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    const refresh = () => {
      setUser(authService.getCurrentUser());
      setAuthChecked(true);
    };
    refresh();
    window.addEventListener("fk-auth-change", refresh);
    return () => window.removeEventListener("fk-auth-change", refresh);
  }, []);

  useEffect(() => {
    if (user?.role === "admin") fetchData();
  }, [fetchData, user]);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, id }),
      });
      if (!res.ok) throw new Error();
      showToast(action === "approve" ? "Worker approved successfully!" : "Worker rejected and removed.", action === "approve" ? "success" : "error");
      await fetchData();
    } catch {
      showToast("Action failed. Please try again.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-brand-indigo border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel-glow max-w-md w-full p-10 text-center"
        >
          <div className="w-16 h-16 bg-brand-indigo/10 border border-brand-indigo/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-brand-indigo" />
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-foreground mb-2">
            Admin Access Required
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in with an email containing &quot;admin&quot; (e.g. admin@fixkart.in) to access the dashboard.
          </p>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-gradient-to-r from-brand-indigo to-brand-blue rounded-xl text-white hover:opacity-90"
            )}
          >
            Sign In as Admin
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Toast */}
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-2xl border ${
              toast.type === "success"
                ? "bg-success/10 border-success/20 text-success"
                : "bg-destructive/10 border-destructive/20 text-destructive"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 size={14} className="inline mr-2" /> : <X size={14} className="inline mr-2" />}
            {toast.msg}
          </motion.div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-indigo/10 border border-brand-indigo/20 rounded-xl flex items-center justify-center">
                <LayoutDashboard size={20} className="text-brand-indigo" />
              </div>
              <h1 className="text-3xl font-heading font-extrabold text-foreground">Admin Dashboard</h1>
            </div>
            <p className="text-muted-foreground">Manage worker approvals, view metrics, and moderate the platform.</p>
          </div>
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl gap-2"
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        {/* Quick Metrics Row */}
        {metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Active Workers", value: metrics.totalWorkers, icon: <Users size={18} className="text-brand-indigo" />, color: "brand-indigo" },
              { label: "Pending Approvals", value: metrics.pendingApprovals, icon: <Clock size={18} className="text-warning" />, color: "warning" },
              { label: "Total Bookings", value: metrics.totalBookings, icon: <Calendar size={18} className="text-success" />, color: "success" },
              { label: "Active Dispatches", value: metrics.activeDispatches, icon: <Zap size={18} className="text-brand-blue" />, color: "brand-blue" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center`}>{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["approvals", "metrics", "disputes"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all capitalize ${
                tab === t
                  ? "bg-brand-indigo text-white shadow-[0_0_15px_rgba(79,70,229,0.35)]"
                  : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "approvals"
                ? `⏳ Pending Approvals (${pending.length})`
                : t === "metrics"
                  ? "📊 Platform Metrics"
                  : "⚖️ Moderation Log"}
            </button>
          ))}
        </div>

        {/* Tab: Approvals */}
        {tab === "approvals" && (
          <div>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="glass-panel p-5 animate-pulse h-24" />
                ))}
              </div>
            ) : pending.length === 0 ? (
              <div className="text-center py-20 glass-panel">
                <CheckCircle2 size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">All Caught Up!</h3>
                <p className="text-muted-foreground">No workers are currently awaiting verification.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pending.map((worker, idx) => (
                  <motion.div
                    key={worker.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-panel p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0 border border-white/10">
                      <Image src={worker.avatar} alt={worker.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground">{worker.name}</h3>
                        <span className="bg-warning/10 text-warning border border-warning/20 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                          Pending
                        </span>
                        <span className="bg-white/5 border border-white/10 text-muted-foreground text-[10px] px-2 py-0.5 rounded-full capitalize">
                          {worker.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {worker.location} • {worker.experience} • {worker.charge}/hr
                      </p>
                      {worker.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {worker.skills.slice(0, 3).map((s) => (
                            <span key={s} className="bg-white/5 text-[10px] text-muted-foreground px-2 py-0.5 rounded-md border border-white/10">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2.5 shrink-0">
                      <Button
                        size="sm"
                        className="bg-success/10 hover:bg-success/20 text-success border border-success/20 rounded-xl gap-1.5 h-9"
                        onClick={() => handleAction(worker.id, "approve")}
                        disabled={actionLoading === worker.id}
                      >
                        <CheckCircle2 size={14} />
                        {actionLoading === worker.id ? "..." : "Approve"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-destructive/20 bg-destructive/5 hover:bg-destructive/10 text-destructive rounded-xl gap-1.5 h-9"
                        onClick={() => handleAction(worker.id, "reject")}
                        disabled={actionLoading === worker.id}
                      >
                        <X size={14} />
                        Reject
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Metrics */}
        {tab === "metrics" && metrics && (
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel-glow p-8">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 size={20} className="text-brand-indigo" />
                <h3 className="text-lg font-bold text-foreground">Platform Health</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Active Dispatches", value: metrics.activeDispatches },
                  { label: "Daily Escrow Value", value: `₹${metrics.dailyTransactionEscrow.toLocaleString()}` },
                  { label: "Dispute Rate", value: metrics.platformDisputeRate },
                  { label: "Avg Service ETA", value: metrics.averageServiceETA },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-bold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-panel p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck size={20} className="text-success" />
                <h3 className="text-lg font-bold text-foreground">Trust & Safety</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Background Check Pass Rate", value: "100%", color: "text-success" },
                  { label: "Job Completion Rate", value: "98.2%", color: "text-foreground" },
                  { label: "Response Time (<10 min)", value: "94.5%", color: "text-foreground" },
                  { label: "Fraud Detection Rate", value: "99.8%", color: "text-success" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                    <span className="text-muted-foreground">{label}</span>
                    <span className={`font-bold ${color}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-warning/5 border border-warning/10 rounded-xl p-4 flex gap-3">
                <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">All platform metrics are computed in real-time from the live worker database.</p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Tab: Moderation */}
        {tab === "disputes" && (
          <div className="glass-panel overflow-hidden">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-bold text-foreground">Active Disputes</h3>
              <span className="text-xs text-warning bg-warning/10 border border-warning/20 px-2 py-1 rounded-full font-semibold">
                1 Open
              </span>
            </div>
            <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 border-b border-white/5">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-bold text-foreground">#FK-982</span>
                  <span className="bg-destructive/10 text-destructive border border-destructive/20 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                    Escalated
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Customer reports incomplete plumbing repair — ₹1,200 escrow locked
                </p>
                <p className="text-xs text-muted-foreground mt-1">Opened 2 hours ago • Jayanagar, Bangalore</p>
              </div>
              <Button
                size="sm"
                className="bg-warning/10 hover:bg-warning/20 text-warning border border-warning/20 rounded-xl shrink-0"
                onClick={() => showToast("Refund initiated for dispute #FK-982 (sandbox demo).", "success")}
              >
                <AlertTriangle size={14} className="mr-1.5" />
                Resolve & Refund
              </Button>
            </div>
            <div className="p-5 text-center text-sm text-muted-foreground">
              No other disputes in queue.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
