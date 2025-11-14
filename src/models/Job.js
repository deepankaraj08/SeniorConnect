// src/models/Job.js
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, default: '' },
  salaryRange: { type: String, default: '' },
  salary: { type: String, default: '' },
  description: { type: String, default: '' },
  requirements: { type: String, default: '' },
  skillsRequired: { type: [String], default: [] },
  status: { type: String, default: 'active', enum: ['active', 'closed', 'draft'] },
  createdAt: { type: Date, default: () => new Date() }
});

// Avoid model overwrite in dev
const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);
export default Job;
