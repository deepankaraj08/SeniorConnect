'use client';

import { useAuth } from '@/context/AuthContext';
import { useJobs } from '@/context/JobsContext'; // ← shared jobs store
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export default function SeniorDashboard() {
  const { user } = useAuth();
  const { jobs } = useJobs(); // ← read jobs posted by companies (and seed)
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  const [applications] = useState([
    {
      id: 1,
      jobTitle: 'Senior Accountant',
      company: 'FinancePro',
      status: 'shortlisted',
      applied: '2024-01-15',
    },
  ]);

  // ---- Guard: only seniors allowed here ----
  useEffect(() => {
    if (!user) return; // let “Loading…” render first
    if (user?.type !== 'senior') router.replace('/');
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <p className="text-sm text-slate-600 dark:text-slate-300">Loading…</p>
      </div>
    );
  }

  // Normalize fields from your register payload
  const name = user.name || 'Senior Professional';
  const age = user.age ?? null;
  const location = user.location || '—';
  const skills = Array.isArray(user.skills)
    ? user.skills
    : typeof user.skills === 'string'
      ? user.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
  const preference = user.preference || user.workPreferences || '—';
  const email = user.email || user.contact || '—';
  const avatar = user.profilePhotoUrl || '';

  // Use first skill as quick search on external job site
  const quickSkill = useMemo(() => (skills[0] || 'consultant').toLowerCase(), [skills]);
  const externalJobsUrl = `https://job-finder-zeta-eight.vercel.app/?q=${encodeURIComponent(quickSkill)}`;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back, {name}!
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Your experience matters. Find your next opportunity.
            </p>
          </div>
          <a
            href={externalJobsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/30 hover:-translate-y-0.5 transition active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30 dark:from-blue-500 dark:to-sky-400"
          >
            🔍 Find Jobs
          </a>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
          <nav className="-mb-px flex gap-6">
            {['profile', 'jobs', 'applications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* PROFILE */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                  Profile Overview
                </h2>

                <div className="flex items-center gap-4 mb-6">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile"
                      className="h-16 w-16 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-white/15"
                    />
                  ) : (
                    <div className="grid h-16 w-16 place-items-center rounded-xl bg-slate-900 text-white dark:bg-slate-700">
                      <span className="text-lg font-bold">{name?.[0]?.toUpperCase() || 'U'}</span>
                    </div>
                  )}
                  <div>
                    <div className="text-lg font-semibold text-slate-900 dark:text-white">{name}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">{email}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Info label="Age" value={age ?? '—'} />
                    <Info label="Location" value={location} />
                    <Info label="Preference" value={preference} />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Skills
                    </label>
                    {skills.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {skills.slice(0, 20).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-slate-300/70 bg-white/70 px-3 py-1 text-sm text-slate-700 shadow-sm dark:border-white/15 dark:bg-white/10 dark:text-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        No skills added yet.{' '}
                        <Link href="/senior/register" className="underline">
                          Edit your profile
                        </Link>
                        .
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar stats */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                  Quick Stats
                </h3>
                <StatRow label="Applications" value="5" />
                <StatRow label="Interviews" value="2" />
                <StatRow label="Hired" value={<span className="text-green-600">1</span>} />
              </div>

              <a
                href={externalJobsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-blue-300/40 bg-blue-50 p-4 text-sm text-blue-900 hover:bg-blue-100 dark:border-blue-300/20 dark:bg-blue-900/20 dark:text-blue-100"
              >
                Tip: Based on your skills, try searching for “{quickSkill}” on our jobs portal.
              </a>
            </div>
          </div>
        )}

        {/* JOBS (from shared store) */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Available Jobs</h2>
              <a
                href={externalJobsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:-translate-y-0.5 transition dark:border-white/15 dark:bg-white/10 dark:text-white"
              >
                Open Jobs Portal ↗
              </a>
            </div>

            {jobs.length === 0 ? (
              <EmptyState
                title="No jobs right now"
                desc="Check back soon or use the Jobs portal to search by your skills."
                actionHref={externalJobsUrl}
                actionText="Search Jobs"
              />
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
                  >
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      {job.title}
                    </h3>

                    {/* We don’t store company in this demo; show location/workType */}
                    <p className="text-slate-600 dark:text-slate-300 mb-2">
                      {job.location || '—'}
                    </p>

                    <div className="mb-3 flex items-center gap-4">
                      <span className="rounded bg-green-100 px-2 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200">
                        {job.workType || '—'}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {job.salaryRange || '—'}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        • {job.posted}
                      </span>
                    </div>

                    {!!(job.skillsRequired?.length) && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {job.skillsRequired.map((skill) => (
                          <span
                            key={skill}
                            className="rounded bg-slate-100 px-2 py-1 text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <a
                      href={externalJobsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:-translate-y-0.5 transition active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30 dark:bg-blue-500"
                    >
                      Apply Now
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Your Applications</h2>
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              {applications.length === 0 ? (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  You haven’t applied to any jobs yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="py-3 text-left text-slate-900 dark:text-white">Job Title</th>
                        <th className="py-3 text-left text-slate-900 dark:text-white">Company</th>
                        <th className="py-3 text-left text-slate-900 dark:text-white">Status</th>
                        <th className="py-3 text-left text-slate-900 dark:text-white">Applied</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id} className="border-b border-slate-200 dark:border-slate-700">
                          <td className="py-3 text-slate-900 dark:text-white">{app.jobTitle}</td>
                          <td className="py-3 text-slate-600 dark:text-slate-300">{app.company}</td>
                          <td className="py-3">
                            <span
                              className={`rounded px-2 py-1 text-sm ${
                                app.status === 'applied'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                  : app.status === 'shortlisted'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="py-3 text-slate-600 dark:text-slate-300">{app.applied}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------- Small UI helpers -------- */

function Info({ label, value }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</label>
      <p className="text-slate-900 dark:text-white">{String(value)}</p>
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
      <span className="font-semibold text-slate-900 dark:text-white">{value}</span>
    </div>
  );
}

function EmptyState({ title, desc, actionHref, actionText }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-10 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{desc}</p>
      {actionHref && (
        <a
          href={actionHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:-translate-y-0.5 transition active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30 dark:bg-blue-500"
        >
          {actionText}
        </a>
      )}
    </div>
  );
}
