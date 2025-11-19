// Simple job filtering helper
export const filterJobs = (jobs, filters) => {
    return jobs.filter((job) => {
        if (filters.domain && job.domain !== filters.domain) return false;
        if (filters.workType && job.workType !== filters.workType) return false;
        return true;
    });
};
