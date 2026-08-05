"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Search,
  LayoutDashboard,
  Download,
  Key,
  CreditCard,
  Settings,
  User,
  LogOut,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-400 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span>Authenticating Workspace...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Overview", href: "/dashboard/", icon: LayoutDashboard },
    { label: "Lead Scraper", href: "/dashboard/leads/", icon: Search },
    { label: "CSV Exports", href: "/dashboard/exports/", icon: Download },
    { label: "API Keys", href: "/dashboard/api-keys/", icon: Key },
    { label: "Billing", href: "/dashboard/billing/", icon: CreditCard },
    { label: "Settings", href: "/dashboard/settings/", icon: Settings },
    { label: "Profile", href: "/dashboard/profile/", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 glass-card border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl gradient-button flex items-center justify-center font-black text-white text-lg">
              S
            </div>
            <span className="text-xl font-black">Scrapely<span className="text-purple-400">.ai</span></span>
          </Link>

          <nav className="space-y-1 text-sm font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-3 rounded-xl flex items-center gap-3 transition ${
                    isActive
                      ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 mb-4 text-xs">
            <p className="text-slate-400 mb-1">Signed in as</p>
            <p className="font-bold text-slate-200 truncate">{user?.email || "User"}</p>
          </div>
          <button
            onClick={logout}
            className="w-full p-3 bg-slate-900 hover:bg-red-500/10 hover:text-red-400 text-slate-400 rounded-xl flex items-center gap-3 text-sm font-semibold transition border border-slate-800"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Dynamic Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800/80 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-400">API Gateway Operational</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>{user?.credits ?? 500} Credits Remaining</span>
            </div>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
