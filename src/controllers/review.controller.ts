import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export const Review = (req: NextRequest) => {
    console.log(req);
    if (req) {
        return NextResponse.json(
            {
                testimonial: req,
                message: "All good to go"
            },
            { status: StatusCodes.OK },
        )
    } else {
        return NextResponse.json(
            { message: "Has an error" },
            { status: StatusCodes.BAD_REQUEST },
        )
    }
}