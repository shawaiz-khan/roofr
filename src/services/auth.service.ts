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
        throw new Error(err?.response?.data?.message || "Registration failed");
    }
};

export const Login = async ({ apiUrl, userData }: AuthServiceProps) => {
    try {
        const res = await axiosInstance.post(apiUrl, userData);
        return res.data;
    } catch (err: any) {
        throw new Error(err?.response?.data?.message || "Login failed");
    }
};

export const User = async (apiUrl: string) => {
    try {
        const res = await axiosInstance.get(apiUrl);
        return res.data;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Fetching User Failed");
    }
}

export const Refresh = async (apiUrl: string, refreshToken: string) => {
    try {
        const res = await axiosInstance.post(apiUrl, {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            }
        });
        return res.data?.accessToken;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Token Refresh Failed");
    }
}