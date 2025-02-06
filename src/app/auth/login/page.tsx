"use client";

import Link from "next/link";
import { useState } from "react";

const Login: React.FC = () => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

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
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        console.log("Form: ", loginForm);
        setLoginForm((prev) => ({
            ...prev,
            email: "",
            password: "",
        }));
    }

    const inputStyle = `bg-transparent border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary`;

    return (
        <div className="relative min-h-screen overflow-hidden bg-black-primary flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-black-secondary px-5 py-10 max-w-xs w-full rounded-md border border-black-tertiary shadow-lg text-text-light flex flex-col items-center justify-center gap-5 z-10">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-2xl font-normal text-center text-text-light">Login to Your Account</h1>
                    <span className="text-xs text-gray-quaternary text-center">Enter credentials to access your account</span>
                </div>
                <div className="space-y-3 w-full">
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        name="email"
                        value={loginForm.email}
                        onChange={handleOnChange}
                        className={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        name="password"
                        value={loginForm.password}
                        onChange={handleOnChange}
                        className={inputStyle}
                    />
                </div>
                {error && <span className="text-red-500 text-xs">{error}</span>}
                <div className="w-full space-y-2">
                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-primary text-white rounded-md focus:ring-2 focus:ring-purple-primary transition-all"
                    >
                        Log In
                    </button>
                    <div className="flex justify-between w-full text-xs text-gray-quaternary mt-3">
                        <Link href="/contact">
                            Need Help?
                        </Link>
                        <Link href="/auth/create-account">
                            Create an Account
                        </Link>
                    </div>
                </div>
            </form>

            <span className="absolute bg-gradient-to-br from-purple-primary to-black-tertiary -translate-x-1/2 -translate-y-1/4 h-48 w-48 md:w-96 md:h-96 top-0 left-0 rounded-full blur-3xl z-0"></span>
            <span className="absolute bg-gradient-to-br from-purple-primary to-black-tertiary translate-x-1/2 translate-y-1/4 h-48 w-48 md:w-96 md:h-96 bottom-0 right-0 rounded-full blur-3xl z-0"></span>
        </div>
    );
};

export default Login;