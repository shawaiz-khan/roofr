/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifyJwt } from "@/helpers/jwtHelpers";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server";

const authMiddleware = (handler: Function) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.cookies.authToken;

        if (!token) {
            return NextResponse.json(
                { message: "Authorization token is required" },
                { status: StatusCodes.UNAUTHORIZED },
            )
        }

        try {
            const decoded = verifyJwt(token);
            console.log(decoded);
            req.user = decoded;
            return handler(req, res);
        } catch (err: any) {
            return NextResponse.json(
                { message: err.message || "Invalid tokens" },
                { status: StatusCodes.UNAUTHORIZED },
            )
        }
    }
}

export default authMiddleware;