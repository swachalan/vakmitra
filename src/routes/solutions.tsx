import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";
import {
  Banknote, Stethoscope, ShoppingBag, Building2, GraduationCap,
  Car, Home, Store, ArrowRight, TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — VakMithra AI" },
      { name: "description", content: "Industry-specific AI voice calling solutions for debt collections, healthcare, e-commerce, banking, EdTech, automotive, real estate, and retail." },
      { property: "og:title", content: "Solutions — VakMithra AI" },
      { property: "og:description", content: "AI voice solutions tailored to your industry." },
    ],
  }),
  component: SolutionsPage,
});

const industries = [
  {
    id: "collections",
    icon: Banknote,
    name: "Debt Collections & NBFC",
    badge: "Top Use Case",
    problem: "Traditional collection calls are expensive, inconsistent, and often alienate borrowers. Manual agents burn out quickly, and regional language coverage is nearly impossible to scale.",
    solutions: [
      "AI agents conduct empathetic recovery calls in the borrower's native language",
      "Automated follow-up sequences with escalation rules based on call outcomes",
      "Real-time sentiment tracking to flag distressed borrowers for human intervention",
    ],
    dialogue: {
      en: [
        { role: "AI", text: "Hello, this is Priya from FinSecure. I'm calling regarding your EMI due on January 15th for ₹8,500. How would you like to proceed?" },
        { role: "Customer", text: "I've been facing some financial difficulties. Can I get an extension?" },
        { role: "AI", text: "I completely understand. We do have flexible options available. I can offer you a 7-day extension with no additional charges. Shall I process that for you?" },
      ],
      hi: [
        { role: "AI", text: "नमस्ते, मैं प्रिया हूँ FinSecure से। मैं आपकी 15 जनवरी की ₹8,500 की EMI के बारे में बात कर रही हूँ। आप कैसे आगे बढ़ना चाहेंगे?" },
        { role: "Customer", text: "मुझे कुछ आर्थिक कठिनाइयाँ हो रही हैं। क्या मुझे समय मिल सकता है?" },
        { role: "AI", text: "मैं पूरी तरह समझती हूँ। हमारे पास लचीले विकल्प उपलब्ध हैं। मैं आपको बिना किसी अतिरिक्त शुल्क के 7 दिन का एक्सटेंशन दे सकती हूँ। क्या मैं इसे प्रोसेस करूँ?" },
      ],
    },
    metric: { value: "42%", label: "Recovery Rate Improvement" },
    caseStudy: { type: "Mid-Size NBFC", challenge: "Low recovery rates on overdue accounts with Hindi and Marathi speaking borrowers", result: "41% improvement in recovery rate, 65% reduction in cost per recovery within 3 months" },
  },
  {
    id: "healthcare",
    icon: Stethoscope,
    name: "Healthcare",
    badge: "High Impact",
    problem: "No-show appointments cost hospitals crores annually. Manual reminder calls are labor-intensive and fail to reach patients in their preferred language.",
    solutions: [
      "Automated appointment reminders in the patient's regional language",
      "Post-discharge follow-up calls to check on recovery and medication adherence",
      "Instant transfer to nursing staff for urgent medical queries",
    ],
    dialogue: {
      en: [
        { role: "AI", text: "Good morning! This is MedCare Hospital. We're calling to remind you about your appointment with Dr. Sharma tomorrow at 10:30 AM." },
        { role: "Customer", text: "Oh yes, I'd like to reschedule to the afternoon if possible." },
        { role: "AI", text: "Of course! I have 2:30 PM and 4:00 PM available tomorrow. Which would you prefer?" },
      ],
      hi: [
        { role: "AI", text: "सुप्रभात! मैं MedCare Hospital से बोल रही हूँ। कल सुबह 10:30 बजे डॉ. शर्मा के साथ आपकी अपॉइंटमेंट की याद दिला रही हूँ।" },
        { role: "Customer", text: "हाँ, क्या मैं दोपहर में बदल सकता हूँ?" },
        { role: "AI", text: "बिल्कुल! कल 2:30 PM और 4:00 PM उपलब्ध हैं। आप कौन सा समय पसंद करेंगे?" },
      ],
    },
    metric: { value: "62%", label: "Reduction in No-Shows" },
    caseStudy: { type: "Multi-Specialty Hospital Chain", challenge: "High no-show rate among Tamil and Telugu speaking patients", result: "62% reduction in no-show rate, 28% increase in appointment utilization" },
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    name: "E-commerce",
    badge: "Scale Play",
    problem: "Delivery confirmations, return processing, and order updates overwhelm customer support teams. Tier 2-3 city customers prefer voice over chat.",
    solutions: [
      "Automated delivery confirmation calls in regional languages",
      "AI-powered returns initiation with instant resolution",
      "Proactive order update calls for high-value shipments",
    ],
    dialogue: {
      en: [
        { role: "AI", text: "Hi! Your order #QS-48291 has been dispatched and will arrive by January 18th. Would you like to confirm the delivery address?" },
        { role: "Customer", text: "Yes, but can you deliver it to my office instead?" },
        { role: "AI", text: "Sure! I'll update the address. Could you please share your office address? I'll make sure it's updated before the delivery partner picks it up." },
      ],
      hi: [
        { role: "AI", text: "नमस्ते! आपका ऑर्डर #QS-48291 भेज दिया गया है और 18 जनवरी तक पहुँच जाएगा। क्या आप डिलीवरी का पता कन्फर्म करना चाहेंगे?" },
        { role: "Customer", text: "हाँ, लेकिन क्या आप इसे मेरे ऑफिस पर भेज सकते हैं?" },
        { role: "AI", text: "ज़रूर! मैं पता अपडेट कर देती हूँ। कृपया अपना ऑफिस का पता बताएं।" },
      ],
    },
    metric: { value: "3.2x", label: "Faster Delivery Confirmations" },
    caseStudy: { type: "D2C Logistics Company", challenge: "50K daily delivery confirmations across 8 languages", result: "3.2x faster confirmation rate, 89% first-call resolution" },
  },
  {
    id: "banking",
    icon: Building2,
    name: "Banking & Fintech",
    badge: "Enterprise",
    problem: "Banks struggle with KYC follow-ups, loan disbursement confirmations, and policy renewal calls at scale — especially in regional languages.",
    solutions: [
      "Automated KYC document collection reminders with secure verification",
      "Loan disbursement confirmation and EMI schedule communication",
      "Insurance policy renewal and cross-sell campaigns",
    ],
    dialogue: {
      en: [
        { role: "AI", text: "Hello, I'm calling from SecureBank regarding your home loan application. Your loan of ₹45 lakhs has been approved! I'd like to walk you through the next steps." },
        { role: "Customer", text: "That's great news! What do I need to do?" },
        { role: "AI", text: "You'll need to visit your nearest branch with your PAN card and Aadhaar within 7 days to complete the disbursement. Shall I book an appointment slot for you?" },
      ],
      hi: [
        { role: "AI", text: "नमस्ते, मैं SecureBank से बोल रही हूँ। आपका ₹45 लाख का होम लोन मंज़ूर हो गया है! मैं आपको अगले कदम बताती हूँ।" },
        { role: "Customer", text: "बहुत अच्छी ख़बर! मुझे क्या करना होगा?" },
        { role: "AI", text: "आपको 7 दिनों के अंदर अपने PAN कार्ड और आधार के साथ नज़दीकी ब्रांच जाना होगा। क्या मैं आपके लिए अपॉइंटमेंट बुक करूँ?" },
      ],
    },
    metric: { value: "78%", label: "KYC Completion Rate" },
    caseStudy: { type: "Digital Lending Platform", challenge: "Low KYC completion rates for vernacular-speaking applicants", result: "78% KYC completion rate, 40% reduction in application drop-off" },
  },
  {
    id: "edtech",
    icon: GraduationCap,
    name: "EdTech",
    badge: "Growth",
    problem: "Student engagement and course renewal rates drop when communication is only in English. Parents in Tier 2-3 cities need calls in their language.",
    solutions: [
      "Course renewal reminder campaigns in parent's preferred language",
      "Student engagement check-ins with progress updates",
      "Lead qualification calls for new course enrollments",
    ],
    dialogue: {
      en: [
        { role: "AI", text: "Hi, I'm calling from LearnPro Academy. Arjun's coding course subscription expires in 5 days. He's completed 78% of the syllabus — would you like to renew?" },
        { role: "Customer", text: "How much is the renewal? And does he get the advanced modules too?" },
        { role: "AI", text: "The renewal is ₹2,999 for 3 months, which includes access to all advanced modules plus a certificate. I can apply a 15% early renewal discount if you'd like." },
      ],
      hi: [
        { role: "AI", text: "नमस्ते, मैं LearnPro Academy से बोल रही हूँ। अर्जुन का कोडिंग कोर्स 5 दिन में समाप्त हो रहा है। उसने 78% सिलेबस पूरा कर लिया है — क्या आप रिन्यू करना चाहेंगे?" },
        { role: "Customer", text: "रिन्यूअल कितने का है? और एडवांस्ड मॉड्यूल भी मिलेगा?" },
        { role: "AI", text: "3 महीने का रिन्यूअल ₹2,999 है, जिसमें सभी एडवांस्ड मॉड्यूल और सर्टिफिकेट शामिल है। मैं 15% अर्ली रिन्यूअल डिस्काउंट भी लगा सकती हूँ।" },
      ],
    },
    metric: { value: "54%", label: "Renewal Rate Increase" },
    caseStudy: { type: "K-12 EdTech Platform", challenge: "Low renewal rates among Hindi-belt parents", result: "54% increase in renewal rate, 35% improvement in NPS score" },
  },
  {
    id: "automotive",
    icon: Car,
    name: "Automotive",
    badge: "Lead Gen",
    problem: "Auto dealerships lose leads because follow-up calls are delayed, inconsistent, and rarely in the customer's preferred language.",
    solutions: [
      "Instant lead follow-up calls within 2 minutes of inquiry",
      "Test drive scheduling with automated reminders",
      "Post-purchase service reminders and feedback collection",
    ],
    dialogue: {
      en: [
        { role: "AI", text: "Hello! Thank you for your interest in the Tata Nexon EV. I'm calling to help you schedule a test drive at our nearest showroom. When would be convenient?" },
        { role: "Customer", text: "This Saturday morning would work. Do you have the Fearless+ variant in stock?" },
        { role: "AI", text: "Yes, the Fearless+ in Pristine White is available! I've booked your test drive for Saturday at 10:30 AM at our Koramangala showroom. You'll receive a confirmation SMS shortly." },
      ],
      hi: [
        { role: "AI", text: "नमस्ते! Tata Nexon EV में आपकी रुचि के लिए धन्यवाद। मैं आपके लिए टेस्ट ड्राइव शेड्यूल करने में मदद करना चाहती हूँ। कब सुविधाजनक होगा?" },
        { role: "Customer", text: "इस शनिवार सुबह चलेगा। क्या Fearless+ वेरिएंट उपलब्ध है?" },
        { role: "AI", text: "हाँ, Pristine White में Fearless+ उपलब्ध है! शनिवार सुबह 10:30 बजे कोरमंगला शोरूम में टेस्ट ड्राइव बुक कर दिया है।" },
      ],
    },
    metric: { value: "3.5x", label: "Lead Conversion Rate" },
    caseStudy: { type: "Multi-Brand Auto Dealer", challenge: "Slow lead response times and language gaps", result: "3.5x improvement in lead conversion, average response time reduced to under 2 minutes" },
  },
  {
    id: "realestate",
    icon: Home,
    name: "Real Estate",
    badge: "High Ticket",
    problem: "Real estate leads go cold quickly. Most brokers can't follow up in multiple languages, leading to lost opportunities with NRI and regional buyers.",
    solutions: [
      "Immediate follow-up on property portal inquiries in regional languages",
      "Automated site visit scheduling with confirmation and reminders",
      "Post-visit feedback collection and nurturing sequences",
    ],
    dialogue: {
      en: [
        { role: "AI", text: "Hi, I'm calling from Prestige Group regarding your inquiry about Prestige Lakeside. We have 3BHK units starting from ₹1.2 Cr. Would you like to schedule a site visit?" },
        { role: "Customer", text: "Yes, but I'm based in Chennai. Can I do a virtual tour first?" },
        { role: "AI", text: "Absolutely! I can set up a virtual walkthrough with our sales manager. Would tomorrow at 3 PM work for you?" },
      ],
      hi: [
        { role: "AI", text: "नमस्ते, मैं Prestige Group से बोल रही हूँ। Prestige Lakeside में 3BHK ₹1.2 करोड़ से शुरू हैं। क्या आप साइट विज़िट शेड्यूल करना चाहेंगे?" },
        { role: "Customer", text: "हाँ, लेकिन मैं चेन्नई में हूँ। क्या पहले वर्चुअल टूर हो सकता है?" },
        { role: "AI", text: "बिल्कुल! मैं हमारे सेल्स मैनेजर के साथ वर्चुअल वॉकथ्रू सेट कर सकती हूँ। क्या कल दोपहर 3 बजे चलेगा?" },
      ],
    },
    metric: { value: "28%", label: "Site Visit Conversion" },
    caseStudy: { type: "Premium Residential Developer", challenge: "Low site visit conversion from online leads", result: "28% site visit conversion rate, 2.1x improvement in lead-to-visit ratio" },
  },
  {
    id: "retail",
    icon: Store,
    name: "Retail & D2C",
    badge: "Engagement",
    problem: "Customer feedback collection is expensive and response rates are abysmal. Loyalty program engagement drops without personalized communication.",
    solutions: [
      "Post-purchase NPS and CSAT collection via voice in regional languages",
      "Loyalty program activation and reward redemption reminders",
      "Personalized product recommendation calls based on purchase history",
    ],
    dialogue: {
      en: [
        { role: "AI", text: "Hi Meera! Thank you for shopping with us. We'd love your feedback on your recent purchase. On a scale of 1 to 10, how satisfied are you with the product quality?" },
        { role: "Customer", text: "I'd say 8. The fabric is nice but delivery was a bit slow." },
        { role: "AI", text: "Thank you for that feedback! I've noted the delivery concern. As a thank you, I've added 200 loyalty points to your account. You also have a ₹300 coupon waiting — shall I send the details via WhatsApp?" },
      ],
      hi: [
        { role: "AI", text: "नमस्ते मीरा! हमारे साथ शॉपिंग के लिए धन्यवाद। 1 से 10 में, प्रोडक्ट क्वालिटी से आप कितने संतुष्ट हैं?" },
        { role: "Customer", text: "मैं 8 दूँगी। कपड़ा अच्छा है लेकिन डिलीवरी थोड़ी देर से हुई।" },
        { role: "AI", text: "फीडबैक के लिए धन्यवाद! मैंने डिलीवरी की बात नोट कर ली है। धन्यवाद के रूप में 200 लॉयल्टी पॉइंट्स जोड़ दिए हैं और ₹300 का कूपन भी है — WhatsApp पर भेजूँ?" },
      ],
    },
    metric: { value: "4.8x", label: "Feedback Response Rate" },
    caseStudy: { type: "Fashion D2C Brand", challenge: "Low NPS response rates and limited regional language support", result: "4.8x increase in feedback response rate, NPS improved from 32 to 61" },
  },
];

