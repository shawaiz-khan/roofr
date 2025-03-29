/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAddReview } from "@/controllers/review.controller";
import Review from "@/models/Review";

export const AddReview_Service = async (body: IAddReview) => {
    try {
        const newReview = new Review(body);

        await newReview.save();

        return { success: true, message: "Review added successfully", newReview };
    } catch (error: unknown) {
        throw new Error("Error while adding the review");
    }
};