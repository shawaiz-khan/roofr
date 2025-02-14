import { getUser } from "@/controllers/auth.controller";
import connectDB from "@/lib/db"
import { NextRequest } from "next/server"

connectDB();

export async function GET(request: NextRequest) {
    return await getUser(request);
}