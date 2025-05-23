/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
// import estates from "@/data/estates";
import { motion } from "framer-motion";
import EstateBlock from "./EstateBlock";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

interface EstateProps {
    filters?: { [key: string]: string | number };
}

const EstateContainer: React.FC<EstateProps> = ({ filters }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [estatesPerPage, setEstatesPerPage] = useState(3);
    const [estates, setEstates] = useState<any[]>([]);

    const router = useRouter();

    const fetchEstates = async () => {
        const res = await axiosInstance.get("/api/properties/fetch") as any;
        console.log(res.data.data);
        setEstates(res.data.data);
    }

    useEffect(() => {
        const handleResize = () => {
            setEstatesPerPage(window.innerWidth <= 768 ? 1 : 3);
        };
        handleResize();
        fetchEstates();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const filteredData = estates.filter((estate: any) => {
        return Object.entries(filters || {}).every(([key, value]) => {
            return value ? estate[key] === value : true;
        });
    });

    const totalPages = Math.ceil(filteredData.length / estatesPerPage);

    const getEstatesForCurrentPage = () => {
        const startIndex = currentPage * estatesPerPage;
        return filteredData.slice(startIndex, startIndex + estatesPerPage);
    };

    const nextSlide = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <main className="flex flex-col gap-5 md:gap-10 md:mt-5 md:mb-5 md:p-5">
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
                    <button
                        className="bg-black-secondary border border-black-tertiary p-3 text-sm rounded-md md:hidden"
                        onClick={() => router.push("/properties")}
                    >
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