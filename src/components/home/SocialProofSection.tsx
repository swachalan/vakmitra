import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const companies = [
  "TataPlay", "PolicyBazaar", "HDFC Bank", "Zomato", "Byju's",
  "PhonePe", "Nykaa", "OYO", "Delhivery", "Meesho",
];

export function SocialProofSection() {
  return (
    <section className="border-y border-border bg-card py-12 overflow-hidden">
      <motion.p
        className="mb-8 text-center text-sm font-medium text-text-muted"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Trusted by 500+ businesses across India
      </motion.p>
      <div className="relative">
        <div className="flex animate-marquee gap-16 whitespace-nowrap">
          {[...companies, ...companies].map((company, i) => (
            <span
              key={`${company}-${i}`}
              className="inline-block font-display text-lg font-semibold text-text-muted/40 select-none"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
