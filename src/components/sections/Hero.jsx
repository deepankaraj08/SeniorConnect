import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_-10%,rgba(29,78,216,0.25),transparent_60%)] dark:bg-[radial-gradient(1200px_circle_at_50%_-10%,rgba(59,130,246,0.25),transparent_60%)]" />
        {/* subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.08)_1px,transparent_1px)] bg-[size:36px_36px]" />
        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white dark:from-slate-950/60 dark:via-transparent dark:to-slate-950" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 text-sm text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
          Senior talent, real impact
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
          Connecting Experience with{" "}
          <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
            Opportunity
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-7 text-slate-600 dark:text-slate-300">
          SeniorConnect bridges the gap between skilled senior citizens (60+)
          and companies seeking experienced professionals for part-time,
          freelance, and consultancy roles.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/senior/register"
            className="group inline-flex items-center justify-center rounded-xl border border-blue-600 bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-blue-600/20 transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30 active:translate-y-0 dark:border-blue-500 dark:bg-blue-500"
            aria-label="Register as Senior Citizen"
          >
            Register as Senior Citizen
            <svg
              className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/company/register"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-6 py-3 text-lg font-semibold text-slate-900 shadow-md backdrop-blur transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/60 active:translate-y-0 dark:border-white/15 dark:bg-white/10 dark:text-white"
            aria-label="Register as Company"
          >
            Register as Company
          </Link>
        </div>

        {/* Feature cards */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-center shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
            <div className="mb-3 text-4xl" aria-hidden>👵👴</div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              For Seniors
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Find meaningful work that values your decades of experience.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-center shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
            <div className="mb-3 text-4xl" aria-hidden>💼</div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              For Companies
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Access reliable, experienced professionals for your projects.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-center shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
            <div className="mb-3 text-4xl" aria-hidden>⚡</div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Quick Matching
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Smart matching aligns skills with opportunities instantly.
            </p>
          </div>
        </div>

        {/* Social proof / stats (optional) */}
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
          <span>✅ Trusted by 50+ employers</span>
          <span className="hidden h-1 w-1 rounded-full bg-slate-400/60 sm:inline-block" />
          <span>🔒 Secure & privacy-first</span>
          <span className="hidden h-1 w-1 rounded-full bg-slate-400/60 sm:inline-block" />
          <span>🌗 Dark mode ready</span>
        </div>
      </div>
    </section>
  );
}
