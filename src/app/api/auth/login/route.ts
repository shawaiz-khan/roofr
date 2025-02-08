import connectDB from "@/lib/db";
import { loginUser } from '@/controllers/authController';
import { NextApiRequest, NextApiResponse } from 'next/types';

connectDB();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const body = await req;
    return loginUser(body, req, res);
}