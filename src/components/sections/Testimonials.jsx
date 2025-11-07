export default function Testimonials() {
  const testimonials = [
    {
      name: "Robert Chen",
      age: 65,
      role: "Former CFO",
      quote: "After retirement, I found meaningful consultancy work through SeniorConnect. It's wonderful to keep using my financial expertise.",
      type: "senior"
    },
    {
      name: "Margaret Williams",
      age: 72,
      role: "Marketing Director",
      quote: "The platform connected me with startups needing strategic guidance. Working part-time gives me purpose and extra income.",
      type: "senior"
    },
    {
      name: "TechInnovate Inc.",
      role: "CEO",
      quote: "Hiring experienced seniors through SeniorConnect has been transformative. Their wisdom and reliability are invaluable to our team.",
      type: "company"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Hear from seniors and companies who found perfect matches
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-lg">
                  {testimonial.type === 'senior' ? '👵' : '💼'}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {testimonial.role}
                    {testimonial.age && `, ${testimonial.age}`}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}