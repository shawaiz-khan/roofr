/* eslint-disable @typescript-eslint/no-explicit-any */
import { deHash, hashedPasswordGenerator } from "@/helpers/hashHelper";
import User from "@/models/User";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken } from '@/helpers/generateToken';
import { cookies } from "next/headers";
import { getAccessToken } from "@/helpers/getCookies";
import { verifyJwt } from "@/helpers/jwtHelpers";

const createResponse = (message: string, status: number, body?: any) => {
    return {
        message,
        status,
        body,
    };
};

export const registerUser = async (userData: any) => {
    try {
        const { confirmPassword, ...filteredUserData } = userData;
        const { name, email, phone, password, terms, role } = filteredUserData;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!name || !email || !password || !phone || !terms) {
            return NextResponse.json(
                createResponse("All fields are required.", StatusCodes.BAD_REQUEST)
            );
        } else if (confirmPassword !== password) {
            return NextResponse.json(
                createResponse("Passwords do not match.", StatusCodes.BAD_REQUEST)
            );
        } else if (!emailRegex.test(email)) {
            return NextResponse.json(
                createResponse("Invalid email format.", StatusCodes.BAD_REQUEST)
            );
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json(
                createResponse("User with this email already exists!", StatusCodes.BAD_REQUEST)
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
            createResponse("User registered successfully!", StatusCodes.CREATED, {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            })
        );
    } catch (error: any) {
        return NextResponse.json(
            createResponse(error.message || "Something went wrong. Please try again.", StatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const loginUser = async (userData: any) => {
    try {
        const { email, password } = userData;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !password) {
            return NextResponse.json(
                createResponse("All fields are required.", StatusCodes.BAD_REQUEST)
            );
        } else if (!emailRegex.test(email)) {
            return NextResponse.json(
                createResponse("Invalid email format.", StatusCodes.BAD_REQUEST)
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                createResponse("User does not Exist", StatusCodes.UNAUTHORIZED)
            );
        }

        const isMatch = await deHash(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                createResponse("Invalid email or password.", StatusCodes.UNAUTHORIZED)
            );
        }

        const accessToken = await generateAccessToken(user._id.toString(), user.email);
        const refreshToken = await generateRefreshToken(user._id.toString(), user.email);

        user.refreshToken = refreshToken;

        await user.save();

        const CookieStore = await cookies();
        CookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60,
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
            createResponse("Login successful!", StatusCodes.OK, {
                accessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            })
        );
    } catch (error: any) {
        return NextResponse.json(
            createResponse(error.message || "Something went wrong. Please try again.", StatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const getUser = async () => {
    try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
            return NextResponse.json(
                createResponse("Unauthorized: No access token provided", StatusCodes.UNAUTHORIZED)
            );
        }

        let userData;
        try {
            userData = await verifyJwt(accessToken.value, 'access');
        } catch (error: any) {
            return NextResponse.json(
                createResponse(error.message || "Invalid or expired token", StatusCodes.UNAUTHORIZED)
            );
        }

        if (typeof userData !== "object" || !userData.email) {
            return NextResponse.json(
                createResponse("Invalid token payload", StatusCodes.UNAUTHORIZED)
            );
        }

        const user = await User.findOne({ email: userData.email });

        if (!user) {
            return NextResponse.json(
                createResponse("User not found", StatusCodes.NOT_FOUND)
            );
        }

        return NextResponse.json(
            createResponse("User Found", StatusCodes.OK, { user })
        );
    } catch (err: any) {
        return NextResponse.json(
            createResponse(err.message || "Something went wrong. Please try again.", StatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const refreshAccessToken = async (request: NextRequest) => {
    try {
        const authHeader = request.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                createResponse("Unauthorized: Missing or invalid authorization", StatusCodes.UNAUTHORIZED)
            );
        }

        const refreshToken = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = await verifyJwt(refreshToken, "refresh");
        } catch (err: any) {
            return NextResponse.json(
                createResponse(err.message || "Invalid or expired refresh token", StatusCodes.UNAUTHORIZED)
            );
        }

        if (typeof decoded !== "object" || !decoded.id) {
            return NextResponse.json(
                createResponse("Invalid token payload", StatusCodes.UNAUTHORIZED)
            );
        }

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return NextResponse.json(
                createResponse("Invalid refresh token", StatusCodes.UNAUTHORIZED)
            );
        }

        const newAccessToken = await generateAccessToken(user._id.toString(), user.email);

        const CookieStore = await cookies();
        CookieStore.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60,
            path: '/'
        });

        return NextResponse.json(
            createResponse("Token refreshed", StatusCodes.OK, { accessToken: newAccessToken })
        );
    } catch (error: any) {
        return NextResponse.json(
            createResponse(error.message || "Something went wrong, please try again", StatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};