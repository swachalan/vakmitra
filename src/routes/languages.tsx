import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { CheckCircle2, ArrowRight, Mic, Volume2, Brain, Globe } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/languages")({
  head: () => ({
    meta: [
      { title: "Languages — VakMithra AI | 20+ Indian Languages" },
      { name: "description", content: "VakMithra AI supports 20+ Indian languages including Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Malayalam, Gujarati, Punjabi, and Odia." },
      { property: "og:title", content: "Languages — VakMithra AI" },
      { property: "og:description", content: "AI voice agents that speak 20+ Indian languages natively." },
    ],
  }),
  component: LanguagesPage,
});

const greetings = ["नमस्ते", "வணக்கம்", "నమస్కారం", "ನಮಸ್ಕಾರ", "হ্যালো", "नमस्कार", "നമസ്കാരം"];

const languageData = [
  { name: "Hindi", script: "हिन्दी", region: "North India", speakers: "600M+", accuracy: "98.4%" },
  { name: "Tamil", script: "தமிழ்", region: "Tamil Nadu", speakers: "80M+", accuracy: "97.8%" },
  { name: "Telugu", script: "తెలుగు", region: "Andhra Pradesh & Telangana", speakers: "85M+", accuracy: "97.5%" },
  { name: "Kannada", script: "ಕನ್ನಡ", region: "Karnataka", speakers: "50M+", accuracy: "97.1%" },
  { name: "Bengali", script: "বাংলা", region: "West Bengal", speakers: "100M+", accuracy: "97.9%" },
  { name: "Marathi", script: "मराठी", region: "Maharashtra", speakers: "95M+", accuracy: "98.1%" },
  { name: "Malayalam", script: "മലയാളം", region: "Kerala", speakers: "38M+", accuracy: "96.8%" },
  { name: "Gujarati", script: "ગુજરાતી", region: "Gujarat", speakers: "60M+", accuracy: "97.3%" },
  { name: "Punjabi", script: "ਪੰਜਾਬੀ", region: "Punjab", speakers: "35M+", accuracy: "96.9%" },
  { name: "Odia", script: "ଓଡ଼ିଆ", region: "Odisha", speakers: "40M+", accuracy: "96.5%" },
  { name: "Urdu", script: "اردو", region: "Pan-India", speakers: "70M+", accuracy: "97.6%" },
  { name: "Assamese", script: "অসমীয়া", region: "Assam", speakers: "15M+", accuracy: "95.8%" },
  { name: "Maithili", script: "मैथिली", region: "Bihar", speakers: "35M+", accuracy: "95.2%" },
  { name: "Sanskrit", script: "संस्कृतम्", region: "Classical", speakers: "25K+", accuracy: "94.1%" },
  { name: "Konkani", script: "कोंकणी", region: "Goa", speakers: "7M+", accuracy: "94.5%" },
  { name: "Sindhi", script: "سنڌي", region: "Pan-India", speakers: "3M+", accuracy: "93.8%" },
  { name: "Dogri", script: "डोगरी", region: "Jammu", speakers: "3M+", accuracy: "93.2%" },
  { name: "Manipuri", script: "মণিপুরী", region: "Manipur", speakers: "2M+", accuracy: "92.8%" },
  { name: "Bodo", script: "बड़ो", region: "Assam", speakers: "1.5M+", accuracy: "92.1%" },
  { name: "Rajasthani", script: "राजस्थानी", region: "Rajasthan", speakers: "80M+", accuracy: "95.5%" },
];

const techCards = [
  {
    icon: Mic,
    title: "ASR — Automatic Speech Recognition",
    description: "Deep learning models trained on 100,000+ hours of Indian language audio. Dialect-aware recognition with code-switching support for Hindi-English, Tamil-English, and more.",
    stats: ["< 300ms recognition latency", "98%+ accuracy on top 10 languages", "Background noise robust"],
  },
  {
    icon: Volume2,
    title: "TTS — Text-to-Speech",
    description: "Natural prosody synthesis with 40+ voices across 20 languages. Emotional inflection support for empathetic conversations. SSML-compatible for fine-grained control.",
    stats: ["40+ natural voices", "Emotional tone control", "SSML markup support"],
  },
  {
    icon: Brain,
    title: "NLU — Natural Language Understanding",
    description: "Intent recognition and entity extraction fine-tuned for Indian conversational patterns. Understands colloquialisms, regional expressions, and context switches.",
    stats: ["95%+ intent accuracy", "50+ pre-built intents", "Custom entity training"],
  },
];

