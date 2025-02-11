/* eslint-disable @typescript-eslint/no-explicit-any */
import { deHash, hashedPasswordGenerator } from "@/helpers/hashHelper";
import User from "@/models/User";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken } from '@/helpers/generateToken';
import { cookies } from "next/headers";
import { getAccessToken } from "@/helpers/getCookies";
import { verifyJwt } from "@/helpers/jwtHelpers";

export const registerUser = async (userData: any) => {
    try {
        const { confirmPassword, ...filteredUserData } = userData;
        const { name, email, phone, password, terms, role } = filteredUserData;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!name || !email || !password || !phone || !terms) {
            throw new Error("All fields are required.");
        } else if (confirmPassword !== password) {
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

        const hashedPassword = await hashedPasswordGenerator(password);

        const newUser = new User({
            ...filteredUserData,
            password: hashedPassword,
            role: role || "user",
        });

        await newUser.save();

        return NextResponse.json(
            {
                message: "User registered successfully!",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
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

        const accessToken = await generateAccessToken(user._id.toString(), user.email);
        const refreshToken = await generateRefreshToken(user._id.toString(), user.email);

        user.refreshToken = refreshToken;

        console.log("Refresh Token saved in DB");
        await user.save();

        const CookieStore = await cookies();
        CookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60,
            path: '/'
        });

        CookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
            path: '/'
        });

        return NextResponse.json(
            {
                message: "Login successful!",
                accessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
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

export const getUser = async () => {
    try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
            return NextResponse.json(
                { message: "Unauthorized: No access token provided" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        let userData;
        try {
            userData = await verifyJwt(accessToken.value, 'access');
        } catch (error: any) {
            return NextResponse.json(
                { message: error.message || "Invalid or expired token" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        if (typeof userData !== "object" || !userData.email) {
            return NextResponse.json(
                { message: "Invalid token payload" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const user = await User.findOne({ email: userData.email });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: StatusCodes.NOT_FOUND }
            );
        }

        return NextResponse.json(
            { message: "User Found", user },
            { status: StatusCodes.OK }
        );
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || "Something went wrong. Please try again." },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
};

export const refreshAccessToken = async (request: NextRequest) => {
    try {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { message: "Unauthorized: Missing or invalid authorization" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }
        const refreshToken = authHeader.split(" ")[1];
        console.log("Controller Refresh Token: ", refreshToken);

        if (!refreshToken) {
            return NextResponse.json(
                { message: "Refresh token is required" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        let decoded;
        try {
            decoded = await verifyJwt(refreshToken, "refresh");
        } catch (err: any) {
            return NextResponse.json(
                { message: err.message || "Invalid or expired refresh token" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        if (typeof decoded !== "object" || !decoded.id) {
            return NextResponse.json(
                { message: "Invalid token payload" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return NextResponse.json(
                { message: "Invalid refresh token" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const newAccessToken = await generateAccessToken(user._id.toString(), user.email);

        console.log("Generating & Saving new Access Token");

        return NextResponse.json(
            { message: "Token refreshed", accessToken: newAccessToken },
            { status: StatusCodes.OK }
        );

    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Something went wrong, please try again" },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
};