import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // WhatsApp number (without leading 0, use country code 92 for Pakistan)
    const phoneNumber = "923225939661";

    const text = `Hello, I am ${formData.name}.
Email: ${formData.email}
Message: ${formData.message}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank"); // opens WhatsApp
  };

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
          <p><FaPhone className="icon" /> 0322 5939661</p>
          <p><FaMapMarkerAlt className="icon" />  Pakistan</p>
        </div>

        {/* Right side - contact form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            required 
            onChange={handleChange}
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            required 
            onChange={handleChange}
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            required 
            onChange={handleChange}
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
