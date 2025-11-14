import React, { useState } from 'react';

/**
 * JobCard.jsx
 * - Tailwind-only card for job posts
 * - Props:
 *    job: object (id, title, posted, applications, location, workType, salaryRange, description, requirements, skillsRequired, status)
 *    onEdit(job) optional
 *    onOpenApplicants(job) optional
 *    className optional
 */

export default function JobCard({ job, onEdit = () => {}, onOpenApplicants = () => {}, className = '' }) {
  const [expanded, setExpanded] = useState(false);
  const shortDesc = job.description ? job.description.slice(0, 160) : '';
  const needsToggle = job.description && job.description.length > 160;

  return (
    <article
      className={`rounded-2xl p-6 bg-white/4 border border-white/6 shadow-sm transition-shadow hover:shadow-md ${className}`}
      aria-labelledby={`job-${job.id}-title`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 id={`job-${job.id}-title`} className="text-lg font-semibold text-white truncate">
            {job.title}
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            Posted on {job.posted} • {job.applications} applicant{job.applications !== 1 ? 's' : ''}
          </p>

          <p className="mt-2 text-sm text-slate-300">
            {job.location || '—'} • {job.workType || '—'}
            {job.salaryRange ? ` • ${job.salaryRange}` : ''}
          </p>

          {job.description && (
            <div className="mt-3 text-slate-300 text-sm">
              {expanded ? job.description : shortDesc}
              {needsToggle && (
                <>
                  {!expanded ? '… ' : ' '}
                  <button
                    type="button"
                    onClick={() => setExpanded((s) => !s)}
                    className="ml-1 text-sky-300 text-sm underline underline-offset-2"
                    aria-expanded={expanded}
                    aria-controls={`job-${job.id}-desc`}
                  >
                    {expanded ? 'Read less' : 'Read more'}
                  </button>
                </>
              )}
            </div>
          )}

          {job.requirements && (
            <p className="mt-2 text-xs text-slate-400">
              <span className="font-medium">Requirements:</span> {job.requirements}
            </p>
          )}

          {job.skillsRequired?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {job.skillsRequired.map((skill) => (
                <span
                  key={skill}
                  className="rounded px-2 py-1 text-xs bg-white/6 text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              job.status === 'active'
                ? 'bg-emerald-100/20 text-emerald-300'
                : 'bg-white/6 text-slate-300'
            }`}
            aria-hidden
          >
            {job.status}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(job)}
              className="px-3 py-1 rounded-md text-sm bg-white/6 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/10"
              title="Edit job"
            >
              Edit
            </button>

            <button
              onClick={() => onOpenApplicants(job)}
              className="px-3 py-1 rounded-md text-sm bg-slate-700/50 text-white hover:bg-slate-700/60 focus:outline-none"
              title="Open applicants"
            >
              Applicants
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
