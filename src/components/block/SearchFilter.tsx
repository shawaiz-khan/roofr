/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MapPin, Home, Ruler, DollarSign, Search } from "lucide-react";
import { FilterItemTypes } from "@/types/search.filters.types";
import estates from "@/data/estates";
import { useState } from "react";
import EstateContainer from "./EstateContainer";

export const FilterItems: FilterItemTypes[] = [
    { title: "Location", icon: <MapPin size={20} />, key: "location" },
    { title: "Property Type", icon: <Home size={20} />, key: "category" },
    { title: "Area", icon: <Ruler size={20} />, key: "area" },
    { title: "Price", icon: <DollarSign size={20} />, key: "totalPrice" }
];

const SearchFilter: React.FC = () => {
    const [filters, setFilters] = useState<{ [key: string]: string | number }>({});

    const uniqueValues = (key: string) => {
        return [...new Set(estates.map((estate: any) => estate[key]))];
    }

    const handleFilterChange = (key: string, value: string | number) => {
        setFilters((prev) => ({
            ...prev,
            [key]: typeof value === "string" && !isNaN(Number(value)) ? Number(value) : value
        }))
    }

    return (
        <main className="w-full flex flex-col gap-10 md:gap-0 md:items-center p-5">
            <div className="relative md:bg-black-secondary md:p-3 w-full md:rounded-md">
                <input type="text" placeholder="Search For A Property" className="bg-transparent border border-black-tertiary text-gray-tertiary w-full pl-5 py-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary" />
                <button className="absolute top-1/2 right-3 md:right-5 transform -translate-y-1/2 bg-purple-primary text-white px-3 py-2 rounded-md hover:bg-purple-700 transition duration-200">
                    <Search size={20} />
                </button>
            </div>
            <div className="bg-black-secondary p-5 md:p-3 w-full md:w-3/4 grid grid-cols-1 md:grid-cols-4 gap-3 rounded-lg md:rounded-t-none">
                {FilterItems.map((item) => (
                    <div key={item.title} className="flex items-center gap-2 relative">
                        <span className="absolute left-3">{item.icon}</span>
                        <select
                            className="bg-black-primary border border-black-tertiary text-gray-tertiary w-full pl-10 py-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                            onChange={(e) => handleFilterChange(item.key, e.target.value)}
                        >
                            <option value="">All {item.title}</option>
                            {uniqueValues(item.key).map((value) => (
                                <option key={value} value={value} className="bg-black-tertiary">{value}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            <EstateContainer filters={filters} />
        </main>
    );
}

export default SearchFilter;