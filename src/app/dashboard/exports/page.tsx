"use client";
import { Download } from "lucide-react";

export default function ExportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">CSV Exports</h1>
        <p className="text-xs text-slate-400 mt-1">Download your previously scraped lead data</p>
      </div>
      <div className="glass-card p-12 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
        <Download className="w-12 h-12 text-slate-600 mb-4" />
        <h3 className="text-lg font-bold text-slate-300">No recent exports</h3>
        <p className="text-sm text-slate-500 mt-2">Your downloaded CSV files will appear here.</p>
      </div>
    </div>
  );
}
