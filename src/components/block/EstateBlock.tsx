"use client";

import { useState } from "react";
import EstateType from "@/types/estate.types";
import Image from "next/image";

const EstateBlock: React.FC<{ estate: EstateType }> = ({ estate }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border border-black-tertiary p-5 space-y-5 md:space-y-3 flex flex-col justify-start rounded-lg">
            <Image
                src={estate.images[0]}
                alt="Estate Image"
                width={400}
                height={250}
                className="rounded-md object-cover"
            />
            <div className="space-y-1">
                <h1 className="text-xl">{estate.title}</h1>
                <p className="text-sm text-gray-quaternary">{estate.description.length > 100 ? estate.description.slice(0, 100) + "..." : estate.description}</p>
            </div>
            <p className="text-md text-gray-quaternary">
                {estate.bedrooms} Beds • {estate.bathrooms} Baths • {estate.area} sqft
            </p>
            <div className="flex justify-between items-center gap-3">
                <div className="relative h-full pr-3 flex justify-start items-center">
                    <span className="text-sm absolute top-0 text-gray-quaternary">Price</span>
                    <h1 className="mt-3 text-lg">${estate.totalPrice.toLocaleString()}</h1>
                </div>
                <button
                    className="w-full md:w-fit bg-purple-primary px-3 py-3 md:py-2 rounded-md"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? "Show Less" : "Show More"}
                </button>
            </div>
        </div>
    );
};

export default EstateBlock;