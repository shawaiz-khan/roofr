import { IUser } from '@/types/db.model.types';
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type:
                String,
            required: true
        },
        userType: {
            type: String,
            enum: ["Buyer", "Seller", "Admin"],
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        location: {
            type: String
        },
        terms: {
            type: Boolean,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;