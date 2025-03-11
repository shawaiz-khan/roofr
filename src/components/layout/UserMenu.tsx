/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserMenuItems } from "@/constants/userMenuPaths";
import useAuth from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";
import { UserType } from "@/types/user.context.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const UserMenu: React.FC<{ user: UserType }> = ({ user }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const { setIsLoggedIn } = useAuth();

    const handleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await axiosInstance.post("/api/auth/logout");
            setIsLoggedIn(false);
        } catch (error: unknown) {
            console.error(error || "Error occurred while logging out.");
        } finally {
            setIsLoading(false);
        }
    }

    const getUserInitials = (name?: string) => {
        if (!name) return "??";
        const nameParts = name.trim().split(" ");
        return nameParts.length > 1 ? (nameParts[0][0] + nameParts[1][0]).toUpperCase() : nameParts[0].slice(0, 2).toUpperCase();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const filteredItems = UserMenuItems.filter((item) => item.name !== "Logout");

    return (
        <main className="relative" ref={menuRef}>
            <button
                className="bg-black-primary border border-black-tertiary text-text-light rounded-full p-3 max-h-12 flex justify-center items-center"
                onClick={handleMenu}
            >
                {getUserInitials(user?.name)}
            </button>

            {isOpen && (
                <div className="absolute top-14 left-0 -translate-x-3/4 bg-black-primary py-3 rounded-md border border-black-tertiary shadow-md z-30 min-w-full w-44">
                    <div className="space-y-2 flex flex-col">
                        {filteredItems.map((item) => (
                            <Link
                                key={item.path}
                                className="cursor-pointer py-2 hover:bg-black-secondary px-3 text-md"
                                href={item.path}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <hr className="border border-black-tertiary -mt-1 -mb-1" />
                        <button
                            className="cursor-pointer py-2 hover:bg-black-secondary px-3 text-md text-left"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default UserMenu;