import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* ✅ Main Single Page Website */}
          <Route
            path="/"
            element={
              <>
                {/* Navbar */}
                <nav className="navbar">
                  <div className="logo">EarnOnline</div>
                  <div className="menu-icon">☰</div>
                  <ul className="nav-links">
                    <li>
                      <ScrollLink to="home" smooth duration={500}>
                        Home
                      </ScrollLink>
                    </li>
                    <li>
                      <ScrollLink to="about" smooth duration={500}>
                        About
                      </ScrollLink>
                    </li>
                    <li>
                      <ScrollLink to="blog" smooth duration={500}>
                        Blog
                      </ScrollLink>
                    </li>
                    <li>
                      <ScrollLink to="contact" smooth duration={500}>
                        Contact
                      </ScrollLink>
                    </li>
                  </ul>
                </nav>

                {/* Page Content */}
                <div className="content">
                  <section id="home">
                    <Home />
                  </section>
                  <section id="about">
                    <About />
                  </section>
                  <section id="blog">
                    <Blog />
                  </section>
                  <section id="contact">
                    <Contact />
                  </section>
                </div>

                {/* Footer */}
                <footer className="footer">
                  <p>© 2025 EarnOnline | All Rights Reserved</p>
                </footer>
              </>
            }
          />

          {/* ✅ Admin Routes */}
          <Route path="/admin" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ Fallback Route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
