import { Get_Property } from "@/controllers/property.controller";
import connectDB from "@/lib/db";
import { NextRequest } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
    return await Get_Property(req);
}