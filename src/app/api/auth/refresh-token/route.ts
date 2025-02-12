import { refreshAccessToken } from "@/controllers/auth.controller";
import connectDB from "@/lib/db";
import { NextRequest } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    return await refreshAccessToken(request);
}