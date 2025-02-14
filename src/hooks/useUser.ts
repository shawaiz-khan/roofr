import { UserContext } from "@/contexts/userContext"
import { useContext } from "react"

const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within an AuthProvider");
    }

    return context;
}

export default useUser;