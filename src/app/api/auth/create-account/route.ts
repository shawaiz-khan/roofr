import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { registerUser } from '@/controllers/authController';

connectDB();

export async function POST(req: Request) {
    const body = await req.json();

    return registerUser(body);
}