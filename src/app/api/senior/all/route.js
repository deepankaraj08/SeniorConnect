import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Senior from "@/models/Senior";

export async function GET() {
    try {
        // CONNECT TO DATABASE (required)
        await connectToDB();

        // FETCH ALL SENIORS
        const seniors = await Senior.find();

        return NextResponse.json({
            success: true,
            data: seniors,
        });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
