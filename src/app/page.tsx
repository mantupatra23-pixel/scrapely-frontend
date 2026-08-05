"use client";

import { useState } from "react";
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
  HelpCircle,
  Users,
  Globe2,
  TrendingUp,
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleLiveScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const res = await api.get(
        `/leads/search?search=${encodeURIComponent(query.split(" in ")[0] || query)}&limit=5`
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
      description: "Extract verified business details, contacts, and emails across thousands of cities in real time.",
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-indigo-400" />,
      title: "One-Click CSV Export",
      description: "Download fully formatted, clean CSV reports instantly ready for your CRM outreach.",
    },
    {
      icon: <Key className="w-6 h-6 text-sky-400" />,
      title: "Developer API Access",
      description: "Integrate automated scraping workers directly into your custom software using REST endpoints.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
      title: "Usage & Analytics Dashboard",
      description: "Monitor API quota, search history, export logs, and extraction speeds in one unified portal.",
    },
    {
      icon: <Lock className="w-6 h-6 text-amber-400" />,
      title: "Built-in Proxy Rotation",
      description: "Zero IP blocks or CAPTCHAs. Our headless browser swarm handles anti-bot systems automatically.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-pink-400" />,
      title: "Data Verification Engine",
      description: "All scraped emails and phone numbers pass through instant syntax and deliverability checks.",
    },
  ];

  const pricingPlans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "forever",
      description: "Perfect for testing extraction quality and small campaigns.",
      features: ["50 Free Credits / Month", "Standard Search Speed", "CSV Export", "Community Support"],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Ideal for freelancers, solo agencies, and local marketers.",
      features: ["2,500 Credits / Month", "Fast Scrape Workers", "Unlimited CSV Exports", "REST API Access", "Email Support"],
      cta: "Upgrade to Starter",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$99",
      period: "per month",
      description: "Designed for scaling sales teams and growth agencies.",
      features: ["15,000 Credits / Month", "Priority Scrape Swarm", "Webhooks & Automation", "Dedicated API Key", "24/7 Priority Support"],
      cta: "Get Pro Access",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "volume pricing",
      description: "For large enterprise software and high-frequency scrapers.",
      features: ["Unlimited Credits", "Dedicated Proxy Pool", "Custom Data Parsers", "99.9% Uptime SLA", "Dedicated Account Manager"],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  const faqs = [
    {
      q: "How does Scrapely extract business leads?",
      a: "Scrapely utilizes headless Playwright browser workers to query and parse public business directories in real time, validating contact details instantly.",
    },
    {
      q: "Do I need to set up proxies or headless browsers?",
      a: "No! Everything is managed autonomously on our backend infrastructure. You just enter your search term or trigger our REST API.",
    },
    {
      q: "Can I export data directly to CSV?",
      a: "Yes! Every search result can be exported into a clean, CRM-ready CSV file with a single click.",
    },
    {
      q: "What happens if a scrape task fails?",
      a: "Credits are only deducted for successfully parsed leads. Unsuccessful tasks are automatically retried without charging your account.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-purple-500 selection:text-white scroll-smooth">
      {/* Navbar */}
      <header className="glass-nav fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-button flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/30">
              S
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Scrapely<span className="text-purple-400">.ai</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
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

          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-3 py-2">
              Sign In
            </a>
            <a href="/register" className="gradient-button px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg shadow-purple-600/20">
              Get Started Free
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 max-w-6xl mx-auto text-center relative w-full">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 blur-[160px] rounded-full -z-10 pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 mb-8 border border-purple-500/20 shadow-inner">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Autonomous AI B2B Scraping Engine v1.0</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.15] mb-6">
            Extract Verified B2B Leads <br className="hidden sm:inline" />
            <span className="gradient-text">On Autopilot In Seconds</span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Target local businesses, extract contacts, verify emails, and export clean CSVs automatically with zero proxy management required.
          </p>
        </motion.div>

        {/* Live Search Interactive Section */}
        <div id="demo" className="max-w-3xl mx-auto mb-20">
          <form onSubmit={handleLiveScrape} className="glass-card p-2 rounded-2xl flex items-center gap-3 border border-slate-700/60 shadow-2xl">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Dentists in New Delhi"
              className="bg-transparent flex-1 text-slate-100 placeholder-slate-500 focus:outline-none text-sm md:text-base py-2 px-1"
            />
            <button
              type="submit"
              disabled={loading}
              className="gradient-button px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2 shadow-lg shrink-0 disabled:opacity-50"
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
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 glass-card rounded-2xl p-5 text-left border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Scraped Data Output</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Verified Output
                </span>
              </div>

              {leads.length > 0 ? (
                <div className="space-y-3">
                  {leads.map((lead, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/80 rounded-xl flex items-center justify-between hover:bg-slate-800/60 transition border border-slate-800/50">
                      <div>
                        <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-purple-400" />
                          {lead.company_name}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                          {lead.city && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {lead.city}</span>}
                          {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {lead.phone}</span>}
                          {lead.rating && <span className="flex items-center gap-1 text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" /> {lead.rating}</span>}
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 bg-purple-500/10 text-purple-300 rounded-lg border border-purple-500/20">
                        {lead.category || "Business"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 text-sm">
                  No cached leads found for this search. Login to trigger real-time Playwright worker!
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Animated Statistics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 glass-card p-8 rounded-3xl border border-slate-800">
          <div>
            <h3 className="text-3xl font-black text-white mb-1">10M+</h3>
            <p className="text-xs text-slate-400">Leads Extracted</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-purple-400 mb-1">99.4%</h3>
            <p className="text-xs text-slate-400">Data Accuracy</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-indigo-400 mb-1">&lt; 2s</h3>
            <p className="text-xs text-slate-400">Average Response Time</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-emerald-400 mb-1">2,400+</h3>
            <p className="text-xs text-slate-400">Active Growth Agencies</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Everything You Need To <span className="gradient-text">Scale Lead Gen</span>
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
              className="glass-card p-8 rounded-2xl border border-slate-800/80 hover:border-purple-500/40 transition"
            >
              <div className="p-3 bg-slate-900 rounded-xl w-fit mb-6 border border-slate-800">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            Choose the plan that fits your growth needs. Upgrade or cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-3xl flex flex-col justify-between relative border ${
                plan.highlighted ? "border-purple-500 bg-purple-950/20 shadow-2xl shadow-purple-900/20" : "border-slate-800"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-white text-[10px] uppercase font-black rounded-full tracking-wider">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-6 min-h-[32px]">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-xs text-slate-400">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="/register"
                className={`w-full py-3 rounded-xl font-bold text-center text-xs transition ${
                  plan.highlighted
                    ? "gradient-button text-white shadow-lg shadow-purple-600/30"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto border-t border-slate-800/60">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400 text-sm">Got questions? We've got answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left font-bold text-sm md:text-base flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? "rotate-180 text-purple-400" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-xs md:text-sm text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg gradient-button flex items-center justify-center font-bold text-white">S</div>
            <span className="font-bold text-slate-300">Scrapely AI</span>
          </div>
          <p>© 2026 Scrapely AI. All rights reserved. Powered by Autonomous Playwright Engines.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition">Terms of Service</a>
            <a href="/docs" className="hover:text-slate-300 transition">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
