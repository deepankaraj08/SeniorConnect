// src/context/JobsContext.jsx
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const JobsContext = createContext();

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (q = '') => {
    setLoading(true);
    try {
      const url = q ? `/api/jobs?q=${encodeURIComponent(q)}` : '/api/jobs';
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error('Failed fetchJobs', data);
        setJobs([]);
        return;
      }
      setJobs(data.data);
    } catch (err) {
      console.error('fetchJobs error', err);
    } finally {
      setLoading(false);
    }
  };

  const addJob = async (payload) => {
    // optimistic UI: you can push a temporary item here if desired
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data?.error || 'Failed to add job');
    }
    // add to local state (newest first)
    setJobs(prev => [data.data, ...prev]);
    return data.data;
  };

  const removeJob = async (id) => {
    // call DELETE
    const res = await fetch(`/api/jobs?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data?.error || 'Failed to delete job');
    }
    setJobs(prev => prev.filter(j => (j._id || j.id) !== id));
    return true;
  };

  useEffect(() => { fetchJobs(); }, []);

  return (
    <JobsContext.Provider value={{ jobs, loading, fetchJobs, addJob, removeJob }}>
      {children}
    </JobsContext.Provider>
  );
}

export const useJobs = () => useContext(JobsContext);
