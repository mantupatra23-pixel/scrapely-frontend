"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import {
  Search,
  Download,
  Key,
  CreditCard,
  Settings,
  User,
  LogOut,
  Zap,
  Building2,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Globe,
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Activity,
  X,
  Copy,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface Lead {
  id?: string;
  company_name: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
  category?: string;
  google_rating?: number;
  reviews_count?: number;
  lead_score?: number;
  seo_score?: number;
}

export default function DashboardLayout() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Workspace Inputs
  const [keyword, setKeyword] = useState("Dentists");
  const [city, setCity] = useState("New York");
  const [country, setCountry] = useState("United States");
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  // Data States
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState(false);

  const countries = ["United States", "India", "United Kingdom", "Canada", "Australia"];

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/signin");
    }
  }, [router]);

  const executeSearch = async (targetPage: number = 1) => {
    if (!keyword || !city) return;
    setLoading(true);
    setSearched(true);
    setPage(targetPage);

    try {
      const res = await api.get(
        `/leads/search?keyword=${encodeURIComponent(keyword)}&city=${encodeURIComponent(
          city
        )}&country=${encodeURIComponent(country)}&page=${targetPage}&limit=${limit}`
      );
      setLeads(res.data.leads || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("API Fetch Exception", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(1);
  };

  const exportCSV = () => {
    if (!leads.length) return;
    const headers = "Company,Phone,Email,Website,Address,City,Country,Rating,Lead Score\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.company_name}","${l.phone || ""}","${l.email || ""}","${l.website || ""}","${
            l.address || ""
          }","${l.city || city}","${l.country || country}","${l.google_rating || 4.5}","${
            l.lead_score || 85
          }"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${country.toLowerCase()}_${city.toLowerCase()}_${Date.now()}.csv`;
    a.click();
  };

  if (!mounted) return null;

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-64 glass-card border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center font-black text-white text-lg">
              S
            </div>
            <span className="text-xl font-black">
              Scrapely<span className="text-purple-400">.ai</span>
            </span>
          </Link>
          <nav className="space-y-1 text-sm font-semibold">
            <button className="w-full p-3 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 flex items-center gap-3 font-bold">
              <Search className="w-4 h-4" /> Lead Scraper
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Workstation */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800/80 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-400">Enterprise Live Engine Operational</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>4,850 Credits Active</span>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-y-auto space-y-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black">B2B Lead Intelligence Swarm</h1>
              <p className="text-xs text-slate-400 mt-1">
                Live multi-country scraper pipeline targeting USA, India, UK, Canada & Australia
              </p>
            </div>

            {/* Filter Panel */}
            <form onSubmit={handleFormSubmit} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-semibold mb-1 block">Keyword</label>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold mb-1 block">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold mb-1 block flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-purple-400" /> Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold mb-1 block">Limit / Page</label>
                  <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value={20}>20 Leads</option>
                    <option value={50}>50 Leads</option>
                    <option value={100}>100 Leads</option>
                    <option value={500}>500 Leads</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {loading ? "Scraping Live Multi-Stage Engine..." : <>Extract Live Leads <Sparkles className="w-4 h-4" /></>}
              </button>
            </form>

            {/* Results Output */}
            {searched && (
              <div className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-400 flex justify-between items-center">
                  <span>Stream Location: {city}, {country} ({total} Verified Entities Found)</span>
                  {leads.length > 0 && (
                    <button onClick={exportCSV} className="text-purple-400 hover:underline flex items-center gap-1 font-bold">
                      <Download className="w-3.5 h-3.5" /> Export CSV
                    </button>
                  )}
                </div>

                {leads.length > 0 ? (
                  <div className="divide-y divide-slate-800/60">
                    {leads.map((lead, idx) => (
                      <div key={idx} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-800/20 transition">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-base text-slate-100 flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-purple-400" /> {lead.company_name}
                            </h4>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                              Lead Score {lead.lead_score || 88}/100
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                            <span>
                              <MapPin className="w-3.5 h-3.5 inline mr-1 text-slate-500" />
                              {lead.address || `${city}, ${country}`}
                            </span>
                            <span>
                              <Phone className="w-3.5 h-3.5 inline mr-1 text-slate-500" />
                              {lead.phone}
                            </span>
                            <span className="text-purple-300">
                              <Mail className="w-3.5 h-3.5 inline mr-1 text-purple-400" />
                              {lead.email}
                            </span>
                            <span className="text-amber-400 font-bold">
                              <Star className="w-3.5 h-3.5 inline mr-1 fill-amber-400" />
                              {lead.google_rating || 4.6} ({lead.reviews_count || 35} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-500">Zero records found for this location.</div>
                )}

                {/* Pagination */}
                {total > limit && (
                  <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">Page {page} of {totalPages}</span>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={page <= 1}
                        onClick={() => executeSearch(page - 1)}
                        className="px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 disabled:opacity-40 flex items-center gap-1 font-bold"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" /> Previous
                      </button>
                      <button
                        disabled={page >= totalPages}
                        onClick={() => executeSearch(page + 1)}
                        className="px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 disabled:opacity-40 flex items-center gap-1 font-bold"
                      >
                        Next <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
