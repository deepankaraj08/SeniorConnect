"use client";

import "./print.css";
import { useEffect, useState } from "react";
import { loadResumeFromLocal } from "@/utils/storeResume";

export default function ResumePage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(loadResumeFromLocal());
    }, []);

    if (!data) {
        return (
            <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
                <p>No resume data found. Please complete registration.</p>
            </main>
        );
    }

    return (
        <main className="bg-slate-900 text-white flex justify-center print:min-h-0 print:p-0">

            <div id="resume-container" className="max-w-3xl w-full bg-slate-800 p-8 rounded-2xl shadow-xl print:rounded-none print:p-6">



                {/* NAME */}
                <h1 className="text-4xl font-bold">{data.fullName}</h1>

                {/* LOCATION + WORK TYPE */}
                <p className="text-slate-300 mt-1">
                    {data.workPreference} • {data.location}
                </p>

                {/* AGE + GENDER */}
                <p className="text-slate-400 mt-2">
                    Age: {data.age} • Gender: {data.gender}
                </p>

                <hr className="my-6 border-slate-600" />

                {/* SUMMARY */}
                <h2 className="text-2xl font-semibold mb-2">Summary</h2>
                <p className="text-slate-300">
                    Senior professional with {data.experience} years of experience in{" "}
                    {data.skills}. Seeking {data.workPreference} roles.
                </p>

                {/* SKILLS */}
                <h2 className="text-2xl font-semibold mt-6 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {data.skills.split(",").map((s) => (
                        <span key={s} className="bg-slate-700 px-3 py-1 rounded-lg text-sm">
                            {s.trim()}
                        </span>
                    ))}
                </div>

                {/* CONTACT */}
                <h2 className="text-2xl font-semibold mt-6 mb-2">Contact</h2>
                <p className="text-slate-300">Email: {data.email}</p>
                <p className="text-slate-300">
                    LinkedIn: <a href={data.linkedin}>{data.linkedin}</a>
                </p>
                {data.github && (
                    <p className="text-slate-300">
                        GitHub: <a href={data.github}>{data.github}</a>
                    </p>
                )}

                <button
                    onClick={() => window.print()}
                    className="mt-6 w-full bg-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-700 no-print"
                >
                    Download as PDF
                </button>

            </div>
        </main>
    );
}
