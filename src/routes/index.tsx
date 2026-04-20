import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { MetricsSection } from "@/components/home/MetricsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { CtaBanner } from "@/components/home/CtaBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VakMithra AI — AI Voice Tele-Calling Software for India" },
      { name: "description", content: "Deploy AI voice agents that speak Hindi, Tamil, Telugu & 20+ Indian languages. Launch campaigns in minutes. Scale to millions of calls." },
      { property: "og:title", content: "VakMithra AI — AI Voice Tele-Calling Software for India" },
      { property: "og:description", content: "Deploy AI voice agents in 20+ Indian languages. Launch campaigns in minutes." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <MetricsSection />
      <PricingSection />
      <CtaBanner />
    </>
  );
}
