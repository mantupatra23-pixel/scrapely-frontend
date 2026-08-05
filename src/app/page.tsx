"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Building2, Phone, MapPin, Star, ArrowRight, ShieldCheck, Zap } from "lucide-react";
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
      const res = await api.get(`/leads/search?search=${encodeURIComponent(query.split(" in ")[0] || query)}&limit=5`);
      setLeads(res.data.leads || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between">
      {/* Sticky Fixed Navbar */}
      <header className="glass-nav fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-button flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/30">
              S
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Scrapely<span className="text-purple-400">.ai</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#demo" className="hover:text-white transition-colors">Live Demo</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
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
      <main className="flex-1 pt-36 pb-20 px-6 max-w-6xl mx-auto text-center relative w-full">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 blur-[160px] rounded-full -z-10 pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-300 mb-8 border border-purple-500/20 shadow-inner">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Autonomous AI B2B Scraping Engine v1.0</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.15] mb-6">
            Extract Verified B2B Leads <br className="hidden sm:inline" />
            <span className="gradient-text">On Autopilot In Seconds</span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
            Target local businesses, extract contacts, verify emails, and export clean CSVs automatically with zero proxy management required.
          </p>
        </motion.div>

        {/* Live Search Interactive Component */}
        <div id="demo" className="max-w-2xl mx-auto mb-16">
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

          {/* Results Live Table Container */}
          {hasSearched && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 glass-card rounded-2xl p-5 text-left border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Scraped Data Output</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Verified Data
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
                  No cached leads found for this exact term. Log in to trigger real-time Playwright worker!
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Scrapely AI. All rights reserved. Powered by Autonomous Playwright Engines.</p>
      </footer>
    </div>
  );
}
