/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthServiceProps from "@/types/authService";
import axios from "axios";

export const registerUser = async ({ apiUrl, signupForm }: AuthServiceProps) => {
    try {
        const res = await axios.post(apiUrl, signupForm);
        return res.data;
    } catch (err: any) {
        throw new Error(err?.response?.data?.message || "Registration failed");
    }
};