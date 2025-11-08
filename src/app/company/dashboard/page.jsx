'use client';

import { useAuth } from '@/context/AuthContext';
import { useJobs } from '@/context/JobsContext'; // ← shared jobs store
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CompanyDashboard() {
  const { user } = useAuth();
  const { jobs, addJob } = useJobs(); // ← read/write shared jobs
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('overview');
  const [showJobForm, setShowJobForm] = useState(false);

  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    workType: '',
    salaryRange: '',
    skillsRequired: '',
  });

  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: 'Michael Tan',
      age: 67,
      skills: ['Financial Analysis', 'Strategic Planning'],
      experience: '40+ years',
      status: 'applied',
      applied: '2024-01-12',
    },
  ]);

  // Guard: only let companies in here
  useEffect(() => {
    if (!user) return;
    if (user.type !== 'company') router.replace('/');
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <p className="text-sm text-slate-600 dark:text-slate-300">Loading…</p>
      </div>
    );
  }

  const handleJobSubmit = (e) => {
    e.preventDefault();

    if (!jobForm.title.trim() || !jobForm.workType) {
      alert('Please add a Job Title and select Work Type.');
      return;
    }

    const newJob = {
      id: Date.now(), // unique enough for demo
      title: jobForm.title.trim(),
      applications: 0,
      status: 'active',
      posted: new Date().toISOString().split('T')[0],
      location: jobForm.location.trim() || '—',
      workType: jobForm.workType,
      salaryRange: jobForm.salaryRange.trim() || '—',
      description: jobForm.description.trim(),
      requirements: jobForm.requirements.trim(),
      skillsRequired: jobForm.skillsRequired
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    addJob(newJob); // ← writes to context + localStorage (visible in Senior Jobs)
    setShowJobForm(false);
    setJobForm({
      title: '',
      description: '',
      requirements: '',
      location: '',
      workType: '',
      salaryRange: '',
      skillsRequired: '',
    });

    alert('✅ Job posted successfully!');
  };

  const handleHire = (applicantId) => {
    alert('🎉 Hiring initiated! A 10% commission applies on successful placement.');
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, status: 'hired' } : a))
    );
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Company Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage your job posts and find experienced senior professionals.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex gap-6" role="tablist" aria-label="Company dashboard sections">
            {['overview', 'jobs', 'applicants'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab}-panel`}
                  onClick={() => setActiveTab(tab)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveTab(tab);
                  }}
                  className={`relative py-2 px-1 border-b-2 font-medium text-sm capitalize transition
                    ${isActive
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                  {tab}
                  {isActive && (
                    <span className="pointer-events-none absolute inset-x-0 -bottom-[3px] h-0.5 bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <section id="overview-panel" role="tabpanel" className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard value={jobs.length} label="Active Jobs" color="text-blue-600" />
              <StatCard value={applicants.length} label="Total Applicants" color="text-amber-600" />
              <StatCard
                value={applicants.filter((a) => a.status === 'hired').length}
                label="Successful Hires"
                color="text-green-600"
              />
              <StatCard value="10%" label="Commission Rate" color="text-indigo-600" />
            </div>
          </section>
        )}

        {/* JOBS */}
        {activeTab === 'jobs' && (
          <section id="jobs-panel" role="tabpanel" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Job Posts</h2>
              <button onClick={() => setShowJobForm(true)} className="btn-primary px-4 py-2 text-sm">
                + Create Job Post
              </button>
            </div>

            {showJobForm && (
              <div className="card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 shadow-md backdrop-blur-lg transition">
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                  Create New Job
                </h3>

                <form onSubmit={handleJobSubmit} className="space-y-5">
                  {/* Grid Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Job Title */}
                    <FormField label="Job Title *">
                      <input
                        type="text"
                        value={jobForm.title}
                        onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                        className="input-field border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/10 dark:focus:ring-sky-400/40"
                        required
                      />
                    </FormField>

                    {/* Work Type */}
                    <FormField label="Work Type *">
                      <select
                        value={jobForm.workType}
                        onChange={(e) => setJobForm({ ...jobForm, workType: e.target.value })}
                        className="input-field border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/10 dark:focus:ring-sky-400/40"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="part-time">Part-time</option>
                        <option value="freelance">Freelance</option>
                        <option value="consultancy">Consultancy</option>
                      </select>
                    </FormField>

                    {/* Location */}
                    <FormField label="Location">
                      <input
                        type="text"
                        placeholder="e.g., Remote / Bangalore"
                        value={jobForm.location}
                        onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                        className="input-field border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/10 dark:focus:ring-sky-400/40"
                      />
                    </FormField>

                    {/* Salary Range */}
                    <FormField label="Salary Range">
                      <input
                        type="text"
                        placeholder="e.g., ₹1500–2500/day or $40–60/hr"
                        value={jobForm.salaryRange}
                        onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                        className="input-field border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/10 dark:focus:ring-sky-400/40"
                      />
                    </FormField>
                  </div>

                  {/* Job Description */}
                  <FormField label="Job Description *">
                    <textarea
                      value={jobForm.description}
                      onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                      rows={4}
                      className="input-field border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/10 dark:focus:ring-sky-400/40"
                      required
                    />
                  </FormField>

                  {/* Requirements */}
                  <FormField label="Requirements (optional)">
                    <textarea
                      placeholder="Short bullet points or expectations"
                      value={jobForm.requirements}
                      onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                      rows={3}
                      className="input-field border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/10 dark:focus:ring-sky-400/40"
                    />
                  </FormField>

                  {/* Skills */}
                  <FormField label="Skills Required (comma separated)">
                    <input
                      type="text"
                      placeholder="e.g., Accounting, Strategy, Excel"
                      value={jobForm.skillsRequired}
                      onChange={(e) => setJobForm({ ...jobForm, skillsRequired: e.target.value })}
                      className="input-field border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/10 dark:focus:ring-sky-400/40"
                    />
                  </FormField>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-3">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md shadow-blue-500/30 
                               bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:opacity-90 
                               focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200"
                    >
                      Post Job
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowJobForm(false)}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-900 dark:text-white 
                               border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/10 
                               hover:bg-slate-100 dark:hover:bg-white/15 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {jobs.length ? (
              <div className="grid grid-cols-1 gap-6">
                {jobs.map((job) => (
                  <div key={job.id} className="card">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{job.title}</h3>
                        <p className="text-slate-600 dark:text-slate-300">
                          Posted on {job.posted} • {job.applications} applicants
                        </p>
                        <p className="mt-1 text-slate-600 dark:text-slate-300">
                          {job.location || '—'} • {job.workType || '—'}
                          {job.salaryRange ? ` • ${job.salaryRange}` : ''}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          job.status === 'active'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>

                    {job.skillsRequired?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.skillsRequired.map((skill) => (
                          <span
                            key={skill}
                            className="rounded bg-slate-100 px-2 py-1 text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {job.description && (
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{job.description}</p>
                    )}
                    {job.requirements && (
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-medium">Requirements:</span> {job.requirements}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Jobs Yet"
                desc="Create your first job post to start connecting with professionals."
              />
            )}
          </section>
        )}

        {/* APPLICANTS */}
        {activeTab === 'applicants' && (
          <section id="applicants-panel" role="tabpanel" className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Applicants</h2>

            {applicants.length ? (
              <div className="grid grid-cols-1 gap-6">
                {applicants.map((applicant) => (
                  <div key={applicant.id} className="card">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                          {applicant.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300">
                          Experience: {applicant.experience}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {applicant.skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            applicant.status === 'applied'
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                              : applicant.status === 'hired'
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {applicant.status}
                        </span>

                        {applicant.status !== 'hired' && (
                          <button
                            onClick={() => handleHire(applicant.id)}
                            className="btn-primary text-sm"
                          >
                            Hire Now
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      Applied: {applicant.applied}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Applicants Yet"
                desc="Your job posts will appear here once candidates apply."
              />
            )}
          </section>
        )}
      </div>
    </div>
  );
}

/* ========== Small Reusable UI Helpers ========== */

function StatCard({ value, label, color }) {
  return (
    <div className="card text-center">
      <div className={`text-2xl font-bold ${color} mb-2`}>{value}</div>
      <div className="text-slate-600 dark:text-slate-300">{label}</div>
    </div>
  );
}

function EmptyState({ title, desc }) {
  return (
    <div className="card text-center py-12">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm">{desc}</p>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
