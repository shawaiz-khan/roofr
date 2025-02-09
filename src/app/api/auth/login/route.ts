import { NextRequest } from 'next/server';
import connectDB from "@/lib/db";
import { loginUser } from '@/controllers/authController';


export async function POST(request: NextRequest) {
    await connectDB();
    const body = await request.json();
    return loginUser(body);
}