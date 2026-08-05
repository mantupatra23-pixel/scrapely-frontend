"use client";
import { Key } from "lucide-react";

export default function ApiKeysPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Developer API Keys</h1>
        <p className="text-xs text-slate-400 mt-1">Manage your REST API access credentials</p>
      </div>
      <div className="glass-card p-6 rounded-2xl border border-slate-800">
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition">
          <Key className="w-4 h-4" /> Generate New Key
        </button>
      </div>
    </div>
  );
}
