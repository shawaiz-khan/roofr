/* eslint-disable @typescript-eslint/no-unused-vars */
import { refreshAccessToken } from "@/controllers/authController";
import connectDB from "@/lib/db";
import { NextRequest } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    console.log("POST req received....");
    return await refreshAccessToken();
}