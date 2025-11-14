// src/app/api/jobs/[id]/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDB } from '@/lib/mongodb';
import Job from '@/models/Job';

export const runtime = 'nodejs';

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /api/jobs/:id
export async function GET(req, context) { // Renamed params to context for clarity
  try {
    await connectToDB();

    // 🌟 FIX APPLIED HERE 🌟
    const { id } = await context.params; 
    
    if (!isValidId(id))
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });

    const job = await Job.findById(id);
    if (!job)
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error("GET /api/jobs/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch job" }, { status: 500 });
  }
}

// PATCH /api/jobs/:id
export async function PATCH(req, context) {
  try {
    await connectToDB();
    
    // 🌟 FIX APPLIED HERE 🌟
    const { id } = await context.params;

    if (!isValidId(id))
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });

    const body = await req.json();

    const updated = await Job.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    if (!updated)
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/jobs/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to update job" }, { status: 500 });
  }
}

// DELETE /api/jobs/:id
export async function DELETE(req, context) {
  try {
    await connectToDB();

    // 🌟 FIX APPLIED HERE 🌟
    const { id } = await context.params;
    
    if (!isValidId(id))
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });

    const deleted = await Job.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: deleted });
  } catch (error) {
    console.error("DELETE /api/jobs/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete job" }, { status: 500 });
  }
}