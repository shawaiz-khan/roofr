import Review from "@/models/Review";
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

export const GetReviews = async () => {
    try {
        const res = await Review.find();
        return NextResponse.json(
            { success: true, reviews: res },
            { status: StatusCodes.OK }
        );
    } catch (err: unknown) {
        console.error("Error while getting reviews:", err);
        return NextResponse.json(
            { success: false, message: err instanceof Error ? err.message : "Internal Server Error" },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
};

export const AddReview = async (request: NextRequest, body: IAddReview) => {
    try {
        await AddReview_Service(body);

        return NextResponse.json(
            { success: true, message: "Review Added Successfully" },
            { status: StatusCodes.CREATED }
        );
    } catch (err: unknown) {
        console.error("Error while adding review:", err);
        return NextResponse.json(
            { success: false, message: err instanceof Error ? err.message : "Internal Server Error" },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
};