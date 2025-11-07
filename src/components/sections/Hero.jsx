import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Connecting Experience with <span className="text-blue-600">Opportunity</span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          SeniorConnect bridges the gap between skilled senior citizens (age 60+) and companies 
          seeking experienced professionals for part-time, freelance, and consultancy roles.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/senior/register" 
            className="btn-primary text-lg px-8 py-4"
          >
            Register as Senior Citizen
          </Link>
          <Link 
            href="/company/register" 
            className="btn-secondary text-lg px-8 py-4"
          >
            Register as Company
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="card text-center">
            <div className="text-3xl mb-4">👵👴</div>
            <h3 className="text-xl font-semibold mb-2">For Seniors</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find meaningful work that values your decades of experience
            </p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl mb-4">💼</div>
            <h3 className="text-xl font-semibold mb-2">For Companies</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access reliable, experienced professionals for your projects
            </p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Quick Matching</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Smart algorithm matches skills with opportunities instantly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}