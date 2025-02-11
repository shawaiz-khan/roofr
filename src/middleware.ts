import { authMiddleware } from "@/middleware/authMiddleware";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    console.log("I am the Middleware");
    return authMiddleware(req);
}

export const config = {
    matcher: [
        "/api/auth/me",
    ],
    runtime: "nodejs",
};