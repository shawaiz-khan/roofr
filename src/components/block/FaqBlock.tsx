"use client";

import { useState } from "react";
import FAQsType from "@/types/faq.types";

const FaqBlock: React.FC<FAQsType> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const shortAnswer = answer.length > 100 ? answer.slice(0, 100) + "..." : answer;

    const handleReadMore = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="border border-black-tertiary p-5 space-y-5 md:space-y-3 flex flex-col justify-start rounded-lg">
            <h1 className="text-xl font-semibold">{question}</h1>
            <p className="text-md text-gray-quaternary">{isOpen ? answer : shortAnswer}</p>
            {answer.length > 100 && (
                <button
                    className="w-full md:w-fit bg-black-secondary border border-black-tertiary px-3 py-3 md:py-2 rounded-md"
                    onClick={handleReadMore}
                >
                    {isOpen ? "Show Less" : "Read More"}
                </button>
            )}
        </div>
    );
};

export default FaqBlock;