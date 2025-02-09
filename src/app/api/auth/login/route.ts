/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from 'next/server';
import connectDB from "@/lib/db";
import { getUsers, loginUser } from '@/controllers/authController';


export async function POST(request: NextRequest) {
    await connectDB();
    const body = await request.json();
    return loginUser(body);
}

export async function GET(request: NextRequest) {
    await connectDB();
    return getUsers();
}