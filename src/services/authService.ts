/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/helpers/axiosInstance";
import AuthServiceProps from "@/types/authService";

export const registerUser = async ({ apiUrl, userData }: AuthServiceProps) => {
    try {
        const res = await axiosInstance.post(apiUrl, userData);
        return res.data;
    } catch (err: any) {
        throw new Error(err?.response?.data?.message || "Registration failed");
    }
};

export const loginUser = async ({ apiUrl, userData }: AuthServiceProps) => {
    try {
        const res = await axiosInstance.post(apiUrl, userData);
        console.log("Login: ", res.data);
        return res.data;
    } catch (err: any) {
        throw new Error(err?.response?.data?.message || "Login failed");
    }
};