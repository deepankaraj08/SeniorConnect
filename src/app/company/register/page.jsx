'use client';

import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CompanyRegister() {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    contact: '',
    description: '',
    logo: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const logoPreview = useMemo(() => {
    if (!formData.logo) return null;
    return URL.createObjectURL(formData.logo);
  }, [formData.logo]);

  const inputClass =
    'block w-full rounded-xl border border-slate-300 bg-white/80 px-4 py-2.5 text-slate-900 shadow-sm ' +
    'placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-600/20 ' +
    'dark:border-white/15 dark:bg-white/10 dark:text-white';
  const labelClass = 'block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2';
  const errorClass = 'mt-1 text-sm text-rose-600 dark:text-rose-400';

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      // validate logo
      if (name === 'logo') {
        if (!file.type.startsWith('image/')) {
          setErrors((p) => ({ ...p, logo: 'Please upload an image file.' }));
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          setErrors((p) => ({ ...p, logo: 'Max size is 2 MB.' }));
          return;
        }
      }
      setErrors((p) => ({ ...p, [name]: undefined }));
      setFormData((p) => ({ ...p, [name]: file }));
      return;
    }

    setErrors((p) => ({ ...p, [name]: undefined }));
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!formData.companyName.trim()) e.companyName = 'Company name is required.';
    if (!formData.industry) e.industry = 'Select an industry.';
    if (!formData.contact.trim()) e.contact = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact))
      e.contact = 'Enter a valid email address.';
    if (!formData.description.trim()) e.description = 'Description is required.';
    else if (formData.description.trim().length < 40)
      e.description = 'Please write at least 40 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      // Simulated registration
      const userData = {
        id: Date.now().toString(),
        name: formData.companyName.trim(),
        email: formData.contact.trim(),
        type: 'company',
        industry: formData.industry,
      };
      login(userData);
      router.push('/company/dashboard');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-12 dark:from-slate-950 dark:to-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Company Registration</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Join our platform to access experienced senior professionals.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-8"
        >
          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className={labelClass}>
              Company Name *
            </label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={inputClass}
              required
              aria-invalid={!!errors.companyName}
              aria-describedby={errors.companyName ? 'companyName-err' : undefined}
            />
            {errors.companyName && (
              <p id="companyName-err" className={errorClass}>{errors.companyName}</p>
            )}
          </div>

          {/* Industry */}
          <div className="mt-6">
            <label htmlFor="industry" className={labelClass}>
              Industry *
            </label>
            <div className="relative">
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className={`${inputClass} appearance-none`}
                required
                aria-invalid={!!errors.industry}
                aria-describedby={errors.industry ? 'industry-err' : undefined}
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="other">Other</option>
              </select>
              {/* dropdown chevron */}
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
            {errors.industry && <p id="industry-err" className={errorClass}>{errors.industry}</p>}
          </div>

          {/* Contact */}
          <div className="mt-6">
            <label htmlFor="contact" className={labelClass}>
              Contact Email *
            </label>
            <input
              id="contact"
              type="email"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={inputClass}
              autoComplete="email"
              required
              aria-invalid={!!errors.contact}
              aria-describedby={errors.contact ? 'contact-err' : undefined}
            />
            {errors.contact && <p id="contact-err" className={errorClass}>{errors.contact}</p>}
          </div>

          {/* Description */}
          <div className="mt-6">
            <label htmlFor="description" className={labelClass}>
              Company Description * <span className="sr-only">(min 40 chars)</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} resize-y`}
              placeholder="Describe your company and the type of professionals you're looking for..."
              required
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? 'description-err' : 'description-hint'}
            />
            {!errors.description && (
              <p id="description-hint" className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Tip: include role types, location/remote, and expected engagement (part-time, consultancy).
              </p>
            )}
            {errors.description && (
              <p id="description-err" className={errorClass}>{errors.description}</p>
            )}
            {/* Character counter */}
            <p className="mt-1 text-right text-xs text-slate-500 dark:text-slate-400">
              {formData.description.length} / 500
            </p>
          </div>

          {/* Logo */}
          <div className="mt-6">
            <label htmlFor="logo" className={labelClass}>
              Company Logo (max 2 MB)
            </label>
            <input
              id="logo"
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="block w-full rounded-xl border border-slate-300 bg-white/80 text-slate-900 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white hover:file:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-600/20 dark:border-white/15 dark:bg-white/10 dark:text-white"
              aria-invalid={!!errors.logo}
              aria-describedby={errors.logo ? 'logo-err' : undefined}
            />
            {errors.logo && <p id="logo-err" className={errorClass}>{errors.logo}</p>}

            {logoPreview && (
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-white/15"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Preview (not yet uploaded)
                </span>
              </div>
            )}
          </div>

          {/* Note */}
          <div className="mt-6 rounded-xl border border-blue-200/60 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-400/20 dark:bg-blue-900/20 dark:text-blue-200">
            <strong>Note:</strong> By registering, you agree to our 10% commission fee on successful hires.
            This fee is charged only when you hire a senior through our platform.
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-5 py-3 text-base font-semibold text-slate-900 shadow-md backdrop-blur transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/60 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/15 dark:bg-white/10 dark:text-white"
          >
            {submitting ? 'Submitting…' : 'Complete Company Registration'}
          </button>

          <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
            We respect your privacy. Your information is shared only with matched seniors.
          </p>
        </form>
      </div>
    </div>
  );
}
