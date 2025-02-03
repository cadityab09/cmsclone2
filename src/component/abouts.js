import React from "react";
import { motion } from "framer-motion"; // Import framer-motion
import img from "../assets/img/about.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../CSS/about.css"; // For any additional custom styles

const About = () => {
  // Define fade-in variant for the elements
  const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration:  2},
  };

  return (
    <div className="about-us-view min-vh-90 d-flex">
      <div className="about-us-container d-flex flex-column flex-lg-row justify-content-between align-items-center">
        {/* About Section Text */}
        <motion.div
          className="col-12 col-lg-6 mb-4 mb-lg-0"
          {...fadeIn} // Apply fade-in effect
        >
          <h1 className="about-title mb-4 text-center">About Us</h1>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam labore rerum tempore tenetur commodi natus quos itaque voluptatum repudiandae nostrum accusantium vero voluptate aspernatur totam, laboriosam aut, et quae consequatur?
          </p>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora quia suscipit illum, numquam incidunt nostrum dolor officia doloremque cupiditate, placeat explicabo sed iure atque neque quidem ipsam! Dolor, minus reiciendis.
          </p>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, illum. Accusantium ab expedita veniam nobis aut, in rerum repellendus! Exercitationem libero recusandae corrupti accusantium reiciendis in placeat illo maxime ea.
          </p>
        </motion.div>

        {/* About Section Image */}
        <motion.div
          className="col-12 col-lg-6 d-flex justify-content-center"
          {...fadeIn} // Apply fade-in effect
        >
          <img src={img} className="img-fluid rounded" alt="About us" />
        </motion.div>
      </div>
    </div>
  );
};

export default About;
