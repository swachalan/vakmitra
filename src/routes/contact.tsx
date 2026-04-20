import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";
import {
  Mail, Phone, Handshake, Clock, MapPin, Linkedin,
  ArrowRight, Loader2, CheckCircle2,
} from "lucide-react";
import { submitContactLead } from "../lib/server-actions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VakMithra AI" },
      { name: "description", content: "Get in touch with VakMithra AI. Sales inquiries, technical support, and partnership opportunities." },
      { property: "og:title", content: "Contact — VakMithra AI" },
      { property: "og:description", content: "Contact VakMithra AI for sales, support, or partnerships." },
    ],
  }),
  component: ContactPage,
});

const contactTypes = [
  {
    icon: Mail,
    title: "Sales",
    email: "sales@vakmithra.ai",
    response: "Response within 2 hours",
    description: "Pricing, demos, and enterprise inquiries",
  },
  {
    icon: Phone,
    title: "Technical Support",
    email: "support@vakmithra.ai",
    response: "Response within 4 hours",
    description: "API issues, integration help, and troubleshooting",
  },
  {
    icon: Handshake,
    title: "Partnerships",
    email: "partners@vakmithra.ai",
    response: "Response within 1 business day",
    description: "Reseller, integration, and technology partnerships",
  },
];

const subjects = [
  "Sales Inquiry",
  "Technical Support",
  "Partnership Opportunity",
  "Press & Media",
  "Careers",
  "General Inquiry",
  "Bug Report",
  "Feature Request",
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Valid email required";
    if (!formData.subject) errs.subject = "Select a subject";
    if (!formData.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitContactLead({ data: formData });

      if (result.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
      } else {
        throw new Error(result.error || "Failed to submit. Please try again.");
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="mesh-gradient py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Get in Touch
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-text-secondary">
              We'd love to hear from you. Choose the best way to reach us.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact type cards */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactTypes.map((ct) => {
              const Icon = ct.icon;
              return (
                <motion.div
                  key={ct.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center"
                >
                  <div className="mx-auto mb-4 inline-flex rounded-xl bg-indigo-light p-3">
                    <Icon className="h-6 w-6 text-indigo" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">{ct.title}</h3>
                  <p className="mt-1 text-xs text-text-muted">{ct.description}</p>
                  <p className="mt-3 text-sm font-semibold text-indigo">{ct.email}</p>
                  <div className="mt-2 flex items-center justify-center gap-1 text-xs text-text-muted">
                    <Clock className="h-3 w-3" />
                    {ct.response}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Office + Form */}
      <section className="py-16 bg-surface-alt">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Office card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-indigo-light p-3">
                  <MapPin className="h-5 w-5 text-indigo" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground">Our Office</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  VakMithra AI Pvt. Ltd.
                  <br />
                  3rd Floor, WeWork Embassy Tech Village
                  <br />
                  Koramangala, Bengaluru
                  <br />
                  Karnataka 560095, India
                </p>
                <div className="mt-4 rounded-xl bg-surface-alt p-4">
                  <p className="text-xs text-text-muted">
                    <strong>Office Hours:</strong> Mon–Fri, 9:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>

              {/* Social links */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-base font-bold text-foreground mb-4">Follow Us</h3>
                <div className="space-y-3">
                  {[
                    { name: "LinkedIn", handle: "@vakmithra-ai" },
                    { name: "Twitter/X", handle: "@VakMithraAI" },
                    { name: "YouTube", handle: "VakMithra AI" },
                    { name: "GitHub", handle: "vakmithra" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="flex items-center justify-between rounded-lg p-2 text-sm hover:bg-surface-alt transition-colors"
                      rel="noopener noreferrer"
                    >
                      <span className="font-medium text-foreground">{social.name}</span>
                      <span className="text-xs text-text-muted">{social.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              {isSuccess ? (
                <motion.div
                  className="rounded-2xl border border-border bg-card p-8 shadow-md text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle2 className="mx-auto h-12 w-12 text-success mb-4" />
                  <h3 className="font-display text-xl font-bold text-foreground">Message Sent!</h3>
                  <p className="mt-2 text-sm text-text-muted">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-border bg-card p-6 shadow-md lg:p-8"
                >
                  <h2 className="font-display text-xl font-bold text-foreground mb-6">Send a Message</h2>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-foreground">Name *</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo ${errors.name ? "border-danger" : "border-border"}`}
                      />
                      {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-foreground">Email *</label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo ${errors.email ? "border-danger" : "border-border"}`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-foreground">Phone (Optional)</label>
                      <input
                        type="tel"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-foreground">Subject *</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo ${errors.subject ? "border-danger" : "border-border"}`}
                      >
                        <option value="">Select subject</option>
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.subject && <p className="mt-1 text-xs text-danger">{errors.subject}</p>}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="mb-1.5 block text-xs font-medium text-foreground">Message *</label>
                    <textarea
                      rows={5}
                      placeholder="How can we help?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo ${errors.message ? "border-danger" : "border-border"}`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-danger">{errors.message}</p>}
                  </div>

                  <p className="mt-4 text-[10px] text-text-muted">
                    By submitting, you agree to our Privacy Policy and Terms of Service.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" />Sending...</>
                    ) : (
                      <>Send Message <ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>

                  {submitError && (
                    <div className="mt-3 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
                      {submitError}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
