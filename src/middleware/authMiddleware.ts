/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessToken, getRefreshToken } from "@/helpers/getCookies";
import { verifyJwt } from "@/helpers/jwtHelpers";
import axiosInstance from "@/lib/axios";
import { NextResponse, NextRequest } from "next/server";

export async function authMiddleware(req: NextRequest) {
    const refreshToken = await getRefreshToken();
    const accessToken = await getAccessToken();

    if (accessToken) {
        try {
            console.log("Access Token found, verifying...");
            await verifyJwt(accessToken.value, "access");
            return NextResponse.next();
        } catch (err: any) {
            console.log(err.message || "Access token expired, attempting refresh...");
        }
    }

    if (refreshToken) {
        console.log("Refresh Token found, attempting to refresh...");
        const res = await verifyJwt(refreshToken.value, "refresh")
        console.log(res);
        try {
            const refreshResponse = await axiosInstance.post(`/api/auth/refresh-token`);

            if (refreshResponse.status === 200) {
                const { accessToken: newAccessToken } = refreshResponse.data;
                console.log("Refresh successful, new access token received");

                const res = NextResponse.next();
                res.cookies.set("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 15 * 60,
                    path: "/"
                });

                return res;
            } else {
                console.log("Refresh failed");
            }
        } catch (error: any) {
            console.log("Refresh error:", error.message || "Refresh failed, redirecting to login...");
        }
    }

    console.log("No access or refresh token, redirecting to login...");
    return NextResponse.redirect(new URL("/auth/login", req.url));
}

export const config = {
    runtime: "nodejs",
};