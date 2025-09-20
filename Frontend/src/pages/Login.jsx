import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("You are not admin");
      setOpenSnackbar(true);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          {/* Password input with eye icon */}
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ ...styles.input, paddingRight: "40px" }}
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
              onMouseEnter={(e) => (e.target.style.color = "#02d6ab")} // lighter green
              onMouseLeave={(e) => (e.target.style.color = "#00B894")} // back to button green
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Error text inside form */}
          {error && <p style={styles.errorText}>{error}</p>}

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>

      {/* Snackbar for toaster */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          variant="filled"
        >
          Admin login failed
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

// ✅ CSS-in-JS styling
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, black, grey)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: "#ffffff08",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "25px",
    fontSize: "24px",
    color: "white",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
    width: "90%",
  },
  button: {
    background: "#00B894",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
     width:"50%",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: "12px",
    cursor: "pointer",
    color: "#00B894", // ✅ matches button green
    fontSize: "20px",
    transition: "0.3s",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    margin: "0",
  },
};

export default Login;
