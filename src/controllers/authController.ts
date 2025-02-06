/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User';

export const registerUser = async (userData: any) => {
    const { name, email, phone, userType, password, confirmPassword, location, terms, role } = userData;

    if (!name || !email || !phone || !userType || !password || !confirmPassword || !terms) {
        throw new Error("Please fill all required fields");
    }

    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            phone,
            userType,
            password: hashedPassword,
            location,
            terms,
            role,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        return { user: newUser, token };
    } catch (err: any) {
        throw new Error("Internal server error: ", err);
    }
}