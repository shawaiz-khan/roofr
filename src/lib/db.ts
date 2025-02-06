import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;

if (!URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        await mongoose.connect(URI, {
            dbName: "roofr_db",
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

export default connectDB;