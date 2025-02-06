/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { registerUser } from "@/controllers/authController";
import { validateUserInput } from "@/utils/validatorUser";
import { StatusCodes } from "http-status-codes";

export const handler = async (req: NextRequest) => {
    if (req.method == "POST") {
        return NextResponse.json({ message: "Invalid method" }, { status: StatusCodes.METHOD_NOT_ALLOWED })
    }

    try {
        await connectDB();

        const userData = await req.json();

        validateUserInput(userData);

        const result = await registerUser(userData);

        return NextResponse.json({ message: "User created successfully", token: result.token }, { status: StatusCodes.CREATED })
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: StatusCodes.BAD_REQUEST });
    }
};