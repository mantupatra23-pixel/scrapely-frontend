"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import {
  LayoutDashboard,
  Search,
  Download,
  Key,
  CreditCard,
  Settings,
  User,
  LogOut,
  Zap,
  Menu,
  X,
  ShieldCheck,
  Building2,
  MapPin,
  Phone,
  Globe,
  Star,
  RefreshCw,
  Copy,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Lead {
  id?: string;
  company_name: string;
  phone?: string;
  email?: string;
  website?: string;
  city?: string;
  category?: string;
  rating?: number;
  reviews?: number;
}

export default function DashboardLayout() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scraper State
  const [query, setQuery] = useState("Dentists");
  const [city, setCity] = useState("New Delhi");
  const [country, setCountry] = useState("India");
  const [minRating, setMinRating] = useState("4.0");
  const [hasEmail, setHasEmail] = useState(true);
  const [hasPhone, setHasPhone] = useState(true);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searched, setSearched] = useState(false);

  // Stats State
  const [stats, setStats] = useState({
    totalLeads: 1240,
    leadsToday: 85,
    exportsCount: 12,
    credits: 500,
  });

  // API Key & Webhook State
  const [apiKey, setApiKey] = useState("sk_live_99485029384758219485");
  const [webhookUrl, setWebhookUrl] = useState("https://api.yourdomain.com/webhooks/scrapely");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/signin/");
    } else {
      fetchLiveMetrics();
    }
  }, [router]);

  const fetchLiveMetrics = async () => {
    try {
      const res = await api.get("/leads/search?limit=1").catch(() => null);
      if (res?.data) {
        setStats((prev) => ({
          ...prev,
          totalLeads: res.data.total || prev.totalLeads,
        }));
      }
    } catch (err) {
      console.error("Metrics load error", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.replace("/signin/");
  };

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setSearched(true);
    try {
      const searchTerm = `${query} in ${city} ${country}`;
      const res = await api.get(`/leads/search?search=${encodeURIComponent(searchTerm)}&limit=15`);
      setLeads(res.data.leads || []);
      setStats((prev) => ({
        ...prev,
        totalLeads: prev.totalLeads + (res.data.leads?.length || 0),
        credits: Math.max(0, prev.credits - 5),
      }));
    } catch (err) {
      console.error("Scrape error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportCSV = () => {
    if (!leads.length) return;
    const headers = "Company Name,Phone,Email,Website,City,Category,Rating\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.company_name}","${l.phone || ""}","${l.email || ""}","${l.website || ""}","${l.city || ""}","${l.category || ""}","${l.rating || ""}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_export_${Date.now()}.csv`;
    a.click();
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-slate-400 font-semibold text-sm">
        Initializing Intelligence Workstation...
      </div>
    );
  }

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "leads", label: "Lead Scraper", icon: Search },
    { id: "exports", label: "CSV Exports", icon: Download },
    { id: "apikeys", label: "API Keys", icon: Key },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col md:flex-row font-sans selection:bg-purple-500 selection:text-white">
      {/* Mobile Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-[#090d16]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-button flex items-center justify-center font-black text-white text-base shadow-lg shadow-purple-600/30">
            S
          </div>
          <span className="text-lg font-black tracking-tight">
            Scrapely<span className="text-purple-400">.ai</span>
          </span>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-64 glass-card border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 ${
          mobileMenuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div>
          <Link href="/" className="hidden md:flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl gradient-button flex items-center justify-center font-black text-white text-lg shadow-lg shadow-purple-600/30">
              S
            </div>
            <span className="text-xl font-black tracking-tight">
              Scrapely<span className="text-purple-400">.ai</span>
            </span>
          </Link>

          <nav className="space-y-1 text-sm font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition text-left ${
                    isActive
                      ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 font-bold shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <button
            onClick={handleLogout}
            className="w-full p-3 bg-slate-900/90 hover:bg-red-500/10 hover:text-red-400 text-slate-400 rounded-xl flex items-center gap-3 text-sm font-semibold transition border border-slate-800"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800/80 px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-400">API Gateway Operational</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>{stats.credits} Credits Active</span>
          </div>
        </header>

        <main className="p-4 md:p-8 flex-1 overflow-y-auto space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-black">Workspace Intelligence Overview</h1>
                <p className="text-xs text-slate-400 mt-1">Real-time stats from active lead scraping engines</p>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="glass-card p-5 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400 mb-1 font-semibold">Total Scraped Leads</p>
                  <h3 className="text-3xl font-black text-white">{stats.totalLeads.toLocaleString()}</h3>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400 mb-1 font-semibold">Leads Extracted Today</p>
                  <h3 className="text-3xl font-black text-purple-400">{stats.leadsToday}</h3>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400 mb-1 font-semibold">Active Scraper Swarms</p>
                  <h3 className="text-2xl font-bold text-emerald-400 flex items-center gap-2 mt-1">
                    <ShieldCheck className="w-5 h-5" /> Operational
                  </h3>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400 mb-1 font-semibold">Current Plan</p>
                  <h3 className="text-2xl font-bold text-amber-400 mt-1">Pro Enterprise</h3>
                </div>
              </div>

              {/* Scraper Workstation Demo Bar */}
              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <Search className="w-4 h-4 text-purple-400" /> Quick Extraction Workspace
                </h3>
                <form onSubmit={handleScrape} className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Keyword"
                    className="bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="gradient-button py-2.5 px-6 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {loading ? "Extracting..." : <>Extract Leads <Zap className="w-4 h-4" /></>}
                  </button>
                </form>
              </div>

              {/* Output Results */}
              {searched && (
                <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center">
                    <span>Extracted Lead Stream</span>
                    {leads.length > 0 && (
                      <button onClick={exportCSV} className="text-purple-400 hover:underline flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" /> Download CSV
                      </button>
                    )}
                  </div>
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
                    <div className="p-8 text-center text-xs text-slate-500">No leads found.</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LEAD SCRAPER */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black">Autonomous Lead Scraper Workspace</h1>
                  <p className="text-xs text-slate-400 mt-1">Configure multi-parameter parameters to extract verified leads</p>
                </div>
                {leads.length > 0 && (
                  <button onClick={exportCSV} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition">
                    <Download className="w-4 h-4" /> Export CSV ({leads.length})
                  </button>
                )}
              </div>

              {/* Multi-Filter Scraper Form */}
              <form onSubmit={handleScrape} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Search Keyword</label>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g. Dentists, IT Companies"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Target City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. New Delhi, Mumbai"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-800/80 gap-4">
                  <div className="flex items-center gap-6 text-xs text-slate-300 font-semibold">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={hasEmail} onChange={(e) => setHasEmail(e.target.checked)} className="rounded border-slate-800 text-purple-600 focus:ring-0" />
                      Must Have Email
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={hasPhone} onChange={(e) => setHasPhone(e.target.checked)} className="rounded border-slate-800 text-purple-600 focus:ring-0" />
                      Must Have Phone
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="gradient-button py-3 px-8 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {loading ? "Extracting Leads..." : <>Launch Swarm <Zap className="w-4 h-4" /></>}
                  </button>
                </div>
              </form>

              {/* Scraped Results Table */}
              {searched && (
                <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Extracted Lead Intelligence ({leads.length} Records)
                  </div>
                  {leads.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/40">
                            <th className="p-4">Company Name</th>
                            <th className="p-4">City</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Category</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-slate-200">
                          {leads.map((l, i) => (
                            <tr key={i} className="hover:bg-slate-800/30 transition">
                              <td className="p-4 font-bold text-white flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-purple-400" /> {l.company_name}
                              </td>
                              <td className="p-4 text-slate-400">{l.city || city}</td>
                              <td className="p-4 text-slate-400">{l.phone || "+91 98100XXXXX"}</td>
                              <td className="p-4 text-purple-400 font-medium">{l.category || query}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-500">No leads found for this search criteria.</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CSV EXPORTS */}
          {activeTab === "exports" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black">CSV Exports & Download Logs</h1>
                <p className="text-xs text-slate-400 mt-1">Manage and download your generated B2B lead files</p>
              </div>
              <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase">
                  Available Files
                </div>
                <div className="divide-y divide-slate-800/60 text-xs">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white text-sm">dentists_new_delhi_2026.csv</p>
                      <p className="text-slate-400 mt-0.5">15 rows • 12.4 KB • Created Today</p>
                    </div>
                    <button onClick={exportCSV} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold rounded-lg flex items-center gap-1.5 border border-slate-700">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: API KEYS */}
          {activeTab === "apikeys" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black">Developer REST API Keys</h1>
                <p className="text-xs text-slate-400 mt-1">Authenticate custom scraping workers programmatically</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">Production Bearer Key</h4>
                    <p className="text-xs font-mono text-slate-400 mt-1">{apiKey}</p>
                  </div>
                  <button
                    onClick={handleCopyKey}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Key"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BILLING */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black">Billing & Subscription Management</h1>
                <p className="text-xs text-slate-400 mt-1">Manage active tier and Stripe payment credentials</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
                  Pro Plan Active
                </span>
                <h3 className="text-3xl font-black text-white">{stats.credits} Credits Remaining</h3>
                <p className="text-xs text-slate-400">Monthly quota auto-renews at the start of next billing cycle.</p>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black">Workspace Configuration</h1>
                <p className="text-xs text-slate-400 mt-1">Set global webhooks and lead extraction formats</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Webhook Target URL</label>
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black">User Profile & Credentials</h1>
                <p className="text-xs text-slate-400 mt-1">Manage personal account details and authentication</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-button flex items-center justify-center font-black text-white text-xl">
                    M
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Mantu Patra</h3>
                    <p className="text-xs text-slate-400">pmantu808@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
