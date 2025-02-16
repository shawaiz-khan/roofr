/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { UserContextType } from "@/types/user.context.types";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { User } from "@/services/auth.service";

const UserContext = createContext<UserContextType>({
    user: { name: "", email: "", phone: "", location: "", userType: "" },
    setUser: () => { },
});

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        userType: "",
    });
    const { accessToken } = useAuth();

    useEffect(() => {
        const getUser = async () => {
            if (!accessToken) return;

            try {
                const res = await User("/api/auth/me", accessToken) as any;

                if (!res) {
                    throw new Error(res.message || "Failed to get user");
                }

                setUser(res.body?.user);

            } catch (error) {
                console.error("Get user error: ", error);
            }
        };

        getUser();
    }, [accessToken]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };