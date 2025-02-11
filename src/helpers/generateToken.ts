import { SignJWT } from "jose";

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET!);

export const generateAccessToken = async (userId: string, email: string) => {
    return await new SignJWT({ id: userId, email: email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("15m")
        .sign(ACCESS_TOKEN_SECRET);
};

export const generateRefreshToken = async (userId: string, email: string) => {
    return await new SignJWT({ id: userId, email: email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(REFRESH_TOKEN_SECRET);
};