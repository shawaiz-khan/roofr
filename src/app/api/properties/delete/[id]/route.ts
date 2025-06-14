import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { Delete_Property } from "@/controllers/property.controller";

connectDB();

export async function POST(req: NextRequest, context: { params: Record<string, string> }) {
    const id = context.params.id;
    return await Delete_Property(id);
}