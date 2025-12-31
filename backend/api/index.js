import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import connectDB from "../config/db.js";
import User from "../models/User.js";
import Blog from "../models/Blog.js";

const app = express();

/* =====================
   MIDDLEWARE
===================== */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* =====================
   DB CONNECT MIDDLEWARE
===================== */
// This ensures DB is connected before any request
let isConnected = false;

app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log("MongoDB Connected ✅");
    } catch (err) {
      console.error("MongoDB connection failed:", err.message);
      return res.status(500).json({ error: "Database connection failed" });
    }
  }
  next();
});

/* =====================
   CLOUDINARY
===================== */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogs",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

/* =====================
   ROUTES (UNCHANGED)
===================== */
app.get("/", (req, res) => {
  res.send("API running on Vercel");
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/blogs", upload.single("image"), async (req, res) => {
  try {
    const { title, summary, content } = req.body;
    const image = req.file ? req.file.path : "";

    const blog = new Blog({ title, summary, content, image });
    await blog.save();

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/blogs/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, summary, content } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, summary, content, image },
      { new: true }
    );

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =====================
   EXPORT
===================== */
export default app;
