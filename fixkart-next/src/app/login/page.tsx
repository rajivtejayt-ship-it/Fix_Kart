"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/lib/auth";

type Mode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
          throw new Error(
            "Password must be at least 8 characters with uppercase and lowercase letters."
          );
        }
        await authService.registerWithEmail(email, password, displayName, "customer");
      } else {
        await authService.loginWithEmail(email, password);
      }

      window.dispatchEvent(new Event("fk-auth-change"));
      router.push("/workers");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel-glow max-w-md w-full p-8"
      >
        <h1 className="text-2xl font-heading font-extrabold text-foreground mb-2 text-center">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {mode === "login"
            ? "Sign in to book verified local professionals."
            : "Register as a customer to book services on FixKart."}
        </p>

        <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              mode === "login"
                ? "bg-brand-indigo text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LogIn size={14} />
            Login
          </button>
          <button
            type="button"
            onClick={() => { setMode("register"); setError(""); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              mode === "register"
                ? "bg-brand-indigo text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserPlus size={14} />
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Full Name
              </label>
              <div className="relative">
                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-indigo/50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Email
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-indigo/50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "register" ? "Min 8 chars, upper & lower" : "Min 6 characters"}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-indigo/50"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-indigo to-brand-blue rounded-xl h-11"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Want to offer services?{" "}
          <Link href="/join" className="text-brand-indigo hover:underline">
            Join as Partner
          </Link>
        </p>

        {mode === "login" && (
          <p className="text-[11px] text-muted-foreground text-center mt-3">
            Admin access: use an email containing &quot;admin&quot;
          </p>
        )}
      </motion.div>
    </div>
  );
}
