import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Check, X, ArrowRight, ChevronDown, Minus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — VakMithra AI" },
      { name: "description", content: "Simple, transparent pricing built for Indian scale. Plans starting at ₹4,999/month." },
      { property: "og:title", content: "Pricing — VakMithra AI" },
      { property: "og:description", content: "AI voice calling plans starting at ₹4,999/month." },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Starter",
    monthlyPrice: 4999,
    yearlyPrice: 3999,
    description: "For small teams getting started with AI calling",
    features: [
      { text: "5,000 AI minutes/month", included: true },
      { text: "10 concurrent calls", included: true },
      { text: "3 AI agents", included: true },
      { text: "5 languages", included: true },
      { text: "Human transfer", included: true },
      { text: "Basic live monitoring", included: true },
      { text: "Email support", included: true },
      { text: "Workflow triggers", included: false },
      { text: "API access", included: false },
      { text: "Dedicated CSM", included: false },
    ],
    cta: "Start Free Trial",
    ctaLink: "/demo",
    highlighted: false,
  },
  {
    name: "Growth",
    monthlyPrice: 14999,
    yearlyPrice: 11999,
    description: "For growing businesses scaling voice operations",
    badge: "Most Popular",
    features: [
      { text: "25,000 AI minutes/month", included: true },
      { text: "50 concurrent calls", included: true },
      { text: "20 AI agents", included: true },
      { text: "15 languages", included: true },
      { text: "Human transfer", included: true },
      { text: "Advanced live monitoring", included: true },
      { text: "Priority support", included: true },
      { text: "Workflow triggers", included: true },
      { text: "Full API access", included: true },
      { text: "Dedicated CSM", included: false },
    ],
    cta: "Start Free Trial",
    ctaLink: "/demo",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "For large organizations with custom needs",
    features: [
      { text: "Unlimited AI minutes", included: true },
      { text: "Custom concurrency", included: true },
      { text: "Unlimited AI agents", included: true },
      { text: "All 20+ languages", included: true },
      { text: "Human transfer", included: true },
      { text: "Enterprise monitoring + analytics", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Workflow triggers", included: true },
      { text: "Full API + webhooks", included: true },
      { text: "Dedicated CSM + SLA 99.99%", included: true },
    ],
    cta: "Contact Sales",
    ctaLink: "/contact",
    highlighted: false,
  },
];

const addons = [
  { name: "Extra 5,000 minutes", price: "₹3,499", description: "Top up your monthly AI minutes" },
  { name: "Additional language pack", price: "₹999/lang", description: "Add any supported language" },
  { name: "White-labeling", price: "₹9,999/mo", description: "Custom branding for your AI agents" },
  { name: "Dedicated phone numbers", price: "₹499/num", description: "Custom caller ID numbers" },
];

const comparisonFeatures = [
  { category: "Core Features", items: [
    { name: "AI Minutes/month", starter: "5,000", growth: "25,000", enterprise: "Unlimited" },
    { name: "Concurrent Calls", starter: "10", growth: "50", enterprise: "Custom" },
    { name: "AI Agents", starter: "3", growth: "20", enterprise: "Unlimited" },
    { name: "Languages", starter: "5", growth: "15", enterprise: "All 20+" },
  ]},
  { category: "Calling Features", items: [
    { name: "Outbound Calls", starter: true, growth: true, enterprise: true },
    { name: "Inbound Call Handling", starter: false, growth: true, enterprise: true },
    { name: "Human Transfer", starter: true, growth: true, enterprise: true },
    { name: "Call Recording", starter: true, growth: true, enterprise: true },
    { name: "Live Transcription", starter: false, growth: true, enterprise: true },
    { name: "Sentiment Analysis", starter: false, growth: true, enterprise: true },
  ]},
  { category: "Automation", items: [
    { name: "Workflow Triggers", starter: false, growth: true, enterprise: true },
    { name: "CRM Integration", starter: false, growth: true, enterprise: true },
    { name: "WhatsApp Triggers", starter: false, growth: true, enterprise: true },
    { name: "Custom Webhooks", starter: false, growth: true, enterprise: true },
    { name: "Zapier/Make.com", starter: false, growth: true, enterprise: true },
  ]},
  { category: "Support & SLA", items: [
    { name: "Email Support", starter: true, growth: true, enterprise: true },
    { name: "Priority Support", starter: false, growth: true, enterprise: true },
    { name: "Dedicated CSM", starter: false, growth: false, enterprise: true },
    { name: "Uptime SLA", starter: "99.5%", growth: "99.9%", enterprise: "99.99%" },
    { name: "Onboarding Support", starter: "Self-serve", growth: "Guided", enterprise: "White-glove" },
  ]},
];

