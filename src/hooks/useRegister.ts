/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Register } from "@/services/auth.service";
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
    const [isShowPassword, setIsShowPassword] = useState(false);

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
            const apiUrl = `/api/auth/create-account`;
            await Register({ apiUrl, userData });
            setSuccess("User registered successfully!");
            router.push(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`);
        } catch (error: any) {
            setError(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleShowPassword = () => {
        setIsShowPassword((prev) => !prev);
    }

    return {
        signupForm,
        error,
        success,
        loading,
        isShowPassword,
        handleOnChange,
        handleSubmit,
        handleCheckboxChange,
        handleShowPassword
    };
};