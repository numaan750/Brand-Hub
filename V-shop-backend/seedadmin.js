import bcrypt from "bcryptjs"; // fixed spelling
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import vadminmodel from "./models/vadminmodel.js";

dotenv.config(); // load .env variables

const seedAdmin = async () => {
  try {
    connect(process.env.MONGODB_URL);
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if admin already exists
    const existingAdmin = await vadminmodel.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin);
      return process.exit();
    }

    // Hash the password
    const hash = await bcrypt.hash("1234", 10);

    // Create new admin
    const admin = await vadminmodel.create({
      username: "1234",
      email: "admin@gmail.com",
      password: hash,
    });

    console.log("Admin seeded successfully:", admin);
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedAdmin();
