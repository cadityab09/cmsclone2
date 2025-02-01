import React, { useState, useEffect, useRef } from 'react';
import '../CSS/HospitalSpecialities.css';

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
    { id: 1, name: 'Cardiology', icon: 'https://cdn-icons-png.flaticon.com/128/10283/10283568.png' },
    { id: 2, name: 'Cardiac Surgery', icon: 'https://cdn-icons-png.flaticon.com/128/8098/8098660.png' },
    { id: 7, name: 'Gastroenterology', icon: 'https://cdn-icons-png.flaticon.com/128/8566/8566694.png' },
    { id: 8, name: 'Liver Transplant', icon: 'https://cdn-icons-png.flaticon.com/128/6851/6851630.png' },
    { id: 9, name: 'General Surgery', icon: 'https://cdn-icons-png.flaticon.com/128/10453/10453694.png' },
    { id: 10, name: 'Critical Care', icon: 'https://cdn-icons-png.flaticon.com/128/10405/10405793.png' },
  ];

  return (
    <section ref={sectionRef} className={`clinical-excellence ${animate ? 'animate' : ''}`}>
      <div className="excellence-container">
        <h1>Specialities</h1>
        <p>Explore Specialized Services Available at the Sahyadri Hospitals</p>

        <div className="specialties-grid">
          {specialties.map((specialty) => (
            <div key={specialty.id} className="specialty-card">
              <div className="specialty-icon">
                <img src={specialty.icon} alt={specialty.name} />
              </div>
              <span>{specialty.name}</span>
            </div>
          ))}
        </div>

        <div className="view-all-container">
          {/* <button className="view-all-btn">View All Specialities</button> */}
        </div>
      </div>
    </section>
  );
};

export default HospitalSpecialities;