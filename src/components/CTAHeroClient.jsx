"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function CTAHeroClient() {
  const { user } = useAuth();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 text-center bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white">Join the SeniorConnect Community</h2>
        <p className="mt-3 text-white/90">
          Whether you’re a senior professional seeking purposeful work or a company looking for seasoned talent—let’s build the future together.
        </p>

        {/* AUTH-AWARE CTA */}
        {!user ? (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/senior/register"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-md hover:bg-blue-50"
            >
              Register as Senior
            </Link>

            <Link
              href="/company/register"
              className="inline-flex items-center justify-center rounded-xl border border-white/70 bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Register as Company
            </Link>

            <a
              href="https://job-finder-zeta-eight.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/40 hover:bg-white/15"
            >
              🔍 Find Jobs
            </a>
          </div>
        ) : (
          <div className="mt-8">
            <Link
              href={user.type === "company" ? "/company/dashboard" : "/senior/dashboard"}
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold shadow-md hover:opacity-95 transition"
            >
              Go to Dashboard →
            </Link>
          </div>
        )}

        <p className="mt-4 text-xs text-white/80">Commission: 10% fee only on successful matches.</p>
      </div>
    </section>
  );
}
