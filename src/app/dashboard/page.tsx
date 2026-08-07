"use client";

import React from "react";
import {
  Zap,
  Search,
  CheckCircle2,
  TrendingUp,
  Activity,
  Server,
  Layers,
  Globe2,
  Building,
} from "lucide-react";

export default function WorkstationDashboard() {
  return (
    <div className="space-y-8 w-full max-w-full">
      {/* Top Banner Overview */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900 border border-purple-500/30 shadow-xl w-full">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300 border border-purple-500/20 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Enterprise Scraper Swarm Active
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Lead Intelligence Dashboard
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Real-time scraping queue metrics, proxy health, and API usage tracking.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase">Credits Active</span>
            <Zap className="text-purple-400" size={20} />
          </div>
          <div className="text-3xl font-black text-white">4,850 / 5,000</div>
          <div className="mt-2 text-[11px] text-emerald-400 font-semibold">97% Remaining</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase">API Usage Today</span>
            <Activity className="text-cyan-400" size={20} />
          </div>
          <div className="text-3xl font-black text-white">1,240 Queries</div>
          <div className="mt-2 text-[11px] text-slate-400 font-semibold">Average latency: 1.4s</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase">Today's Searches</span>
            <Search className="text-indigo-400" size={20} />
          </div>
          <div className="text-3xl font-black text-white">48 Batches</div>
          <div className="mt-2 text-[11px] text-purple-400 font-semibold">+12% vs Yesterday</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase">System Status</span>
            <Server className="text-emerald-400" size={20} />
          </div>
          <div className="text-3xl font-black text-emerald-400">100% Operational</div>
          <div className="mt-2 text-[11px] text-slate-400 font-semibold">12 Active Headless Workers</div>
        </div>
      </div>

      {/* Analytics & System Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Top Demographics */}
        <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-800 shadow-xl lg:col-span-2">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Globe2 className="text-purple-400" size={18} />
            Top Target Extraction Locations
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>United States (Dentists, Legal, Real Estate)</span>
                <span>45%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-purple-500 w-[45%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>India (IT Services, Manufacturing, Healthcare)</span>
                <span>32%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-cyan-400 w-[32%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>United Kingdom (Fintech, Agencies)</span>
                <span>18%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-500 w-[18%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Worker & Queue Status */}
        <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-800 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="text-cyan-400" size={18} />
            Scraper Engine Workers
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-semibold text-slate-300">Playwright Cluster #01</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">IDLE</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-semibold text-slate-300">Playwright Cluster #02</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-bold border border-purple-500/20">BUSY</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-semibold text-slate-300">Proxy Pool Rotation</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">HEALTHY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
