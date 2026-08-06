"use client";

import React, { useState } from "react";
import { X, Globe, Phone, Mail, MapPin, Cpu, Sparkles, Star, ShieldCheck, ExternalLink, Copy } from "lucide-react";

interface LeadDetailModalProps {
  lead: any;
  onClose: () => void;
}

export default function LeadDetailModal({ lead, onClose }: LeadDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "tech" | "ai_outreach">("overview");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm">
      <div className="h-full w-full max-w-2xl border-l border-slate-800 bg-[#0f1117] p-6 shadow-2xl overflow-y-auto">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 font-bold text-white text-lg">
              {lead.company_name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{lead.company_name}</h2>
              <p className="text-xs text-slate-400">{lead.primary_category} • {lead.city}, {lead.country}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation Controls */}
        <div className="mt-4 flex gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab("overview")}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === "overview" ? "bg-purple-600 text-white" : "bg-slate-800/50 text-slate-400 hover:text-white"
            }`}
          >
            Complete Business Profile
          </button>
          <button
            onClick={() => setActiveTab("tech")}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === "tech" ? "bg-purple-600 text-white" : "bg-slate-800/50 text-slate-400 hover:text-white"
            }`}
          >
            Website & Tech Stack
          </button>
          <button
            onClick={() => setActiveTab("ai_outreach")}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === "ai_outreach" ? "bg-purple-600 text-white" : "bg-slate-800/50 text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles size={12} className="inline mr-1" /> AI Outreach Sequence
          </button>
        </div>

        {/* Tab Content Rendering */}
        <div className="mt-6 space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-800 bg-[#13151d] p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact & Location</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Phone</span>
                    <span className="font-medium text-slate-200">{lead.phone || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Verified Email</span>
                    <span className="font-medium text-purple-400">{lead.verified_email || "N/A"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Physical Address</span>
                    <span className="font-medium text-slate-200">{lead.address}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#13151d] p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Google Reputation Data</h4>
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Rating</span>
                    <span className="text-amber-400 font-bold">{lead.google_rating} ★</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Review Count</span>
                    <span className="font-bold text-slate-200">{lead.reviews_count} Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tech" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-800 bg-[#13151d] p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detected Web Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {lead.tech_stack?.map((t: string, i: number) => (
                    <span key={i} className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 border border-slate-700">
                      {t}
                    </span>
                  )) || <span className="text-xs text-slate-500">Standard Web Technologies</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-slate-800 bg-[#13151d] p-3">
                  <span className="text-slate-500 block">CMS Framework</span>
                  <span className="font-semibold text-slate-200">{lead.cms || "Custom"}</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-[#13151d] p-3">
                  <span className="text-slate-500 block">Hosting Provider</span>
                  <span className="font-semibold text-slate-200">{lead.hosting_provider || "Cloud Provider"}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ai_outreach" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-800 bg-[#13151d] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Cold Email Sequence</h4>
                  <button className="text-slate-400 hover:text-white"><Copy size={14} /></button>
                </div>
                <pre className="whitespace-pre-wrap text-xs text-slate-300 font-sans leading-relaxed">
                  {`Subject: Optimization opportunities for ${lead.company_name}\n\nHi team,\n\nI noticed ${lead.company_name} has a strong ${lead.google_rating}★ rating in ${lead.city}. Looking at your online workflow, there are key conversion bottlenecks we can optimize.\n\nAre you open for a quick 5-minute audit call this week?`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
