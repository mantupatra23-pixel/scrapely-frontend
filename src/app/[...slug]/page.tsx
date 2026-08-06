"use client";

import React from "react";
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
  ArrowUpRight,
} from "lucide-react";

export default function DynamicSubPage() {
  const pathname = usePathname() || "/workstation";
  const rawTitle = pathname.replace("/", "").replace("-", " ");
  const pageTitle = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900 border border-purple-500/30 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300 border border-purple-500/20 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Enterprise Engine Live
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white capitalize">
            {pageTitle || "Workstation Module"}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Real-time automated analytics, data pipelines, and control options for {pageTitle}.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 transition-all">
          <span>Run Quick Action</span>
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#1e293b]/80 border border-slate-700/80 shadow-lg">
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl w-fit mb-4">
            <Zap className="text-purple-400" size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Active Queue</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Monitored processes and live workers handling data tasks.
          </p>
          <div className="text-2xl font-black text-purple-400">99.8% SLA</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1e293b]/80 border border-slate-700/80 shadow-lg">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl w-fit mb-4">
            <Search className="text-cyan-400" size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Monthly Quota Usage</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Credits consumed during active scraping & API queries.
          </p>
          <div className="text-2xl font-black text-cyan-400">1,250 / 5,000</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1e293b]/80 border border-slate-700/80 shadow-lg">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl w-fit mb-4">
            <ShieldCheck className="text-emerald-400" size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Verification Status</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Live health checks across database proxies and third-party APIs.
          </p>
          <div className="text-2xl font-black text-emerald-400">Healthy</div>
        </div>
      </div>

      {/* Structured Placeholder Table */}
      <div className="rounded-2xl bg-[#1e293b]/80 border border-slate-700/80 p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4">
          {pageTitle} Activity Logs
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-700 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Module Event</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="py-3 px-4 font-semibold text-white">
                  {pageTitle} Initial Sync
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    Completed
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400">Just now</td>
                <td className="py-3 px-4 text-right text-purple-400 hover:underline cursor-pointer">
                  View Logs
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">
                  Automated Cache Update
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                    Active
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400">5 mins ago</td>
                <td className="py-3 px-4 text-right text-purple-400 hover:underline cursor-pointer">
                  Manage
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
