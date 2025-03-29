import { AddReview } from "@/controllers/review.controller";
import connectDB from "@/lib/db";
import { NextRequest } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    const body = await request.json();
    return AddReview(request, body);
}