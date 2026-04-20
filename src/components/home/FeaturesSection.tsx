import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Bot, Megaphone, BarChart3, ArrowLeftRight, Workflow, Globe } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Agent Builder",
    description: "Design intelligent voice agents with a visual node graph. Choose from 40+ voices across 20+ languages.",
    large: true,
  },
  {
    icon: Megaphone,
    title: "Campaign Manager",
    description: "Upload contacts, set schedules, and launch campaigns that scale to millions of calls.",
    large: true,
  },
  {
    icon: BarChart3,
    title: "Live Monitoring",
    description: "Watch every call in real time. Read live transcripts. Intervene when it matters.",
    large: false,
  },
  {
    icon: ArrowLeftRight,
    title: "Human Transfer",
    description: "Transfer instantly to a human agent with full context preserved.",
    large: false,
  },
  {
    icon: Workflow,
    title: "Workflow Triggers",
    description: "Auto-update CRM, send WhatsApp, create tickets — one call triggers it all.",
    large: false,
  },
  {
    icon: Globe,
    title: "20+ Languages",
    description: "ASR + TTS + NLP fine-tuned for Indian accents, dialects, and regional vocabulary.",
    large: false,
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-16 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="mb-4 inline-block rounded-full bg-indigo-light px-4 py-1.5 text-xs font-semibold text-indigo">
            Features
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Everything You Need to Scale
            <br />
            <span className="text-text-muted">Voice Operations</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className={`gradient-border group cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg ${
                  feature.large ? "lg:col-span-2" : ""
                }`}
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-indigo-light p-3">
                  <Icon className="h-6 w-6 text-indigo" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
