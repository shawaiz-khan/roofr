import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { Delete_Property } from "@/controllers/property.controller";

connectDB();

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<Response> {

    const id = params.id;

    if (!id) {
        return new Response(JSON.stringify({ message: "Missing property ID" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    return await Delete_Property(id);
}