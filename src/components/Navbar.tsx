import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", to: "/features" },
  { label: "Solutions", to: "/solutions" },
  { label: "Languages", to: "/languages" },
  { label: "Pricing", to: "/pricing" },
  { label: "Blog", to: "/blog" },
  { label: "Docs", to: "/docs" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const shadow = useTransform(scrollY, [0, 80], ["0 0 0 rgba(0,0,0,0)", "0 1px 3px rgba(0,0,0,0.06)"]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          boxShadow: shadow,
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: bgOpacity,
            backgroundColor: "rgba(250,250,248,0.92)",
            backdropFilter: "blur(20px)",
          }}
        />
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/vakmithra_logo.png" alt="VakMithra AI" className="h-20 w-20 object-contain" />
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              VakMithra <span className="text-indigo">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:text-foreground">
              Sign In
            </button>
            <Link
              to="/demo"
              className="rounded-xl bg-indigo px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md hover:brightness-110"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-background pt-20 px-6 lg:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex flex-col gap-6 pt-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-lg font-medium text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border" />
            <button className="text-left text-lg font-medium text-text-muted">Sign In</button>
            <Link
              to="/demo"
              className="inline-block rounded-xl bg-indigo px-6 py-3 text-center text-base font-semibold text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Book a Demo
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