const sampleCode = `curl -X POST https://api.vakmithra.ai/v1/calls \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+919876543210",
    "agent_id": "agt_abc123",
    "language": "hi-IN",
    "voice": "priya_hindi_female",
    "context": {
      "customer_name": "Rahul Mehta",
      "purpose": "payment_reminder",
      "amount": "₹8,500"
    }
  }'`;

function LanguagesPage() {
  const [greetingIdx, setGreetingIdx] = useState(0);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  useState(() => {
    const interval = setInterval(() => {
      setGreetingIdx((i) => (i + 1) % greetings.length);
    }, 1500);
    return () => clearInterval(interval);
  });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="mesh-gradient py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-light px-4 py-1.5 text-xs font-semibold text-indigo mb-6">
                <Globe className="h-3.5 w-3.5" />
                20+ Languages
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              Your Customers Think in
              <br />
              Their Mother Tongue
            </motion.h1>
            <motion.div variants={fadeUp} className="mt-6 h-16 flex items-center justify-center">
              <motion.span
                key={greetingIdx}
                className="font-display text-4xl font-bold bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent sm:text-5xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
              >
                {greetings[greetingIdx]}
              </motion.span>
            </motion.div>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
              So does our AI. Purpose-built speech models for Indian accents, dialects, and regional vocabulary.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Language Grid */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Supported Languages</h2>
            <p className="mt-3 text-text-muted">Every language fine-tuned for real conversations.</p>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {languageData.map((lang) => (
              <motion.div
                key={lang.name}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md"
                onMouseEnter={() => setHoveredLang(lang.name)}
                onMouseLeave={() => setHoveredLang(null)}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-display text-base font-bold text-foreground">{lang.name}</p>
                    <p className="font-display text-2xl font-bold text-indigo">{lang.script}</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div className="space-y-2 text-xs text-text-muted">
                  <div className="flex items-center justify-between">
                    <span>{lang.region}</span>
                    <span className="font-semibold">{lang.speakers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Accuracy</span>
                    <span className="rounded-full bg-green-50 px-2 py-0.5 font-semibold text-green-700">{lang.accuracy}</span>
                  </div>
                </div>
                {/* Waveform animation on hover */}
                <div className="mt-3 flex items-end gap-0.5 h-6">
                  {Array.from({ length: 16 }).map((_, j) => (
                    <div
                      key={j}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        hoveredLang === lang.name ? "bg-indigo" : "bg-indigo/20"
                      }`}
                      style={{
                        height: hoveredLang === lang.name
                          ? `${8 + Math.sin(j * 0.8) * 12 + Math.random() * 4}px`
                          : "4px",
                        transition: `height 0.3s ease ${j * 30}ms`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technical Breakdown */}
      <section className="py-20 lg:py-28 bg-surface-alt">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Under the Hood</h2>
            <p className="mt-3 text-text-muted">Three AI engines working in concert for natural conversations.</p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techCards.map((card) => {
              const CardIcon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-indigo-light p-3">
                    <CardIcon className="h-6 w-6 text-indigo" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-4">{card.description}</p>
                  <ul className="space-y-2">
                    {card.stats.map((stat) => (
                      <li key={stat} className="flex items-center gap-2 text-xs text-text-secondary">
                        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                        {stat}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Sample API Code */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div className="text-center mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold text-foreground">Language Selection via API</h2>
            <p className="mt-3 text-text-muted">One parameter to speak any language.</p>
          </motion.div>
          <motion.div
            className="rounded-2xl bg-dark-section p-6 shadow-lg overflow-x-auto"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <pre className="font-mono text-xs leading-relaxed text-dark-section-foreground whitespace-pre">
              {sampleCode}
            </pre>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo py-16">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo via-indigo to-cyan opacity-90 -mx-6" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-primary-foreground">Need a Language We Don't Support Yet?</h2>
            <p className="mt-3 text-primary-foreground/80">Request a language and we'll prioritize it in our roadmap.</p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-card px-8 py-4 font-semibold text-indigo shadow-lg transition-all hover:shadow-xl">
              Request a Language <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
