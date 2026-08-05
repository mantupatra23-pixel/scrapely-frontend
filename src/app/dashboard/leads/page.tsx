"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Search, Zap, Building2, MapPin, Phone, Download } from "lucide-react";

interface Lead {
  id?: string;
  company_name: string;
  phone?: string;
  email?: string;
  city?: string;
  category?: string;
}

export default function LeadsPage() {
  const [query, setQuery] = useState("Dentists");
  const [city, setCity] = useState("New Delhi");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searched, setSearched] = useState(false);

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const searchTerm = `${query} in ${city}`;
      const res = await api.get(`/leads/search?search=${encodeURIComponent(searchTerm)}&limit=10`);
      setLeads(res.data.leads || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    if (!leads.length) return;
    const headers = "Company Name,Phone,Email,City,Category\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.company_name}","${l.phone || ""}","${l.email || ""}","${l.city || ""}","${l.category || ""}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Lead Scraper Workspace</h1>
          <p className="text-xs text-slate-400 mt-1">Extract real-time verified business leads</p>
        </div>
        {leads.length > 0 && (
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 border border-slate-700"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        )}
      </div>

      <form onSubmit={handleScrape} className="glass-card p-4 rounded-2xl border border-slate-800 grid md:grid-cols-3 gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Keyword (e.g. Dentists)"
          className="bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City (e.g. New Delhi)"
          className="bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="gradient-button py-2.5 px-6 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
        >
          {loading ? "Scraping..." : <>Start Extraction <Zap className="w-4 h-4" /></>}
        </button>
      </form>

      {searched && (
        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-400">Extracted Results</div>
          {leads.length > 0 ? (
            <div className="divide-y divide-slate-800/60">
              {leads.map((lead, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition">
                  <div>
                    <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-400" /> {lead.company_name}
                    </h4>
                    <div className="flex gap-4 text-xs text-slate-400 mt-1">
                      {lead.city && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {lead.city}</span>}
                      {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {lead.phone}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">No leads found for this query.</div>
          )}
        </div>
      )}
    </div>
  );
}
