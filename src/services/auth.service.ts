/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";

interface AuthServiceProps {
    apiUrl: string,
    userData: any,
}

export const Register = async ({ apiUrl, userData }: AuthServiceProps) => {
    try {
        const res = await axiosInstance.post(apiUrl, userData);
        return res.data;
    } catch (err: any) {
        console.error("Registration failed:", err.response?.data?.message || err.message);
        return null;
    }
};

export const Login = async ({ apiUrl, userData }: AuthServiceProps) => {
    try {
        const res = await axiosInstance.post(apiUrl, userData);
        return res.data;
    } catch (err: any) {
        console.error("Login failed:", err.response?.data?.message || err.message);
        return null;
    }
};

export const User = async (apiUrl: string, accessToken: string) => {
    try {
        const res = await axiosInstance.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res.data;
    } catch (err: any) {
        console.error("Fetch user failed:", err.response?.data?.message || err.message);
        return null;
    }
}

export const Refresh = async (apiUrl: string, refreshToken: string) => {
    try {
        const res = await axiosInstance.post(apiUrl, {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            }
        });
        return res.data;
    } catch (err: any) {
        console.error("Token refresh failed:", err.response?.data?.message || err.message);
        return null;
    }
}