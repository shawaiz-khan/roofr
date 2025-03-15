import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const AddReview = async (body: unknown) => {
    try {
        // console.log(body);
        return NextResponse.json({
            success: true,
            message: "Review Added"
        })
    } catch (err: unknown) {
        return NextResponse.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            success: true,
            message: err || "Internal Server Error"
        })
    }
}