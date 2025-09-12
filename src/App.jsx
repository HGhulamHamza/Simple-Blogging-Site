import { useState } from "react";
import { Link } from "react-scroll";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">EarnOnline</div>

        {/* Hamburger / Close button */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </div>

        {/* Nav Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="home" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="about" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="blog" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="contact" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="content">
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="blog"><Blog /></section>
        <section id="contact"><Contact /></section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 EarnOnline | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
