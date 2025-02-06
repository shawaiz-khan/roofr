import { Document } from "mongoose";

export default interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    userType: "Buyer" | "Seller" | "Agent" | "Investor";
    password: string;
    location?: string;
    terms: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    role: "user" | "admin";
}