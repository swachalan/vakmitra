import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, slideLeft, slideRight } from "@/lib/animations";
import {
  Bot, Megaphone, BarChart3, ArrowLeftRight, Workflow, Globe,
  ArrowRight, CheckCircle2, Zap, Shield, Clock, ChevronDown,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — VakMithra AI" },
      { name: "description", content: "Explore VakMithra AI features: AI Agent Builder, Campaign Manager, Live Monitoring, Human Transfer, Workflow Triggers, and 20+ Indian languages." },
      { property: "og:title", content: "Features — VakMithra AI" },
      { property: "og:description", content: "Complete AI voice calling platform features for enterprise India." },
    ],
  }),
  component: FeaturesPage,
});

const featureDeepDives = [
  {
    icon: Bot,
    title: "AI Agent Builder",
    subtitle: "Design Intelligent Voice Agents Visually",
    description: "Choose from 40+ AI voices across 20 languages. Give your agent a name, a persona, and a goal. Build complex conversation flows with our visual node graph — no code required.",
    highlights: [
      "40+ natural-sounding AI voices",
      "Visual drag-and-drop conversation flow editor",
      "Custom persona, tone, and goal configuration",
      "Built-in intent recognition and slot filling",
    ],
    visual: "builder",
  },
  {
    icon: Megaphone,
    title: "Campaign Manager",
    subtitle: "Launch Campaigns That Scale to Millions",
    description: "Upload 10,000 contacts. Set your calling window. Let the AI do the rest. Track every campaign with real-time progress bars, success rates, and detailed analytics.",
    highlights: [
      "CSV and API-based contact upload",
      "Time-zone aware scheduling (IST optimized)",
      "Real-time progress tracking per campaign",
      "Auto-retry on busy, no-answer, and voicemail",
    ],
    visual: "campaign",
  },
  {
    icon: BarChart3,
    title: "Live Monitoring",
    subtitle: "See Every Call. Read Every Transcript. Act Instantly.",
    description: "Watch every live call with real-time sentiment analysis. Read live transcripts as they happen. Jump into any call when the situation demands human attention.",
    highlights: [
      "Real-time call sentiment indicators (green/amber/red)",
      "Live transcript streaming for every active call",
      "One-click 'Join Call' for supervisor override",
      "Per-agent performance dashboards",
    ],
    visual: "monitoring",
  },
  {
    icon: ArrowLeftRight,
    title: "Human Call Transfer",
    subtitle: "Seamless Handoff with Full Context",
    description: "When the situation calls for a human touch, transfer instantly. The receiving agent gets a full context card — caller name, reason, sentiment score, and complete transcript.",
    highlights: [
      "Sub-second warm transfer to human agents",
      "Full context card with transcript and sentiment",
      "Configurable transfer triggers and rules",
      "Queue management and priority routing",
    ],
    visual: "transfer",
  },
  {
    icon: Workflow,
    title: "Agentic Workflow Triggers",
    subtitle: "One Call Triggers an Entire Business Workflow",
    description: "After every call, automatically update your CRM, send a WhatsApp message, create a support ticket, trigger an email, or update a Google Sheet. No manual steps. No missed follow-ups.",
    highlights: [
      "Post-call CRM auto-update (Salesforce, HubSpot, Zoho)",
      "WhatsApp Business API integration",
      "Support ticket creation (Freshdesk, Zendesk)",
      "Custom webhook triggers for any system",
    ],
    visual: "workflow",
  },
  {
    icon: Globe,
    title: "Multilingual Engine",
    subtitle: "ASR + TTS + NLP — Fine-Tuned for India",
    description: "Our speech engine is purpose-built for Indian accents, dialects, and regional vocabulary. Support for Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Malayalam, Gujarati, Punjabi, Odia, and more.",
    highlights: [
      "98%+ accuracy across all supported languages",
      "Dialect-aware speech recognition",
      "Natural prosody in text-to-speech output",
      "Code-switching support (Hindi-English, Tamil-English)",
    ],
    visual: "multilingual",
  },
];

const integrations = [
  "Salesforce", "HubSpot", "Zoho CRM", "WhatsApp Business", "Slack", "Zapier",
  "Make.com", "Google Sheets", "Freshdesk", "Razorpay", "Tata Tele", "Airtel Business",
  "Zendesk", "Pipedrive", "Microsoft Teams", "Twilio", "Exotel", "Knowlarity",
  "LeadSquared", "Kapture CX", "Intercom", "Segment", "Webhook", "REST API",
];

