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
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Lead Search", href: "/search", icon: Search },
        { name: "Saved Leads", href: "/saved", icon: Bookmark },
        { name: "Search History", href: "/history", icon: History },
        { name: "Export Center", href: "/exports", icon: Download },
      ],
    },
    {
      group: "AUDIT & VERIFICATION",
      items: [
        { name: "Email Verifier", href: "/verifier", icon: MailCheck },
        { name: "SEO Audit", href: "/seo-audit", icon: SearchCheck },
        { name: "Website Analyzer", href: "/tech-analyzer", icon: Cpu },
        { name: "Bulk Search", href: "/bulk", icon: Layers },
      ],
    },
    {
      group: "DEVELOPER & SYSTEM",
      items: [
        { name: "API Keys", href: "/api-keys", icon: Key },
        { name: "Integrations", href: "/integrations", icon: Network },
        { name: "Billing & Plans", href: "/billing", icon: CreditCard },
        { name: "Invoices", href: "/invoices", icon: FileText },
        { name: "Credits & Usage", href: "/usage", icon: Zap },
      ],
    },
    {
      group: "ORGANIZATION",
      items: [
        { name: "Team Members", href: "/team", icon: Users },
        { name: "Workspace", href: "/workspace", icon: Building2 },
        { name: "Notifications", href: "/notifications", icon: Bell },
        { name: "Profile Settings", href: "/profile", icon: User },
        { name: "System Settings", href: "/settings", icon: Settings },
        { name: "Help & Support", href: "/support", icon: HelpCircle },
        { name: "Admin Portal", href: "/admin", icon: ShieldCheck },
      ],
    },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-800/80 bg-[#0b0c10] transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Logo */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800/80 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 font-bold text-white shadow-lg shadow-purple-500/20">
            S
          </div>
          {!collapsed && (
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-lg font-bold text-transparent">
              Scrapely<span className="text-purple-500">.ai</span>
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
              <p className="mb-2 px-3 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
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
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-sm"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-purple-400" : "text-slate-400"} />
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
