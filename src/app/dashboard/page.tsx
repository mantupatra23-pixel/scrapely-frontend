"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { 
  Building2, MapPin, Phone, Mail, Star, Loader2, AlertCircle, Sparkles, Globe
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

const COUNTRIES = [
  { name: "United States", flag: "🇺🇸" },
  { name: "India", flag: "🇮🇳" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
];

export default function LeadWorkstation() {
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("United States");
  const [limit, setLimit] = useState(20);

  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState(false);

  const handleCountryChange = (val: string) => {
    setCountry(val);
    setLeads([]);
    setTotal(0);
    setSearched(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || !city.trim()) return;

    setLoading(true);
    setSearched(true);

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
    } catch (err) {
      setLeads([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-8 flex flex-col gap-6 font-sans">
      {/* Search Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white">
          Scrapely<span className="text-purple-500">.ai</span> Live Lead Engine
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Strict Multi-Provider Live API Business Extraction
        </p>
      </div>

      {/* Control Bar */}
      <form onSubmit={handleSearch} className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 grid md:grid-cols-5 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-400 block mb-1">Keyword</label>
          <input
            type="text"
            required
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. Dentists"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-400 block mb-1">City</label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. New Delhi"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-400 block mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            {COUNTRIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-400 block mb-1">Records Limit</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value={20}>20 Leads</option>
            <option value={50}>50 Leads</option>
            <option value={100}>100 Leads</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Extract Live Leads
          </button>
        </div>
      </form>

      {/* Results View */}
      <main className="bg-slate-900/30 rounded-xl border border-slate-800 overflow-hidden flex-1">
        <div className="p-4 border-b border-slate-800 text-xs font-semibold text-slate-400">
          Stream Status: {searched ? `${total} Verified Entities Found in ${city}, ${country}` : "Idle"}
        </div>

        {loading ? (
          <div className="p-16 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
            <span>Querying Live Google Places, Geocoding & Discovery APIs...</span>
          </div>
        ) : leads.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {leads.map((lead) => (
              <div key={lead.id} className="p-4 flex items-center justify-between hover:bg-slate-800/20 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-400" /> {lead.company_name}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Score {lead.lead_score}/100
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span><MapPin className="w-3.5 h-3.5 inline text-slate-500" /> {lead.address || `${lead.city}, ${lead.country}`}</span>
                    <span><Phone className="w-3.5 h-3.5 inline text-slate-500" /> {lead.phone || "No Verified Phone"}</span>
                    <span className={lead.verified_email ? "text-purple-300" : "text-slate-500"}>
                      <Mail className="w-3.5 h-3.5 inline" /> {lead.verified_email || "Email Status: NOT_FOUND"}
                    </span>
                    <span className="text-amber-400 font-medium">
                      <Star className="w-3.5 h-3.5 inline fill-amber-400" /> {lead.google_rating} ({lead.reviews_count} reviews)
                    </span>
                  </div>
                </div>

                {lead.website && (
                  <a href={lead.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300">
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : searched ? (
          <div className="p-16 text-center text-sm font-semibold text-slate-400 flex flex-col items-center justify-center gap-2">
            <AlertCircle className="w-6 h-6 text-amber-500" />
            <span>No verified businesses found.</span>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-slate-500">
            Enter a search term and city to begin real-time extraction.
          </div>
        )}
      </main>
    </div>
  );
}
