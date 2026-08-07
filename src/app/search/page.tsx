"use client";

import React, { useState } from "react";
import {
  Search,
  Zap,
  Building2,
  MapPin,
  Phone,
  Mail,
  Star,
  Loader2,
  AlertCircle,
  Globe,
  Download,
} from "lucide-react";

export default function LeadSearchPage() {
  const [keyword, setKeyword] = useState("Dentists");
  const [city, setCity] = useState("New Delhi");
  const [country, setCountry] = useState("India");
  const [limit, setLimit] = useState(20);

  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const handleExecuteSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || !city.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(
        `https://scrapely-backend.onrender.com/api/v1/leads/search?keyword=${encodeURIComponent(
          keyword
        )}&city=${encodeURIComponent(city)}&country=${encodeURIComponent(
          country
        )}&limit=${limit}`
      );
      const data = await res.json();
      setLeads(data?.leads || []);
    } catch (err) {
      console.error(err);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full">
      {/* Search Header Form */}
      <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-800 shadow-xl w-full">
        <h1 className="text-xl font-bold text-white mb-1">
          Targeted B2B Lead Extraction
        </h1>
        <p className="text-xs text-slate-400 mb-6">
          Query live Google Places aggregators with autonomous email verification.
        </p>

        <form onSubmit={handleExecuteSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Industry / Role</label>
            <input
              type="text"
              required
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. Dentists"
              className="w-full rounded-xl bg-[#0f172a] border border-slate-700 p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Target City</label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. New Delhi"
              className="w-full rounded-xl bg-[#0f172a] border border-slate-700 p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl bg-[#0f172a] border border-slate-700 p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="India">🇮🇳 India</option>
              <option value="United States">🇺🇸 United States</option>
              <option value="United Kingdom">🇬🇧 United Kingdom</option>
              <option value="Canada">🇨🇦 Canada</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Records</label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full rounded-xl bg-[#0f172a] border border-slate-700 p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
            >
              <option value={20}>20 Records</option>
              <option value={50}>50 Records</option>
              <option value={100}>100 Records</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4 fill-white" />
              )}
              <span>Execute Extraction</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Workspace Panel */}
      <div className="rounded-2xl bg-[#1e293b] border border-slate-800 p-6 shadow-xl w-full">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <span className="text-xs font-bold text-slate-300">
            Stream Stream: {city}, {country} ({leads.length} Records)
          </span>
          {leads.length > 0 && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-700">
              <Download size={14} /> Export CSV
            </button>
          )}
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
            <span>Parsing Live Google Places Signal & Verifying Email Entities...</span>
          </div>
        ) : leads.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {leads.map((lead, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      {lead.company_name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-slate-400">
                    {lead.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {lead.city}, {lead.country || country}
                      </span>
                    )}
                    {lead.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {lead.phone}
                      </span>
                    )}
                    {lead.verified_email && (
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <Mail className="w-3.5 h-3.5" />
                        {lead.verified_email}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searched ? (
          <div className="p-12 text-center text-xs text-amber-400 flex flex-col items-center gap-2">
            <AlertCircle className="w-6 h-6 text-amber-400" />
            <span>No verified leads found. Try broadening search parameters.</span>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-slate-500">
            Enter a search term and city to begin extraction.
          </div>
        )}
      </div>
    </div>
  );
}
