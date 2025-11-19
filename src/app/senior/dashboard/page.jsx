"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";
import { useJobs } from "@/context/JobsContext";
import { useRouter } from "next/navigation";

export default function SeniorDashboard() {
  const [skillFilter, setSkillFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const { user } = useAuth();
  const router = useRouter();
  const { jobs, loading, fetchJobs } = useJobs();

  // Redirect if not senior
  useEffect(() => {
    if (!user) return;
    if (user.type !== "senior") {
      router.replace("/");
    }
  }, [user, router]);

  // Load jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">Senior Dashboard</h1>
        <p className="text-slate-300 mb-10">
          Welcome, {user?.name}. Browse opportunities matched for seniors.
        </p>



        {/* 📌 FILTER BAR */}
        <div className="mb-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <h2 className="text-lg font-semibold mb-4">Filter Jobs</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Filter by Skill */}
            <input
              type="text"
              placeholder="Filter by skill… (e.g. Accounting)"
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              onChange={(e) => setSkillFilter(e.target.value.toLowerCase())}
            />



            {/* Filter by Location */}
            <input
              type="text"
              placeholder="Filter by location…"
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              onChange={(e) => setLocationFilter(e.target.value.toLowerCase())}
            />

          </div>
        </div>


        {/* LOADING */}
        {loading && (
          <div className="text-slate-400 text-center py-10">
            Loading jobs…
          </div>
        )}

        {/* NO JOBS */}
        {!loading && jobs.length === 0 && (
          <div className="text-slate-400 text-center py-10">
            No jobs available right now.
          </div>
        )}

        {/* JOB LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs
            .filter((job) => {
              // Skill filter → search inside description
              if (skillFilter) {
                const jobSkills = job.description?.toLowerCase() || "";
                if (!jobSkills.includes(skillFilter)) return false;
              }

              // Location filter → search inside location
              if (locationFilter) {
                const loc = job.location?.toLowerCase() || "";
                if (!loc.includes(locationFilter)) return false;
              }

              return true; // keep the job
            })
            .map((job) => (

              <div
                key={job._id || job.id}   // ⭐ FIXED KEY WARNING
                className="p-6 bg-slate-800 border border-slate-700 rounded-2xl hover:bg-slate-800/70 transition"
              >
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-slate-300">{job.company}</p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">
                  <div>
                    <span className="text-slate-300">Location: </span>
                    {job.location || "—"}
                  </div>
                  <div>
                    <span className="text-slate-300">Salary: </span>
                    {job.salaryRange || "—"}
                  </div>
                </div>

                <p className="mt-4 text-slate-300 text-sm">
                  {job.description?.slice(0, 120)}...
                </p>

                <div className="flex justify-between items-center mt-5">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${job.status === "active"
                      ? "bg-green-200 text-green-900"
                      : "bg-gray-300 text-gray-700"
                      }`}
                  >
                    {job.status}
                  </span>

                  <button className="px-4 py-2 text-sm rounded-xl bg-blue-600 hover:bg-blue-700 transition">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
};
