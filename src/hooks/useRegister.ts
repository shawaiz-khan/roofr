/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";

export const useRegister = () => {
    const [signupForm, setSignupForm] = useState({
        name: "",
        email: "",
        phone: "",
        userType: "",
        password: "",
        confirmPassword: "",
        location: "",
        terms: false,
        role: "user"
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const router = useRouter();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSignupForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError("");
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked,
        }));
        setError("");
    };

    const validateForm = () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (signupForm.name === "" || signupForm.email === "" || signupForm.phone === "" || signupForm.password === "") {
            setError("Please Fill All Required Fields");
            return false;
        } else if (!emailPattern.test(signupForm.email)) {
            setError("Email is Invalid, Try Again!");
            return false;
        } else if (signupForm.password !== signupForm.confirmPassword) {
            setError("Passwords do not match!");
            return false;
        } else if (!signupForm.terms) {
            setError("You must agree to the terms and conditions!");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        const userData = signupForm;

        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/create-account`;
            await registerUser({ apiUrl, userData });
            setSuccess("User registered successfully!");
            router.push(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`);
        } catch (error: any) {
            setError(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return {
        signupForm,
        error,
        success,
        loading,
        handleOnChange,
        handleSubmit,
        handleCheckboxChange,
    };
};