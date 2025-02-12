/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { testimonials } from "@/data/testimonials";
import TestimonialBlock from "./TestimonialBlock";
import Image from "next/image";
import stars from "@/assets/svg/Stars.svg";
import { useEffect, useState } from "react";

const Testimonials: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [reviewsPerPage, setReviewsPerPage] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            setReviewsPerPage(window.innerWidth <= 768 ? 1 : 3);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(testimonials.length / reviewsPerPage);

    useEffect(() => {
        if (currentPage >= totalPages) {
            setCurrentPage(0);
        }
    }, [totalPages]);

    const getTestimonialsForCurrentPage = () => {
        const startIndex = currentPage * reviewsPerPage;
        return testimonials.slice(startIndex, startIndex + reviewsPerPage);
    };

    const nextSlide = () => {
        if (totalPages > 1) {
            setCurrentPage((prev) => (prev + 1) % totalPages);
        }
    };

    const prevSlide = () => {
        if (totalPages > 1) {
            setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
        }
    };

    return (
        <main className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <Image src={stars} alt="What our client says" />
                <h1 className="text-2xl font-semibold">What Our Clients Say</h1>
                <p className="text-sm text-gray-quaternary">
                    Read the success stories and heartfelt testimonials from our valued clients.
                    Discover why they chose Roofr for their real estate needs.
                </p>
            </div>

            <div className="flex flex-col gap-5">
                {getTestimonialsForCurrentPage().map((testimonial) => (
                    <TestimonialBlock
                        key={testimonial.id}
                        name={testimonial.name}
                        city={testimonial.city}
                        title={testimonial.title}
                        testimonial={testimonial.testimonial}
                        stars={testimonial.stars}
                    />
                ))}

                {totalPages > 1 && (
                    <div className="flex justify-between items-center border-t border-black-tertiary pt-5">
                        <button className="bg-black-secondary border border-black-tertiary py-3 px-2 text-sm rounded-md">View All Testimonials</button>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={prevSlide}
                                className="h-10 w-10 rounded-full bg-black-secondary text-white disabled:opacity-50 border border-black-tertiary"
                                disabled={currentPage === 0}
                            >
                                ←
                            </button>

                            <span className="text-sm font-medium">
                                {currentPage + 1} <span className="text-gray-quaternary">of {totalPages}</span>
                            </span>

                            <button
                                onClick={nextSlide}
                                className="h-10 w-10 rounded-full bg-black-secondary text-white disabled:opacity-50 border border-black-tertiary"
                                disabled={currentPage === totalPages - 1}
                            >
                                →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Testimonials;