/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

const refreshToken = async (req: NextApiRequest, res: NextApiResponse) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Refresh token required"
        });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;

        if (!decoded || !decoded.id) {
            return res.status(StatusCodes.FORBIDDEN).json({
                message: "Invalid refresh token"
            });
        }

        const newAccessToken = jwt.sign(
            { id: decoded.id, email: decoded.email, role: decoded.role },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        const newRefreshToken = jwt.sign(
            { id: decoded.id },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: "7d" }
        );

        return res.status(StatusCodes.CREATED).json({
            token: newAccessToken,
            refreshToken: newRefreshToken,
        });
    } catch (err: any) {
        console.log(err.message);
        return res.status(StatusCodes.FORBIDDEN).json({
            message: "Invalid refresh token"
        });
    }
};

export default refreshToken;