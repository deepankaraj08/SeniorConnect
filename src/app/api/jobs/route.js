// src/app/api/jobs/route.js
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Job from '@/models/Job';

export const runtime = 'nodejs';

export async function GET(req) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const q = url.searchParams.get('q') || '';

    const filter = q
      ? {
          $or: [
            { title: { $regex: q, $options: 'i' } },
            { company: { $regex: q, $options: 'i' } },
            { location: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } }
          ]
        }
      : {};

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error('GET /api/jobs error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    if (!body || !body.title || !body.company) {
      return NextResponse.json({ success: false, error: 'Missing title or company' }, { status: 400 });
    }

    const doc = {
      title: body.title,
      company: body.company,
      location: body.location || '',
      salaryRange: body.salaryRange || '',
      salary: body.salary || '',
      description: body.description || '',
      requirements: body.requirements || '',
      skillsRequired: Array.isArray(body.skillsRequired)
        ? body.skillsRequired
        : (typeof body.skillsRequired === 'string'
            ? body.skillsRequired.split(',').map(s => s.trim()).filter(Boolean)
            : []),
      status: body.status || 'active',
      createdAt: new Date()
    };

    const job = await Job.create(doc);
    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (err) {
    console.error('POST /api/jobs error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// Optional: DELETE handler to allow removal of jobs by id
export async function DELETE(req) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });

    const deleted = await Job.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/jobs error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
