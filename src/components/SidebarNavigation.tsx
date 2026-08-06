"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Bookmark,
  History,
  Download,
  MailCheck,
  SearchCheck,
  Cpu,
  Layers,
  Key,
  Network,
  CreditCard,
  FileText,
  Zap,
  Users,
  Building2,
  Bell,
  User,
  Settings,
  HelpCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export default function SidebarNavigation({
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const pathname = usePathname() || "/";

  const navigationGroups = [
    {
      group: "INTELLIGENCE",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "text-purple-400" },
        { name: "Lead Search", href: "/search", icon: Search, color: "text-sky-400" },
        { name: "Saved Leads", href: "/saved", icon: Bookmark, color: "text-amber-400" },
        { name: "Search History", href: "/history", icon: History, color: "text-cyan-400" },
        { name: "Export Center", href: "/exports", icon: Download, color: "text-emerald-400" },
      ],
    },
    {
      group: "AUDIT & VERIFICATION",
      items: [
        { name: "Email Verifier", href: "/verifier", icon: MailCheck, color: "text-emerald-400" },
        { name: "SEO Audit", href: "/seo-audit", icon: SearchCheck, color: "text-rose-400" },
        { name: "Website Analyzer", href: "/tech-analyzer", icon: Cpu, color: "text-indigo-400" },
        { name: "Bulk Search", href: "/bulk", icon: Layers, color: "text-violet-400" },
      ],
    },
    {
      group: "DEVELOPER & SYSTEM",
      items: [
        { name: "API Keys", href: "/api-keys", icon: Key, color: "text-amber-400" },
        { name: "Integrations", href: "/integrations", icon: Network, color: "text-sky-400" },
        { name: "Billing & Plans", href: "/billing", icon: CreditCard, color: "text-emerald-400" },
        { name: "Invoices", href: "/invoices", icon: FileText, color: "text-slate-300" },
        { name: "Credits & Usage", href: "/usage", icon: Zap, color: "text-purple-400" },
      ],
    },
    {
      group: "ORGANIZATION",
      items: [
        { name: "Team Members", href: "/team", icon: Users, color: "text-blue-400" },
        { name: "Workspace", href: "/workspace", icon: Building2, color: "text-indigo-400" },
        { name: "Notifications", href: "/notifications", icon: Bell, color: "text-pink-400" },
        { name: "Profile Settings", href: "/profile", icon: User, color: "text-purple-400" },
        { name: "System Settings", href: "/settings", icon: Settings, color: "text-slate-300" },
        { name: "Help & Support", href: "/support", icon: HelpCircle, color: "text-teal-400" },
        { name: "Admin Portal", href: "/admin", icon: ShieldCheck, color: "text-red-400" },
      ],
    },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-700/60 bg-[#1e293b]/90 backdrop-blur-xl transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-700/60 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-rose-500 font-bold text-white shadow-lg shadow-indigo-500/30">
            S
          </div>
          {!collapsed && (
            <span className="text-lg font-black tracking-tight text-white">
              Scrapely<span className="text-cyan-400">.ai</span>
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-700/60 hover:text-white"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {navigationGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                {group.group}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const ItemIcon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600/40 to-indigo-600/40 text-white border border-purple-400/50 shadow-lg shadow-purple-900/40"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`}
                  >
                    <ItemIcon size={18} className={isActive ? "text-cyan-300" : item.color} />
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
