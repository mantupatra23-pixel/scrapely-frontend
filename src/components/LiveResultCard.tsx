"use client";

import React from "react";
import { Star, Phone, Globe, Mail, MapPin, ExternalLink, ShieldCheck, Cpu } from "lucide-react";

interface LiveResultCardProps {
  lead: any;
  onViewDetails: (lead: any) => void;
}

export default function LiveResultCard({ lead, onViewDetails }: LiveResultCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-[#13151d] p-5 transition-all hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-950/20 md:flex-row md:items-center md:justify-between">
      {/* Company Header & General Meta */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 font-bold text-purple-400 border border-slate-700/50">
            {lead.company_name?.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">{lead.company_name}</h3>
              {lead.verified_email && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck size={12} /> Verified
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">{lead.primary_category} • {lead.city}, {lead.country}</p>
          </div>
        </div>

        {/* Address and Geolocation Info */}
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <MapPin size={13} className="text-purple-400" />
          <span className="truncate max-w-lg">{lead.address}</span>
        </div>

        {/* Contact Badges Grid */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {lead.phone && (
            <span className="flex items-center gap-1 text-slate-300">
              <Phone size={12} className="text-slate-500" /> {lead.phone}
            </span>
          )}
          {lead.website && (
            <a
              href={lead.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-purple-400 hover:underline"
            >
              <Globe size={12} /> Website
            </a>
          )}
          {lead.verified_email && (
            <span className="flex items-center gap-1 text-slate-300">
              <Mail size={12} className="text-slate-500" /> {lead.verified_email}
            </span>
          )}
        </div>
      </div>

      {/* Right Intelligence Ratings & Score Metrics */}
      <div className="flex flex-col items-start gap-3 border-t border-slate-800/80 pt-3 md:items-end md:border-t-0 md:pt-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            {lead.google_rating} ({lead.reviews_count} reviews)
          </div>
          <div className="rounded-lg bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-400 border border-purple-500/20">
            Lead Score: {lead.lead_score}/100
          </div>
        </div>

        {/* Tech Stack Pills */}
        {lead.tech_stack && lead.tech_stack.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <Cpu size={12} className="text-slate-500" />
            {lead.tech_stack.slice(0, 3).map((tech: string, i: number) => (
              <span key={i} className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700/50">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action Button Strip */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(lead)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white"
          >
            <ExternalLink size={13} /> View Full Profile
          </button>
        </div>
      </div>
    </div>
  );
}
