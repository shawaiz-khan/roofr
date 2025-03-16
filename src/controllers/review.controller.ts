import { AddReview_Service } from "@/services/review.service";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export interface IAddReview {
    name: string;
    location: string;
    title: string;
    review: string;
    stars: number;
}

export const AddReview = async (request: NextRequest, body: IAddReview) => {
    try {
        const authHeader = request.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { success: false, message: "Unauthorized: Missing or invalid authorization" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const accessToken = authHeader.split(" ")[1];
        if (!accessToken) {
            return NextResponse.json(
                { success: false, message: "Unauthorized: No access token provided" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        await AddReview_Service(body);

        return NextResponse.json(
            { success: true, message: "Review Added Successfully" },
            { status: StatusCodes.CREATED }
        );
    } catch (err: unknown) {
        console.error("Error while adding review:", err);

        return NextResponse.json(
            {
                success: false,
                message: err instanceof Error ? err.message : "Internal Server Error",
            },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
};