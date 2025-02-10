import React from 'react';
import '../CSS/Footer.css';
import Maulilogo from '../assets/Images/mauli_logo.webp'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-company-info">
        <img src={Maulilogo} alt="Mauli Hospital" className="footer-logo"/>
        <div className="info-item">
              {/* <span className="info-label">Hospital </span> */}
              <p>Mauli Hospital</p>
            </div>
            
        </div>
        <div>
        <div className="company-details">
        <div className="info-item">
              <span className="info-label">Emergency & Appointment</span>
              <p>+91 88888 22222</p>
            </div>
            {/* <div className="info-item">
              <span className="info-label">General Enquiry</span>
              <p>020 6721 5000</p>
            </div> */}
            <div className="info-item">
              <span className="info-label">Email Us</span>
              <p>feedback@maulihospitals.com</p>
            </div>
            
            <div className="info-item">
              <span className="info-label">Registered Office</span>
              <p>
                S. N. 89 & 90 , Plot No. 54,<br />
                 beed,411038<br />
                 Maharashtra, India<br />
                {/* Corporate Identity Number (CIN):<br />
                U85110PN1996PTC099499 */}
              </p>
            </div>
          </div>
        </div>
       

        <div className="footer-links">
          <div className="footer-section">
            <h3>Specialities</h3>
            <ul>
              <li><a href="#cardiology">Cardiology</a></li>
              <li><a href="#cardiac-surgery">Dentist</a></li>
              <li><a href="#oncology">Neurology</a></li>
              <li><a href="#oncology">Ophthalmology</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Our Hospital</h3>
            <ul>
            <li><a href="#genetics">labs</a></li>
              <li><a href="#courses">Expert Staff</a></li>
              <li><a href="#clinical-research">10+ Experiance</a></li>
             
            </ul>

            
          </div>
          <div className="footer-section">
          <h3>Our Doctors</h3>
            <ul>
              <li><a href="#cancer-treatment">10+ Experiance Cardiology</a></li>
              <li><a href="#bone-marrow">Neurology</a></li>
             
              <li><a href="#micro-surgery">Dentist</a></li>
              
            </ul>
          </div>

          <div className="footer-section">
            <h3>Patient Care</h3>
            <ul>
            <li><a href="#medical-services">lab Services</a></li>
              <li><a href="#find-doctor">Find A Doctor</a></li>
              <li><a href="#book-appointment">Book Appointment</a></li>
              
            
            </ul>

            {/* <h3>International Patients</h3>
            <ul>
              <li><a href="#about">About Sahyadri</a></li>
              <li><a href="#hospitals">Hospitals</a></li>
            </ul> */}

            {/* <h3>News & Media</h3>
            <ul>
              <li><a href="#news">News</a></li>
              <li><a href="#interviews">Interviews</a></li>
              <li><a href="#videos">Watch Our Videos</a></li>
            </ul> */}
          </div>

          <div className="footer-section">
            {/* <h3>Hospitals</h3>
            <ul>
              <li><a href="#deccan">Deccan, Pune</a></li>
              <li><a href="#hadapsar">Hadpsar, Pune</a></li>
              <li><a href="#nagar-road">Nagar Road, Pune</a></li>
              <li><a href="#kothrud">Kothrud, Pune</a></li>
             
            </ul> */}

            {/* <h3>Quick Links</h3>
            <ul>
              <li><a href="#career">Career</a></li>
              <li><a href="#feedback">Post A Query / Feedback</a></li>
              <li><a href="#consult">Consult Doctors Online</a></li>
              <li><a href="#prices">Stent & TKR Prices</a></li>
              <li><a href="#waste-report">Bio-Medical Waste Report</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#refund">Refund and Cancellation Policy</a></li>
            </ul> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;