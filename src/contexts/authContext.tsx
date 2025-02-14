"use client";

import { getAccessToken, getRefreshToken } from "@/helpers/getCookies";
import { Refresh } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
    accessToken: string;
    refreshToken: string;
    setAccessToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: "",
    refreshToken: "",
    setAccessToken: () => { },
    setRefreshToken: () => { },
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const router = useRouter();

    useEffect(() => {
        const getTokens = async () => {
            try {
                const accessToken_cookie = await getAccessToken();
                const refreshToken_cookie = await getRefreshToken();

                console.log("Access Cookie:", accessToken_cookie, "Refresh Cookie:", refreshToken_cookie);

                if (!refreshToken_cookie) {
                    router.push('/auth/login');
                    return;
                }

                if (!accessToken_cookie && refreshToken_cookie) {
                    const apiUrl = "/api/auth/refresh-token";
                    const newAccessToken = await Refresh(apiUrl, refreshToken_cookie.value);
                    setAccessToken(newAccessToken);
                } else {
                    setAccessToken(accessToken_cookie?.value || "");
                }

                setRefreshToken(refreshToken_cookie?.value || "");

            } catch (error) {
                console.error("Error fetching tokens:", error);
                router.push('/auth/login');
            }
        };

        getTokens();
    }, [accessToken, refreshToken]);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };