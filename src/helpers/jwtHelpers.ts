/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

export const verifyJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        console.log("Token is valid:", decoded);
    } catch (err: any) {
        console.error("Invalid token:", err.message);
    }
}