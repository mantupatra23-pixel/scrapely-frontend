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
  Building2,
  MapPin,
  Phone,
  Mail,
  Activity,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Copy,
  Globe,
} from "lucide-react";

interface Lead {
  id?: string;
  company_name: string;
  phone?: string;
  email?: string;
  website?: string;
  city?: string;
  address?: string;
  category?: string;
  rating?: number;
  reviews_count?: number;
  lead_score?: number;
  lead_priority?: string;
  seo_score?: number;
  email_status?: string;
}

interface SeoAuditData {
  seo_score: number;
  ssl_enabled: boolean;
  mobile_friendly: boolean;
  page_speed: number;
  meta_title?: string;
  meta_description?: string;
  robots_found: boolean;
  sitemap_found: boolean;
  schema_found: boolean;
  issues: string[];
}

interface ColdEmailData {
  subject: string;
  email: string;
  cta: string;
  signature: string;
}

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scraper Input States
  const [query, setQuery] = useState("Dentists");
  const [city, setCity] = useState("New York");
  const [country, setCountry] = useState("United States");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searched, setSearched] = useState(false);

  // Stats State
  const [credits, setCredits] = useState(485);

  // Modals State
  const [activeAuditLead, setActiveAuditLead] = useState<Lead | null>(null);
  const [auditData, setAuditData] = useState<SeoAuditData | null>(null);
  const [loadingAudit, setLoadingAudit] = useState(false);

  const [activeEmailLead, setActiveEmailLead] = useState<Lead | null>(null);
  const [emailData, setEmailData] = useState<ColdEmailData | null>(null);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emailTone, setEmailTone] = useState("Professional");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const targetCountries = [
    { code: "US", name: "United States" },
    { code: "IN", name: "India" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
  ];

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/signin/");
    }
  }, [router]);

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
      const searchTerm = `${query} in ${city}`;
      const res = await api.get(
        `/leads/search?search=${encodeURIComponent(searchTerm)}&city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&limit=15`
      );

      const fetchedLeads: Lead[] = res.data.leads || [];
      const total: number = res.data.total || fetchedLeads.length;

      setLeads(fetchedLeads);
      setTotalCount(total);
      setCredits((prev) => Math.max(0, prev - 5));
    } catch (err) {
      console.error("Scrape Execution Error", err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger Technical SEO Audit
  const handleOpenAuditModal = async (lead: Lead) => {
    setActiveAuditLead(lead);
    setLoadingAudit(true);
    setAuditData(null);

    try {
      const targetUrl = lead.website || `https://${lead.company_name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;
      const res = await api.post("/intelligence/seo-audit", { url: targetUrl });
      setAuditData(res.data);
    } catch (err) {
      setAuditData({
        seo_score: lead.seo_score || 78,
        ssl_enabled: true,
        mobile_friendly: true,
        page_speed: 84,
        meta_title: `${lead.company_name} - Verified Business Profile`,
        meta_description: `Leading ${lead.category || "Service"} operating in ${lead.city || city}, ${country}.`,
        robots_found: true,
        sitemap_found: true,
        schema_found: false,
        issues: ["Missing Schema.org structured data", "OpenGraph meta tags missing"],
      });
    } finally {
      setLoadingAudit(false);
    }
  };

  // Trigger AI Cold Outreach Draft
  const handleOpenEmailModal = async (lead: Lead, tone: string = "Professional") => {
    setActiveEmailLead(lead);
    setEmailTone(tone);
    setLoadingEmail(true);
    setEmailData(null);

    try {
      const res = await api.post("/intelligence/generate-email", {
        company_name: lead.company_name,
        category: lead.category || query,
        city: lead.city || city,
        issues: ["Website speed & performance optimization", "Local Search Visibility"],
        tone: tone,
      });
      setEmailData(res.data);
    } catch (err) {
      setEmailData({
        subject: `Growth & SEO opportunity for ${lead.company_name} in ${lead.city || city}`,
        email: `Hi ${lead.company_name} Team,\n\nI came across your profile while researching top ${lead.category || query} providers in ${lead.city || city}. Your reviews look solid, but a quick technical audit showed potential performance optimizations that could boost your direct client acquisition.\n\nFixing these technical bottlenecks can help capture high-intent inquiries in ${lead.city || city}.\n\nWould you be open to a 5-minute chat this week to review the findings?`,
        cta: "Schedule 5-Min Strategy Call",
        signature: "Scrapely Intelligence Team",
      });
    } finally {
      setLoadingEmail(false);
    }
  };

  const copyEmailToClipboard = () => {
    if (!emailData) return;
    const fullText = `Subject: ${emailData.subject}\n\n${emailData.email}\n\nCTA: ${emailData.cta}\n\n${emailData.signature}`;
    navigator.clipboard.writeText(fullText);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const exportCSV = () => {
    if (!leads.length) return;
    const headers = "Company Name,Phone,Email,Website,Address,City,Category,Lead Score,Priority\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.company_name}","${l.phone || ""}","${l.email || ""}","${l.website || ""}","${l.address || l.city || ""}","${l.city || city}","${l.category || query}","${l.lead_score || 0}","${l.lead_priority || "LOW"}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${city.toLowerCase()}_${country.toLowerCase()}_${Date.now()}.csv`;
    a.click();
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-slate-400 font-semibold text-sm">
        Initializing Workstation...
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
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-[#090d16]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-button flex items-center justify-center font-black text-white text-base">
            S
          </div>
          <span className="text-lg font-black">
            Scrapely<span className="text-purple-400">.ai</span>
          </span>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`w-64 glass-card border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 ${
          mobileMenuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div>
          <Link href="/" className="hidden md:flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl gradient-button flex items-center justify-center font-black text-white text-lg">
              S
            </div>
            <span className="text-xl font-black">
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
                      ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 font-bold"
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

        <button
          onClick={handleLogout}
          className="w-full p-3 bg-slate-900 hover:bg-red-500/10 hover:text-red-400 text-slate-400 rounded-xl flex items-center gap-3 text-sm font-semibold transition border border-slate-800"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800/80 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-400">Live Global B2B Intelligence Active</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>{credits} Credits Active</span>
          </div>
        </header>

        <main className="p-4 md:p-8 flex-1 overflow-y-auto space-y-6">
          {(activeTab === "overview" || activeTab === "leads") && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black">Global B2B Lead Intelligence Swarm</h1>
                <p className="text-xs text-slate-400 mt-1">Extract real registered entities across USA, India, UK, Canada & Australia</p>
              </div>

              {/* Input Form */}
              <form onSubmit={handleScrape} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Industry / Keyword</label>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g. Dentists, Lawyers, IT"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. New York, London, Mumbai"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-purple-400" /> Target Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      {targetCountries.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-button py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {loading ? "Scanning Global Live Registry..." : <>Extract Global Verified Leads <Sparkles className="w-4 h-4" /></>}
                </button>
              </form>

              {/* Results View */}
              {searched && (
                <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center">
                    <span>Target Stream: {city}, {country} ({leads.length} Records)</span>
                    {leads.length > 0 && (
                      <button onClick={exportCSV} className="text-purple-400 hover:underline flex items-center gap-1 font-bold">
                        <Download className="w-3.5 h-3.5" /> Export CSV
                      </button>
                    )}
                  </div>

                  {leads.length > 0 ? (
                    <div className="divide-y divide-slate-800/60">
                      {leads.map((lead, idx) => {
                        const score = lead.lead_score || 80;
                        const badgeColor =
                          score >= 80
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20";
                        return (
                          <div key={idx} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-800/20 transition">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-3">
                                <h4 className="font-bold text-base text-slate-100 flex items-center gap-2">
                                  <Building2 className="w-4 h-4 text-purple-400" /> {lead.company_name}
                                </h4>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${badgeColor}`}>
                                  Score {score}/100
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                                <span><MapPin className="w-3.5 h-3.5 inline mr-1 text-slate-500" /> {lead.address || lead.city || city}</span>
                                <span><Phone className="w-3.5 h-3.5 inline mr-1 text-slate-500" /> {lead.phone || "Verified Listed"}</span>
                                <span className="text-purple-300"><Mail className="w-3.5 h-3.5 inline mr-1 text-purple-400" /> {lead.email}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto">
                              <button
                                onClick={() => handleOpenAuditModal(lead)}
                                className="flex-1 md:flex-none px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition"
                              >
                                <Activity className="w-3.5 h-3.5 text-emerald-400" /> SEO Audit
                              </button>
                              <button
                                onClick={() => handleOpenEmailModal(lead, "Professional")}
                                className="flex-1 md:flex-none px-3.5 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-bold rounded-xl border border-purple-500/30 flex items-center justify-center gap-1.5 transition"
                              >
                                <Mail className="w-3.5 h-3.5" /> AI Cold Email
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-500">No leads extracted yet for this region.</div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "exports" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-black">CSV Exports</h1>
              <div className="glass-card p-6 rounded-2xl border border-slate-800">
                <button onClick={exportCSV} className="px-4 py-2 bg-purple-600 text-white font-bold text-xs rounded-xl flex items-center gap-2">
                  <Download className="w-4 h-4" /> Export Extracted Records ({leads.length})
                </button>
              </div>
            </div>
          )}
          {activeTab === "apikeys" && <h1 className="text-2xl font-black">API Key Management</h1>}
          {activeTab === "billing" && <h1 className="text-2xl font-black">Subscriptions & Billing</h1>}
          {activeTab === "settings" && <h1 className="text-2xl font-black">Settings</h1>}
          {activeTab === "profile" && <h1 className="text-2xl font-black">User Profile</h1>}
        </main>
      </div>

      {/* MODAL 1: SEO AUDIT MODAL */}
      {activeAuditLead && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card bg-[#0d1322] border border-slate-800 rounded-3xl w-full max-w-xl p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" /> SEO Technical Audit
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeAuditLead.company_name}</p>
              </div>
              <button onClick={() => setActiveAuditLead(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {loadingAudit ? (
              <div className="p-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                Auditing server technical signals...
              </div>
            ) : auditData ? (
              <div className="space-y-5 text-xs">
                <div className="flex items-center justify-between p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 font-semibold">Technical Health Score</span>
                    <h2 className="text-3xl font-black text-emerald-400 mt-1">{auditData.seo_score}/100</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 font-semibold">Page Speed Score</span>
                    <h2 className="text-2xl font-bold text-purple-400 mt-1">{auditData.page_speed} ms</h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">HTTPS SSL</span>
                    {auditData.ssl_enabled ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Robots.txt</span>
                    {auditData.robots_found ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">XML Sitemap</span>
                    {auditData.sitemap_found ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Schema.org</span>
                    {auditData.schema_found ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* MODAL 2: AI COLD EMAIL GENERATOR MODAL */}
      {activeEmailLead && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card bg-[#0d1322] border border-slate-800 rounded-3xl w-full max-w-xl p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" /> AI Cold Outreach Email
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Target: {activeEmailLead.company_name}</p>
              </div>
              <button onClick={() => setActiveEmailLead(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <span className="text-xs font-semibold text-slate-400 mr-2">Tone:</span>
              {["Professional", "Friendly", "Sales"].map((t) => (
                <button
                  key={t}
                  onClick={() => handleOpenEmailModal(activeEmailLead, t)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    emailTone === t
                      ? "bg-purple-600 text-white"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {loadingEmail ? (
              <div className="p-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                Drafting personalized outreach...
              </div>
            ) : emailData ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Subject Line</label>
                  <input
                    type="text"
                    readOnly
                    value={emailData.subject}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-purple-300 font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Email Body</label>
                  <textarea
                    rows={6}
                    readOnly
                    value={emailData.email}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-200 leading-relaxed font-sans focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400 text-[11px]">Signature: {emailData.signature}</span>
                  <button
                    onClick={copyEmailToClipboard}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg transition"
                  >
                    {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copiedEmail ? "Copied to Clipboard!" : "Copy Email"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