function DialogueBubble({ role, text }: { role: string; text: string }) {
  const isAI = role === "AI";
  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
        isAI
          ? "bg-indigo-light text-foreground rounded-bl-sm"
          : "bg-card border border-border text-foreground rounded-br-sm"
      }`}>
        <p className="text-[10px] font-semibold text-text-muted mb-1">{isAI ? "🤖 AI Agent" : "👤 Customer"}</p>
        <p className="leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function SolutionsPage() {
  const [activeTab, setActiveTab] = useState("collections");
  const [langToggle, setLangToggle] = useState<Record<string, "en" | "hi">>({});

  const active = industries.find((i) => i.id === activeTab)!;
  const Icon = active.icon;
  const currentLang = langToggle[activeTab] || "en";

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="mesh-gradient py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center rounded-full bg-indigo-light px-4 py-1.5 text-xs font-semibold text-indigo mb-6">Solutions</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              AI Voice Solutions for
              <br />
              <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">Every Industry</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base text-text-secondary sm:text-lg">
              Explore how VakMithra AI transforms voice operations across 8 major industries in India.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Industry Tabs */}
      <section className="sticky top-16 z-30 border-b border-border bg-card/95 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {industries.map((ind) => {
              const TabIcon = ind.icon;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                    activeTab === ind.id
                      ? "bg-indigo text-primary-foreground shadow-sm"
                      : "text-text-muted hover:bg-surface-alt hover:text-foreground"
                  }`}
                >
                  <TabIcon className="h-3.5 w-3.5" />
                  {ind.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Industry Content */}
      <motion.section
        key={activeTab}
        className="py-16 lg:py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-12 flex items-start gap-4">
            <div className="rounded-2xl bg-indigo-light p-4">
              <Icon className="h-8 w-8 text-indigo" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-display text-3xl font-bold text-foreground">{active.name}</h2>
                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">{active.badge}</span>
              </div>
              <p className="max-w-2xl text-base text-text-secondary">{active.problem}</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: Solutions + Metric + Case Study */}
            <div className="space-y-8">
              {/* Solutions */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">How VakMithra AI Solves It</h3>
                <ul className="space-y-4">
                  {active.solutions.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success text-xs font-bold">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Metric */}
              <div className="rounded-2xl border border-border bg-gradient-to-br from-indigo-light to-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-indigo" />
                  <span className="text-xs font-semibold text-indigo">Key Result</span>
                </div>
                <p className="mt-3 font-display text-4xl font-bold text-indigo">{active.metric.value}</p>
                <p className="mt-1 text-sm text-text-muted">{active.metric.label}</p>
              </div>

              {/* Case Study */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h4 className="text-xs font-semibold text-indigo mb-3">MINI CASE STUDY</h4>
                <p className="text-sm font-semibold text-foreground mb-1">{active.caseStudy.type}</p>
                <p className="text-sm text-text-muted mb-2"><strong>Challenge:</strong> {active.caseStudy.challenge}</p>
                <p className="text-sm text-success"><strong>Result:</strong> {active.caseStudy.result}</p>
              </div>
            </div>

            {/* Right: Sample Dialogue */}
            <div className="rounded-2xl border border-border bg-surface-alt p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-bold text-foreground">Sample Conversation</h3>
                <div className="flex rounded-lg bg-card border border-border p-0.5">
                  <button
                    onClick={() => setLangToggle({ ...langToggle, [activeTab]: "en" })}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${currentLang === "en" ? "bg-indigo text-primary-foreground" : "text-text-muted"}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLangToggle({ ...langToggle, [activeTab]: "hi" })}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${currentLang === "hi" ? "bg-indigo text-primary-foreground" : "text-text-muted"}`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {active.dialogue[currentLang].map((msg, i) => (
                  <motion.div
                    key={`${currentLang}-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <DialogueBubble role={msg.role} text={msg.text} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <section className="bg-indigo py-16">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo via-indigo to-cyan opacity-90 -mx-6" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-primary-foreground">Find Your Industry Solution</h2>
            <p className="mt-3 text-primary-foreground/80">Our team will customize a demo based on your specific use case.</p>
            <Link to="/demo" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-card px-8 py-4 font-semibold text-indigo shadow-lg transition-all hover:shadow-xl">
              Book a Demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
