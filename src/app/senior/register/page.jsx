'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

/* ------------------- Helper Functions ------------------- */

// Normalize "www.linkedin.com/..." -> "https://www.linkedin.com/..."
const normalizeLinkedInUrl = (url) => {
  if (!url) return '';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

// Extract LinkedIn handle (like "deepankaraj") from URL
const extractLinkedInHandle = (url) => {
  const m = url.match(/linkedin\.com\/in\/([a-z0-9\-_%]+)/i);
  return m ? decodeURIComponent(m[1]) : null;
};

// Convert slug to title case, e.g. "john-doe-123" → "John Doe"
const titleCaseFromSlug = (slug) =>
  slug
    .split('-')
    .filter((s) => s && !/^\d+$/.test(s))
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

// Promise that resolves if the image loads (no CORS issues)
const imageExists = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(true);
    img.onerror = () => reject(new Error('img error'));
    img.src = `${src}${src.includes('?') ? '&' : '?'}t=${Date.now()}`;
  });

/* ------------------- Component ------------------- */

export default function SeniorRegister() {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    skills: '',
    experience: '',
    contact: '',
    workPreferences: '',
    linkedin: '',
    github: '',
    resume: null,
    profilePhoto: null,      // file
    profilePhotoUrl: '',     // URL fetched from LinkedIn avatar
  });

  const [prefill, setPrefill] = useState(null); // { name, photoUrl }
  const [fetchState, setFetchState] = useState('idle'); // 'idle' | 'loading' | 'done' | 'notfound'
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const photoPreview = useMemo(() => {
    if (formData.profilePhoto) return URL.createObjectURL(formData.profilePhoto);
    if (formData.profilePhotoUrl) return formData.profilePhotoUrl;
    return null;
  }, [formData.profilePhoto, formData.profilePhotoUrl]);

  // Fetch avatar + guess name from LinkedIn URL
  const tryPrefillFromLinkedIn = async (rawUrl) => {
    const normalized = normalizeLinkedInUrl(rawUrl);
    setFormData((p) => ({ ...p, linkedin: normalized }));
    setFetchState('loading');

    const handle = extractLinkedInHandle(normalized);
    if (!handle) {
      setPrefill(null);
      setFetchState('notfound');
      return;
    }

    const photoUrl = `https://unavatar.io/linkedin/${encodeURIComponent(handle)}?fallback=false`;
    const guessedName = titleCaseFromSlug(handle) || '';

    try {
      await imageExists(photoUrl);
      setPrefill({ name: guessedName, photoUrl });
      setFetchState('done');
    } catch {
      setPrefill({ name: guessedName, photoUrl: '' });
      setFetchState('notfound');
    }
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (files) {
      const file = files[0];

      if (name === 'resume') {
        const okTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (!okTypes.includes(file.type)) {
          setErrors((prev) => ({ ...prev, resume: 'Upload a PDF/DOC/DOCX file.' }));
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          setErrors((prev) => ({ ...prev, resume: 'Max size 5 MB.' }));
          return;
        }
      }

      if (name === 'profilePhoto') {
        if (!file.type.startsWith('image/')) {
          setErrors((prev) => ({ ...prev, profilePhoto: 'Upload an image file.' }));
          return;
        }
        if (file.size > 3 * 1024 * 1024) {
          setErrors((prev) => ({ ...prev, profilePhoto: 'Max size 3 MB.' }));
          return;
        }
        setFormData((p) => ({ ...p, profilePhotoUrl: '' }));
      }

      setErrors((prev) => ({ ...prev, [name]: undefined }));
      setFormData((prev) => ({ ...prev, [name]: file }));
      return;
    }

    setErrors((prev) => ({ ...prev, [name]: undefined }));

    if (name === 'linkedin') {
      setPrefill(null);
      setFetchState('idle');
      const normalized = normalizeLinkedInUrl(value);
      setFormData((prev) => ({ ...prev, linkedin: normalized }));
      return;
    }

    if (name === 'github') {
      const trimmed = value.trim();
      const normalized = trimmed
        ? /^https?:\/\//i.test(trimmed)
          ? trimmed
          : `https://${trimmed}`
        : '';
      setFormData((prev) => ({ ...prev, github: normalized }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: type === 'number' ? value : value }));
  };

  const validate = () => {
    const e = {};

    if (!formData.name.trim()) e.name = 'Full name is required.';
    const ageNum = Number(formData.age);
    if (!ageNum || Number.isNaN(ageNum)) e.age = 'Enter your age.';
    else if (ageNum < 60) e.age = 'You must be 60 or older to register.';

    if (!formData.location.trim()) e.location = 'Location is required.';
    if (!formData.skills.trim()) e.skills = 'Please add at least one skill.';

    if (!formData.experience) e.experience = 'Years of experience is required.';
    else if (Number(formData.experience) < 1) e.experience = 'Must be at least 1 year.';

    if (!formData.contact.trim()) e.contact = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact))
      e.contact = 'Enter a valid email address.';

    const ln = normalizeLinkedInUrl(formData.linkedin);
    if (!ln) e.linkedin = 'LinkedIn profile link is required.';
    else if (!/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-z0-9\-_%]+/i.test(ln))
      e.linkedin = 'Enter a valid LinkedIn URL (e.g. https://linkedin.com/in/yourname).';

    const gh = (formData.github || '').trim();
    if (gh && !/^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9-_.]+/i.test(gh))
      e.github = 'Enter a valid GitHub URL (e.g. https://github.com/username).';

    if (!formData.workPreferences) e.workPreferences = 'Select a work preference.';

    if (formData.resume && formData.resume.size > 5 * 1024 * 1024) e.resume = 'Max size 5 MB.';
    if (formData.profilePhoto && formData.profilePhoto.size > 3 * 1024 * 1024)
      e.profilePhoto = 'Max size 3 MB.';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);

      const skillsArray = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const userData = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        email: formData.contact.trim(),
        type: 'senior',
        age: Number(formData.age),
        gender: formData.gender || null,
        location: formData.location.trim(),
        skills: skillsArray,
        experience: Number(formData.experience),
        preference: formData.workPreferences,
        linkedin: normalizeLinkedInUrl(formData.linkedin),
        github: formData.github.trim() || null,
        profilePhotoUrl: formData.profilePhotoUrl || null,
      };

      login(userData);
      router.push('/senior/dashboard');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'block w-full rounded-xl border border-slate-300 bg-white/80 px-4 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-600/20 dark:border-white/15 dark:bg-white/10 dark:text-white';
  const labelClass = 'block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2';
  const errorClass = 'mt-1 text-sm text-rose-600 dark:text-rose-400';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-12 dark:from-slate-950 dark:to-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Senior Citizen Registration
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Join our platform and showcase your valuable experience.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-8"
          noValidate
        >
          {/* Name + Age */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>Full Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                autoComplete="name"
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-err' : undefined}
              />
              {errors.name && <p id="name-err" className={errorClass}>{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="age" className={labelClass}>Age * (60+)</label>
              <input
                id="age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min={60}
                className={inputClass}
                required
                aria-invalid={!!errors.age}
                aria-describedby={errors.age ? 'age-err' : undefined}
              />
              {errors.age && <p id="age-err" className={errorClass}>{errors.age}</p>}
            </div>
          </div>

          {/* Gender + Location */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="gender" className={labelClass}>Gender</label>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 dark:text-slate-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="location" className={labelClass}>Location *</label>
              <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={inputClass}
                required
                aria-invalid={!!errors.location}
                aria-describedby={errors.location ? 'location-err' : undefined}
              />
              {errors.location && <p id="location-err" className={errorClass}>{errors.location}</p>}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <label htmlFor="skills" className={labelClass}>Skills (comma separated) *</label>
            <input
              id="skills"
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., Accounting, Management, Teaching, Programming"
              className={inputClass}
              required
              aria-invalid={!!errors.skills}
              aria-describedby={errors.skills ? 'skills-err' : undefined}
            />
            {errors.skills && <p id="skills-err" className={errorClass}>{errors.skills}</p>}
            {formData.skills.trim() && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .slice(0, 8)
                  .map((tag, i) => (
                    <span
                      key={`${tag}-${i}`}
                      className="rounded-full border border-slate-300/70 px-2.5 py-1 text-xs text-slate-700 dark:border-white/15 dark:text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            )}
          </div>

          {/* Experience */}
          <div className="mt-6">
            <label htmlFor="experience" className={labelClass}>Years of Experience *</label>
            <input
              id="experience"
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              min={1}
              className={inputClass}
              required
              aria-invalid={!!errors.experience}
              aria-describedby={errors.experience ? 'exp-err' : undefined}
            />
            {errors.experience && <p id="exp-err" className={errorClass}>{errors.experience}</p>}
          </div>

          {/* Email */}
          <div className="mt-6">
            <label htmlFor="contact" className={labelClass}>Email Address *</label>
            <input
              id="contact"
              type="email"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={inputClass}
              required
              autoComplete="email"
              aria-invalid={!!errors.contact}
              aria-describedby={errors.contact ? 'contact-err' : undefined}
            />
            {errors.contact && <p id="contact-err" className={errorClass}>{errors.contact}</p>}
          </div>

          {/* LinkedIn (required) + Fetch */}
          <div className="mt-6">
            <label htmlFor="linkedin" className={labelClass}>LinkedIn Profile Link *</label>
            <div className="flex gap-3">
              <input
                id="linkedin"
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                onBlur={(e) => tryPrefillFromLinkedIn(e.target.value)}
                placeholder="https://linkedin.com/in/yourname"
                className={`${inputClass} flex-1`}
                required
                aria-invalid={!!errors.linkedin}
                aria-describedby={errors.linkedin ? 'linkedin-err' : undefined}
              />
              <button
                type="button"
                onClick={() => tryPrefillFromLinkedIn(formData.linkedin)}
                className="rounded-xl border border-slate-300 bg-white/80 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:-translate-y-0.5 transition dark:border-white/15 dark:bg-white/10 dark:text-white disabled:opacity-60"
                disabled={fetchState === 'loading'}
              >
                {fetchState === 'loading' ? 'Fetching…' : 'Fetch'}
              </button>
            </div>
            {errors.linkedin && <p id="linkedin-err" className={errorClass}>{errors.linkedin}</p>}
          </div>
{/* Work preference */}
<div className="mt-6">
  <label htmlFor="workPreferences" className={labelClass}>
    Work Preferences *
  </label>
  <div className="relative">
    <select
      id="workPreferences"
      name="workPreferences"
      value={formData.workPreferences}
      onChange={handleChange}
      className={`${inputClass} appearance-none`}
      required
      aria-invalid={!!errors.workPreferences}
      aria-describedby={errors.workPreferences ? 'pref-err' : undefined}
    >
      <option value="">Select Preference</option>
      <option value="part-time">Part-time</option>
      <option value="freelance">Freelance</option>
      <option value="consultancy">Consultancy</option>
      <option value="remote">Remote</option>
      <option value="hybrid">Hybrid</option>
    </select>
    <svg
      className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 dark:text-slate-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  </div>
  {errors.workPreferences && (
    <p id="pref-err" className={errorClass}>{errors.workPreferences}</p>
  )}
</div>

          {/* GitHub (optional) */}
          <div className="mt-6">
            <label htmlFor="github" className={labelClass}>GitHub Profile Link (optional)</label>
            <input
              id="github"
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className={inputClass}
              aria-invalid={!!errors.github}
              aria-describedby={errors.github ? 'github-err' : undefined}
            />
            {errors.github && <p id="github-err" className={errorClass}>{errors.github}</p>}
          </div>

          {/* Prefill card */}
          {prefill && (
            <div className="mt-6 flex items-center justify-between rounded-xl border border-emerald-300/40 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-300/20 dark:bg-emerald-900/20 dark:text-emerald-100">
              <div className="flex items-center gap-4">
                {prefill.photoUrl ? (
                  <img
                    src={prefill.photoUrl}
                    alt="LinkedIn avatar"
                    className="h-12 w-12 rounded-xl object-cover ring-1 ring-emerald-200 dark:ring-emerald-300/30"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-emerald-200 dark:ring-emerald-300/30">
                    <span className="text-xs opacity-75">No photo</span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold">
                    {fetchState === 'notfound' ? 'LinkedIn found (no avatar)' : 'LinkedIn details found'}
                  </p>
                  <p className="text-xs opacity-80">{prefill.name || 'Name not detected'}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                  onClick={() => {
                    setFormData((p) => ({
                      ...p,
                      name: p.name || prefill.name || p.name,
                      profilePhotoUrl: prefill.photoUrl || p.profilePhotoUrl,
                    }));
                    setPrefill(null);
                  }}
                >
                  Apply
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-emerald-300/40 px-3 py-1.5 text-sm font-medium hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                  onClick={() => setPrefill(null)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Files */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="resume" className={labelClass}>Resume (PDF/DOC, max 5 MB)</label>
              <input
                id="resume"
                type="file"
                name="resume"
                onChange={handleChange}
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="block w-full rounded-xl border border-slate-300 bg-white/80 text-slate-900 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white hover:file:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-600/20 dark:border-white/15 dark:bg-white/10 dark:text-white"
                aria-invalid={!!errors.resume}
                aria-describedby={errors.resume ? 'resume-err' : undefined}
              />
              {errors.resume && <p id="resume-err" className={errorClass}>{errors.resume}</p>}
              {formData.resume && (
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">Selected: {formData.resume.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="profilePhoto" className={labelClass}>Profile Photo (max 3 MB)</label>
              <input
                id="profilePhoto"
                type="file"
                name="profilePhoto"
                onChange={handleChange}
                accept="image/*"
                className="block w-full rounded-xl border border-slate-300 bg-white/80 text-slate-900 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white hover:file:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-600/20 dark:border-white/15 dark:bg-white/10 dark:text-white"
                aria-invalid={!!errors.profilePhoto}
                aria-describedby={errors.profilePhoto ? 'photo-err' : undefined}
              />
              {errors.profilePhoto && <p id="photo-err" className={errorClass}>{errors.profilePhoto}</p>}
              {photoPreview && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={photoPreview}
                    alt="Profile preview"
                    className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-white/15"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400">Preview (not yet uploaded)</span>
                </div>
              )}
            </div>
          </div>

          {/* Note */}
          <div className="mt-6 rounded-xl border border-blue-200/60 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-400/20 dark:bg-blue-900/20 dark:text-blue-200">
            <strong>Note:</strong> By registering, you agree to our 10% commission fee on successful job matches. The fee is only charged when you get hired through our platform.
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-blue-600 bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 dark:border-blue-500 dark:bg-blue-500"
          >
            {submitting ? 'Submitting…' : 'Complete Registration'}
          </button>

          <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
            We respect your privacy. Your information is only shared with matched employers.
          </p>
        </form>
      </div>
    </div>
  );
}
