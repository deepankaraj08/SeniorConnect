export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SeniorConnect</h3>
            <p className="text-gray-300">
              Connecting experienced senior citizens with meaningful opportunities.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">For Seniors</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/senior/register" className="hover:text-white">Register</a></li>
              <li><a href="#" className="hover:text-white">Find Jobs</a></li>
              <li><a href="#" className="hover:text-white">Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">For Companies</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/company/register" className="hover:text-white">Register</a></li>
              <li><a href="#" className="hover:text-white">Post Jobs</a></li>
              <li><a href="#" className="hover:text-white">Find Talent</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@seniorconnect.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Career St, City</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; 2024 SeniorConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}