import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";
import {
  CheckCircle2, Star, Calendar, Clock, ArrowRight,
  Loader2, Phone, Building2, Users, Mail,
} from "lucide-react";
import { submitDemoRequest } from "@/lib/server-actions";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Book a Demo — VakMithra AI" },
      { name: "description", content: "See VakMithra AI in action. Book a personalized 30-minute demo with our team." },
      { property: "og:title", content: "Book a Demo — VakMithra AI" },
      { property: "og:description", content: "Book a free personalized demo of AI voice calling." },
    ],
  }),
  component: DemoPage,
});

const industries = [
  "Debt Collections / NBFC", "Healthcare", "E-commerce", "Banking & Fintech",
  "EdTech", "Automotive", "Real Estate", "Retail & D2C", "Insurance", "Other",
];

const useCases = [
  "Collections", "Appointment Reminders", "Order Updates", "Lead Qualification",
  "Customer Feedback", "KYC Follow-up", "Policy Renewal", "Support Calls",
];

const languages = [
  "Hindi", "Tamil", "Telugu", "Kannada", "Bengali", "Marathi",
  "Malayalam", "Gujarati", "Punjabi", "Odia", "Urdu", "English",
];

const companySizes = ["1–10", "11–50", "51–200", "201–1000", "1000+"];
const callVolumes = ["< 1,000", "1,000 – 10,000", "10,000 – 100,000", "100,000+"];
const hearAboutOptions = ["Google Search", "LinkedIn", "Twitter/X", "Referral", "Event/Conference", "Blog/Article", "Other"];
const timeSlots = [
  { label: "Morning 10–12 IST", value: "morning" },
  { label: "Afternoon 2–4 IST", value: "afternoon" },
  { label: "Evening 5–7 IST", value: "evening" },
];

const testimonials = [
  { name: "Vikram Reddy", role: "COO, PayRight NBFC", quote: "The demo convinced us in 15 minutes. We signed up the same day and deployed within a week." },
  { name: "Ananya Iyer", role: "Head of Ops, MedPlus", quote: "Seeing the AI handle a live call in Tamil was a game-changer. Nothing else comes close." },
  { name: "Suresh Kumar", role: "CTO, ShipFast", quote: "The workflow triggers alone saved us 40 hours of manual work per week." },
];

