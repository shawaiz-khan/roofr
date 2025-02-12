import { NextRequest } from 'next/server';
import connectDB from "@/lib/db";
import { loginUser } from '@/controllers/auth.controller';

connectDB();

export async function POST(request: NextRequest) {
    const body = await request.json();
    return loginUser(body);
}