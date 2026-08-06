"use client";

import React, { useState } from "react";
import LiveResultCard from "@/components/LiveResultCard";
import LeadDetailModal from "@/components/LeadDetailModal";
import { Search, Sparkles, Filter, Download, MapPin, RefreshCw } from "lucide-react";

export default function LeadSearchWorkstation() {
  const [keyword, setKeyword] = useState("Dentists");
  const [city, setCity] = useState("New Delhi");
  const [country, setCountry] = useState("India");
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  // Advanced Filters State
  const [hasEmail, setHasEmail] = useState(false);
  const [hasWebsite, setHasWebsite] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const executeLiveSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        keyword,
        city,
        country,
        limit: limit.toString(),
        has_email: hasEmail.toString(),
        has_website: hasWebsite.toString(),
        min_rating: minRating.toString(),
        workspace_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      });

      const res = await fetch(`https://scrapely-backend.onrender.com/api/v1/leads/search?${params}`);
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error("Search pipeline error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">B2B Lead Intelligence Workstation</h1>
          <p className="text-sm text-slate-400">
            Scrape and parse live verified entities across USA, India, UK, Canada & Australia.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700">
            <Download size={16} /> Export All CSV
          </button>
        </div>
      </div>

      {/* Primary Query Panel */}
      <div className="rounded-2xl border border-slate-800/80 bg-[#13151d] p-5 shadow-xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">Keyword / Industry</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-[#0b0c10] px-3.5 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
              placeholder="e.g. Dentists, SaaS, Gyms"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">Target City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-[#0b0c10] px-3.5 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
              placeholder="e.g. New Delhi, New York"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">Target Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-[#0b0c10] px-3.5 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">Records / Page</label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-700/70 bg-[#0b0c10] px-3.5 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
            >
              <option value={10}>10 Leads</option>
              <option value={20}>20 Leads</option>
              <option value={50}>50 Leads</option>
              <option value={100}>100 Leads</option>
            </select>
          </div>
        </div>

        {/* Secondary Toggles & Action Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-4">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <input
                type="checkbox"
                checked={hasEmail}
                onChange={(e) => setHasEmail(e.target.checked)}
                className="rounded border-slate-700 bg-[#0b0c10] text-purple-600 focus:ring-purple-500"
              />
              Has Verified Email
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <input
                type="checkbox"
                checked={hasWebsite}
                onChange={(e) => setHasWebsite(e.target.checked)}
                className="rounded border-slate-700 bg-[#0b0c10] text-purple-600 focus:ring-purple-500"
              />
              Has Active Website
            </label>
          </div>

          <button
            onClick={executeLiveSearch}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
            {loading ? "Extracting Live Leads..." : "Extract Live Leads"}
          </button>
        </div>
      </div>

      {/* Results View & Cards Render Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Stream Location: {city}, {country} ({leads.length} Verified Entities Found)</span>
        </div>

        {leads.length === 0 && !loading && (
          <div className="rounded-2xl border border-slate-800/80 bg-[#13151d] py-16 text-center">
            <MapPin className="mx-auto mb-3 text-slate-600" size={36} />
            <h3 className="text-base font-semibold text-slate-300">No verified businesses found.</h3>
            <p className="mt-1 text-xs text-slate-500">
              Adjust your target city or search parameters to execute a live extraction.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {leads.map((lead) => (
            <LiveResultCard
              key={lead.id || lead.google_place_id}
              lead={lead}
              onViewDetails={(selected) => setSelectedLead(selected)}
            />
          ))}
        </div>
      </div>

      {/* Full Detail Drawer Modal */}
      {selectedLead && (
        <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </div>
  );
}
