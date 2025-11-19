"use client";

export default function JobFilterBar({ onChange }) {
    return (
        <div className="flex flex-wrap gap-4 mb-6">

            {/* Domain Filter */}
            <select
                onChange={(e) => onChange("domain", e.target.value)}
                className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg"
            >
                <option value="">All Domains</option>
                <option value="it">IT</option>
                <option value="teaching">Teaching</option>
                <option value="finance">Finance</option>
                <option value="management">Management</option>
            </select>

            {/* Work Type Filter */}
            <select
                onChange={(e) => onChange("workType", e.target.value)}
                className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg"
            >
                <option value="">All Types</option>
                <option value="part-time">Part-time</option>
                <option value="remote">Remote</option>
                <option value="freelance">Freelance</option>
                <option value="hybrid">Hybrid</option>
                <option value="consultancy">Consultancy</option>
            </select>

        </div>
    );
}
