import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Doctorsearch.css';
import { FaCalendar, FaUserMd, FaHospital, FaClipboardCheck, FaVial, FaPassport } from 'react-icons/';


const DoctorSearch = () => {
  const services = [
    {
      icon: <FaCalendar />,
      title: 'Book Appointment',
      link: '/appointment'
    },
    {
      icon: <FaUserMd />,
      title: 'OPD Timings',
      link: '/opd'
    },
    {
      icon: <FaHospital />,
      title: 'Cost of Implants',
      link: '/costs'
    },
    {
      icon: <FaClipboardCheck />,
      title: 'Health Checkup',
      link: '/health-checkup'
    },
    {
      icon: <FaVial />,
      title: 'Lab',
      link: '/blood-center'
    },
    {
      icon: <FaPassport />,
      title: 'Visa Medical Services',
      link: '/visa-services'
    }
  ];

  return (
    <div className="docs-container">
      <div className="docs-content">
        <div className="docs-text">
          <h1>
            Welcome to Hospital 
            Name
            <br />
            Pune's Best
            <br />
         
          </h1>
          <p>
            Description in the past 50 years has set new bench marks for
            standards in the health care industry and is recognised as one of the
            top hospitals in Pune.
          </p>
          <Link to="/services" className="services-btn">
            View Our Hospital Services
          </Link>
        </div>
        <div className="hero-logo">
          <img src="/hospital-logo.png" alt="Hospital Logo" />
        </div>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <Link to={service.link} key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DoctorSearch; 