import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import '../CSS/HospitalSpecialities.css';
import img1 from '../assets/Speciality/cardiology.png';
import img2 from '../assets/Speciality/Ophthalmology.png';
import img3 from '../assets/Speciality/Neurology.png';
import img4 from '../assets/Speciality/Dentist.png';
import img5 from '../assets/Speciality/cardiology.png';
import img6 from '../assets/Speciality/Ophthalmology.png';

const HospitalSpecialities = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const specialties = [
    { id: 1, name: 'Cardiology', img: img1 },
    { id: 2, name: 'Ophthalmology', img: img2 },
    { id: 7, name: 'Neurology', img: img3 },
    { id: 8, name: 'Dentist', img: img4 },
    { id: 9, name: 'Cardiology', img: img5 },
    { id: 10, name: 'Ophthalmology', img: img6 },
  ];

  // Define motion variants for fade-in and slide-in animations
  const sectionVariant = {
    initial: { opacity: 0, y: 50 }, // Start hidden with a slight vertical offset
    whileInView: { opacity: 1, y: 0 }, // Fade in and slide into position
    transition: { duration: 5 },
  };

  const cardVariant = {
    initial: { opacity: 0, x: -100 }, // Start from the left (off-screen)
    whileInView: { opacity: 1, x: 0 }, // Move to position and fade in
    transition: { duration: 10.6 },
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`clinical-excellence ${animate ? 'animate' : ''}`}
      variants={sectionVariant}
      initial="initial"
      whileInView="whileInView"
    >
      <div className="excellence-container">
        <h1>Specialities</h1>
        <p>Explore Specialized Services Available at the Mauli Hospitals</p>

        <motion.div className="specialties-grid">
          {specialties.map((specialty) => (
            <motion.div
              key={specialty.id}
              className="specialty-card"
              variants={cardVariant} // Apply card animation
            >
              <div className="specialty-icon">
                <img src={specialty.img} alt={specialty.name} />
              </div>
              <span>{specialty.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="view-all-container">
          {/* <button className="view-all-btn">View All Specialities</button> */}
        </div>
      </div>
    </motion.section>
  );
};

export default HospitalSpecialities;
