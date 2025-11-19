import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Senior from "@/models/Senior";

export async function POST(req) {
    try {
        await connectToDB();   // ✔ correct function

        const body = await req.json();

        const newSenior = await Senior.create(body);

        return NextResponse.json({
            success: true,
            senior: newSenior
        });

    } catch (err) {
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