const faqs = [
  { q: "Is GST included in the pricing?", a: "All prices shown are exclusive of GST. 18% GST will be added at checkout as per Indian tax regulations." },
  { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, and downgrades apply at the next billing cycle." },
  { q: "What happens if I exceed my AI minutes?", a: "You'll receive a notification at 80% and 100% usage. Beyond your limit, calls will use overage minutes at ₹0.85/minute for Starter and ₹0.70/minute for Growth." },
  { q: "Is there a free trial?", a: "Yes! Both Starter and Growth plans come with a 14-day free trial with 500 AI minutes included. No credit card required to start." },
  { q: "What's your refund policy?", a: "We offer a 30-day money-back guarantee on all plans. If you're not satisfied, we'll issue a full refund — no questions asked." },
  { q: "Do you offer annual contracts?", a: "Yes, annual billing saves you 20% compared to monthly. You can switch to annual billing at any time from your account settings." },
  { q: "Can I add more AI agents?", a: "You can add extra agents beyond your plan limit at ₹499/agent/month. Enterprise plans include unlimited agents." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, net banking, and wire transfers for Enterprise plans. All payments are processed securely via Razorpay." },
  { q: "Is there a setup fee?", a: "No setup fees on any plan. You can go from sign-up to your first AI call in under 3 minutes." },
  { q: "Do you offer discounts for startups?", a: "Yes! We have a Startup Program offering 50% off for the first 6 months for qualified early-stage startups. Contact our sales team to apply." },
  { q: "How does concurrent call limiting work?", a: "Concurrent calls is the maximum number of AI calls that can be active simultaneously. If the limit is reached, new calls queue until a slot opens." },
  { q: "Can I get a custom plan?", a: "Absolutely. Enterprise plans are fully customizable. Contact our sales team to discuss your specific requirements." },
];

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-success mx-auto" />;
  if (value === false) return <Minus className="h-4 w-4 text-text-muted/30 mx-auto" />;
  return <span className="text-xs font-medium text-foreground">{value}</span>;
}

function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [sliderValue, setSliderValue] = useState(5000);

  const getRecommendedPlan = (calls: number) => {
    if (calls <= 5000) return "Starter";
    if (calls <= 25000) return "Growth";
    return "Enterprise";
  };

  const getEstimatedCost = (calls: number) => {
    if (calls <= 5000) return annual ? 3999 : 4999;
    if (calls <= 25000) return annual ? 11999 : 14999;
    return null;
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="mesh-gradient py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center rounded-full bg-indigo-light px-4 py-1.5 text-xs font-semibold text-indigo mb-6">Pricing</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-text-secondary">
              Built for Indian scale. No hidden fees. No surprises.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Toggle + Cards */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          {/* Billing toggle */}
          <motion.div className="flex justify-center mb-12" variants={fadeUp} initial="hidden" animate="visible">
            <div className="flex items-center gap-3 rounded-full bg-surface-alt p-1 border border-border">
              <button
                onClick={() => setAnnual(false)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${!annual ? "bg-indigo text-primary-foreground shadow-sm" : "text-text-muted"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${annual ? "bg-indigo text-primary-foreground shadow-sm" : "text-text-muted"}`}
              >
                Annual
                <span className="ml-2 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">Save 20%</span>
              </button>
            </div>
          </motion.div>

          {/* Plan cards */}
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {plans.map((plan) => {
              const price = plan.monthlyPrice === 0 ? null : annual ? plan.yearlyPrice : plan.monthlyPrice;
              const originalPrice = annual && plan.monthlyPrice > 0 ? plan.monthlyPrice : null;
              const savings = annual && plan.monthlyPrice > 0 ? (plan.monthlyPrice - plan.yearlyPrice) * 12 : 0;

              return (
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

                  <div className="mt-6">
                    {price !== null ? (
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl font-bold text-foreground">₹{price.toLocaleString("en-IN")}</span>
                        <span className="text-sm text-text-muted">/month</span>
                      </div>
                    ) : (
                      <span className="font-display text-4xl font-bold text-foreground">Custom</span>
                    )}
                    {originalPrice && (
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm text-text-muted line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
                        <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                          Save ₹{savings.toLocaleString("en-IN")}/yr
                        </span>
                      </div>
                    )}
                  </div>

                  <ul className="mt-8 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-3 text-sm">
                        {f.included ? (
                          <Check className="h-4 w-4 shrink-0 text-success" />
                        ) : (
                          <X className="h-4 w-4 shrink-0 text-text-muted/30" />
                        )}
                        <span className={f.included ? "text-text-secondary" : "text-text-muted/50"}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={plan.ctaLink}
                    className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                      plan.highlighted
                        ? "bg-indigo text-primary-foreground shadow-md hover:shadow-lg hover:brightness-110"
                        : "border border-border bg-card text-foreground hover:bg-surface-alt"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-surface-alt">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">Add-Ons</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {addons.map((addon) => (
              <div key={addon.name} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <p className="font-display text-sm font-bold text-foreground">{addon.name}</p>
                <p className="mt-1 text-xs text-text-muted">{addon.description}</p>
                <p className="mt-3 font-display text-lg font-bold text-indigo">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Calculator */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">Usage Calculator</h2>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-md">
            <label className="text-sm font-medium text-foreground">Monthly Call Volume</label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="mt-4 w-full accent-indigo"
            />
            <p className="mt-2 font-display text-3xl font-bold text-indigo">
              {sliderValue.toLocaleString("en-IN")} <span className="text-base text-text-muted font-normal">calls/month</span>
            </p>
            <div className="mt-6 rounded-xl bg-indigo-light p-4">
              <p className="text-sm text-indigo font-semibold">
                Recommended: <span className="font-bold">{getRecommendedPlan(sliderValue)}</span>
              </p>
              {getEstimatedCost(sliderValue) && (
                <p className="text-xs text-text-muted mt-1">
                  Estimated cost: ₹{getEstimatedCost(sliderValue)!.toLocaleString("en-IN")}/month
                </p>
              )}
              {!getEstimatedCost(sliderValue) && (
                <p className="text-xs text-text-muted mt-1">Contact sales for custom pricing</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-surface-alt">
        <div className="mx-auto max-w-5xl px-6">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="mx-auto flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm hover:shadow-md transition-all"
          >
            {showComparison ? "Hide" : "Show"} Full Feature Comparison
            <ChevronDown className={`h-4 w-4 transition-transform ${showComparison ? "rotate-180" : ""}`} />
          </button>

          {showComparison && (
            <motion.div
              className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-alt">
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Feature</th>
                    <th className="px-4 py-4 text-center font-semibold text-text-muted">Starter</th>
                    <th className="px-4 py-4 text-center font-semibold text-indigo">Growth</th>
                    <th className="px-4 py-4 text-center font-semibold text-text-muted">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((cat) => (
                    <>
                      <tr key={cat.category}>
                        <td colSpan={4} className="px-6 py-3 text-xs font-bold text-indigo bg-indigo-light/50">
                          {cat.category}
                        </td>
                      </tr>
                      {cat.items.map((item) => (
                        <tr key={item.name} className="border-b border-border/50">
                          <td className="px-6 py-3 text-foreground">{item.name}</td>
                          <td className="px-4 py-3 text-center"><CellValue value={item.starter} /></td>
                          <td className="px-4 py-3 text-center"><CellValue value={item.growth} /></td>
                          <td className="px-4 py-3 text-center"><CellValue value={item.enterprise} /></td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  className="flex w-full items-center justify-between py-5 text-left"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${expandedFaq === i ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: expandedFaq === i ? "auto" : 0, opacity: expandedFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-sm leading-relaxed text-text-muted">{faq.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
