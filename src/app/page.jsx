"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-slate-900 text-white">

      {/* 🌟 HERO SECTION */}
      <section className="w-full py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <span className="px-4 py-1 rounded-full text-sm bg-white/10 border border-white/20">
            • Senior talent, real impact
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight">
            Connecting Experience with <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Opportunity
            </span>
          </h1>

          <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
            SeniorConnect bridges the gap between skilled senior citizens (60+) and companies seeking experienced professionals for part-time, freelance, and consultancy roles.
          </p>

          {/* ⭐ SHOW ONLY IF USER IS NOT LOGGED IN ⭐ */}
          {!user && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/senior/register"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white font-semibold shadow-lg hover:-translate-y-1 transition-transform"
              >
                Register as Senior Citizen →
              </Link>

              <Link
                href="/company/register"
                className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white font-semibold hover:bg-white/20 hover:-translate-y-1 transition-transform"
              >
                Register as Company
              </Link>
            </div>
          )}

          {/* ⭐ SHOW DASHBOARD WHEN LOGGED IN ⭐ */}
          {user && (
            <div className="mt-8">
              <Link
                href={user.type === "company" ? "/company/dashboard" : "/senior/dashboard"}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:-translate-y-1 transition-transform"
              >
                Go to Dashboard →
              </Link>
            </div>
          )}

        </div>
      </section>
      {/* 🌟 HERO SECTION END */}


      {/* 🌟 FEATURE CARDS (Always Visible) */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* For Seniors */}
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 text-center hover:bg-slate-800/80 transition">
            <div className="text-4xl mb-4">👴👵</div>
            <h3 className="text-xl font-bold mb-2">For Seniors</h3>
            <p className="text-slate-300">Find meaningful work that values your decades of experience.</p>
          </div>

          {/* For Companies */}
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 text-center hover:bg-slate-800/80 transition">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-bold mb-2">For Companies</h3>
            <p className="text-slate-300">Access reliable, experienced professionals for your projects.</p>
          </div>

          {/* Quick Matching */}
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 text-center hover:bg-slate-800/80 transition">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Quick Matching</h3>
            <p className="text-slate-300">Smart matching aligns skills with opportunities instantly.</p>
          </div>

        </div>
      </section>
      {/* 🌟 FEATURE CARDS END */}

    </main>
  );
}
