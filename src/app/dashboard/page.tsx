"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { 
  Search, Download, Globe, Building2, MapPin, Phone, Mail, 
  Sparkles, Star, Loader2, AlertCircle, ShieldCheck
} from "lucide-react";

interface Lead {
  id: string;
  google_place_id: string;
  company_name: string;
  website?: string;
  phone?: string;
  verified_email?: string;
  email_status: string;
  address?: string;
  city: string;
  country: string;
  google_rating: number;
  reviews_count: number;
  lead_score: number;
  seo_score: number;
}

const SUPPORTED_COUNTRIES = [
  { name: "United States", flag: "🇺🇸" },
  { name: "India", flag: "🇮🇳" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
];

export default function WorkstationPage() {
  const [keyword, setKeyword] = useState("Dentists");
  const [city, setCity] = useState("New York");
  const [country, setCountry] = useState("United States");
  const [limit, setLimit] = useState(20);

  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Strict Geo Isolation: Clear screen state when country changes
  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    setLeads([]);
    setTotal(0);
    setErrorMsg(null);
  };

  const executeExtraction = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!keyword.trim() || !city.trim()) {
      setErrorMsg("Please enter both Keyword and City.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await api.get("/leads/search", {
        params: {
          keyword: keyword.trim(),
          city: city.trim(),
          country: country.trim(),
          page: 1,
          limit: limit,
        },
      });

      setLeads(res.data.leads || []);
      setTotal(res.data.total || 0);
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.detail || "Live extraction pipeline failed. Please retry."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-8 flex flex-col gap-6 font-sans">
      {/* Top Header Controls */}
      <header className="flex justify-between items-center border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            Scrapely<span className="text-purple-500">.ai</span>
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded-full font-bold">
              Enterprise Live
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-Time Verified Business & Contact Intelligence Swarm
          </p>
        </div>
      </header>

      {/* Primary Workstation Form */}
      <form onSubmit={executeExtraction} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 grid md:grid-cols-5 gap-4">
        <div>
          <label className="text-xs text-slate-400 font-bold mb-1 block">Industry / Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. Lawyers, Dentists"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 font-bold mb-1 block">Target City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. London, Sydney"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 font-bold mb-1 block">Target Country</label>
          <select
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            {SUPPORTED_COUNTRIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-400 font-bold mb-1 block">Records</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value={20}>20 Leads</option>
            <option value={50}>50 Leads</option>
            <option value={100}>100 Leads</option>
            <option value={250}>250 Leads</option>
            <option value={500}>500 Leads</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Extract Live Leads
          </button>
        </div>
      </form>

      {/* Error Output */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
        </div>
      )}

      {/* Live Stream Grid */}
      <main className="bg-slate-900/30 rounded-2xl border border-slate-800 overflow-hidden flex-1">
        <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-400 flex justify-between items-center">
          <span>Active Location: {city}, {country} ({total} Verified Entities)</span>
        </div>

        {loading ? (
          <div className="p-16 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
            <span>Processing multi-provider extraction pipeline across {country}...</span>
          </div>
        ) : leads.length > 0 ? (
          <div className="divide-y divide-slate-800/60">
            {leads.map((lead) => (
              <div key={lead.id} className="p-5 flex items-center justify-between hover:bg-slate-800/20 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-400" /> {lead.company_name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Score {lead.lead_score}/100
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span><MapPin className="w-3.5 h-3.5 inline text-slate-500" /> {lead.address || `${city}, ${country}`}</span>
                    <span><Phone className="w-3.5 h-3.5 inline text-slate-500" /> {lead.phone || "Listed Direct"}</span>
                    <span className="text-purple-300">
                      <Mail className="w-3.5 h-3.5 inline text-purple-400" /> {lead.verified_email || "Email Not Found"}
                    </span>
                    <span className="text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 inline fill-amber-400" /> {lead.google_rating} ({lead.reviews_count} reviews)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-slate-500">
            Zero records found for this query. Execute a search above to stream live data.
          </div>
        )}
      </main>
    </div>
  );
}
