"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Database, Key, Download, LogOut, Zap, ShieldCheck } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (!storedToken) {
      router.push("/signin");
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/signin");
  };

  if (!token) return <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-slate-400">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 glass-card border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl gradient-button flex items-center justify-center font-black text-white">S</div>
            <span className="text-xl font-black">Scrapely.ai</span>
          </div>

          <nav className="space-y-2 text-sm font-semibold text-slate-300">
            <a href="/dashboard" className="p-3 bg-purple-600/20 text-purple-300 rounded-xl flex items-center gap-3 border border-purple-500/20">
              <Search className="w-4 h-4" /> Lead Scraper
            </a>
            <a href="#exports" className="p-3 hover:bg-slate-800/50 rounded-xl flex items-center gap-3 transition">
              <Download className="w-4 h-4" /> CSV Exports
            </a>
            <a href="#apikeys" className="p-3 hover:bg-slate-800/50 rounded-xl flex items-center gap-3 transition">
              <Key className="w-4 h-4" /> API Keys
            </a>
          </nav>
        </div>

        <button onClick={handleLogout} className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-400 rounded-xl flex items-center gap-3 text-sm font-semibold transition border border-slate-800">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between pb-6 border-b border-slate-800/80 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Scraper Workstation</h1>
            <p className="text-xs text-slate-400">Active Quota: 500 Credits remaining</p>
          </div>
          <button onClick={handleLogout} className="md:hidden text-xs bg-slate-800 px-3 py-2 rounded-lg">Logout</button>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <p className="text-xs text-slate-400 mb-1">Total Scraped</p>
            <h3 className="text-2xl font-bold">1,240 Leads</h3>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <p className="text-xs text-slate-400 mb-1">API Status</p>
            <h3 className="text-2xl font-bold text-emerald-400 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Operational</h3>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <p className="text-xs text-slate-400 mb-1">Current Plan</p>
            <h3 className="text-2xl font-bold text-purple-400">Free Trial</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
