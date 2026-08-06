"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  Building2,
  Phone,
  MapPin,
  Star,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  FileSpreadsheet,
  Key,
  BarChart3,
  Lock,
  ChevronDown,
} from "lucide-react";
import { api } from "@/lib/api";

interface Lead {
  id: string;
  company_name: string;
  phone?: string;
  email?: string;
  city?: string;
  category?: string;
  rating?: number;
}

export default function LandingPage() {
  const [query, setQuery] = useState("Dentists in New Delhi");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleLiveScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const res = await api.get(
        `/leads/search?search=${encodeURIComponent(query)}`
      );
      setLeads(res.data.leads || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Search className="w-6 h-6 text-purple-400" />,
      title: "Targeted Lead Extraction",
      description:
        "Extract verified business details, contacts, and emails across thousands of cities in real time.",
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-indigo-400" />,
      title: "One-Click CSV Export",
      description:
        "Download fully formatted, clean CSV reports instantly ready for your CRM outreach.",
    },
    {
      icon: <Key className="w-6 h-6 text-sky-400" />,
      title: "Developer API Access",
      description:
        "Integrate automated scraping workflows directly into your custom software using REST endpoints.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
      title: "Usage & Analytics Dashboard",
      description:
        "Monitor API quota, search history, export logs, and extraction speeds in one unified panel.",
    },
    {
      icon: <Lock className="w-6 h-6 text-amber-400" />,
      title: "Built-in Proxy Rotation",
      description:
        "Zero IP blocks or CAPTCHAs. Our headless browser swarm handles anti-bot systems automatically.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-pink-400" />,
      title: "Data Verification Engine",
      description:
        "All scraped emails and phone numbers pass through instant syntax and deliverability checks.",
    },
  ];

  const pricingPlans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "forever",
      description: "Perfect for testing extraction quality.",
      features: [
        "50 Free Credits / Month",
        "Standard Speed Extraction",
        "Basic CSV Export",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Ideal for freelancers and solo agencies.",
      features: [
        "2,500 Credits / Month",
        "Fast Scraping Priority",
        "Full Data Enriched CSV",
        "Email Verification",
      ],
      cta: "Upgrade to Starter",
      highlighted: true,
    },
    {
      name: "Pro",
      price: "$79",
      period: "per month",
      description: "Designed for scaling sales teams.",
      features: [
        "10,000 Credits / Month",
        "Max Speed Multi-threading",
        "REST API Access & Webhooks",
        "Priority Support",
      ],
      cta: "Go Pro",
      highlighted: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "volume pricing",
      description: "For large enterprise software integration.",
      features: [
        "Unlimited Credits",
        "Dedicated Proxies",
        "Custom Scraper Engines",
        "24/7 SLA Support",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  const faqs = [
    {
      q: "How does Scrapely extract business leads?",
      a: "Scrapely utilizes headless Playwright browser automation combined with live API aggregators to extract real-time entity data from Google Maps, business registries, and open web signals.",
    },
    {
      q: "Do I need to set up proxies or headless browsers?",
      a: "No! Everything is managed autonomously on our cloud infrastructure. You just enter your search term and get structured lead records.",
    },
    {
      q: "Can I export data directly to CSV?",
      a: "Yes! Every search result can be exported instantly to CSV, Excel, or JSON formats ready for cold outreach.",
    },
    {
      q: "What happens if a scrape task fails?",
      a: "Credits are only deducted for successfully scraped and verified records. Failed or empty queries cost 0 credits.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Navbar */}
      <header className="glass-nav fixed top-0 left-0 right-0 z-50 border-b border-slate-800/80 bg-[#0b0c10]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
              S
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Scrapely<span className="text-purple-400">.ai</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#demo" className="hover:text-white transition-colors">
              Live Demo
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* UPDATED NAVIGATION BUTTONS */}
          <div className="flex items-center gap-4">
            <Link
              href="/search"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/search"
              className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-500 hover:to-indigo-500"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 max-w-6xl mx-auto text-center relative">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Autonomous AI B2B Scraping Engine v1.0</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Extract Verified B2B Leads <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-600 bg-clip-text text-transparent">
              On Autopilot In Seconds
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10">
            Target local businesses, extract contacts, verify emails, and export clean CSVs automatically with zero proxy management required.
          </p>
        </motion.div>

        {/* Live Search Interactive Section */}
        <div id="demo" className="max-w-3xl mx-auto mb-16">
          <form
            onSubmit={handleLiveScrape}
            className="flex items-center gap-2 p-2 rounded-2xl bg-[#13151d] border border-slate-800 shadow-2xl focus-within:border-purple-500/50 transition-all"
          >
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Dentists in New Delhi"
              className="bg-transparent flex-1 text-sm text-white focus:outline-none px-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <span>Scraping...</span>
              ) : (
                <>
                  <span>Extract Leads</span>
                  <Zap className="w-4 h-4 fill-white" />
                </>
              )}
            </button>
          </form>

          {/* Results Live Table Preview */}
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-2xl bg-[#13151d] border border-slate-800 text-left"
            >
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-300">Live Scraped Entities</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-4 h-4" /> Live Stream Active
                </span>
              </div>

              {leads.length > 0 ? (
                <div className="space-y-3">
                  {leads.map((lead, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <div>
                        <h4 className="font-bold text-white flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-purple-400" />
                          {lead.company_name}
                        </h4>
                        <div className="flex items-center gap-3 text-slate-400 mt-1">
                          {lead.city && <span><MapPin className="w-3 h-3 inline mr-1" />{lead.city}</span>}
                          {lead.phone && <span><Phone className="w-3 h-3 inline mr-1" />{lead.phone}</span>}
                          {lead.rating && <span className="text-amber-400"><Star className="w-3 h-3 inline fill-amber-400 mr-1" />{lead.rating}</span>}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
                        {lead.category || "Business"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-500">
                  No cached leads found for this search. Click Extract to trigger live engines.
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Animated Statistics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#13151d] border border-slate-800/80 max-w-4xl mx-auto">
          <div>
            <h3 className="text-3xl font-black text-white">10M+</h3>
            <p className="text-xs text-slate-400 mt-1">Leads Extracted</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-purple-400">99.4%</h3>
            <p className="text-xs text-slate-400 mt-1">Data Accuracy</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-white">&lt; 2s</h3>
            <p className="text-xs text-slate-400 mt-1">Average Response Time</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-emerald-400">2,400+</h3>
            <p className="text-xs text-slate-400 mt-1">Active Growth Agencies</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Everything You Need To <span className="text-purple-400">Scale Lead Gen</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            Engineered for high-frequency data extraction without technical complexities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-[#13151d] border border-slate-800/80 hover:border-purple-500/40 transition-all shadow-xl"
            >
              <div className="p-3 bg-slate-900 rounded-xl w-fit mb-5 border border-slate-800">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Simple, Transparent <span className="text-purple-400">Pricing</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            Choose the plan that fits your growth needs.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl bg-[#13151d] border relative flex flex-col justify-between ${
                plan.highlighted
                  ? "border-purple-500 shadow-2xl shadow-purple-950/40"
                  : "border-slate-800"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full border border-purple-400">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/search"
                className={`w-full py-3 rounded-xl font-semibold text-xs text-center transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Frequently Asked <span className="text-purple-400">Questions</span>
          </h2>
          <p className="text-slate-400 text-sm">Got questions? We've got answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#13151d] border border-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left font-semibold text-sm text-white flex items-center justify-between hover:text-purple-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    openFaq === idx ? "rotate-180 text-purple-400" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0b0c10] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
              S
            </div>
            <span className="font-bold text-slate-300 text-sm">
              © 2026 Scrapely.ai. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-200 transition-colors">
              Terms of Service
            </a>
            <a href="/docs" className="hover:text-slate-200 transition-colors">
              API Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
