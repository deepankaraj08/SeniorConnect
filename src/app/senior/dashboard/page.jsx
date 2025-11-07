'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SeniorDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Financial Consultant",
      company: "TechCorp Inc.",
      location: "Remote",
      type: "part-time",
      salary: "$50-75/hr",
      skills: ["Accounting", "Financial Analysis", "Excel"],
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Marketing Advisor",
      company: "StartupXYZ",
      location: "Hybrid",
      type: "consultancy",
      salary: "$40-60/hr",
      skills: ["Marketing", "Strategy", "Branding"],
      posted: "1 week ago"
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      jobTitle: "Senior Accountant",
      company: "FinancePro",
      status: "shortlisted",
      applied: "2024-01-15"
    }
  ]);

  useEffect(() => {
    if (!user || user.type !== 'senior') {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your experience matters. Find your next opportunity.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['profile', 'jobs', 'applications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Profile Overview
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Name
                      </label>
                      <p className="text-gray-900 dark:text-white">Robert Chen</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Age
                      </label>
                      <p className="text-gray-900 dark:text-white">65</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Skills
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {['Financial Analysis', 'Strategic Planning', 'Team Leadership', 'Excel'].map(skill => (
                        <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Applications</span>
                    <span className="font-semibold text-gray-900 dark:text-white">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Interviews</span>
                    <span className="font-semibold text-gray-900 dark:text-white">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Hired</span>
                    <span className="font-semibold text-green-600">1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Available Jobs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map(job => (
                <div key={job.id} className="card">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{job.company} • {job.location}</p>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm">
                      {job.type}
                    </span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {job.salary}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map(skill => (
                      <span key={skill} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button className="w-full btn-primary">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Your Applications
            </h2>
            <div className="card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 text-gray-900 dark:text-white">Job Title</th>
                      <th className="text-left py-3 text-gray-900 dark:text-white">Company</th>
                      <th className="text-left py-3 text-gray-900 dark:text-white">Status</th>
                      <th className="text-left py-3 text-gray-900 dark:text-white">Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-3 text-gray-900 dark:text-white">{app.jobTitle}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-300">{app.company}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-sm ${
                            app.status === 'applied' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                            app.status === 'shortlisted' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                            'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3 text-gray-600 dark:text-gray-300">{app.applied}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}