"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/signin/");
    }
  }, [router]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-slate-400 font-semibold text-sm">
        Loading Workstation...
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.replace("/signin/");
  };

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
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Navigation */}
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

      {/* Unified Master Sidebar */}
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

        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <button
            onClick={handleLogout}
            className="w-full p-3 bg-slate-900 hover:bg-red-500/10 hover:text-red-400 text-slate-400 rounded-xl flex items-center gap-3 text-sm font-semibold transition border border-slate-800"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Master Workstation Main Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800/80 px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-400">
              API Engine Gateway Operational
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>500 Credits Active</span>
          </div>
        </header>

        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
          {/* Dynamic Tab Switching */}
          {activeTab === "overview" && children}

          {activeTab === "leads" && children}

          {activeTab === "exports" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">CSV Exports</h1>
              <div className="glass-card p-12 rounded-2xl border border-slate-800 text-center">
                <Download className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-300">No exports generated yet</h3>
                <p className="text-xs text-slate-500 mt-2">Run lead extraction jobs to download data files.</p>
              </div>
            </div>
          )}

          {activeTab === "apikeys" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Developer API Keys</h1>
              <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">Production Secret Key</h4>
                  <p className="text-xs text-slate-500 mt-1">sk_live_9948502938475821</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition">
                  Copy Key
                </button>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Billing & Usage</h1>
              <div className="glass-card p-6 rounded-2xl border border-slate-800">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
                  Free Trial
                </span>
                <h3 className="text-3xl font-black mt-4">500 Credits Remaining</h3>
                <p className="text-xs text-slate-400 mt-2">Cycle renews next month.</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Workspace Settings</h1>
              <div className="glass-card p-6 rounded-2xl border border-slate-800 text-xs text-slate-400">
                General workspace settings are fully active.
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">User Profile</h1>
              <div className="glass-card p-6 rounded-2xl border border-slate-800 text-xs text-slate-400">
                Manage your credentials and API preferences.
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
