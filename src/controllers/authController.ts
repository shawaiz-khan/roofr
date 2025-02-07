/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { hashedGenerator } from "@/helpers/hashedGenerator";
import User from "@/models/User";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import { ValidateUserData } from '@/helpers/validateData';

export const registerUser = async (userData: any) => {
    try {
        await ValidateUserData(userData);

        const { email, password, role, ...rest } = userData;

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

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        return NextResponse.json(
            {
                message: "User registered successfully!",
                token,
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
        console.error("Error registering user:", error);
        return NextResponse.json(
            { message: error.message || "Something went wrong. Please try again." },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
};