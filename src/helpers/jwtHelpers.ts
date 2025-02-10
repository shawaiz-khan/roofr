/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

export const verifyJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        console.log(decoded);
        return decoded;
    } catch (err: any) {
        throw new Error(err.message || "Invalid token:");
    }
}