const techSpecs = [
  { q: "End-to-End Latency", a: "Under 800ms from speech input to AI response, including ASR, NLP processing, and TTS generation. Optimized for Indian telecom infrastructure." },
  { q: "Uptime SLA", a: "99.9% uptime SLA on Growth plan, 99.99% on Enterprise. Geo-redundant infrastructure across Mumbai and Chennai data centers." },
  { q: "API Rate Limits", a: "Growth: 1,000 requests/minute. Enterprise: Custom limits up to 50,000 req/min. All endpoints return standard rate limit headers." },
  { q: "Audio Formats", a: "Input: WAV, MP3, OGG, FLAC (8kHz–48kHz). Output: WAV (16-bit PCM), MP3 (128kbps). Real-time streaming via WebSocket." },
  { q: "Webhook Specifications", a: "HTTPS POST with HMAC-SHA256 signature verification. Retry policy: 3 attempts with exponential backoff. Events: call.started, call.completed, call.transferred, call.failed." },
  { q: "Data Retention Policy", a: "Call recordings: 90 days (configurable up to 365 days on Enterprise). Transcripts: 180 days. Analytics data: 2 years. DPDP Act compliant deletion on request." },
];

const comparisonRows = [
  { feature: "AI-Powered Conversations", vakmithra: true, ivr: false, callcenter: false },
  { feature: "20+ Indian Languages", vakmithra: true, ivr: false, callcenter: "Limited" },
  { feature: "Sub-800ms Latency", vakmithra: true, ivr: true, callcenter: "N/A" },
  { feature: "Human-Like Voice Quality", vakmithra: true, ivr: false, callcenter: true },
  { feature: "24/7 Availability", vakmithra: true, ivr: true, callcenter: false },
  { feature: "Real-Time Sentiment Analysis", vakmithra: true, ivr: false, callcenter: false },
  { feature: "Instant Human Transfer", vakmithra: true, ivr: "Limited", callcenter: true },
  { feature: "Workflow Automation", vakmithra: true, ivr: false, callcenter: false },
  { feature: "Cost Per Call", vakmithra: "₹0.5–₹2", ivr: "₹0.3–₹1", callcenter: "₹15–₹40" },
  { feature: "Scale to 1M+ Calls/Day", vakmithra: true, ivr: true, callcenter: false },
  { feature: "Setup Time", vakmithra: "3 minutes", ivr: "2–4 weeks", callcenter: "2–3 months" },
];

