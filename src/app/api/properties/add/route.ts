import { Add_Property } from "@/controllers/property.controller";
import connectDB from "@/lib/db";
import { NextRequest } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log("body", body);
    return Add_Property(req, body);
}