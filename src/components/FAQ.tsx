"use client";

import { faqs } from "@/data/faqs";
import Image from "next/image";
import stars from "@/assets/svg/Stars.svg";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FaqBlock from "./FaqBlock";

const FAQs: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [faqPerPage, setFaqPerPage] = useState(3);
    const totalPages = Math.ceil(faqs.length / faqPerPage);

    useEffect(() => {
        const handleResize = () => {
            setFaqPerPage(window.innerWidth <= 768 ? 1 : 3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getFAQsForCurrentPage = () => {
        const startIndex = currentPage * faqPerPage;
        return faqs.slice(startIndex, startIndex + faqPerPage);
    };

    const nextSlide = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <main className="flex flex-col gap-5 md:gap-10 md:my-10 md:p-5">
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                    <Image src={stars} alt="What our client says" />
                    <h1 className="text-2xl">Frequently Asked Questions</h1>
                    <p className="text-sm text-gray-quaternary md:w-[90%]">
                        Find answers to common questions about Roofr services,
                        property listings, and the real estate process.
                        We are here to provide clarity and assist you every step of the way.
                    </p>
                </div>
                <button className="bg-black-secondary border border-black-tertiary py-3 px-4 text-sm rounded-md hidden md:block">
                    View All FAQs
                </button>
            </div>

            <div className="relative overflow-hidden">
                <motion.div
                    key={currentPage}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ type: "tween", stiffness: 100, damping: 15 }}
                    className="grid grid-rows-1 md:grid-cols-3 gap-5"
                >
                    {getFAQsForCurrentPage().map((faq, index) => (
                        <FaqBlock
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </motion.div>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-between items-center border-t border-black-tertiary pt-5">
                    <span className="text-sm hidden md:block md:text-md font-medium">
                        {currentPage + 1} <span className="text-gray-quaternary">of {totalPages}</span>
                    </span>
                    <button className="bg-black-secondary border border-black-tertiary p-3 text-sm rounded-md md:hidden">
                        View All FAQs
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
                            disabled={currentPage === totalPages - 1}
                        >
                            →
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default FAQs;