import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("⚠️ MongoDB connection warning:", error.message);
    console.error("💡 Assurez-vous que le service MongoDB local est démarré (ou utilisez un URI MongoDB Atlas dans backend/.env).");
  }
};

export default connectDB;
