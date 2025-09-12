import { FaUsers, FaLightbulb, FaRocket } from "react-icons/fa";
import { useState } from "react";

const About = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="page about">
      <div className="about-header">
        <h2
          className={`heading-underline ${active ? "active" : ""}`}
          onClick={() => setActive(!active)}
        >
          About Us
        </h2>

        <p>
          At EarnOnline, we are passionate about sharing knowledge and creating
          opportunities for individuals to build sustainable income online. Our
          platform provides practical advice, step-by-step guides, and resources
          to help people thrive in the digital economy.
        </p>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <FaUsers size={40} />
          <h3>Community Driven</h3>
          <p>
            We believe in collaboration and sharing knowledge to build a
            supportive online community.
          </p>
        </div>

        <div className="about-card">
          <FaLightbulb size={40} />
          <h3>Innovative Ideas</h3>
          <p>
            Discover unique strategies and creative methods to grow your online
            earnings effectively.
          </p>
        </div>

        <div className="about-card">
          <FaRocket size={40} />
          <h3>Growth Oriented</h3>
          <p>
            Our mission is to help you grow steadily and achieve long-term
            success in the digital world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
