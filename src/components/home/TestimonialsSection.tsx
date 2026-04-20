import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "VP Collections",
    company: "FinSecure NBFC",
    quote: "VakMithra AI improved our recovery rate by 41% in the first quarter. The Hindi and Marathi support is flawless — our borrowers actually prefer talking to the AI.",
  },
  {
    name: "Priya Venkatesh",
    role: "Head of Operations",
    company: "MedCare Hospitals",
    quote: "We reduced no-show appointments by 62%. Patients love receiving reminders in Tamil and Telugu. The human transfer feature is seamless when they need a real person.",
  },
  {
    name: "Amit Patel",
    role: "CTO",
    company: "QuickShip Logistics",
    quote: "Processing 50,000 delivery confirmations daily across 8 languages. Setup took 3 minutes. The workflow triggers auto-update our tracking system. It's magic.",
  },
];

export function TestimonialsSection() {
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
            Testimonials
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Loved by Teams Across India
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-text-secondary">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-light font-display text-sm font-bold text-indigo">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
