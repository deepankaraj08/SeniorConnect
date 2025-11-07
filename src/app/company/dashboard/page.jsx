'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CompanyDashboard() {
  const { user } = useAuth();
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
    skillsRequired: ''
  });

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Financial Consultant",
      applications: 5,
      status: "active",
      posted: "2024-01-10"
    }
  ]);

  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "Robert Chen",
      age: 65,
      skills: ["Financial Analysis", "Strategic Planning"],
      experience: "40+ years",
      status: "applied",
      applied: "2024-01-12"
    }
  ]);

  useEffect(() => {
    if (!user || user.type !== 'company') {
      router.push('/');
    }
  }, [user, router]);

  const handleJobSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: jobs.length + 1,
      title: jobForm.title,
      applications: 0,
      status: "active",
      posted: new Date().toISOString().split('T')[0]
    };
    setJobs([...jobs, newJob]);
    setShowJobForm(false);
    setJobForm({
      title: '',
      description: '',
      requirements: '',
      location: '',
      workType: '',
      salaryRange: '',
      skillsRequired: ''
    });
  };

  const handleHire = (applicantId) => {
    // Simulate hiring process and commission
    alert(`Hiring process initiated! 10% commission will be applied upon successful hiring.`);
    setApplicants(applicants.map(app => 
      app.id === applicantId ? { ...app, status: 'hired' } : app
    ));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Company Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your job posts and find experienced senior professionals
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'jobs', 'applicants'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {jobs.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Active Jobs</div>
            </div>
            
            <div className="card text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {applicants.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Total Applicants</div>
            </div>
            
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {applicants.filter(a => a.status === 'hired').length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Successful Hires</div>
            </div>
            
            <div className="card text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                10%
              </div>
              <div className="text-gray-600 dark:text-gray-300">Commission Rate</div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Job Posts
              </h2>
              <button
                onClick={() => setShowJobForm(true)}
                className="btn-secondary"
              >
                + Create Job Post
              </button>
            </div>

            {showJobForm && (
              <div className="card">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Create New Job Post
                </h3>
                <form onSubmit={handleJobSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={jobForm.title}
                        onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Work Type *
                      </label>
                      <select
                        value={jobForm.workType}
                        onChange={(e) => setJobForm({...jobForm, workType: e.target.value})}
                        className="input-field"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="part-time">Part-time</option>
                        <option value="freelance">Freelance</option>
                        <option value="consultancy">Consultancy</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Job Description *
                    </label>
                    <textarea
                      value={jobForm.description}
                      onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                      rows="3"
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button type="submit" className="btn-primary">
                      Post Job
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowJobForm(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
              {jobs.map(job => (
                <div key={job.id} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Posted on {job.posted} • {job.applications} applicants
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      job.status === 'active' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applicants Tab */}
        {activeTab === 'applicants' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Applicants
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {applicants.map(applicant => (
                <div key={applicant.id} className="card">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {applicant.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Age: {applicant.age} • Experience: {applicant.experience}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {applicant.skills.map(skill => (
                          <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        applicant.status === 'applied' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                        applicant.status === 'hired' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}