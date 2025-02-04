"use client";

import React, { useState } from "react";
import HeaderGraphic from "@/assets/svg/Background Graphics.svg";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/svg/logo.svg";
import navItems from "@/constants/paths";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NavBar: React.FC = () => {
    const [isModal, setIsModal] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const pathname = usePathname();

    const handleModal = () => setIsModal((prev) => !prev);
    const handleMenu = () => setIsOpen((prev) => !prev);

    return (
        <nav className="text-text-light flex flex-col justify-between items-center relative">
            {isModal && (
                <div className="bg-black-secondary border-b border-black-tertiary flex justify-center items-center relative overflow-hidden w-full h-full px-3 py-4">
                    <div className="text-xs md:text-sm z-10 flex justify-between md:justify-center items-center w-full">
                        <div className="flex justify-center items-center gap-2 w-full">
                            <span>✨ Discover Your Dream Property with Roofr</span>
                            <Link className="underline underline-offset-2" href="#">
                                Learn More
                            </Link>
                        </div>
                        <div className="flex justify-center items-center relative md:absolute md:right-4 cursor-pointer ml-1">
                            <span className="bg-gray-tertiary rounded-full opacity-30 h-5 w-5"></span>
                            <X className="absolute inset-0 m-auto" size={15} onClick={handleModal} />
                        </div>
                    </div>
                    <Image
                        src={HeaderGraphic}
                        alt="Header Graphic"
                        fill
                        className="absolute inset-0 object-cover"
                        priority
                    />
                </div>
            )}

            <div className="bg-black-secondary w-full px-5 md:px-8 py-4 flex justify-between items-center">
                <div className="flex justify-center items-end gap-2">
                    <Image src={Logo} alt="Roofr Logo" className="w-10" />
                    <h1 className="text-xl font-semibold">Roofr</h1>
                </div>

                <ul className="hidden md:flex justify-center items-center gap-5">
                    {navItems.map((navItem) => (
                        <li key={navItem.path}>
                            <Link
                                href={navItem.path}
                                className={`text-md px-3 py-2 cursor-pointer rounded-md ${pathname === navItem.path ? "bg-black-primary border border-black-tertiary" : ""
                                    }`}
                            >
                                {navItem.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button className="hidden md:block bg-black-primary border border-black-tertiary px-3 py-2 rounded-md cursor-pointer">
                    <Link href={"/contact"}>Contact</Link>
                </button>

                <button onClick={handleMenu} className="block md:hidden">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleMenu}
                        />

                        <motion.div
                            className="fixed top-0 right-0 h-full w-64 bg-black-primary border-l border-black-tertiary shadow-xl z-50 p-6 flex flex-col"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <button onClick={handleMenu} className="self-end mb-5">
                                <X />
                            </button>

                            <ul className="flex flex-col gap-4">
                                {navItems.map((navItem) => (
                                    <li key={navItem.path}>
                                        <Link
                                            href={navItem.path}
                                            className={`block text-lg px-4 py-3 rounded-md transition ${pathname === navItem.path ? "bg-black-secondary" : "hover:bg-black-tertiary"}`}
                                        >
                                            {navItem.name}
                                        </Link>
                                    </li>
                                ))}
                                <button
                                    className="block bg-black-primary border border-black-tertiary px-4 py-3 rounded-md cursor-pointer"
                                >
                                    <Link href={"/contact"}>Contact</Link>
                                </button>
                            </ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav >
    );
};

export default NavBar;