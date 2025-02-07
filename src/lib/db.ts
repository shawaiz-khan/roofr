import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const URI = process.env.MONGODB_URI;
        if (!URI) throw new Error("Please define the MONGODB_URI environment variable inside .env");

        if (mongoose.connection.readyState >= 1) {
            console.log("MongoDB already connected");
            return;
        }

        await mongoose.connect(URI, {
            dbName: "roofr_db",
        });

        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

export default connectDB;