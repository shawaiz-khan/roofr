/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { Delete_Property } from "@/controllers/property.controller";

connectDB();

export async function POST(
    { params }: { params: { id: string } },
    req: NextRequest
) {
    const { id } = params;
    return await Delete_Property(id);
}