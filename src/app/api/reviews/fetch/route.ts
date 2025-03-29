import { GetReviews } from "@/controllers/review.controller";

export async function GET() {
    return await GetReviews();
}