/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUser } from "@/controllers/authController";
import connectDB from "@/lib/db"
import { NextRequest } from "next/server"

connectDB();

export async function GET(request: NextRequest) {
    return await getUser();
}