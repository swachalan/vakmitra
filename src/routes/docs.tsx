import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";
import {
  Search, Key, Bot, Megaphone, Phone, Webhook, Globe, Code2,
  AlertTriangle, BookOpen, ArrowRight, Copy, Check,
} from "lucide-react";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Developer Docs — VakMithra AI" },
      { name: "description", content: "VakMithra AI API documentation. Build voice AI into anything with our REST API, SDKs, and webhooks." },
      { property: "og:title", content: "Developer Docs — VakMithra AI" },
      { property: "og:description", content: "API documentation for VakMithra AI voice platform." },
    ],
  }),
  component: DocsPage,
});

const quickStartCards = [
  { icon: Code2, title: "REST API", description: "Full REST API with comprehensive endpoints" },
  { icon: Code2, title: "Node.js SDK", description: "Official SDK for Node.js applications" },
  { icon: Code2, title: "Python SDK", description: "Official SDK for Python applications" },
  { icon: Webhook, title: "Webhooks", description: "Real-time event notifications via HTTPS" },
  { icon: BookOpen, title: "Postman Collection", description: "Import and test all endpoints instantly" },
];

const docCategories = [
  { icon: Key, title: "Authentication & API Keys", description: "API key management, scopes, and security" },
  { icon: Bot, title: "Agents API Reference", description: "Create, configure, and manage AI voice agents" },
  { icon: Megaphone, title: "Campaigns API Reference", description: "Launch, monitor, and manage calling campaigns" },
  { icon: Phone, title: "Calls API Reference", description: "Initiate calls, check status, and retrieve recordings" },
  { icon: Webhook, title: "Webhooks & Events", description: "Subscribe to real-time call events" },
  { icon: Globe, title: "Language Codes Reference", description: "All supported language codes and voice IDs" },
  { icon: Code2, title: "SDKs & Libraries", description: "Official SDKs for Node.js, Python, and Go" },
  { icon: AlertTriangle, title: "Error Codes Reference", description: "Complete error code listing with solutions" },
];

const codeTabs = [
  {
    lang: "cURL",
    code: `curl -X POST https://api.vakmithra.ai/v1/campaigns \\
  -H "Authorization: Bearer {YOUR_API_KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Q4 Recovery Drive",
    "language": "hi-IN",
    "agent_id": "agt_abc123",
    "contacts": [
      { "phone": "+919876543210", "name": "Rahul Mehta" }
    ],
    "schedule": {
      "start": "09:00",
      "end": "18:00",
      "timezone": "Asia/Kolkata"
    }
  }'`,
  },
  {
    lang: "Node.js",
    code: `import { VakMithra } from '@vakmithra/sdk';

const client = new VakMithra('YOUR_API_KEY');

const campaign = await client.campaigns.create({
  name: 'Q4 Recovery Drive',
  language: 'hi-IN',
  agentId: 'agt_abc123',
  contacts: [
    { phone: '+919876543210', name: 'Rahul Mehta' }
  ],
  schedule: {
    start: '09:00',
    end: '18:00',
    timezone: 'Asia/Kolkata'
  }
});

console.log(campaign.id);`,
  },
  {
    lang: "Python",
    code: `from vakmithra import VakMithra

client = VakMithra("YOUR_API_KEY")

campaign = client.campaigns.create(
    name="Q4 Recovery Drive",
    language="hi-IN",
    agent_id="agt_abc123",
    contacts=[
        {"phone": "+919876543210", "name": "Rahul Mehta"}
    ],
    schedule={
        "start": "09:00",
        "end": "18:00",
        "timezone": "Asia/Kolkata"
    }
)

print(campaign.id)`,
  },
  {
    lang: "Go",
    code: `package main

import "github.com/vakmithra/go-sdk"

func main() {
    client := vakmithra.NewClient("YOUR_API_KEY")

    campaign, _ := client.Campaigns.Create(&vakmithra.CampaignParams{
        Name:     "Q4 Recovery Drive",
        Language: "hi-IN",
        AgentID:  "agt_abc123",
        Contacts: []vakmithra.Contact{
            {Phone: "+919876543210", Name: "Rahul Mehta"},
        },
        Schedule: &vakmithra.Schedule{
            Start:    "09:00",
            End:      "18:00",
            Timezone: "Asia/Kolkata",
        },
    })

    fmt.Println(campaign.ID)
}`,
  },
];

const mockResponse = `{
  "id": "cmp_7f8g9h0i1j",
  "status": "scheduled",
  "name": "Q4 Recovery Drive",
  "language": "hi-IN",
  "agent_id": "agt_abc123",
  "total_contacts": 1,
  "scheduled_start": "2025-01-15T09:00:00+05:30",
  "created_at": "2025-01-14T16:30:00Z"
}`;

