"use client";
import { CreditCard } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="text-xs text-slate-400 mt-1">Manage your active plan and payment methods</p>
      </div>
      <div className="glass-card p-6 rounded-2xl border border-slate-800">
        <h3 className="text-xl font-bold text-purple-400 mb-2">Free Trial Active</h3>
        <p className="text-sm text-slate-400">You have 500 credits remaining in your current billing cycle.</p>
      </div>
    </div>
  );
}
