import axiosInstance from "@/lib/axios"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const addReview = async ({ apiUrl, testimonial }: { apiUrl: string, testimonial: any }) => {
    const res = await axiosInstance.post(apiUrl, testimonial);
    return res.data;
}