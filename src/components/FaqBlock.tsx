"use client";

import { useState } from "react";
import FAQsType from "@/types/faq.types";

const FaqBlock: React.FC<FAQsType> = ({ question, answer }) => {
    const [isPopup, setIsPopup] = useState(false);

    const handleReadMore = () => {
        setIsPopup(true);
    };

    return (
        <div className="border border-black-tertiary p-5 space-y-5 flex flex-col justify-between rounded-lg">
            <h1 className="text-xl font-semibold">{question}</h1>
            <p className="text-md text-gray-quaternary">
                {answer.length > 50 ? answer.slice(0, 50) + "..." : answer}
            </p>
            {answer.length > 50 && (
                <button
                    className="w-full bg-black-secondary border border-black-tertiary py-3 rounded-md hover:bg-black-primary transition-all"
                    onClick={handleReadMore}
                >
                    Read More
                </button>
            )}

            {isPopup && <FaqPopup question={question} answer={answer} onClose={() => setIsPopup(false)} />}
        </div>
    );
};

export default FaqBlock;

const FaqPopup: React.FC<{ question: string; answer: string; onClose: () => void }> = ({ question, answer, onClose }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm z-50">
            <div className="bg-black-secondary p-6 rounded-lg w-[90%] max-w-lg shadow-lg border border-black-tertiary">
                <h2 className="text-xl mb-3">{question}</h2>
                <p className="text-md text-gray-quaternary mb-4">{answer}</p>
                <button
                    className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};