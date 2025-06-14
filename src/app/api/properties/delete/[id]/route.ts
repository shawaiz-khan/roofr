import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Delete_Property } from "@/controllers/property.controller";

connectDB();

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    if (!id) {
        return NextResponse.json(
            { message: "Missing property ID" },
            { status: 400 }
        );
    }

    return await Delete_Property(id);
}