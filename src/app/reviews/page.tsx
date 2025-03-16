"use client";

import useUser from "@/hooks/useUser";
import axiosInstance from "@/lib/axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export interface INewReview {
    name: string;
    location: string;
    title: string;
    review: string;
    stars: number;
}

const Reviews: React.FC = () => {
    const { user } = useUser();

    const [review, setReview] = useState<INewReview>({
        name: "",
        location: "",
        title: "",
        review: "",
        stars: 1
    });
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleOnchange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setReview((prev) => ({
            ...prev,
            [name]: value
        }));

        setError("");
    }

    const validateInputs = () => {
        if (review.name === "" || review.location === "" || review.title === "" || review.review === "" || review.stars === undefined) {
            setError("All fields are required");
            return false;
        }

        if (review.name !== user.name || review.location !== user.location) {
            setError("Make sure the name and location are same as this account");
            return false;
        }

        if (review.stars <= 0 || review.stars > 5) {
            setError("Stars can only be between 1 - 5");
            return false;
        }

        setError("");
        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        console.log(user);

        try {
            if (!validateInputs()) {
                setLoading(false);
                return;
            }

            const response = await axiosInstance.post("/api/reviews/add", review);
            console.log(response);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Issue while submitting the review";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            setReview((prev) => ({
                ...prev,
                name: user.name || "",
                location: user.location || "",
            }));
        }
    }, [user]);

    return (
        <main className="relative overflow-hidden bg-black-primary flex justify-center items-center min-h-screen p-6 md:p-10 text-text-light w-full">
            <div className="bg-black-secondary px-5 py-10 max-w-xs w-full md:max-w-lg rounded-md border border-black-tertiary shadow-lg text-text-light flex flex-col items-center justify-center gap-5 z-10">
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex flex-col gap-3 md:gap-4">
                        <h1 className="text-2xl md:text-3xl text-left mb-2 md:mb-auto">Add your Review</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="name" className="text-text-light">Name</label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    name="name"
                                    value={review.name}
                                    className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                    onChange={(e) => handleOnchange(e)}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="location" className="text-text-light">Location</label>
                                <input
                                    type="text"
                                    placeholder="location"
                                    name="location"
                                    value={review.location}
                                    className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                    onChange={(e) => handleOnchange(e)}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-text-light">Title</label>
                            <input
                                type="text"
                                placeholder="title"
                                name="title"
                                value={review.title}
                                className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                onChange={(e) => handleOnchange(e)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="review">Review</label>
                            <textarea
                                placeholder="write your review here"
                                name="review"
                                value={review.review}
                                className="bg-transparent resize-none border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                onChange={(e) => handleOnchange(e)}
                            >

                            </textarea>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="stars" className="text-text-light">Stars</label>
                            <input
                                type="number"
                                max={5}
                                min={1}
                                name="stars"
                                value={review.stars}
                                onChange={(e) => handleOnchange(e)}
                                placeholder="stars"
                                className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                            />
                        </div>
                    </div>
                    <button
                        className="bg-purple-secondary text-white py-2.5 px-4 rounded-md w-full mt-5 text-base font-normal transition hover:bg-opacity-90"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                    {error && (
                        <div className="text-xs text-red-600 w-full text-center mt-3">{error}</div>
                    )}
                </form>
            </div>
            <span className="absolute bg-gradient-to-br from-purple-primary to-black-tertiary -translate-x-1/2 -translate-y-1/4 h-48 w-48 md:w-96 md:h-96 top-0 left-0 rounded-full blur-3xl z-0"></span>
            <span className="absolute bg-gradient-to-br from-purple-primary to-black-tertiary translate-x-1/2 translate-y-1/4 h-48 w-48 md:w-96 md:h-96 bottom-0 right-0 rounded-full blur-3xl z-0"></span>
        </main>
    );
}

export default Reviews;