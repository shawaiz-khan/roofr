/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getAccessToken, getRefreshToken } from "@/helpers/getCookies";
import { Refresh } from "@/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import AuthContextType from "@/types/auth.context.types";
import Loader from "@/components/ui/PageLoader";
import { protectedRoutes } from "@/constants/protectedRoutes";

const AuthContext = createContext<AuthContextType>({
    accessToken: "",
    refreshToken: "",
    isLoggedIn: false,
    setAccessToken: () => { },
    setRefreshToken: () => { },
    setIsLoggedIn: () => { },
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const accessToken_cookie = await getAccessToken();
                const refreshToken_cookie = await getRefreshToken();

                if (!refreshToken_cookie) {
                    setLoading(false);

                    if (protectedRoutes.some(route => pathname.startsWith(route))) {
                        router.push("/auth/login");
                    }

                    return;
                }

                let newAccessToken = accessToken_cookie?.value || "";
                if (!accessToken_cookie && refreshToken_cookie) {
                    try {
                        const res = await Refresh("/api/auth/refresh-token", refreshToken_cookie.value) as any;

                        if (!res.body?.accessToken) {
                            throw new Error(res.message || "Failed to refresh token");
                        }

                        newAccessToken = res.body?.accessToken;
                    } catch (error) {
                        setLoading(false);
                        if (protectedRoutes.some(route => pathname.startsWith(route))) {
                            router.push("/auth/login");
                        }
                        return;
                    }
                }

                setAccessToken(newAccessToken);
                setRefreshToken(refreshToken_cookie?.value || "");
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Error fetching tokens:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTokens();
    }, [pathname]);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, refreshToken, setRefreshToken, isLoggedIn, setIsLoggedIn }}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };