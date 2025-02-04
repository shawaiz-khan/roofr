"use client";

import React, { useState } from "react";
import HeaderGraphic from "@/assets/svg/Background Graphics.svg";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from '@/assets/svg/logo.svg';
import navItems from '@/constants/paths';
import { usePathname } from "next/navigation";

const NavBar: React.FC = () => {
    const [isModal, setIsModal] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const pathname = usePathname();

    const handleModal = () => {
        setIsModal((prev) => !prev);
    }

    const handleMenu = () => {
        setIsOpen((prev) => !prev);
    }

    return (
        <nav className="text-text-light flex flex-col justify-between items-center">
            {isModal &&
                <div className="bg-black-secondary border-b border-black-tertiary flex justify-center items-center relative overflow-hidden w-full h-full px-3 py-4">
                    <div className="text-xs md:text-sm z-10 flex justify-between md:justify-center items-center w-full">
                        <div className="flex justify-center items-center gap-2 w-full">
                            <span>✨Discover Your Dream Property with Roofr</span>
                            <Link className="underline underline-offset-2" href={"#"}>Learn More</Link>
                        </div>
                        <div className="flex justify-center items-center relative md:absolute md:right-4 cursor-pointer ml-1">
                            <span className="bg-gray-tertiary rounded-full opacity-30 h-5 w-5"></span>
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
            <div className="bg-black-secondary w-full px-5 md:px-8 py-4 flex justify-between md:justify-between items-center">
                <div className="flex justify-center items-end gap-2">
                    <Image
                        src={Logo}
                        alt="Roofr Logo"
                        className="w-10"
                    />
                    <h1 className="text-xl font-semibold">Roofr</h1>
                </div>
                <ul className="hidden md:flex justify-center items-center gap-5">
                    {navItems.map((navItem) => (
                        <Link key={navItem.path} href={navItem.path} className={`hidden text-md md:block cursor-pointer ${pathname === navItem.path ? "bg-black-primary border border-black-tertiary" : null} px-3 py-2 rounded-md`}>
                            {navItem.name}
                        </Link>
                    ))}
                </ul>
                <button className="bg-black-primary border border-black-tertiary px-3 py-2 rounded-md cursor-pointer">Contact</button>
                <button onClick={handleMenu} className="block md:hidden">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
        </nav>
    );
};

export default NavBar;