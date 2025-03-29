import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    userType: "Buyer" | "Seller" | "Agent" | "Investor";
    password: string;
    location?: string;
    terms: boolean;
    role: "user" | "admin";
    refreshToken: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IReview extends Document {
    name: string;
    location: string;
    title: string;
    review: string;
    stars: number;
    createdAt?: Date;
    updatedAt?: Date;
}