function FeatureVisual({ type }: { type: string }) {
  if (type === "builder") {
    return (
      <div className="rounded-2xl border border-border bg-card p-4 shadow-md">
        <div className="flex gap-4">
          <div className="w-1/3 space-y-3">
            <div className="rounded-lg bg-indigo-light p-3">
              <p className="text-xs font-semibold text-indigo">Voice</p>
              <p className="text-xs text-text-muted mt-1">Priya (Hindi, Female)</p>
            </div>
            <div className="rounded-lg bg-surface-alt p-3">
              <p className="text-xs font-semibold text-foreground">Language</p>
              <p className="text-xs text-text-muted mt-1">Hindi (hi-IN)</p>
            </div>
            <div className="rounded-lg bg-surface-alt p-3">
              <p className="text-xs font-semibold text-foreground">Persona</p>
              <p className="text-xs text-text-muted mt-1">Friendly, Professional</p>
            </div>
          </div>
          <div className="w-2/3 rounded-lg bg-surface-alt p-4">
            <div className="space-y-3">
              {["Greeting", "Intent Detection", "Response", "Transfer"].map((node, i) => (
                <motion.div
                  key={node}
                  className="flex items-center gap-2 rounded-lg bg-card p-2 shadow-sm border border-border"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                >
                  <div className="h-2 w-2 rounded-full bg-indigo" />
                  <span className="text-xs font-medium text-foreground">{node}</span>
                  {i < 3 && <ArrowRight className="h-3 w-3 text-text-muted ml-auto" />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "campaign") {
    const campaigns = [
      { name: "Q4 Recovery Drive", status: "Running", progress: 72, success: 94 },
      { name: "Appointment Reminders", status: "Running", progress: 45, success: 98 },
      { name: "Lead Qualification", status: "Paused", progress: 100, success: 87 },
    ];
    return (
      <div className="rounded-2xl border border-border bg-card p-4 shadow-md overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-2 text-left font-semibold text-text-muted">Campaign</th>
              <th className="pb-2 text-left font-semibold text-text-muted">Status</th>
              <th className="pb-2 text-left font-semibold text-text-muted">Progress</th>
              <th className="pb-2 text-right font-semibold text-text-muted">Success</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.name} className="border-b border-border/50">
                <td className="py-3 font-medium text-foreground">{c.name}</td>
                <td className="py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c.status === "Running" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-3">
                  <div className="h-1.5 w-20 rounded-full bg-surface-alt">
                    <motion.div
                      className="h-full rounded-full bg-indigo"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.progress}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </td>
                <td className="py-3 text-right font-semibold text-success">{c.success}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === "monitoring") {
    return (
      <div className="rounded-2xl border border-border bg-card p-4 shadow-md">
        <div className="space-y-2">
          {[
            { caller: "+91 98765 XXXXX", duration: "1:42", sentiment: "green", lang: "Hindi" },
            { caller: "+91 87654 XXXXX", duration: "0:38", sentiment: "green", lang: "Tamil" },
            { caller: "+91 76543 XXXXX", duration: "2:15", sentiment: "amber", lang: "Telugu" },
          ].map((call, i) => (
            <motion.div
              key={call.caller}
              className="flex items-center justify-between rounded-lg bg-surface-alt p-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${call.sentiment === "green" ? "bg-success" : "bg-gold"}`} />
                <div>
                  <p className="text-xs font-medium text-foreground">{call.caller}</p>
                  <p className="text-[10px] text-text-muted">{call.lang} · {call.duration}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-md bg-indigo-light px-2 py-1 text-[10px] font-semibold text-indigo">Join</button>
                <button className="rounded-md bg-surface px-2 py-1 text-[10px] font-semibold text-text-muted">Transfer</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "transfer") {
    return (
      <div className="rounded-2xl border border-border bg-card p-4 shadow-md">
        <div className="flex items-center justify-between gap-2">
          {[
            { label: "AI Agent", icon: "🤖", color: "bg-indigo-light" },
            { label: "Transfer", icon: "→", color: "bg-gold/10" },
            { label: "Human Agent", icon: "👤", color: "bg-green-50" },
          ].map((step, i) => (
            <motion.div
              key={step.label}
              className={`flex-1 rounded-xl ${step.color} p-4 text-center`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl">{step.icon}</p>
              <p className="mt-2 text-xs font-semibold text-foreground">{step.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 rounded-lg bg-surface-alt p-3">
          <p className="text-[10px] font-semibold text-text-muted mb-1">Context Card Preview</p>
          <p className="text-xs text-foreground">Caller: Rahul Mehta · Reason: Loan EMI query</p>
          <p className="text-xs text-text-muted">Sentiment: Positive · Duration: 2m 15s</p>
        </div>
      </div>
    );
  }

  if (type === "workflow") {
    const nodes = ["Call Completed", "Update CRM", "Send WhatsApp", "Create Ticket", "Trigger Email"];
    return (
      <div className="rounded-2xl border border-border bg-card p-4 shadow-md">
        <div className="space-y-2">
          {nodes.map((node, i) => (
            <motion.div
              key={node}
              className={`flex items-center gap-3 rounded-lg p-3 ${i === 0 ? "bg-indigo-light" : "bg-surface-alt"}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <Zap className={`h-4 w-4 ${i === 0 ? "text-indigo" : "text-text-muted"}`} />
              <span className={`text-xs font-medium ${i === 0 ? "text-indigo" : "text-foreground"}`}>{node}</span>
              {i === 0 && <span className="ml-auto text-[10px] text-indigo font-semibold">TRIGGER</span>}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // multilingual
  const langs = [
    { code: "Hindi", script: "नमस्ते, मैं VakMithra हूँ" },
    { code: "Tamil", script: "வணக்கம், நான் VakMithra" },
    { code: "Telugu", script: "నమస్కారం, నేను VakMithra" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-md">
      <div className="space-y-3">
        {langs.map((lang, i) => (
          <motion.div
            key={lang.code}
            className="rounded-lg bg-surface-alt p-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-indigo">{lang.code}</span>
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">98.1%</span>
            </div>
            <p className="text-sm text-foreground">{lang.script}</p>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 12 }).map((_, j) => (
                <motion.div
                  key={j}
                  className="w-1 rounded-full bg-indigo/30"
                  style={{ height: 8 + Math.random() * 16 }}
                  animate={{ height: [8 + Math.random() * 16, 8 + Math.random() * 16] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror", delay: j * 0.05 }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold text-foreground">{question}</span>
        <ChevronDown className={`h-4 w-4 text-text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm leading-relaxed text-text-muted">{answer}</p>
      </motion.div>
    </div>
  );
}

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle2 className="h-4 w-4 text-success mx-auto" />;
  if (value === false) return <span className="text-text-muted/40 text-xs">✗</span>;
  return <span className="text-xs font-medium text-foreground">{value}</span>;
}

function FeaturesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="mesh-gradient py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center rounded-full bg-indigo-light px-4 py-1.5 text-xs font-semibold text-indigo mb-6">
                Features
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              The Complete AI Voice
              <br />
              <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">Calling Platform</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base text-text-secondary sm:text-lg">
              Six powerful modules that work together to automate, monitor, and optimize every voice interaction at scale.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Feature Deep Dives */}
      {featureDeepDives.map((feature, i) => {
        const Icon = feature.icon;
        const isReversed = i % 2 === 1;
        return (
          <section key={feature.title} className={`py-20 lg:py-24 ${i % 2 === 0 ? "bg-background" : "bg-surface-alt"}`}>
            <div className="mx-auto max-w-7xl px-6">
              <div className={`grid gap-12 items-center lg:grid-cols-2 ${isReversed ? "lg:direction-rtl" : ""}`}>
                <motion.div
                  className={isReversed ? "lg:order-2" : ""}
                  variants={isReversed ? slideRight : slideLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="inline-flex rounded-xl bg-indigo-light p-3 mb-4">
                    <Icon className="h-6 w-6 text-indigo" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground">{feature.title}</h2>
                  <p className="mt-1 text-lg text-indigo font-medium">{feature.subtitle}</p>
                  <p className="mt-4 text-base leading-relaxed text-text-secondary">{feature.description}</p>
                  <ul className="mt-6 space-y-3">
                    {feature.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  className={isReversed ? "lg:order-1" : ""}
                  variants={isReversed ? slideLeft : slideRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <FeatureVisual type={feature.visual} />
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Integrations */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="inline-block rounded-full bg-indigo-light px-4 py-1.5 text-xs font-semibold text-indigo mb-4">Integrations</span>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Connect With Your Stack</h2>
            <p className="mt-3 text-text-muted">Seamless integrations with 24+ tools and platforms.</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {integrations.map((name) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="flex items-center justify-center rounded-xl border border-border bg-card p-4 text-xs font-medium text-text-secondary shadow-sm transition-shadow hover:shadow-md"
              >
                {name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 lg:py-28 bg-surface-alt">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold text-foreground">Technical Specifications</h2>
          </motion.div>
          <div>
            {techSpecs.map((spec) => (
              <AccordionItem key={spec.q} question={spec.q} answer={spec.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold text-foreground">Why VakMithra AI?</h2>
            <p className="mt-3 text-text-muted">See how we compare to traditional solutions.</p>
          </motion.div>
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-alt">
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-indigo">VakMithra AI</th>
                  <th className="px-6 py-4 text-center font-semibold text-text-muted">Generic IVR</th>
                  <th className="px-6 py-4 text-center font-semibold text-text-muted">Call Center</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <motion.tr
                    key={row.feature}
                    className="border-b border-border/50"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-6 py-3 text-foreground font-medium">{row.feature}</td>
                    <td className="px-6 py-3 text-center"><CellValue value={row.vakmithra} /></td>
                    <td className="px-6 py-3 text-center"><CellValue value={row.ivr} /></td>
                    <td className="px-6 py-3 text-center"><CellValue value={row.callcenter} /></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo py-16">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo via-indigo to-cyan opacity-90 -mx-6" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-primary-foreground">Ready to See It in Action?</h2>
            <p className="mt-3 text-primary-foreground/80">Book a personalized demo and see how VakMithra AI fits your use case.</p>
            <Link to="/demo" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-card px-8 py-4 font-semibold text-indigo shadow-lg transition-all hover:shadow-xl">
              Book a Demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
