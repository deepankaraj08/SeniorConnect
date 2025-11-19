import mongoose from "mongoose";

const SeniorSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        gender: String,
        location: String,
        skills: [String],
        experience: Number,
        email: String,
        linkedin: String,
        github: String,
        preference: String,
        profilePhotoUrl: String
    },
    { timestamps: true }
);

export default mongoose.models.Senior ||
    mongoose.model("Senior", SeniorSchema);
