/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MapPin, Home, Ruler, DollarSign, Search } from "lucide-react";
import { FilterItemTypes } from "@/types/search.filters.types";
import { useEffect, useState } from "react";
import EstateContainer from "./EstateContainer";
import axiosInstance from "@/lib/axios";
import { priceRanges } from "@/constants/priceFilters";

export const FilterItems: FilterItemTypes[] = [
    { title: "Location", icon: <MapPin size={20} />, key: "location" },
    { title: "Property Type", icon: <Home size={20} />, key: "category" },
    { title: "Area", icon: <Ruler size={20} />, key: "area" },
    { title: "Price", icon: <DollarSign size={20} />, key: "totalPrice" },
];

type FilterState = {
    [key: string]: string | number | { min: number; max: number };
};

const SearchFilter: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({});
    const [estates, setEstates] = useState<any[]>([]);

    const fetchEstates = async () => {
        try {
            const res = await axiosInstance.get("/api/properties/fetch");
            setEstates(res.data.data) as any;
        } catch (err) {
            console.error("Failed to fetch estates", err);
        }
    };

    useEffect(() => {
        fetchEstates();
    }, []);

    const uniqueValues = (key: string): string[] => {
        const values = estates.map((estate: any) => estate[key]);
        return [...new Set(values)].filter(Boolean);
    };

    const handleFilterChange = (key: string, value: string | number | { min: number; max: number }) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <main className="w-full flex flex-col gap-10 md:gap-0 md:items-center p-5">
            {/* Search Input */}
            <div className="relative md:bg-black-secondary md:p-3 w-full md:rounded-md">
                <input
                    type="text"
                    placeholder="Search For A Property"
                    className="bg-transparent border border-black-tertiary text-gray-tertiary w-full pl-5 py-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                />
                <button className="absolute top-1/2 right-3 md:right-5 transform -translate-y-1/2 bg-purple-primary text-white px-3 py-2 rounded-md hover:bg-purple-700 transition duration-200">
                    <Search size={20} />
                </button>
            </div>

            {/* Filters */}
            <div className="bg-black-secondary p-5 md:p-3 w-full md:w-3/4 grid grid-cols-1 md:grid-cols-4 gap-3 rounded-lg md:rounded-t-none">
                {FilterItems.map((item) => (
                    <div key={item.title} className="flex items-center gap-2 relative">
                        <span className="absolute left-3">{item.icon}</span>
                        {item.key === "totalPrice" ? (
                            <select
                                className="bg-black-primary border border-black-tertiary text-gray-tertiary w-full pl-10 py-3 rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (!val) {
                                        const updatedFilters = { ...filters };
                                        delete updatedFilters.priceRange;
                                        setFilters(updatedFilters);
                                        return;
                                    }
                                    const [min, max] = val.split("-").map(Number);
                                    handleFilterChange("priceRange", { min, max });
                                }}
                            >
                                <option value="">All Price Ranges</option>
                                {priceRanges.map((range, i) => (
                                    <option key={i} value={`${range.min}-${range.max}`}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <select
                                className="bg-black-primary border border-black-tertiary text-gray-tertiary w-full pl-10 py-3 rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                onChange={(e) => handleFilterChange(item.key, e.target.value)}
                            >
                                <option value="">{`All ${item.title}`}</option>
                                {uniqueValues(item.key).map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
            </div>

            {/* Filtered Results */}
            <EstateContainer filters={filters} />
        </main>
    );
};

export default SearchFilter;