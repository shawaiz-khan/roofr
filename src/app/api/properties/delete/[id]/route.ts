import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { Delete_Property } from "@/controllers/property.controller";

connectDB();

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    return await Delete_Property(id);
}
