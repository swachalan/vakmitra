import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Check, X, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹4,999",
    period: "/month",
    description: "For small teams getting started with AI calling",
    features: [
      { text: "5,000 AI minutes", included: true },
      { text: "10 concurrent calls", included: true },
      { text: "3 AI agents", included: true },
      { text: "5 languages", included: true },
      { text: "Human transfer", included: true },
      { text: "Workflow triggers", included: false },
      { text: "API access", included: false },
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₹14,999",
    period: "/month",
    description: "For growing businesses scaling voice operations",
    badge: "Most Popular",
    features: [
      { text: "25,000 AI minutes", included: true },
      { text: "50 concurrent calls", included: true },
      { text: "20 AI agents", included: true },
      { text: "15 languages", included: true },
      { text: "Human transfer", included: true },
      { text: "Workflow triggers", included: true },
      { text: "API access", included: true },
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with custom needs",
    features: [
      { text: "Unlimited AI minutes", included: true },
      { text: "Custom concurrency", included: true },
      { text: "Unlimited AI agents", included: true },
      { text: "All 20+ languages", included: true },
      { text: "Human transfer", included: true },
      { text: "Workflow triggers", included: true },
      { text: "Dedicated CSM & 99.99% SLA", included: true },
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
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
            Pricing
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-text-muted">Built for Indian scale. No hidden fees.</p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl border p-8 transition-shadow duration-300 ${
                plan.highlighted
                  ? "gradient-border border-transparent shadow-lg"
                  : "border-border bg-card shadow-sm hover:shadow-md"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-indigo px-4 py-1 text-xs font-semibold text-primary-foreground">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-text-muted">{plan.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-text-muted">{plan.period}</span>
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm">
                    {f.included ? (
                      <Check className="h-4 w-4 shrink-0 text-success" />
                    ) : (
                      <X className="h-4 w-4 shrink-0 text-text-muted/40" />
                    )}
                    <span className={f.included ? "text-text-secondary" : "text-text-muted/60"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-indigo text-primary-foreground shadow-md hover:shadow-lg hover:brightness-110"
                    : "border border-border bg-card text-foreground hover:bg-surface-alt"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
