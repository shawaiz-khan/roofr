import { UserMenuItems } from "@/constants/userMenuPaths";
import { UserType } from "@/types/user.context.types";
import { useState } from "react";

const UserMenu: React.FC<{ user: UserType }> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const getUserInitials = (name?: string) => {
        if (!name) return "??";
        const nameParts = name.trim().split(" ");
        return nameParts.length > 1 ?
            (nameParts[0][0] + nameParts[1][0]).toUpperCase() :
            nameParts[0].slice(0, 2).toUpperCase();
    };

    return (
        <main className="relative">
            <button
                className="bg-black-primary border border-black-tertiary text-text-light rounded-full p-3 max-h-12 flex justify-center items-center"
                onClick={handleMenu}
            >
                {getUserInitials(user?.name)}
            </button>

            {isOpen && (
                <div className="absolute top-14 left-0 -translate-x-3/4 bg-black-primary px-3 py-5 rounded-md border border-black-tertiary shadow-md z-30 min-w-full w-44">
                    <ul className="space-y-2">
                        {UserMenuItems.map((item) => (
                            <li
                                key={item.path}
                                className="cursor-pointer p-2 hover:bg-black-secondary rounded-md text-md"
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </main>
    );
};

export default UserMenu;