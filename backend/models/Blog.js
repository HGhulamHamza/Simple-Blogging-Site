import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  content: { type: String, required: true },
  image: String,
}, { timestamps: true });

export default mongoose.model("Blog", BlogSchema);
