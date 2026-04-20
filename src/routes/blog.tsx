import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";
import { Search, Clock, ArrowRight, User, Mail, Loader2 } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — VakMithra AI" },
      { name: "description", content: "Insights on AI voice technology, Indian language AI, compliance, and telecalling best practices." },
      { property: "og:title", content: "Blog — VakMithra AI" },
      { property: "og:description", content: "Latest insights on AI voice technology for India." },
    ],
  }),
  component: BlogPage,
});

const categories = ["All", "Product", "Engineering", "Industry", "Compliance", "Case Study", "Tutorial"];

const blogPosts = [
  {
    slug: "ai-voice-agents-debt-collection-india",
    title: "How AI Voice Agents Are Transforming Debt Collection in India",
    excerpt: "Indian NBFCs are seeing 40%+ improvement in recovery rates by deploying AI voice agents that speak borrowers' native languages. Here's how it works.",
    category: "Industry",
    author: "Arjun Krishnamurthy",
    role: "Head of Product",
    date: "Jan 10, 2025",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "regional-language-ai-bharat",
    title: "Why Regional Language AI Matters for Bharat's Next 500 Million Users",
    excerpt: "India's next wave of digital users thinks, speaks, and transacts in their mother tongue. Building for them requires fundamentally different AI.",
    category: "Industry",
    author: "Priya Venkatesh",
    role: "VP Engineering",
    date: "Jan 5, 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "compliant-ai-calling-trai-2024",
    title: "Building a Compliant AI Calling System Under TRAI 2024 Guidelines",
    excerpt: "Navigating TRAI's updated regulations for AI-powered outbound calling. DND compliance, consent management, and audit trails explained.",
    category: "Compliance",
    author: "Rohan Desai",
    role: "Legal & Compliance",
    date: "Dec 28, 2024",
    readTime: "10 min read",
    featured: false,
  },
  {
    slug: "nbfc-recovery-rate-case-study",
    title: "Case Study: How an NBFC Improved Recovery Rate by 41% with AI Calls",
    excerpt: "A mid-size NBFC in Maharashtra deployed VakMithra AI for Hindi and Marathi collection calls. The results exceeded every benchmark.",
    category: "Case Study",
    author: "Amit Patel",
    role: "Customer Success",
    date: "Dec 20, 2024",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "low-latency-hindi-speech-recognition",
    title: "The Technical Architecture Behind Low-Latency Hindi Speech Recognition",
    excerpt: "How we built a sub-300ms ASR pipeline optimized for Hindi conversational patterns, background noise, and code-switching.",
    category: "Engineering",
    author: "Dr. Kavya Sharma",
    role: "ML Research Lead",
    date: "Dec 15, 2024",
    readTime: "12 min read",
    featured: false,
  },
  {
    slug: "human-ai-call-transfer",
    title: "Human + AI: When to Transfer a Call and How to Do It Gracefully",
    excerpt: "The art of seamless human handoff in AI voice conversations. Triggers, context cards, and the psychology of warm transfers.",
    category: "Product",
    author: "Arjun Krishnamurthy",
    role: "Head of Product",
    date: "Dec 8, 2024",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "first-ai-voice-campaign-tutorial",
    title: "Setting Up Your First AI Voice Campaign in Under 10 Minutes",
    excerpt: "A step-by-step guide to creating your first AI agent, uploading contacts, and launching a campaign using VakMithra AI.",
    category: "Tutorial",
    author: "Neha Gupta",
    role: "Developer Relations",
    date: "Nov 30, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "agentic-workflows-explained",
    title: "Agentic Workflows Explained: From Voice Call to CRM Update Automatically",
    excerpt: "How post-call workflow triggers eliminate manual data entry and ensure no follow-up falls through the cracks.",
    category: "Product",
    author: "Suresh Kumar",
    role: "Solutions Architect",
    date: "Nov 22, 2024",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "dpdp-act-2023-ai-calling",
    title: "DPDP Act 2023: What AI Calling Companies Must Know",
    excerpt: "India's Digital Personal Data Protection Act has direct implications for AI voice platforms. Data fiduciary obligations, consent, and compliance checklist.",
    category: "Compliance",
    author: "Rohan Desai",
    role: "Legal & Compliance",
    date: "Nov 15, 2024",
    readTime: "9 min read",
    featured: false,
  },
];

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = blogPosts.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = blogPosts.find((p) => p.featured);
  const nonFeatured = filtered.filter((p) => !p.featured || activeCategory !== "All");

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="mesh-gradient py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Blog & Resources
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-text-secondary">
              Insights on AI voice technology, Indian language AI, and telecalling best practices.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 mx-auto max-w-md relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-border bg-card pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo shadow-sm"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category filters */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-indigo text-primary-foreground"
                    : "text-text-muted hover:bg-surface-alt"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      {activeCategory === "All" && featured && !searchQuery && (
        <section className="py-12 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              className="rounded-2xl border border-border bg-gradient-to-br from-indigo-light to-card p-8 shadow-md lg:p-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="rounded-full bg-indigo px-3 py-1 text-xs font-semibold text-primary-foreground">Featured</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-foreground lg:text-3xl">{featured.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4 text-xs text-text-muted">
                <span className="flex items-center gap-1"><User className="h-3 w-3" />{featured.author}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readTime}</span>
                <span>{featured.date}</span>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo">
                Read Article <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Article grid */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {(activeCategory === "All" && !searchQuery ? nonFeatured : filtered).map((post) => (
              <motion.article
                key={post.slug}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <span className="rounded-full bg-indigo-light px-3 py-1 text-[10px] font-semibold text-indigo">{post.category}</span>
                <h3 className="mt-4 font-display text-base font-bold text-foreground leading-snug group-hover:text-indigo transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-light text-[10px] font-bold text-indigo">
                      {post.author.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <p className="text-center text-text-muted py-12">No articles found. Try a different search or category.</p>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-surface-alt">
        <div className="mx-auto max-w-lg px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">Stay Updated</h2>
          <p className="mt-2 text-sm text-text-muted">Get the latest on AI voice technology and Indian language AI. No spam.</p>
          {subscribed ? (
            <div className="mt-6 rounded-xl bg-success/10 p-4 text-sm font-medium text-success">
              You're subscribed! Check your inbox for a confirmation.
            </div>
          ) : (
            <div className="mt-6 flex gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo"
              />
              <button
                onClick={() => { if (email) setSubscribed(true); }}
                className="rounded-xl bg-indigo px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:shadow-md transition-all"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
