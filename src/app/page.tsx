"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Building2, Phone, Mail, MapPin, Star, ArrowRight, ShieldCheck, Download, Zap } from "lucide-react";
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

  const handleLiveScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setHasSearched(true);
    try {
      // Temporary token-free demo or live search trigger
      const res = await api.get(`/leads/search?search=${encodeURIComponent(query.split(" in ")[0] || query)}&limit=5`);
      setLeads(res.data.leads || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-purple-500 selection:text-white">
      {/* Navbar */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-button flex items-center justify-center font-bold text-xl shadow-lg">
            S
          </div>
          <span className="text-xl font-extrabold tracking-tight">Scrapely<span className="text-purple-400">.ai</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#demo" className="hover:text-white transition">Live Demo</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm font-medium hover:text-white transition">Sign In</a>
          <a href="/register" className="gradient-button px-4 py-2 rounded-lg text-sm font-semibold shadow-md">
            Get Started Free
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 max-w-6xl mx-auto text-center relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[140px] rounded-full -z-10 pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs text-purple-300 mb-6 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Autonomous AI B2B Scraping Engine v1.0</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Extract Verified B2B Leads <br />
            <span className="gradient-text">On Autopilot In Seconds</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Target local businesses, extract contacts, verify emails, and export clean CSVs automatically with zero proxy management required.
          </p>
        </motion.div>

        {/* Live Search Interactive Demo */}
        <div id="demo" className="max-w-3xl mx-auto mb-16">
          <form onSubmit={handleLiveScrape} className="glass-card p-2 rounded-2xl flex items-center gap-2 border border-slate-700/50 shadow-2xl">
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Dentists in New Delhi or Salons in Mumbai"
              className="bg-transparent flex-1 text-slate-100 placeholder-slate-500 focus:outline-none text-sm md:text-base px-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="gradient-button px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <span>Scraping...</span>
              ) : (
                <>
                  <span>Extract Leads</span>
                  <Zap className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Results Table Preview */}
          {hasSearched && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 glass-card rounded-2xl p-4 text-left border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Scraped Data Preview</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Verified Output</span>
              </div>

              {leads.length > 0 ? (
                <div className="space-y-3">
                  {leads.map((lead, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/60 rounded-xl flex items-center justify-between hover:bg-slate-800/50 transition">
                      <div>
                        <h4 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-purple-400" />
                          {lead.company_name}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                          {lead.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {lead.city}</span>}
                          {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>}
                          {lead.rating && <span className="flex items-center gap-1 text-amber-400"><Star className="w-3 h-3 fill-amber-400" /> {lead.rating}</span>}
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2.5 py-1 bg-purple-500/10 text-purple-300 rounded-lg border border-purple-500/20">
                        {lead.category || "Business"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 text-sm">
                  No cached leads found for this exact string. Login to trigger real-time Playwright worker!
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-10 text-center text-xs text-slate-500">
        <p>© 2026 Scrapely AI. All rights reserved. Powered by Autonomous Playwright Engines.</p>
      </footer>
    </div>
  );
}
