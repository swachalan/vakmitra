import { Link } from "@tanstack/react-router";

const footerLinks = {
  Product: [
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "Languages", to: "/languages" },
    { label: "Docs", to: "/docs" },
  ],
  Solutions: [
    { label: "Debt Collections", to: "/solutions" },
    { label: "Healthcare", to: "/solutions" },
    { label: "E-commerce", to: "/solutions" },
    { label: "Banking & Fintech", to: "/solutions" },
  ],
  Company: [
    { label: "About", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Careers", to: "/contact" },
    { label: "Contact", to: "/contact" },
  ],
  Resources: [
    { label: "API Reference", to: "/docs" },
    { label: "Security", to: "/privacy" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
  ],
};

const languages = [
  "हिन्दी", "தமிழ்", "తెలుగు", "ಕನ್ನಡ", "বাংলা",
  "मराठी", "മലയാളം", "ગુજરાતી", "ਪੰਜਾਬੀ", "ଓଡ଼ିଆ",
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/vakmithra_logo.png" alt="VakMithra AI" className="h-18 w-18 object-contain" />
              <span className="font-display text-lg font-bold text-foreground">
                VakMithra <span className="text-indigo">AI</span>
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              AI Voice Tele-Calling Software for India. Deploy intelligent voice agents in 20+ Indian languages.
            </p>
            <div className="mt-6 flex gap-4">
              {["LinkedIn", "X", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs font-medium text-text-muted transition-colors hover:text-indigo"
                  rel="noopener noreferrer"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Language strip */}
        <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
          {languages.map((lang) => (
            <span
              key={lang}
              className="rounded-full bg-indigo-light px-3 py-1 text-xs font-medium text-indigo"
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-text-muted">
            © 2025 VakMithra AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <span>·</span>
            <span>Made in India 🇮🇳 for Bharat</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
