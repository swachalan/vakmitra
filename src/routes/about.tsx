import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Heart, Shield, Globe, Eye, Linkedin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VakMithra AI" },
      { name: "description", content: "VakMithra AI is building the future of AI voice communication for India. Built in Bengaluru, designed for Bharat." },
      { property: "og:title", content: "About — VakMithra AI" },
      { property: "og:description", content: "The team behind India's leading AI voice platform." },
    ],
  }),
  component: AboutPage,
});

const team = [
  { name: "Vikram Rao", role: "Co-Founder & CEO", initials: "VR" },
  { name: "Priya Venkatesh", role: "Co-Founder & CTO", initials: "PV" },
  { name: "Arjun Krishnamurthy", role: "VP Product", initials: "AK" },
  { name: "Dr. Kavya Sharma", role: "ML Research Lead", initials: "KS" },
  { name: "Suresh Kumar", role: "Head of Engineering", initials: "SK" },
  { name: "Neha Gupta", role: "Head of Sales", initials: "NG" },
  { name: "Rohan Desai", role: "Legal & Compliance", initials: "RD" },
  { name: "Ananya Iyer", role: "Head of Customer Success", initials: "AI" },
];

const values = [
  { icon: Heart, title: "Customer Obsession", description: "Every feature starts with a real customer problem. We ship what matters, not what's shiny." },
  { icon: Shield, title: "Privacy First", description: "DPDP Act compliant from day one. Your data is encrypted, auditable, and deletable on request." },
  { icon: Globe, title: "India-Built", description: "Not a copy of a Western product. Purpose-built for Indian languages, accents, and business workflows." },
  { icon: Eye, title: "Radical Transparency", description: "Public pricing, clear SLAs, honest metrics. No asterisks, no hidden fees, no surprises." },
];

const press = [
  { publication: "Economic Times", quote: "VakMithra AI is leading the charge in bringing AI-powered voice technology to Bharat's businesses." },
  { publication: "YourStory", quote: "The startup that's making AI speak India's languages — literally." },
  { publication: "Inc42", quote: "With 20+ language support and sub-800ms latency, VakMithra is the voice AI stack India needed." },
];

function AboutPage() {
  return (
    <div className="pt-20">
      {/* Mission */}
      <section className="mesh-gradient py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center rounded-full bg-indigo-light px-4 py-1.5 text-xs font-semibold text-indigo mb-6">About Us</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl leading-tight">
              We're building the{" "}
              <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">voice of AI</span>
              {" "}for a billion Indians.
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Founding story */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            className="space-y-6 text-base leading-relaxed text-text-secondary"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp}>
              In 2023, our founders were working with NBFCs across Maharashtra and Tamil Nadu when they noticed something absurd: the most advanced AI calling systems in the world couldn't speak Hindi properly. They couldn't handle a Mumbai accent. They definitely couldn't switch between Hindi and English mid-sentence — something every Indian does naturally.
            </motion.p>
            <motion.p variants={fadeUp}>
              The solutions available were either expensive Western products retrofitted with mediocre Indian language support, or legacy IVR systems that customers despised. There was nothing built from the ground up for India — for its languages, its accents, its business workflows, its scale.
            </motion.p>
            <motion.p variants={fadeUp}>
              So we built VakMithra AI. "Vak" means voice in Sanskrit. "Mithra" means friend. A voice that understands you, speaks your language, and works tirelessly on your behalf. Today, we process over 1.2 crore calls monthly across 20 Indian languages, helping 500+ businesses connect with their customers the way they want to be connected — in their mother tongue.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-surface-alt">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold text-foreground">Our Team</h2>
            <p className="mt-3 text-text-muted">The people building India's voice AI future.</p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-light font-display text-xl font-bold text-indigo">
                  {member.initials}
                </div>
                <p className="mt-4 font-display text-sm font-bold text-foreground">{member.name}</p>
                <p className="mt-1 text-xs text-text-muted">{member.role}</p>
                <a href="#" className="mt-3 inline-flex items-center text-xs text-text-muted hover:text-indigo" rel="noopener noreferrer">
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold text-foreground">Our Values</h2>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-4 inline-flex rounded-xl bg-indigo-light p-3">
                    <Icon className="h-5 w-5 text-indigo" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Backed by */}
      <section className="py-16 bg-surface-alt">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-display text-xl font-bold text-foreground mb-8">Backed By</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Accel India", "Sequoia Surge", "Matrix Partners", "Y Combinator"].map((investor) => (
              <span key={investor} className="font-display text-lg font-semibold text-text-muted/40">{investor}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">In the Press</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {press.map((p) => (
              <div key={p.publication} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="font-display text-sm font-bold text-indigo mb-3">{p.publication}</p>
                <p className="text-sm text-text-secondary italic">"{p.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* India-first */}
      <section className="py-20 bg-dark-section text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-3xl font-bold text-dark-section-foreground sm:text-4xl">
            Built in Bengaluru. Designed for Bharat. 🇮🇳
          </h2>
          <p className="mt-4 text-dark-section-foreground/70">
            Every line of code, every speech model, every design decision — made with India's unique needs in mind.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-card px-8 py-4 font-semibold text-indigo shadow-lg transition-all hover:shadow-xl">
            Join Our Team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
