import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [active, setActive] = useState(false);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://simple-blogging-site-jd4e.vercel.app/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="page blog">
      <h2
        className={`heading-underline ${active ? "active" : ""}`}
        onClick={() => setActive(!active)}
      >
        Our Blog
      </h2>

      <div className="blog-list">
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            className="blog-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {blog.image && (
              <img src={blog.image} alt={blog.title} className="blog-image" />
            )}
            <h3>{blog.title}</h3>
            <p>{blog.summary}</p>
            {expanded === blog._id && (
              <p className="blog-content">{blog.content}</p>
            )}
            <button onClick={() => toggleExpand(blog._id)}>
              {expanded === blog._id ? "Show Less" : "Read More"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
