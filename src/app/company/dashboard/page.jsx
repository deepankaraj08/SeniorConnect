'use client';

import React, { useEffect, useState } from 'react';
import { useJobs } from '@/context/JobsContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

/**
 * Company Dashboard (client)
 * - reads jobs from JobsContext (which fetches /api/jobs)
 */

// Helper function to format Date strings
const formatDate = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString();
};

export default function CompanyDashboard() {
  const { user } = useAuth(); // guard (if you use auth)
  const router = useRouter();
  const { jobs, loading, fetchJobs, addJob, removeJob } = useJobs();

  // form state (for the Post a new job section)
  const [form, setForm] = useState({
    title: '', company: '', location: '', salaryRange: '', salary: '',
    description: '', requirements: '', skillsRequired: '',
  });
  const [posting, setPosting] = useState(false);

  // Guard: if you only allow company users
  useEffect(() => {
    if (!user) return;
    if (user.type !== 'company') router.replace('/');
  }, [user, router]);

  // helper to refresh jobs
  const refresh = async () => {
    try {
      await fetchJobs();
    } catch (e) {
      console.error(e);
    }
  };

  // post job
  const handlePost = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert('Please add a title');
      return;
    }

    setPosting(true);

    try {
      const payload = {
        title: form.title.trim(),
        company: form.company.trim(),
        location: form.location.trim(),
        salaryRange: form.salaryRange.trim() || form.salary.trim() || '',
        description: form.description.trim() || '',
        requirements: form.requirements.trim() || '',
        skillsRequired:
          typeof form.skillsRequired === 'string' && form.skillsRequired.trim()
            ? form.skillsRequired.split(',').map((s) => s.trim()).filter(Boolean)
            : [],
      };

      await addJob(payload);

      // Clear form
      setForm({
        title: '', company: '', location: '', salaryRange: '', salary: '',
        description: '', requirements: '', skillsRequired: '',
      });

    } catch (err) {
      console.error('Failed to post job', err);
      alert('Failed to post job — see console for details.');
    } finally {
      setPosting(false);
    }
  };

  // delete job
  const handleDelete = async (id) => {
    if (!confirm('Delete this job?')) return;
    try {
      await removeJob(id); 
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
      await refresh();
    }
  };

  return (
    <div className="min-h-screen py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-100">Company Dashboard</h1>
          <p className="text-slate-400 mt-2">Post jobs and manage your listings</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Post a new job */}
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">Post a new job</h2>
            <form onSubmit={handlePost} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/40 border border-slate-700 text-slate-100"
                />
                <input
                  placeholder="Company"
                  value={form.company}
                  onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/40 border border-slate-700 text-slate-100"
                />
                <input
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/40 border border-slate-700 text-slate-100"
                />
                <input
                  placeholder="Salary Range (or salary)"
                  value={form.salaryRange}
                  onChange={(e) => setForm((s) => ({ ...s, salaryRange: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/40 border border-slate-700 text-slate-100"
                />
                <input
                  placeholder="Salary (optional)"
                  value={form.salary}
                  onChange={(e) => setForm((s) => ({ ...s, salary: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/40 border border-slate-700 text-slate-100"
                />
                <input
                  placeholder="Skills (comma separated)"
                  value={form.skillsRequired}
                  onChange={(e) => setForm((s) => ({ ...s, skillsRequired: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/40 border border-slate-700 text-slate-100"
                />
              </div>

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                rows={6}
                className="w-full p-4 rounded-xl bg-slate-900/40 border border-slate-700 text-slate-100"
              />

              <input
                placeholder="Requirements (optional)"
                value={form.requirements}
                onChange={(e) => setForm((s) => ({ ...s, requirements: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/40 border border-slate-700 text-slate-100"
              />

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={posting}
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white shadow-md bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400"
                >
                  {posting ? 'Posting...' : 'Post Job'}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      title: '', company: '', location: '', salaryRange: '', salary: '',
                      description: '', requirements: '', skillsRequired: '',
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-slate-700 text-slate-200"
                >
                  Reset
                </button>

                <div className="ml-auto text-sm text-slate-400">{jobs?.length ?? 0} listings</div>
              </div>
            </form>
          </div>

          {/* Right: Job list */}
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">Your Jobs</h2>
              <div className="text-sm text-slate-400">Manage listings</div>
            </div>

            {loading ? (
              <div className="py-16 text-center text-slate-400">Loading jobs…</div>
            ) : jobs?.length ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <article key={job.id || job._id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-700">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                        {job.company && <div className="text-sm text-slate-300">{job.company}</div>}
                        <div className="mt-2 grid grid-cols-3 gap-4 text-xs text-slate-400">
                          <div><div className="text-[11px] text-slate-300">Location</div><div>{job.location || '—'}</div></div>
                          <div><div className="text-[11px] text-slate-300">Salary</div><div>{job.salaryRange || '—'}</div></div>
                          <div><div className="text-[11px] text-slate-300">Posted</div><div>{formatDate(job.createdAt)}</div></div>
                        </div>

                        {job.description && (<p className="mt-3 text-sm text-slate-300">{job.description}</p>)}
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>{job.status}</span>
                        <button onClick={() => handleDelete(job.id || job._id)} className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm">Delete</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400">No job listings yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};