import { IReview } from "@/types/db.model.types";
import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema<IReview>(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        review: {
            type: String,
            required: true
        },
        stars: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;