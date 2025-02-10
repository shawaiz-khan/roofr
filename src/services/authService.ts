/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthServiceProps from "@/types/authService";
import axios from "axios";

export const Register = async ({ apiUrl, userData }: AuthServiceProps) => {
    try {
        const res = await axios.post(apiUrl, userData);
        return res.data;
    } catch (err: any) {
        throw new Error(err?.response?.data?.message || "Registration failed");
    }
};

export const Login = async ({ apiUrl, userData }: AuthServiceProps) => {
    try {
        const res = await axios.post(apiUrl, userData);
        return res.data;
    } catch (err: any) {
        throw new Error(err?.response?.data?.message || "Login failed");
    }
};

export const User = async ({ apiUrl }: { apiUrl: string }) => {
    try {
        const res = await axios.get(apiUrl);
        return res.data;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Fetching User Failed");
    }
}