export const saveResumeToLocal = (formData) => {
    if (typeof window === "undefined") return;

    const resumeData = {
        fullName: formData.fullName,          // FIXED ✔
        age: formData.age,
        gender: formData.gender,
        location: formData.location,
        skills: formData.skills,
        experience: formData.experience,
        email: formData.email,                // FIXED ✔
        linkedin: formData.linkedin,
        github: formData.github,
        workPreference: formData.workPreference, // FIXED ✔
        photo: formData.photo || null,
    };

    localStorage.setItem("seniorResumeData", JSON.stringify(resumeData));
};

export const loadResumeFromLocal = () => {
    if (typeof window === "undefined") return null;

    const data = localStorage.getItem("seniorResumeData");
    return data ? JSON.parse(data) : null;
};
