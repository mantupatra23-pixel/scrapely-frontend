"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("access_token");
    // Strict Guard: ONLY redirect to /signin/ if token is totally missing
    if (!token) {
      router.replace("/signin/");
    }
  }, [router, pathname]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-slate-400 font-semibold text-sm">
        Initializing Workspace...
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.replace("/signin/");
  };

  // Trailing slashes are CRITICAL for Next.js static exports to prevent 404 redirects
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
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col md:flex-row">
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-[#090d16]">
        <Link href="/dashboard/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-button flex items-center justify-center font-black text-white text-base">S</div>
          <span className="text-lg font-black">Scrapely<span className="text-purple-400">.ai</span></span>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <aside className={`w-64 glass-card border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 ${mobileMenuOpen ? "block" : "hidden md:flex"}`}>
        <div>
          <Link href="/dashboard/" className="hidden md:flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl gradient-button flex items-center justify-center font-black text-white text-lg">S</div>
            <span className="text-xl font-black">Scrapely<span className="text-purple-400">.ai</span></span>
          </Link>

          <nav className="space-y-1 text-sm font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              // Safe active state check
              const isActive = pathname === item.href || pathname === item.href.slice(0, -1);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
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

        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <button
            onClick={handleLogout}
            className="w-full p-3 bg-slate-900 hover:bg-red-500/10 hover:text-red-400 text-slate-400 rounded-xl flex items-center gap-3 text-sm font-semibold transition border border-slate-800"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800/80 px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-400">API Gateway Operational</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>500 Credits Active</span>
          </div>
        </header>
        <main className="p-4 md:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
