import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string, email: string) => {
    return jwt.sign(
        { id: userId, email: email },
        process.env.JWT_SECRET!,
        { expiresIn: 15 * 60 }
    )
}

export const generateRefreshToken = (userId: string, email: string) => {
    return jwt.sign(
        { id: userId, email: email },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: 7 * 24 * 60 * 60 }
    )
}