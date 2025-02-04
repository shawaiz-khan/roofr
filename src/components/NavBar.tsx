"use client";

import React, { useState } from "react";
import HeaderGraphic from "@/assets/svg/Background Graphics.svg";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const NavBar: React.FC = () => {
    const [isModal, setIsModal] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleModal = () => {
        setIsModal((prev) => !prev);
    }

    const handleMenu = () => {
        setIsOpen((prev) => !prev);
    }

    return (
        <nav className="text-text-light flex flex-col justify-between items-center">
            {isModal &&
                <div className="bg-black-secondary flex justify-center items-center relative overflow-hidden w-full h-full px-4 py-2">
                    <div className="text-xs z-10 flex justify-between items-center w-full">
                        <span>✨Discover Your Dream Property with Roofr</span>
                        <Link className="underline underline-offset-2" href={"#"}>Learn More</Link>
                        <div className="flex justify-center items-center relative cursor-pointer">
                            <span className="bg-gray-tertiary rounded-full opacity-60 h-5 w-5"></span>
                            <X className="absolute inset-0 m-auto" size={15} onClick={handleModal} />
                        </div>
                    </div>
                    <Image
                        src={HeaderGraphic}
                        alt="Header Graphic"
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0"
                    />
                </div>
            }
            <div className="bg-black-secondary w-full">
                Navbar
            </div>
        </nav>
    );
};

export default NavBar;