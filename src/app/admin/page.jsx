'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const [stats, setStats] = useState({
    totalUsers: 150,
    totalCompanies: 45,
    totalJobs: 89,
    totalHires: 23,
    totalCommission: 12500
  });

  const [hires, setHires] = useState([
    {
      id: 1,
      seniorName: "Robert Chen",
      companyName: "TechCorp Inc.",
      jobTitle: "Financial Consultant",
      amount: 5000,
      commission: 500,
      date: "2024-01-15",
      status: "completed"
    }
  ]);

  useEffect(() => {
    if (!user || user.type !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage platform users, jobs, and commission records
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'users', 'jobs', 'payments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-green-500 text-green-600 dark:text-green-400'
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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="card text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.totalUsers}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Total Users</div>
              </div>
              
              <div className="card text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.totalCompanies}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Companies</div>
              </div>
              
              <div className="card text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.totalJobs}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Active Jobs</div>
              </div>
              
              <div className="card text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {stats.totalHires}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Successful Hires</div>
              </div>
              
              <div className="card text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  ${stats.totalCommission}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Total Commission</div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Recent Successful Hires
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 text-gray-900 dark:text-white">Senior</th>
                      <th className="text-left py-3 text-gray-900 dark:text-white">Company</th>
                      <th className="text-left py-3 text-gray-900 dark:text-white">Job</th>
                      <th className="text-left py-3 text-gray-900 dark:text-white">Amount</th>
                      <th className="text-left py-3 text-gray-900 dark:text-white">Commission</th>
                      <th className="text-left py-3 text-gray-900 dark:text-white">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hires.map(hire => (
                      <tr key={hire.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-3 text-gray-900 dark:text-white">{hire.seniorName}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-300">{hire.companyName}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-300">{hire.jobTitle}</td>
                        <td className="py-3 text-gray-900 dark:text-white">${hire.amount}</td>
                        <td className="py-3 text-green-600 font-semibold">${hire.commission}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-300">{hire.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Commission Records
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 text-gray-900 dark:text-white">Transaction ID</th>
                    <th className="text-left py-3 text-gray-900 dark:text-white">Hire ID</th>
                    <th className="text-left py-3 text-gray-900 dark:text-white">Amount</th>
                    <th className="text-left py-3 text-gray-900 dark:text-white">Commission (10%)</th>
                    <th className="text-left py-3 text-gray-900 dark:text-white">Status</th>
                    <th className="text-left py-3 text-gray-900 dark:text-white">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {hires.map(hire => (
                    <tr key={hire.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 text-gray-900 dark:text-white">TXN_{hire.id.toString().padStart(6, '0')}</td>
                      <td className="py-3 text-gray-600 dark:text-gray-300">HIRE_{hire.id.toString().padStart(6, '0')}</td>
                      <td className="py-3 text-gray-900 dark:text-white">${hire.amount}</td>
                      <td className="py-3 text-green-600 font-semibold">${hire.commission}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-sm ${
                          hire.status === 'completed' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        }`}>
                          {hire.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-600 dark:text-gray-300">{hire.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}