'use client';

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTop: React.FC = () => {
    const [isScroll, setIsScroll] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 90) {
            setIsScroll(true);
        } else {
            setIsScroll(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        isScroll && (
            <button
                onClick={scrollToTop}
                className="bg-purple-primary text-text-light p-3 rounded-md fixed right-4 bottom-4 z-50 shadow-lg"
            >
                <ArrowUp />
            </button>
        )
    );
}

export default BackToTop;