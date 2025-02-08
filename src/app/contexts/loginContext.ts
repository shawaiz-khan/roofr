import { ReactNode, useState } from 'react';
import AuthContextType from "@/types/authContext";
import { createContext } from "vm";
import { useRouter } from 'next/router';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children: { children: React.ReactNode } }) => {
    const [user, setUser] = useState<any>();
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
}