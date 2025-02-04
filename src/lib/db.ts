/* eslint-disable no-var */
import { MongoClient, Db } from 'mongodb';

const uri: string = process.env.MONGODB_URI as string;

if (!uri) {
    throw new Error("MONGODB_URI is missing in .env file");
}

let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoCLientPromise: Promise<MongoClient> | undefined;
}

const connectDb = async (): Promise<Db> => {
    const client = await clientPromise;
    const db = client.db("roofr_db");

    try {
        await db.command({ ping: 1 });
        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        throw new Error("Failed to connect to MongoDB");
    }

    return db;
}

if (process.env.NODE_ENV === "development") {
    if (!globalThis._mongoCLientPromise) {
        const client = new MongoClient(uri);
        globalThis._mongoCLientPromise = client.connect();
    }
    clientPromise = globalThis._mongoCLientPromise;
} else {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default connectDb;