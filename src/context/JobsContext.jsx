'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const JobsCtx = createContext(null);
const STORAGE_KEY = 'sc_jobs_v1';

// Some seed jobs so the UI isn’t empty on first run
const SEED_JOBS = [
  {
    id: 1,
    title: 'Financial Consultant',
    applications: 5,
    status: 'active',
    posted: '2024-01-10',
    location: 'Remote',
    workType: 'part-time',
    salaryRange: '$50–75/hr',
    description: 'Advise on budgeting, forecasting, and reporting.',
    requirements: 'CPA preferred. Experience with SaaS finance.',
    skillsRequired: ['Accounting', 'Financial Analysis', 'Excel'],
  },
  {
    id: 2,
    title: 'Marketing Advisor',
    applications: 0,
    status: 'active',
    posted: '2024-03-02',
    location: 'Hybrid',
    workType: 'consultancy',
    salaryRange: '$40–60/hr',
    description: 'Guide GTM, brand, and campaign planning for a growing startup.',
    requirements: 'Past Director-level experience preferred.',
    skillsRequired: ['Marketing', 'Strategy', 'Branding'],
  },
];

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(SEED_JOBS);

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setJobs(parsed);
      }
    } catch {}
  }, []);

  // Persist whenever jobs change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch {}
  }, [jobs]);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setJobs(parsed);
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const api = useMemo(() => {
    const addJob = (job) => {
      setJobs((prev) => {
        const next = [{ ...job }, ...prev];
        return next;
      });
    };

    const updateJob = (id, patch) => {
      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...patch } : j)));
    };

    return { jobs, addJob, updateJob };
  }, [jobs]);

  return <JobsCtx.Provider value={api}>{children}</JobsCtx.Provider>;
}

export function useJobs() {
  const ctx = useContext(JobsCtx);
  if (!ctx) throw new Error('useJobs must be used within JobsProvider');
  return ctx;
}
