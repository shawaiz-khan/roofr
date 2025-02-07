import jwt from "jsonwebtoken";

export const generateToken = (userId: string, email: string, role: string) => {
    return jwt.sign(
        { id: userId, email, role },
        process.env.JWT_SECRET!,
        { expiresIn: "2h" }
    )
}