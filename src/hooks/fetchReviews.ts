import axiosInstance from "@/lib/axios";

const fetchReviews = async () => {
    try {
        const response = await axiosInstance.get("/api/reviews/fetch");
        return response;
    } catch (err: unknown) {
        console.error(err || "Error occurred while fetching reviews");
    }
}

export default fetchReviews;