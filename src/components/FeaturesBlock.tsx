"use client";

import React from "react";
import { Features } from "@/data/features";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const FeaturesBlock: React.FC = () => {
    return (
        <div className="bg-black-primary grid grid-cols-2 md:grid-cols-4 p-3 gap-3 rounded-md shadow-[0_0_10px_#262626]">
            {Features.map((feature) => (
                <div key={feature.title} className="relative bg-black-secondary flex flex-col justify-center items-center gap-3 p-3 rounded-md border border-black-tertiary hover:scale-105 duration-300 ease-in">
                    <ArrowUpRight size={20} className="text-gray-tertiary absolute right-2 top-2" />
                    <Image
                        src={feature.icon}
                        alt={feature.title}
                        className="w-14"
                    />
                    <h1 className="text-xs text-text-light text-center">{feature.title}</h1>
                </div>
            ))}
        </div>
    );
}

export default FeaturesBlock;