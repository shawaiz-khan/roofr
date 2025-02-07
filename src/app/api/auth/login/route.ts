import { NextRequest } from 'next/server';
import connectDB from "@/lib/db";
import { loginUser } from '@/controllers/authController';

connectDB();

export async function POST(request: NextRequest) {
    const body = await request.json();
    return loginUser(body);
}