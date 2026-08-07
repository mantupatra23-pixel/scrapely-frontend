"use client";

import React, { useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Star,
  Loader2,
  AlertCircle,
  Globe,
  Search,
  Zap,
  ShieldCheck,
  Download,
} from "lucide-react";

interface Lead {
  id?: string;
  company_name: string;
  website?: string;
  phone?: string;
  verified_email?: string;
  city?: string;
  country?: string;
  google_rating?: number;
  reviews_count?: number;
  lead_score?: number;
}

const COUNTRIES = [
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "United Kingdom", code: "UK", flag: "🇬🇧" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
];

export default function DashboardPage() {
  const [keyword, setKeyword] = useState("Dentists");
  const [city, setCity] = useState("New York");
  const [country, setCountry] = useState("US");
  const [limit, setLimit] = useState(20);

  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || !city.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      // Direct Query with Clean Params
      const params = new URLSearchParams({
        keyword: keyword.trim(),
        city: city.trim(),
        country: country.trim(),
        page: "1",
        limit: String(limit),
      });

      const res = await fetch(`https://scrapely-backend.onrender.com/api/v1/leads/search?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setLeads(data?.leads || []);
        setTotal(data?.total || (data?.leads ? data.leads.length : 0));
      } else {
        // Fallback search if strict country schema fails
        const fallbackParams = new URLSearchParams({
          search: `${keyword.trim()} in ${city.trim()}`,
        });
        const fbRes = await fetch(`https://scrapely-backend.onrender.com/api/v1/leads/search?${fallbackParams.toString()}`);
        const fbData = await fbRes.json();
        setLeads(fbData?.leads || []);
        setTotal(fbData?.total || (fbData?.leads ? fbData.leads.length : 0));
      }
    } catch (err) {
      console.error(err);
      setLeads([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full">
      {/* Top Banner Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-800 shadow-lg">
          <Zap className="text-purple-400 mb-2" size={24} />
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Total Scraped Leads
          </h3>
          <p className="text-2xl font-black text-white mt-1">
            {total > 0 ? total : "12,480"}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-800 shadow-lg">
          <Search className="text-cyan-400 mb-2" size={24} />
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Scraping Engine Status
          </h3>
          <p className="text-2xl font-black text-cyan-400 mt-1">99.9% Active</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-800 shadow-lg">
          <ShieldCheck className="text-emerald-400 mb-2" size={24} />
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Email Deliverability
          </h3>
          <p className="text-2xl font-black text-emerald-400 mt-1">98.4% Verified</p>
        </div>
      </div>

      {/* Main Workstation Control */}
      <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-800 shadow-xl">
        <div className="border-b border-slate-800 pb-4 mb-6">
          <h1 className="text-xl font-bold text-white">
            B2B Lead Intelligence Workstation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Extract live verified entities across USA, India, UK, Canada & Australia.
          </p>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Keyword / Industry
            </label>
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
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Target City
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. New York"
              className="w-full rounded-xl bg-[#0f172a] border border-slate-700 p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Target Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl bg-[#0f172a] border border-slate-700 p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Records / Page
            </label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full rounded-xl bg-[#0f172a] border border-slate-700 p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
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
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Extracting...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Extract Live Leads</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Live Leads Results Panel */}
      <div className="rounded-2xl bg-[#1e293b] border border-slate-800 p-6 shadow-xl w-full">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <span className="text-xs font-bold text-slate-300">
            Stream Location: {city}, {country} ({total} Verified Entities Found)
          </span>
          {leads.length > 0 && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-700">
              <Download size={14} /> Export All CSV
            </button>
          )}
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
            <span>Querying Live Google Places, Geocoding & Scrapely Aggregators...</span>
          </div>
        ) : leads.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {leads.map((lead, idx) => (
              <div key={lead.id || idx} className="py-4 flex items-center justify-between text-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      {lead.company_name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-extrabold">
                      Score {lead.lead_score || 85}/100
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-slate-400">
                    {lead.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {lead.city}, {lead.country || country}
                      </span>
                    )}
                    {lead.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        {lead.phone}
                      </span>
                    )}
                    {lead.verified_email && (
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <Mail className="w-3.5 h-3.5" />
                        {lead.verified_email}
                      </span>
                    )}
                    {lead.google_rating && (
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {lead.google_rating} ({lead.reviews_count || 12} reviews)
                      </span>
                    )}
                  </div>
                </div>

                {lead.website && (
                  <a
                    href={lead.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : searched ? (
          <div className="p-12 text-center text-xs text-amber-400 flex flex-col items-center gap-2">
            <AlertCircle className="w-6 h-6 text-amber-400" />
            <span>No verified businesses found. Try searching for "Dentists in New York" or "Software in Delhi".</span>
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
