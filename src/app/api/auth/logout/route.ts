import { logoutUser } from "@/controllers/auth.controller";
import connectDB from "@/lib/db";

connectDB();

export async function POST() {
    return await logoutUser();
}