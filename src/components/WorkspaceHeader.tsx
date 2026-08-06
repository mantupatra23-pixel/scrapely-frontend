"use client";

import React from "react";
import { Bell, Sparkles, User, Zap } from "lucide-react";

export default function WorkspaceHeader() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-[#0b0c10] px-4 lg:px-6">
      {/* Search / Context Status */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Enterprise Live Engine Active
        </span>
      </div>

      {/* Right User Actions & Credits */}
      <div className="flex items-center gap-4">
        {/* Credits Badge */}
        <div className="flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-600/10 px-3 py-1.5 text-xs font-semibold text-purple-300">
          <Zap size={14} className="text-purple-400 fill-purple-400" />
          <span>4,850 Credits Active</span>
        </div>

        {/* Notifications */}
        <button className="relative rounded-xl border border-slate-800 bg-slate-900/80 p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-purple-500"></span>
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-3 border-l border-slate-800/80 pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 font-bold text-white shadow-md">
            MP
          </div>
        </div>
      </div>
    </header>
  );
}
