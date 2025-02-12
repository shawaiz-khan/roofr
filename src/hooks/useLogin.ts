/* eslint-disable @typescript-eslint/no-explicit-any */
import { Login } from "@/services/auth.service";
import { useState } from "react";

export const useLogin = () => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError("");
    };

    const validateForm = () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (loginForm.email === "" && loginForm.password === "") {
            setError("Please Fill the form");
            return false;
        } else if (loginForm.email === "" || !emailPattern.test(loginForm.email)) {
            setError("Email is Invalid, Try Again!");
            return false;
        } else if (loginForm.password === "") {
            setError("Password is Required, Try Again!");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        const userData = loginForm;

        try {
            const apiUrl = `/api/auth/login`;
            await Login({ apiUrl, userData });
            setSuccess("User Logged In successfully!");
            setError("");
        } catch (error: any) {
            setError(error.message || "Something went wrong!");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    return {
        loginForm,
        error,
        success,
        loading,
        handleOnChange,
        handleSubmit
    };
};