"use client";

import { useState, useEffect } from "react";
import estates from "@/data/estates";
import Image from "next/image";
import stars from "@/assets/svg/Stars.svg";
import { motion } from "framer-motion";
import EstateBlock from "./EstateBlock";

const EstateContainer: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [estatesPerPage, setEstatesPerPage] = useState(3);
    const totalPages = Math.ceil(estates.length / estatesPerPage);

    useEffect(() => {
        const handleResize = () => {
            setEstatesPerPage(window.innerWidth <= 768 ? 1 : 3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getEstatesForCurrentPage = () => {
        const startIndex = currentPage * estatesPerPage;
        return estates.slice(startIndex, startIndex + estatesPerPage);
    };

    const nextSlide = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <main className="flex flex-col gap-5 md:gap-10 md:mt-10 md:mb-5 md:p-5">
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                    <Image src={stars} alt="Featured Properties" />
                    <h1 className="text-2xl">Featured Properties</h1>
                    <p className="text-sm text-gray-quaternary">
                        Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional
                        homes and investments available through Roofr.
                    </p>
                </div>
                <button className="bg-black-secondary border border-black-tertiary py-3 px-4 text-sm rounded-md hidden md:block">
                    View All Properties
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
                    {getEstatesForCurrentPage().map((estate, index) => (
                        <EstateBlock key={index} estate={estate} />
                    ))}
                </motion.div>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-between items-center border-t border-black-tertiary pt-5">
                    <span className="text-sm hidden md:block md:text-md font-medium">
                        {currentPage + 1} <span className="text-gray-quaternary">of {totalPages}</span>
                    </span>
                    <button className="bg-black-secondary border border-black-tertiary p-3 text-sm rounded-md md:hidden">
                        View All Properties
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

export default EstateContainer;