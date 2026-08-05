"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const safePassword = password.slice(0, 72);

      const res = await api.post("/auth/login", {
        email: email,
        password: safePassword,
      });

      if (res.data.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
        if (res.data.refresh_token) {
          localStorage.setItem("refresh_token", res.data.refresh_token);
        }
        router.push("/dashboard/");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const detail = err.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex items-center justify-center p-6 relative selection:bg-purple-500 selection:text-white">
      <div className="w-full max-w-md glass-card p-8 rounded-3xl border border-slate-800 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="w-10 h-10 rounded-xl gradient-button flex items-center justify-center font-black text-white text-xl shadow-lg shadow-purple-600/30">
              S
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Scrapely<span className="text-purple-400">.ai</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black tracking-tight text-white">Welcome Back</h1>
          <p className="text-xs text-slate-400 mt-1">Sign in to your scraper workstation</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white gradient-button flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 disabled:opacity-50 transition"
          >
            {loading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-center text-slate-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup/" className="text-purple-400 font-semibold hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
