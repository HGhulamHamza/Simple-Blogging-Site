// src/components/Home.jsx
import { motion } from "framer-motion";
import homeImg from "../assets/home.jpeg"; // add any image in assets folder

const Home = () => {
  return (
    <div className="page home">
      <div className="home-container">
        {/* Text + Image */}
        <motion.div
          className="home-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="home-heading">Welcome to EarnOnline</h1>
          <p>
            Learn modern ways to make money online with freelancing, affiliate
            marketing, YouTube, blogging, and much more. We provide guides,
            insights, and practical tips to help you succeed in the digital
            world.
          </p>
          <p>
            Whether you’re a beginner or experienced, our mission is to help you
            turn your skills into income streams and build financial freedom.
          </p>
        </motion.div>

        <motion.div
          className="home-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={homeImg} alt="Earn Online" />
        </motion.div>
      </div>

      {/* Scoped CSS */}
      <style>
        {`
          .home-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 3rem;
            padding: 2rem;
          }

          .home-text {
            flex: 1;
          }

          .home-text h1 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            color: #black;
          }

          .home-text p {
            font-size: 1.2rem;
            line-height: 1.8rem;
            margin-bottom: 1rem;
            color: #333;
          }

          .home-image img {
            width: 420px;
            max-width: 100%;
            border-radius: 1rem;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }

          /* Mobile view */
          @media (max-width: 768px) {
            .home-container {
              flex-direction: column;
              gap: 2rem;
              padding: 1.5rem;
            }

            /* Heading + Image in same row */
            .home-heading {
              font-size: 2rem;
              margin-bottom: 1rem;
            }

            .home-text {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              order: 2;
            }

            .home-image {
              order: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: row;
              gap: 1rem;
              width: 100%;
            }

            .home-image img {
              width: 200px;
              border-radius: 0.75rem;
            }

            /* Place heading and image side by side */
            .home-heading {
              display: inline-block;
              margin-right: 1rem;
              vertical-align: middle;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
