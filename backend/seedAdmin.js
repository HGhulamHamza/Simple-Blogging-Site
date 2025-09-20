import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");

    const hashedPassword = await bcrypt.hash("admin123.pak", 10);

    await User.create({
      email: "admin@earnonline.com",
      password: hashedPassword,
    });

    console.log("✅ Admin user created");
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

seedAdmin();
