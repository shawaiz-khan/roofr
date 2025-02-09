import { Document } from "mongoose";

export default interface IUser extends Document {
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