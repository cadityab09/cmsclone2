import React from "react";
import { motion } from "framer-motion"; // Import framer-motion
import "../CSS/home.css"; // Import the external CSS

const Home = () => {
  // Defining motion variants before the return
  const slideInLeft = {
    initial: { opacity: 0, x: -200 }, // Start from left (off-screen)
    whileInView: { opacity: 1, x: 0 }, // Move to position and fade in
    transition: { duration: 1 }, // Duration of the sliding animation
  };

  const slideInRight = {
    initial: { opacity: 0, x: 200 }, // Start from right (off-screen)
    whileInView: { opacity: 1, x: 0 }, // Move to position and fade in
    transition: { duration: 1 }, // Duration of the sliding animation
  };

  const fadeIn = {
    initial: { opacity: 0 }, // Start hidden
    whileInView: { opacity: 1 }, // Fade in when in view
    transition: { duration: 1 }, // Duration of the fade-in animation
  };

  return (
    <div className="home-container" style={{ overflow: "hidden" }}> {/* Apply overflow: hidden */}
      <motion.div
        className="home-content"
        {...fadeIn} // Apply fade-in animation to the entire container
        exit={{ opacity: 0 }} // Fade out on exit
        viewport={{ once: false }} // Allow repeated animation every time the component comes into view
      >
        <motion.h1 className="home-heading" {...slideInLeft}>
          Empowering Health Choices for a Vibrant Life Your Trusted..
        </motion.h1>
        <motion.p className="Paragraph" {...slideInRight}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam magnam
          omnis natus accusantium quos. Reprehenderit incidunt expedita
          molestiae impedit at sequi dolorem iste sit culpa, optio voluptates
          fugiat vero consequatur?
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Home;
