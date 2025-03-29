/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TestimonialBlock from "./TestimonialBlock";
import Image from "next/image";
import stars from "@/assets/svg/Stars.svg";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import fetchReviews from "@/hooks/fetchReviews";
import { TestimonialTypes } from "@/types/testimonial.types";

const Testimonials: React.FC = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const [reviewsPerPage, setReviewsPerPage] = useState(3);
    const [testimonials, setTestimonials] = useState<TestimonialTypes[]>([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetchReviews() as any;
                console.log(res);
                if (res?.data.reviews && Array.isArray(res.data.reviews)) {
                    setTestimonials(res.data.reviews as TestimonialTypes[]);
                } else {
                    setTestimonials([]);
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
                setTestimonials([]);
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setReviewsPerPage(window.innerWidth <= 768 ? 1 : 3);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = testimonials.length > 0 ? Math.ceil(testimonials.length / reviewsPerPage) : 1;

    const getTestimonialsForCurrentPage = useMemo(() => {
        const startIndex = currentPage * reviewsPerPage;
        return testimonials.slice(startIndex, startIndex + reviewsPerPage);
    }, [currentPage, reviewsPerPage, testimonials]);

    const nextSlide = () => setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));
    const prevSlide = () => setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));

    return (
        <main className="flex flex-col gap-5 md:gap-10 md:mt-10 md:mb-5 md:p-5">
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                    <Image src={stars} alt="What our client says" />
                    <h1 className="text-2xl">What Our Clients Say</h1>
                    <p className="text-sm text-gray-quaternary">
                        Read the success stories and heartfelt testimonials from our valued clients.
                        Discover why they chose Roofr for their real estate needs.
                    </p>
                </div>
                <button
                    className="bg-black-secondary border border-black-tertiary py-3 px-4 text-sm rounded-md hidden md:block"
                    onClick={() => router.push("/reviews")}
                >
                    Share Your Testimonial
                </button>
            </div>

            {testimonials.length > 0 ? (
                <div className="relative overflow-hidden">
                    <motion.div
                        key={currentPage}
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ type: "tween", stiffness: 100, damping: 15 }}
                        className="grid grid-rows-1 md:grid-cols-3 gap-5"
                    >
                        {getTestimonialsForCurrentPage.map((testimonial) => (
                            <TestimonialBlock
                                key={testimonial._id}
                                name={testimonial.name}
                                city={testimonial.city}
                                title={testimonial.title}
                                testimonial={testimonial.review}
                                stars={testimonial.stars}
                            />
                        ))}
                    </motion.div>
                </div>
            ) : (
                <h1 className="text-start py-4 text-gray-tertiary">No Testimonials Yet...</h1>
            )}

            {totalPages > 1 && (
                <div className="flex justify-between items-center border-t border-black-tertiary pt-5">
                    <span className="text-sm hidden md:block md:text-md font-medium">
                        {currentPage + 1} <span className="text-gray-quaternary">of {totalPages}</span>
                    </span>
                    <button
                        className="bg-black-secondary border border-black-tertiary p-3 text-sm rounded-md md:hidden"
                        onClick={() => router.push("/reviews")}
                    >
                        Share Your Testimonial
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prevSlide}
                            className="h-10 w-10 rounded-full bg-black-secondary text-white disabled:opacity-50 border border-black-tertiary"
                            disabled={currentPage === 0}
                        >
                            ←
                        </button>
                        <span className="text-sm md:text-md md:hidden font-medium">
                            {currentPage + 1} <span className="text-gray-quaternary">of {totalPages}</span>
                        </span>
                        <button
                            onClick={nextSlide}
                            className="h-10 w-10 rounded-full bg-black-secondary text-white disabled:opacity-50 border border-black-tertiary"
                            disabled={currentPage >= totalPages - 1}
                        >
                            →
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Testimonials;