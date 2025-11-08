import Link from 'next/link';

export default function Testimonials() {
  const testimonials = [
  {
    name: "Adrian Mesk",
    age: 64,
    role: "Founder & CEO at NovaMotion",
    quote:
      "Experience fuels innovation. SeniorConnect helped us onboard veteran engineers and financial strategists who understand how to turn breakthrough ideas into scalable technology. Their insight shortened our R&D cycle dramatically.",
    type: "company",
  },
  {
    name: "Dr. Lila Anderson",
    age: 68,
    role: "Former Chief Systems Engineer at AeroLink Aerospace",
    quote:
      "After decades designing propulsion systems, I wanted to keep shaping the next generation of flight. Through SeniorConnect, I’ve mentored young engineers building sustainable air-mobility tech — and it’s been energizing.",
    type: "senior",
  },
  {
    name: "Rajesh Mehra",
    age: 70,
    role: "Former Director of Operations at HelioVolt Energy",
    quote:
      "Transitioning into retirement didn’t mean stepping away from purpose. SeniorConnect connected me with solar-energy startups that value operational discipline and experience. It’s rewarding to still contribute to a greener future.",
    type: "senior",
  },
];


  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Success Stories
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Hear from seniors and companies who found the right match.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              className="group relative rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm ring-1 ring-transparent 
                         transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-blue-500/20 
                         dark:border-white/10 dark:bg-white/5"
            >
              {/* gradient top border accent */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 opacity-60"></span>

              <div className="flex items-center gap-4">
                <div
                  className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xl 
                             ring-2 ring-white/70 dark:ring-white/10"
                  aria-hidden
                >
                  {t.type === "senior" ? "👵" : "💼"}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="truncate font-semibold text-slate-900 dark:text-white">
                      {t.name}
                    </h4>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium 
                                  ring-1 ring-inset ${
                                    t.type === "senior"
                                      ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/20 dark:text-emerald-200 dark:ring-emerald-300/30"
                                      : "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-200 dark:ring-blue-300/30"
                                  }`}
                    >
                      {t.type === "senior" ? "Senior" : "Company"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                    {t.role}
                    {t.age ? `, ${t.age}` : ""}
                  </p>
                </div>
              </div>

              <blockquote className="mt-4">
                <svg
                  className="mb-2 h-6 w-6 opacity-30 text-slate-400 dark:text-slate-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V20h8v-8H6.34A3.34 3.34 0 0 1 9.68 8.66 5.17 5.17 0 0 0 7.17 6zm10 0A5.17 5.17 0 0 0 12 11.17V20h8v-8h-3.66a3.34 3.34 0 0 1 3.34-3.34A5.17 5.17 0 0 0 17.17 6z" />
                </svg>
                <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  “{t.quote}”
                </p>
              </blockquote>
            </article>
          ))}
        </div>

        {/* subtle CTA under grid */}
        <div className="mt-10 text-center">
        <a
  href="https://job-finder-zeta-eight.vercel.app"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20
             transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30
             dark:bg-blue-500"
>
  Explore Opportunities
</a>

        </div>
      </div>
    </section>
  );
}
