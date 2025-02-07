/* eslint-disable @typescript-eslint/no-explicit-any */
import { deHash, hashedGenerator } from "@/helpers/hashHelper";
import User from "@/models/User";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import { generateToken } from '@/helpers/generateToken';

export const registerUser = async (userData: any) => {
    try {
        const { name, email, phone, password, confirmPassword, terms, role, ...rest } = userData;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!name || !email || !password || !phone || !terms) {
            throw new Error("All fields are required.");
        } else if (confirmPassword != password) {
            throw new Error("Passwords do not match.");
        } else if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json(
                { message: "User with this email already exists!" },
                { status: StatusCodes.BAD_REQUEST }
            );
        }


        const hashedPassword = await hashedGenerator(password);

        const newUser = new User({
            ...rest,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        await newUser.save();

        return NextResponse.json(
            {
                message: "User registered successfully!",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            },
            { status: StatusCodes.CREATED }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Something went wrong. Please try again." },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
};

export const loginUser = async (userData: any) => {
    try {
        const { email, password } = userData;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !password) {
            throw new Error("All fields are required.");
        } else if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User does not Exist" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const isMatch = await deHash(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid email or password." },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const token = generateToken(user._id.toString(), user.email, user.role);

        return NextResponse.json(
            {
                message: "Login successful!",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            },
            { status: StatusCodes.OK }
        );

    } catch (error: any) {
        console.error("Error logging in user:", error);
        return NextResponse.json(
            { message: error.message || "Something went wrong. Please try again." },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
};