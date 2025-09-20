import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    imageFile: null,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://simple-blogging-site-production.up.railway.app/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setSnackbar({
        open: true,
        message: "❌ Failed to fetch blogs",
        severity: "error",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setSnackbar({
          open: true,
          message: "❌ Only JPG, JPEG, and PNG formats are allowed",
          severity: "error",
        });
        return;
      }
      setFormData({ ...formData, imageFile: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("summary", formData.summary);
      data.append("content", formData.content);
      if (formData.imageFile) data.append("image", formData.imageFile);

      if (editId) {
        await axios.put(`https://simple-blogging-site-production.up.railway.app/api/blogs/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSnackbar({
          open: true,
          message: "Blog updated successfully",
          severity: "success",
        });
      } else {
        await axios.post("https://simple-blogging-site-production.up.railway.app/api/blogs", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSnackbar({
          open: true,
          message: " Blog added successfully",
          severity: "success",
        });
      }

      setFormData({ title: "", summary: "", content: "", imageFile: null });
      setEditId(null);
      setShowForm(false);
      fetchBlogs();
    } catch (err) {
      console.error("Error submitting blog:", err);
      setSnackbar({
        open: true,
        message: "❌ Failed to submit blog",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      imageFile: null,
    });
    setEditId(blog._id);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setConfirmDelete({ open: true, id });
  };

  const confirmDeleteBlog = async () => {
    try {
      await axios.delete(`https://simple-blogging-site-production.up.railway.app/api/blogs/${confirmDelete.id}`);
      fetchBlogs();
      setSnackbar({
        open: true,
        message: " Blog deleted successfully",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "❌ Failed to delete blog",
        severity: "error",
      });
    } finally {
      setConfirmDelete({ open: false, id: null });
    }
  };

  return (
    <div style={{ background: "#f9f9f9", minHeight: "100vh", padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#00B894" }}>
        📊 Admin Dashboard
      </h2>

      {/* Toggle Add Post */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: "#00B894",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
          }}
        >
          <FaPlus /> Add Post
        </button>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "10px",
            maxWidth: "600px",
            margin: "0 auto 30px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "#00B894", marginBottom: "20px" }}>
            {editId ? "Edit Blog" : "Add New Blog"}
          </h3>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                background: "#fff",
                color: "#333",
              }}
            />
            <input
              type="text"
              placeholder="Summary"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                background: "#fff",
                color: "#333",
              }}
            />
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                background: "#fff",
                color: "#333",
                minHeight: "120px",
              }}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  background: "#00B894",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Adding Blog..." : editId ? "Update Blog" : "Add Blog"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  flex: 1,
                  background: "#555",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Table */}
      {!showForm && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 10px",
              width: "85%",
            }}
          >
            <thead style={{ background: "#f5f5f5", color: "#00B894" }}>
              <tr>
                <th style={{ padding: "14px", textAlign: "left" }}>Title</th>
                <th style={{ padding: "14px", textAlign: "left" }}>Summary</th>
                <th style={{ padding: "14px", textAlign: "left" }}>Image</th>
                <th style={{ padding: "14px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  style={{
                    background: "#fff",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                    borderRadius: "8px",
                  }}
                >
                  <td style={{ padding: "12px" }}>{blog.title}</td>
                  <td style={{ padding: "12px" }}>{blog.summary}</td>
                  <td style={{ padding: "12px" }}>
                    {blog.image && (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        style={{
                          width: "90px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <FaEdit
                      style={{
                        color: "#00B894",
                        cursor: "pointer",
                        marginRight: "16px",
                      }}
                      onClick={() => handleEdit(blog)}
                    />
                    <FaTrash
                      style={{ color: "#e74c3c", cursor: "pointer" }}
                      onClick={() => handleDeleteClick(blog._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, id: null })}
      >
        <DialogTitle style={{ color: "#00B894" }}>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this blog?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDelete({ open: false, id: null })}
            style={{ color: "#555" }}
          >
            Cancel
          </Button>
          <Button onClick={confirmDeleteBlog} style={{ color: "#e74c3c" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
