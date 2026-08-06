"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Search, Bookmark, History, Download, MailCheck,
  SearchCheck, Cpu, Layers, Key, Network, CreditCard, FileText,
  Zap, Users, Building2, Bell, User, Settings, HelpCircle, ShieldCheck,
  ChevronLeft, ChevronRight
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export default function SidebarNavigation({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const navigationGroups = [
    {
      group: "INTELLIGENCE",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "text-purple-400" },
        { name: "Lead Search", href: "/search", icon: Search, color: "text-indigo-400" },
        { name: "Saved Leads", href: "/saved", icon: Bookmark, color: "text-amber-400" },
        { name: "Search History", href: "/history", icon: History, color: "text-sky-400" },
        { name: "Export Center", href: "/exports", icon: Download, color: "text-emerald-400" },
      ],
    },
    {
      group: "AUDIT & VERIFICATION",
      items: [
        { name: "Email Verifier", href: "/verifier", icon: MailCheck, color: "text-emerald-400" },
        { name: "SEO Audit", href: "/seo-audit", icon: SearchCheck, color: "text-pink-400" },
        { name: "Website Analyzer", href: "/tech-analyzer", icon: Cpu, color: "text-cyan-400" },
        { name: "Bulk Search", href: "/bulk", icon: Layers, color: "text-violet-400" },
      ],
    },
    {
      group: "DEVELOPER & SYSTEM",
      items: [
        { name: "API Keys", href: "/api-keys", icon: Key, color: "text-amber-400" },
        { name: "Integrations", href: "/integrations", icon: Network, color: "text-indigo-400" },
        { name: "Billing & Plans", href: "/billing", icon: CreditCard, color: "text-emerald-400" },
        { name: "Invoices", href: "/invoices", icon: FileText, color: "text-slate-400" },
        { name: "Credits & Usage", href: "/usage", icon: Zap, color: "text-purple-400" },
      ],
    },
    {
      group: "ORGANIZATION",
      items: [
        { name: "Team Members", href: "/team", icon: Users, color: "text-sky-400" },
        { name: "Workspace", href: "/workspace", icon: Building2, color: "text-indigo-400" },
        { name: "Notifications", href: "/notifications", icon: Bell, color: "text-pink-400" },
        { name: "Profile Settings", href: "/profile", icon: User, color: "text-purple-400" },
        { name: "System Settings", href: "/settings", icon: Settings, color: "text-slate-400" },
        { name: "Help & Support", href: "/support", icon: HelpCircle, color: "text-teal-400" },
        { name: "Admin Portal", href: "/admin", icon: ShieldCheck, color: "text-rose-400" },
      ],
    },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-800/80 bg-[#121620] transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Logo */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800/80 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-indigo-600 to-cyan-500 font-bold text-white shadow-lg shadow-purple-500/20">
            S
          </div>
          {!collapsed && (
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-lg font-black text-transparent">
              Scrapely<span className="text-purple-400">.ai</span>
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800/60 hover:text-white"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-slate-800">
        {navigationGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                {group.group}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-purple-600/20 text-white border border-purple-500/40 shadow-md shadow-purple-950/30"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-purple-400" : item.color} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
