import { Review } from "@/controllers/review.controller";
import connectDB from "@/lib/db";
import { NextRequest } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
    const body = await req.json();
    return Review(body);
}