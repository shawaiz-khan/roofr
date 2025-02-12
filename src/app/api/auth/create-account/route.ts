import { registerUser } from '@/controllers/auth.controller';
import connectDB from "@/lib/db";
import { NextRequest } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    const body = await request.json();
    return registerUser(body);
}

export const config = {
    runtime: "nodejs",
};