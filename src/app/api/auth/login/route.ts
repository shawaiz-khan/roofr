/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from 'next/server';
import connectDB from "@/lib/db";
import { getUsers, loginUser } from '@/controllers/authController';

connectDB();

export async function POST(request: NextRequest) {
    const body = await request.json();
    return loginUser(body);
}

export async function GET(request: NextRequest) {
    return getUsers();
}