function DemoPage() {
  const [formData, setFormData] = useState({
    fullName: "", workEmail: "", phone: "", company: "",
    companySize: "", industry: "", monthlyCallVolume: "",
    hearAboutUs: "", preferredDate: "", preferredSlot: "morning",
    message: "",
  });
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  const toggleSelection = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Name is required";
    if (!formData.workEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) errs.workEmail = "Valid email required";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) errs.phone = "Valid 10-digit number required";
    if (!formData.company.trim()) errs.company = "Company name is required";
    if (!formData.companySize) errs.companySize = "Select company size";
    if (!formData.industry) errs.industry = "Select industry";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const [referenceId, setReferenceId] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitDemoRequest({
        data: {
          ...formData,
          useCases: selectedUseCases,
          languages: selectedLanguages,
        }
      });

      if (result.success && result.data) {
        setReferenceId(result.data.referenceId);
        setIsSubmitting(false);
        setIsSuccess(true);
      } else {
        throw new Error(result.error || "Failed to submit request.");
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-background">
        <motion.div
          className="mx-auto max-w-lg px-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle2 className="h-10 w-10 text-success" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-foreground">Your Demo is Booked!</h1>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-md text-left">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Reference</span>
                <span className="font-mono font-semibold text-indigo">{referenceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Name</span>
                <span className="font-medium text-foreground">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Date</span>
                <span className="font-medium text-foreground">{formData.preferredDate || "TBD"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Time</span>
                <span className="font-medium text-foreground">{timeSlots.find((t) => t.value === formData.preferredSlot)?.label}</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-display text-sm font-bold text-foreground mb-4">What Happens Next</h3>
            <div className="space-y-3 text-left">
              {[
                "You'll receive a confirmation email within 5 minutes",
                "Our team will reach out to confirm and customize the demo",
                "Join the call — we'll show you VakMithra AI live in your language",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo text-[10px] font-bold text-primary-foreground">{i + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left Panel - 2 cols */}
            <motion.div
              className="lg:col-span-2"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center rounded-full bg-indigo-light px-4 py-1.5 text-xs font-semibold text-indigo mb-4">Free Demo</span>
                <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
                  See VakMithra AI
                  <br />
                  in Action
                </h1>
              </motion.div>

              <motion.ul variants={fadeUp} className="mt-8 space-y-4">
                {[
                  "Live product walkthrough (30 minutes)",
                  "Custom demo in your industry vertical",
                  "Multilingual demo in your regional language",
                  "Pricing tailored to your call volume",
                  "Start your trial the same day",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
                    {item}
                  </li>
                ))}
              </motion.ul>

              {/* Testimonial rotator */}
              <motion.div variants={fadeUp} className="mt-10">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <motion.div key={testimonialIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-sm text-text-secondary italic">"{testimonials[testimonialIdx].quote}"</p>
                    <p className="mt-3 text-xs font-semibold text-foreground">{testimonials[testimonialIdx].name}</p>
                    <p className="text-xs text-text-muted">{testimonials[testimonialIdx].role}</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-6 rounded-xl bg-indigo-light p-4 text-center">
                <p className="text-sm font-semibold text-indigo">1,247 demos booked this month</p>
              </motion.div>
            </motion.div>

            {/* Right Panel - 3 cols */}
            <motion.div
              className="lg:col-span-3"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-lg lg:p-8">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">Book Your Free Demo</h2>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Rahul Mehta"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo ${errors.fullName ? "border-danger" : "border-border"}`}
                    />
                    {errors.fullName && <p className="mt-1 text-xs text-danger">{errors.fullName}</p>}
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">Work Email *</label>
                    <input
                      type="email"
                      placeholder="rahul@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo ${errors.workEmail ? "border-danger" : "border-border"}`}
                    />
                    {errors.workEmail && <p className="mt-1 text-xs text-danger">{errors.workEmail}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">Phone Number *</label>
                    <div className="flex">
                      <span className="flex items-center rounded-l-xl border border-r-0 border-border bg-surface-alt px-3 text-xs text-text-muted">+91</span>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full rounded-r-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo ${errors.phone ? "border-danger" : "border-border"}`}
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-xs text-danger">{errors.phone}</p>}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">Company Name *</label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo ${errors.company ? "border-danger" : "border-border"}`}
                    />
                    {errors.company && <p className="mt-1 text-xs text-danger">{errors.company}</p>}
                  </div>

                  {/* Company Size */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">Company Size *</label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo ${errors.companySize ? "border-danger" : "border-border"}`}
                    >
                      <option value="">Select size</option>
                      {companySizes.map((s) => <option key={s} value={s}>{s} employees</option>)}
                    </select>
                    {errors.companySize && <p className="mt-1 text-xs text-danger">{errors.companySize}</p>}
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">Industry *</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo ${errors.industry ? "border-danger" : "border-border"}`}
                    >
                      <option value="">Select industry</option>
                      {industries.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                    {errors.industry && <p className="mt-1 text-xs text-danger">{errors.industry}</p>}
                  </div>
                </div>

                {/* Use Cases */}
                <div className="mt-5">
                  <label className="mb-2 block text-xs font-medium text-foreground">Primary Use Cases</label>
                  <div className="flex flex-wrap gap-2">
                    {useCases.map((uc) => (
                      <button
                        key={uc}
                        type="button"
                        onClick={() => toggleSelection(selectedUseCases, setSelectedUseCases, uc)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                          selectedUseCases.includes(uc) ? "bg-indigo text-primary-foreground" : "border border-border bg-background text-text-muted hover:border-indigo"
                        }`}
                      >
                        {uc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="mt-5">
                  <label className="mb-2 block text-xs font-medium text-foreground">Languages Needed</label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleSelection(selectedLanguages, setSelectedLanguages, lang)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                          selectedLanguages.includes(lang) ? "bg-indigo text-primary-foreground" : "border border-border bg-background text-text-muted hover:border-indigo"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {/* Call Volume */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">Monthly Call Volume</label>
                    <select
                      value={formData.monthlyCallVolume}
                      onChange={(e) => setFormData({ ...formData, monthlyCallVolume: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo"
                    >
                      <option value="">Select volume</option>
                      {callVolumes.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>

                  {/* How did you hear */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">How did you hear about us?</label>
                    <select
                      value={formData.hearAboutUs}
                      onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo"
                    >
                      <option value="">Select</option>
                      {hearAboutOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">Preferred Demo Date</label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo"
                    />
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">Preferred Time Slot</label>
                    <div className="flex gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredSlot: slot.value })}
                          className={`flex-1 rounded-lg py-2 text-[10px] font-medium transition-all ${
                            formData.preferredSlot === slot.value ? "bg-indigo text-primary-foreground" : "border border-border text-text-muted"
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mt-5">
                  <label className="mb-1.5 block text-xs font-medium text-foreground">Message (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your specific requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo"
                  />
                </div>

                <p className="mt-4 text-[10px] text-text-muted">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo py-4 text-base font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      Book My Free Demo
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                {submitError && (
                  <div className="mt-3 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
                    {submitError}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
