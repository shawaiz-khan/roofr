/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtVerify } from "jose";

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET!);

export const verifyJwt = async (token: string, type: 'access' | 'refresh') => {
    try {
        const secret = type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (err: any) {
        throw new Error(err.message || "Token verification failed");
    }
};