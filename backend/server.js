// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// import User from "./models/User.js";
// import Blog from "./models/Blog.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB connect
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Error:", err));

// /* ===========================
//    CLOUDINARY CONFIG
// =========================== */
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ✅ Multer Storage with Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "blogs", // Cloudinary folder name
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// const upload = multer({ storage });

// /* ===========================
//    BASE ROUTE
// =========================== */
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// /* ===========================
//    AUTH ROUTE (Admin Login)
// =========================== */
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* ===========================
//    BLOG CRUD ROUTES
// =========================== */
// // Get all blogs
// app.get("/api/blogs", async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Add new blog (upload to Cloudinary)
// app.post("/api/blogs", upload.single("image"), async (req, res) => {
//   try {
//     const { title, summary, content } = req.body;
//     const image = req.file ? req.file.path : "";

//     const newBlog = new Blog({ title, summary, content, image });
//     await newBlog.save();
//     res.status(201).json(newBlog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Edit blog (with optional new image)
// app.put("/api/blogs/:id", upload.single("image"), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, summary, content } = req.body;
//     const image = req.file ? req.file.path : req.body.image;

//     const updatedBlog = await Blog.findByIdAndUpdate(
//       id,
//       { title, summary, content, image },
//       { new: true }
//     );
//     res.json(updatedBlog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete blog
// app.delete("/api/blogs/:id", async (req, res) => {
//   try {
//     await Blog.findByIdAndDelete(req.params.id);
//     res.json({ message: "Blog deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* ===========================
//    SERVER START
// =========================== */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
