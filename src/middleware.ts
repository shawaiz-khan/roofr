import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    if (pathname.includes("/me")) {
        return authMiddleware(req);
    }
}

export const config = {
    matcher: [
        "/api/auth/:path*",
    ],
    runtime: "nodejs",
};