const changelog = [
  { version: "v2.4.0", date: "Jan 12, 2025", changes: "Added support for Rajasthani and Dogri languages. New real-time sentiment analysis webhook event." },
  { version: "v2.3.1", date: "Dec 28, 2024", changes: "Fixed call recording download endpoint. Improved Hindi ASR accuracy by 2.1%." },
  { version: "v2.3.0", date: "Dec 15, 2024", changes: "Launched Workflow Triggers API. New webhook events: workflow.triggered, workflow.completed." },
  { version: "v2.2.0", date: "Nov 30, 2024", changes: "Human transfer API with context card support. New agent persona configuration fields." },
  { version: "v2.1.0", date: "Nov 15, 2024", changes: "Campaign scheduling with timezone support. Bulk contact upload endpoint (up to 50K contacts per request)." },
];

function DocsPage() {
  const [activeTab, setActiveTab] = useState("cURL");
  const [copied, setCopied] = useState(false);
  const [apiMethod, setApiMethod] = useState("POST");
  const [showResponse, setShowResponse] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendRequest = () => {
    setLoading(true);
    setShowResponse(false);
    setTimeout(() => {
      setLoading(false);
      setShowResponse(true);
    }, 800);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="mesh-gradient py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Build Voice AI Into Anything
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-text-secondary">
              Comprehensive API documentation, SDKs, and guides to integrate VakMithra AI.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 mx-auto max-w-md relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full rounded-2xl border border-border bg-card pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo shadow-sm"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Quick Start</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {quickStartCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <Icon className="h-5 w-5 text-indigo mb-2" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-indigo transition-colors">{card.title}</p>
                  <p className="text-xs text-text-muted mt-1">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doc Categories */}
      <section className="py-12 bg-surface-alt">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Documentation</h2>
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {docCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  variants={fadeUp}
                  className="group cursor-pointer rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="mb-3 inline-flex rounded-lg bg-indigo-light p-2.5">
                    <Icon className="h-5 w-5 text-indigo" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-indigo transition-colors">{cat.title}</h3>
                  <p className="mt-1 text-xs text-text-muted">{cat.description}</p>
                  <ArrowRight className="mt-3 h-4 w-4 text-text-muted group-hover:text-indigo transition-colors" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Interactive API Explorer */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">API Explorer</h2>
          <div className="rounded-2xl border border-border bg-card shadow-md overflow-hidden">
            {/* Request bar */}
            <div className="flex items-center gap-2 border-b border-border p-4 bg-surface-alt">
              <select
                value={apiMethod}
                onChange={(e) => setApiMethod(e.target.value)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-indigo"
              >
                {["GET", "POST", "PUT", "DELETE"].map((m) => <option key={m}>{m}</option>)}
              </select>
              <input
                type="text"
                value="https://api.vakmithra.ai/v1/campaigns"
                readOnly
                className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-xs font-mono text-foreground"
              />
              <button
                onClick={handleSendRequest}
                className="rounded-lg bg-indigo px-4 py-2 text-xs font-semibold text-primary-foreground hover:brightness-110 transition-all"
              >
                {loading ? "Sending..." : "Send Request"}
              </button>
            </div>

            {/* Response */}
            {showResponse && (
              <motion.div
                className="p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">200 OK</span>
                    <span className="text-[10px] text-text-muted">302ms</span>
                  </div>
                  <button
                    onClick={() => handleCopy(mockResponse)}
                    className="flex items-center gap-1 text-xs text-text-muted hover:text-foreground"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="rounded-lg bg-dark-section p-4 text-xs font-mono text-dark-section-foreground overflow-x-auto">
                  {mockResponse}
                </pre>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-12 bg-surface-alt">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Code Examples</h2>
          <div className="rounded-2xl border border-border bg-card shadow-md overflow-hidden">
            <div className="flex border-b border-border bg-surface-alt">
              {codeTabs.map((tab) => (
                <button
                  key={tab.lang}
                  onClick={() => setActiveTab(tab.lang)}
                  className={`px-4 py-3 text-xs font-medium transition-all ${
                    activeTab === tab.lang
                      ? "border-b-2 border-indigo text-indigo bg-card"
                      : "text-text-muted hover:text-foreground"
                  }`}
                >
                  {tab.lang}
                </button>
              ))}
            </div>
            <div className="relative">
              <button
                onClick={() => handleCopy(codeTabs.find((t) => t.lang === activeTab)?.code || "")}
                className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-dark-section/80 px-2 py-1 text-[10px] text-dark-section-foreground hover:bg-dark-section"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </button>
              <pre className="p-6 bg-dark-section text-xs font-mono text-dark-section-foreground overflow-x-auto leading-relaxed">
                {codeTabs.find((t) => t.lang === activeTab)?.code}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Changelog */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Changelog</h2>
          <div className="space-y-4">
            {changelog.map((entry) => (
              <div key={entry.version} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="rounded-full bg-indigo-light px-3 py-1 text-xs font-bold text-indigo">{entry.version}</span>
                  <span className="text-xs text-text-muted">{entry.date}</span>
                </div>
                <p className="text-sm text-text-secondary">{entry.changes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
