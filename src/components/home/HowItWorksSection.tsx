import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { UserPlus, Rocket, Eye, Zap } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create Your AI Agent",
    description: "Upload your script, select a voice and language, set the persona and goal.",
  },
  {
    icon: Rocket,
    number: "02",
    title: "Launch a Campaign",
    description: "Upload contacts, set your calling window, and let the AI do the rest.",
  },
  {
    icon: Eye,
    number: "03",
    title: "Monitor Live",
    description: "Watch calls in real time, read transcripts, intervene when needed.",
  },
  {
    icon: Zap,
    number: "04",
    title: "Trigger Workflows",
    description: "Auto-update CRM, send WhatsApp, create tickets — all automatically.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-surface-alt py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-16 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="mb-4 inline-block rounded-full bg-indigo-light px-4 py-1.5 text-xs font-semibold text-indigo">
            How It Works
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Go Live in Under 3 Minutes
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="relative rounded-2xl bg-card p-6 shadow-sm border border-border"
              >
                <span className="font-display text-5xl font-bold text-indigo/10">
                  {step.number}
                </span>
                <div className="mt-2 mb-3 inline-flex rounded-xl bg-indigo-light p-3">
                  <Icon className="h-5 w-5 text-indigo" />
                </div>
                <h3 className="mb-2 font-display text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
