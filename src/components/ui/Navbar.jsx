'use client';
import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';


export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    setOpen(false);
    setUserMenu(false);
  }, [pathname]);

  const navLink =
    'inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 ' +
    'dark:text-slate-200 dark:hover:bg-white/10';

  const primaryBtn =
    'inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white ' +
    'shadow-md shadow-blue-600/30 hover:-translate-y-0.5 transition active:translate-y-0 ' +
    'focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30 dark:from-blue-500 dark:to-sky-400';

  const secondaryBtn =
    'inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 ' +
    'shadow-sm backdrop-blur hover:-translate-y-0.5 transition active:translate-y-0 ' +
    'focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/60 ' +
    'dark:border-white/15 dark:bg-white/10 dark:text-white';

  const active = (href) =>
    pathname === href
      ? 'text-blue-600 dark:text-blue-400'
      : 'text-slate-700 dark:text-slate-200';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200/70 dark:bg-slate-900/70 dark:border-white/10 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
              SeniorConnect
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/" className={`${navLink} ${active('/')}`}>Home</Link>
            <Link href="/about" className={`${navLink} ${active('/about')}`}>About</Link>

            {/* Jobs → external site */}
            <a
              href="https://job-finder-zeta-eight.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className={primaryBtn}
            >
              🔍 Find Jobs
            </a>

            {/* Theme toggle */}
           

            {/* Auth area */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu((v) => !v)}
                  className="ml-2 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-3 py-2 text-sm font-medium 
                  text-slate-900 shadow-sm backdrop-blur hover:bg-slate-100 dark:border-white/15 dark:bg-white/10 
                  dark:text-white dark:hover:bg-white/20 transition"
                >
                  <span className="hidden sm:inline text-slate-700 dark:text-slate-200">
                    Welcome,&nbsp;<span className="font-semibold">{user.name}</span>
                  </span>

                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 
                    text-white text-sm font-bold dark:from-blue-500 dark:to-sky-400">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </span>

                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${userMenu ? 'rotate-180 opacity-90' : 'opacity-70'}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {userMenu && (
                  <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-slate-800">
                    <div className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-xs opacity-70">{user.email}</div>
                    </div>
                    <div className="h-px bg-slate-200 dark:bg-white/10" />
                    <div className="p-2">
                      <Link
                        href={user.type === 'senior' ? '/senior/dashboard' : '/company/dashboard'}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-white/10"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="ml-2 flex items-center gap-2">
                <Link href="/senior/register" className={primaryBtn}>Senior Sign Up</Link>
                <Link href="/company/register" className={secondaryBtn}>Company Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white/70 shadow-sm backdrop-blur hover:bg-slate-100 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white/70 shadow-sm backdrop-blur hover:bg-slate-100 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="flex flex-col gap-2">
              <Link href="/" className={`rounded-lg px-3 py-2 ${active('/')}`}>Home</Link>
              <Link href="/about" className={`rounded-lg px-3 py-2 ${active('/about')}`}>About</Link>
              
              {/* External job site */}
              <a
                href="https://job-finder-zeta-eight.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-3 py-2 font-semibold text-blue-600 dark:text-blue-400"
              >
                🔍 Find Jobs
              </a>

              <div className="h-px my-2 bg-slate-200 dark:bg-white/10" />
              {user ? (
                <>
                  <Link
                    href={user.type === 'senior' ? '/senior/dashboard' : '/company/dashboard'}
                    className="rounded-lg px-3 py-2"
                  >
                    Dashboard
                  </Link>
                  <button onClick={logout} className="rounded-lg px-3 py-2 text-left text-rose-600">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/senior/register" className="rounded-lg px-3 py-2">
                    Senior Sign Up
                  </Link>
                  <Link href="/company/register" className="rounded-lg px-3 py-2">
                    Company Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
