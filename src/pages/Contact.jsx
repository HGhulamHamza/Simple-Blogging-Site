import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="page contact">
      <h2 
        className={`contact-heading ${active ? "active" : ""}`} 
        onClick={() => setActive(!active)}
      >
        Contact Us
      </h2>

      <div className="contact-container">
        {/* Left side - contact details */}
        <div className="contact-info">
          <p><FaEnvelope className="icon" /> contact@earnonline.com</p>
          <p><FaPhone className="icon" /> +92 300 1234567</p>
          <p><FaMapMarkerAlt className="icon" /> Karachi, Pakistan</p>
        </div>

        {/* Right side - contact form */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
