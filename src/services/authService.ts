/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";
import AuthServiceProps from "@/types/authService";

export const Register = async ({ apiUrl, userData }: AuthServiceProps) => {
    try {
        const res = await api.post(apiUrl, userData);
        return res.data;
    } catch (err: any) {
        throw new Error(err?.response?.data?.message || "Registration failed");
    }
};

export const Login = async ({ apiUrl, userData }: AuthServiceProps) => {
    try {
        const res = await api.post(apiUrl, userData);
        return res.data;
    } catch (err: any) {
        throw new Error(err?.response?.data?.message || "Login failed");
    }
};

export const User = async ({ apiUrl }: { apiUrl: string }) => {
    try {
        const res = await api.get(apiUrl);
        return res.data;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Fetching User Failed");
    }
}

export const RefreshToken = async ({ apiUrl }: { apiUrl: string }) => {
    try {
        const res = await api.post(apiUrl);
        return res.data;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Token Refreshing Failed");
    }
}