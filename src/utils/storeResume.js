export const SENIOR_RESUME_KEY = "seniorResume";

export function saveResumeToLocal(data) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(SENIOR_RESUME_KEY, JSON.stringify(data));
    } catch (err) {
        console.error("Error saving resume:", err);
    }
}

export function loadResumeFromLocal() {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(SENIOR_RESUME_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (err) {
        console.error("Error loading resume:", err);
        return null;
    }
}

export function clearResumeFromLocal() {
    if (typeof window === "undefined") return;
    try {
        localStorage.removeItem(SENIOR_RESUME_KEY);
    } catch (err) {
        console.error("Error clearing resume:", err);
    }
}
