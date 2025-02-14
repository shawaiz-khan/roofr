/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getAccessToken, getRefreshToken } from "@/helpers/getCookies";
import { Refresh, User } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import AuthContextType from "@/types/auth.context.types";

const AuthContext = createContext<AuthContextType>({
    accessToken: "",
    refreshToken: "",
    user: { name: "", email: "", phone: "", location: "", userType: "" },
    setAccessToken: () => { },
    setRefreshToken: () => { },
    setUser: () => { },
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        userType: "",
    });

    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchTokensAndUser = async () => {
            try {
                const accessToken_cookie = await getAccessToken();
                const refreshToken_cookie = await getRefreshToken();

                if (!refreshToken_cookie) {
                    router.push("/auth/login");
                    return;
                }

                let newAccessToken = accessToken_cookie?.value || "";
                if (!accessToken_cookie && refreshToken_cookie) {
                    try {
                        newAccessToken = await Refresh("/api/auth/refresh-token", refreshToken_cookie.value);
                    } catch (error) {
                        console.error("Failed to refresh token:", error);
                        router.push("/auth/login");
                        return;
                    }
                }

                setAccessToken(newAccessToken);
                setRefreshToken(refreshToken_cookie?.value || "");

                if (newAccessToken) {
                    const userData = await User("/api/auth/me", newAccessToken);
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching tokens:", error);
                router.push("/auth/login");
            } finally {
                setLoading(false);
            }
        };

        fetchTokensAndUser();
    }, [accessToken, refreshToken]);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, refreshToken, setRefreshToken, user, setUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };