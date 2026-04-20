import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-indigo py-16 lg:py-20">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo via-indigo to-cyan opacity-90" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
            Ready to Transform Your
            <br />
            Voice Operations?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/80">
            Join 500+ businesses already using VakMithra AI to reach customers in their language.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button className="group inline-flex items-center gap-2 rounded-2xl bg-card px-8 py-4 text-base font-semibold text-indigo shadow-lg transition-all hover:shadow-xl">
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link to="/demo" className="inline-flex items-center gap-2 rounded-2xl border border-primary-foreground/30 px-8 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10">
              Book a Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
