/* eslint-disable @typescript-eslint/no-explicit-any */
export const validateUserInput = (userData: any) => {
    const { name, email, phone, userType, password, confirmPassword, terms } = userData;

    if (!name || !email || !phone || !userType || !password || !confirmPassword || !terms) {
        throw new Error("Please fill all required fields");
    }

    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }
};