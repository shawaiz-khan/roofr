/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessToken, getRefreshToken } from "@/helpers/getCookies";
import { verifyJwt } from "@/helpers/jwtHelpers";
import axiosInstance from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(req: NextRequest) {
    console.log("AuthMiddleware working...");

    try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken || !refreshToken.value) {
            throw new Error("No refresh token found.");
        }

        console.log("Refresh Token:", refreshToken.value);

        const decoded = await verifyJwt(refreshToken.value, "refresh");
        console.log("Decoded Refresh Token:", decoded);

        const accessToken = await getAccessToken();

        if (!accessToken || !accessToken.value) {
            console.log("No valid access token found. Attempting to refresh...");

            try {
                const response = await axiosInstance.post("/api/auth/refresh-token", {}, {
                    headers: {
                        Authorization: `Bearer ${refreshToken.value}`,
                    }
                });

                console.log("Auth Middleware response: ", response.data.accessToken);

                const res = NextResponse.next();
                res.cookies.set("accessToken", response.data.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 15 * 60,
                    path: "/"
                });

                return res;

            } catch (refreshError: any) {
                console.error("Error refreshing access token:", refreshError?.message || refreshError);
                return NextResponse.json({ message: "Error refreshing token" }, { status: 401 });
            }
        }

        console.log("New Access Token:", accessToken?.value);
        return NextResponse.next();
    } catch (err: any) {
        console.error("Error in authMiddleware:", err?.message || err);
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
}