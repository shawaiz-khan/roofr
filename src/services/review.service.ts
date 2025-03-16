import { IAddReview } from "@/controllers/review.controller";

export const AddReview_Service = async ({ name, location, title, review, stars }: IAddReview) => {
    try {
        console.log("Review data received:", { name, location, title, review, stars });

        return { success: true, message: "Review added successfully" };
    } catch (error: unknown) {
        console.error("Error while adding the review:", error);
        throw new Error("Error while adding the review");
    }
};