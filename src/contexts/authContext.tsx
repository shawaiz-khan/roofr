/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getAccessToken, getRefreshToken } from "@/helpers/getCookies";
import { Refresh } from "@/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import AuthContextType from "@/types/auth.context.types";
import Loader from "@/components/PageLoader";
import { protectedRoutes } from "@/constants/protectedRoutes";

const AuthContext = createContext<AuthContextType>({
    accessToken: "",
    refreshToken: "",
    setAccessToken: () => { },
    setRefreshToken: () => { },
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchTokens = async () => {
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

            } catch (error) {
                console.error("Error fetching tokens:", error);
                router.push("/auth/login");
            } finally {
                setLoading(false);
            }
        };

        if (protectedRoutes.some(route => pathname.startsWith(route))) {
            fetchTokens();
        } else {
            setLoading(false);
        }

    }, [accessToken, refreshToken, pathname]);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}>
            {loading && <Loader />}
            {!loading && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };