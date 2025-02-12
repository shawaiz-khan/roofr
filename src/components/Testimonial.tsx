"use client";

import { testimonials } from "@/data/testimonials";
import TestimonialBlock from "./TestimonialBlock";
import Image from "next/image";
import stars from "@/assets/svg/Stars.svg";
import { useEffect, useState } from "react";

const Testimonials: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [reviewsPerPage, setReviewsPerPage] = useState(3);

    const totalPages = Math.ceil(testimonials.length / reviewsPerPage);

    const getTestimonialsForCurrentPage = () => {
        const startIndex = currentPage * reviewsPerPage;
        const lastIndex = startIndex + reviewsPerPage;

        return testimonials.slice(startIndex, lastIndex);
    }

    const nextSlide = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    }

    const prevSlide = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const handleDotClick = (index) => {
        setCurrentPage(index);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setReviewsPerPage(1);
            } else {
                setReviewsPerPage(3);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <main className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <Image
                    src={stars}
                    alt="What our client says"
                />
                <h1 className="text-2xl font-semibold">What Our Clients Say</h1>
                <p className="text-sm text-gray-quaternary">
                    Read the success stories and heartfelt testimonials from our valued clients.
                    Discover why they chose Roofr for their real estate needs.
                </p>
            </div>
            <div className="flex flex-col gap-5">
                {getTestimonialsForCurrentPage().map((testimonial) => (
                    <div key={testimonial.id}>
                        <TestimonialBlock
                            name={testimonial.name}
                            city={testimonial.city}
                            title={testimonial.title}
                            testimonial={testimonial.testimonial}
                            stars={testimonial.stars}
                        />
                    </div>
                ))}
                <div>
                    <button onClick={prevSlide}>Back</button>
                    <button onClick={nextSlide}>Front</button>
                </div>
            </div>
        </main>
    );
}

export default Testimonials;