import { UserType } from "@/types/user.context.types";

const UserMenu: React.FC<{ user: UserType }> = ({ user }) => {

    const getUserInitials = (name?: string) => {
        if (!name) return "??";
        const nameParts = name.trim().split(" ");
        return nameParts.length > 1
            ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
            : nameParts[0].slice(0, 2).toUpperCase();
    };

    return (
        <main className="bg-black-primary border border-black-tertiary text-white rounded-full p-3 max-h-12 flex justify-center items-center">
            {getUserInitials(user?.name)}
        </main>
    );
}

export default UserMenu;