export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Create Your Profile",
      description: "Seniors create detailed profiles showcasing their skills and experience. Companies register and verify their business.",
      icon: "📝"
    },
    {
      number: 2,
      title: "Find Perfect Matches",
      description: "Our smart matching algorithm connects seniors with relevant opportunities and companies with qualified candidates.",
      icon: "🔍"
    },
    {
      number: 3,
      title: "Get Hired & Grow",
      description: "Seniors get hired for meaningful work. Companies benefit from experienced talent. We handle payments securely.",
      icon: "🚀"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Simple three-step process to connect experience with opportunity
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="card text-center h-full">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Commission Model
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              We charge a <span className="font-bold text-blue-600">10% commission</span> only on successful job matches, 
              ensuring we're invested in your success.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              * Commission is calculated on the total project value and processed securely via Razorpay
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}