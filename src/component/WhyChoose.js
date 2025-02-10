import React from 'react';
import '../CSS/WhyChoose.css';
import buildingImage from '../assets/Images/MauliHospital.webp'; // Ensure this path is correct
import lab from '../assets/Images/lab.jpg'
import bed from '../assets/Images/bed.jpg'
import staff from '../assets/Images/staff.jpg'
const WhyChoose = () => {
  return (
    <section className="why-choose">
      <div className="why-choose-content">
        <h2>Why Choose Mauli Hospitals?</h2>
        <p>     
          Mauli Hospitals, the Largest Chain of Hospital Network in Western India, was established in 1994 with the Pune Institute of Neurology, exclusively dedicated to Neurology and Neurosurgery. Over the years, Mauli Hospitals has spread its footprint and currently has a chain of 9 hospitals spread across Pune, Nashik, and Karad.
        </p>
        <div className="stats">
          <div className="stat-item">
            <img src={lab} alt="Lab" />
            <span>5+</span>
            <p>Lab Collection Centres</p>
          </div>
          <div className="stat-item">
            <img src={buildingImage} alt="Experience" />
            <span>20+</span>
            <p>Years Of Experience</p>
          </div>
          <div className="stat-item">
            <img src={staff} alt="Staff" />
            <span>10+</span>
            <p>Expert Staff</p>
          </div>
          <div className="stat-item">
            <img src={bed} alt="Bed Capacity" />
            <span>40+</span>
            <p>Bed Capacity</p>
          </div>
        </div>
      </div>
      <div className="why-choose-image">
        <img src={buildingImage} alt="Mauli Hospital Building" />
      </div>
    </section>
  );
};

export default WhyChoose;