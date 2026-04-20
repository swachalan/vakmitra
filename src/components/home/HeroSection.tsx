import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Play, ArrowRight, Shield, Clock, CreditCard, IndianRupee } from "lucide-react";

const cyclingPhrases = [
  "Recovers Payments",
  "Books Appointments",
  "Qualifies Leads",
  "Handles Support",
];

export function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % cyclingPhrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen mesh-gradient flex items-center pt-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-light px-4 py-1.5 text-xs font-semibold text-indigo">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo animate-pulse" />
              Now supporting 20+ Indian languages
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-7xl"
          >
            AI That Calls, Closes &{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">
                Converts
              </span>
            </span>
            <br />
            <span className="text-text-muted text-3xl sm:text-4xl lg:text-5xl">
              In Every Indian Language
            </span>
          </motion.h1>

          {/* Cycling phrase */}
          <motion.div variants={fadeUp} className="mt-6 h-10 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 text-xl font-semibold text-indigo sm:text-2xl">
              <span className="h-2 w-2 rounded-full bg-indigo animate-pulse" />
              <motion.span
                key={phraseIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {cyclingPhrases[phraseIndex]}
              </motion.span>
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            Deploy AI voice agents that speak Hindi, Tamil, Telugu & 17 more languages.
            Launch campaigns in minutes. Scale to millions of calls.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button className="group inline-flex items-center gap-2 rounded-2xl bg-indigo px-8 py-4 text-base font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110">
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-8 py-4 text-base font-semibold text-foreground shadow-sm transition-all hover:shadow-md">
              <Play className="h-4 w-4 text-indigo" />
              Watch 2-min Demo
            </button>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-muted"
          >
            {[
              { icon: CreditCard, text: "No credit card required" },
              { icon: Shield, text: "SOC 2 Compliant" },
              { icon: Shield, text: "DPDP Ready" },
              { icon: IndianRupee, text: "₹0 setup fee" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" />
                {text}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero visual - floating dashboard mockup */}
        <motion.div
          className="mx-auto mt-16 max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="rounded-2xl border border-border bg-card p-2 shadow-lg">
            <div className="rounded-xl bg-surface-alt p-6">
              {/* Mock dashboard header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="h-3 w-3 rounded-full bg-danger" />
                <div className="h-3 w-3 rounded-full bg-gold" />
                <div className="h-3 w-3 rounded-full bg-success" />
                <div className="ml-4 h-4 w-48 rounded skeleton-shimmer" />
              </div>
              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Active Calls", value: "147", color: "text-indigo" },
                  { label: "Success Rate", value: "94.2%", color: "text-success" },
                  { label: "Calls Today", value: "3,847", color: "text-cyan" },
                  { label: "Avg Duration", value: "2m 34s", color: "text-gold" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-card p-4 shadow-sm">
                    <p className="text-xs text-text-muted">{stat.label}</p>
                    <p className={`font-display text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
