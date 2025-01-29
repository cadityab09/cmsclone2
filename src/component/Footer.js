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
              <span className="info-label">Company name</span>
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
              <li><a href="#cardiac-surgery">Cardiac surgery</a></li>
              <li><a href="#oncology">Oncology</a></li>
              {/* <li><a href="#neurology">Neurology</a></li>
              <li><a href="#neurosurgery">Neurosurgery</a></li>
              <li><a href="#orthopedic">Orthopedic</a></li>
              <li><a href="#gastroenterology">Gastroenterology</a></li> */}
              {/* <li><a href="#liver-transplant">Liver Transplant</a></li>
              <li><a href="#general-surgery">General Surgery</a></li>
              <li><a href="#critical-care">Critical Care</a></li>
              <li><a href="#haemotology">Haemotology & Bone Marrow</a></li>
              <li><a href="#obstetrics">Obstetrics & Gynecology</a></li>
              <li><a href="#ivf">IVF</a></li>
              <li><a href="#paediatrics">Paediatrics</a></li>
              <li><a href="#endocrinology">Endocrinology</a></li>
              <li><a href="#kidney-transplant">Kidney Transplant</a></li>
              <li><a href="#spine-surgery">Spine Surgery</a></li>
              <li><a href="#urology">Urology</a></li> */}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Academics & Research</h3>
            <ul>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#clinical-research">Clinical Research</a></li>
              <li><a href="#genetics">Genetics</a></li>
            </ul>

            
          </div>
          <div className="footer-section">
          <h3>Medical Procedures</h3>
            <ul>
              <li><a href="#cancer-treatment">Advance Cancer Treatment</a></li>
              <li><a href="#bone-marrow">Bone Marrow Transplant</a></li>
              {/* <li><a href="#liver-transplant">Liver Transplant</a></li> */}
              <li><a href="#micro-surgery">Hand Micro Surgery</a></li>
              
            </ul>
          </div>

          <div className="footer-section">
            <h3>Patient Care</h3>
            <ul>
              <li><a href="#find-doctor">Find A Doctor</a></li>
              <li><a href="#book-appointment">Book Appointment</a></li>
              <li><a href="#medical-services">Medical Services</a></li>
            
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