/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";
import AuthServiceProps from "@/types/auth.service.types";

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

export const Refresh = async (apiUrl: string) => {
    try {
        const res = await axiosInstance.post(apiUrl);
        return res.data?.accessToken;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Token Refresh Failed");
    }
}