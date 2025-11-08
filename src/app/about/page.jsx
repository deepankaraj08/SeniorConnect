import Link from "next/link";

export default function Page() {
  // You can tweak these arrays without touching the JSX structure
  const howItWorks = [
    {
      icon: "👵",
      title: "For Seniors",
      desc:
        "Create a profile, list your skills, and explore flexible roles—part-time, freelance, or consultancy.",
    },
    {
      icon: "🏢",
      title: "For Companies",
      desc:
        "Discover seasoned professionals for projects, mentoring, and strategic guidance—on demand.",
    },
    {
      icon: "⚡",
      title: "Our Role",
      desc:
        "We enable trusted, efficient matches and handle secure workflows with a simple 10% success fee.",
    },
  ];

  const values = [
    { title: "Respect", desc: "Every career deserves dignity, recognition, and opportunity." },
    { title: "Empowerment", desc: "Helping seniors stay active, relevant, and independent." },
    { title: "Integrity", desc: "Transparent processes that build long-term trust." },
  ];

  const stats = [
    { label: "Seniors joined", value: "150+" },
    { label: "Companies onboarded", value: "25+" },
    { label: "Successful matches", value: "100+" },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">SeniorConnect</span>
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            SeniorConnect empowers experienced senior citizens (60+) to find meaningful work—and
            helps companies tap into wisdom that accelerates growth.
          </p>

          {/* Quick stats */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur
                           dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-sm mt-1 text-slate-600 dark:text-slate-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
            Many professionals retire while still brimming with expertise. At the same time,
            organizations need mentors and leaders who have “seen it all.” SeniorConnect bridges
            this gap by connecting experience with opportunity—sustainably, respectfully, and at scale.
          </p>
        </div>
      </section>

  

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Core Values</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur
                           dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
                  {v.title}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 text-center bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white">Join the SeniorConnect Community</h2>
          <p className="mt-3 text-white/90">
            Whether you’re a senior professional seeking purposeful work or a company looking for
            seasoned talent—let’s build the future together.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/senior/register"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-md hover:bg-blue-50"
            >
              Register as Senior
            </Link>
            <Link
              href="/company/register"
              className="inline-flex items-center justify-center rounded-xl border border-white/70 bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Register as Company
            </Link>
            {/* External jobs portal quick access */}
            <a
              href="https://job-finder-zeta-eight.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/40 hover:bg-white/15"
            >
              🔍 Find Jobs
            </a>
          </div>
          <p className="mt-4 text-xs text-white/80">
            Commission: 10% fee only on successful matches.
          </p>
        </div>
      </section>

   
     
    </main>
  );
}
