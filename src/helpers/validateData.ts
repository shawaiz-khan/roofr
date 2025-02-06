/* eslint-disable @typescript-eslint/no-explicit-any */
export const ValidateUserData = async (userData: any) => {
    const { name, email, phone, password, confirmPassword, terms } = userData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name || !email || !password || !phone || !terms) {
        throw new Error("All fields are required.");
    } else if (confirmPassword != password) {
        throw new Error("Passwords do not match.");
    } else if (!emailRegex.test(email)) {
        throw new Error("Invalid email format.");
    } else {
        return true;
    }
}