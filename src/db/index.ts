import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || '';

export const connectDB = async () => {
    try {
        await mongoose.connect(uri as string);
        console.log("Connected to database..");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};