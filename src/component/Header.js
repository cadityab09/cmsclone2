import React, { useState, useEffect } from 'react';
import '../CSS/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import Maulilogo from '../assets/Images/mauli_logo.webp';
import AppServices from "../services/AppServices";
import axios from 'axios';

const Header = ({ scollTODoctor, scrollToWhyChoose, scollTOPackage, scrollToServices }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = (status) => {
    setIsDropdownOpen(status);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu button clicked, isMenuOpen:', isMenuOpen);
  };
  const [scrollLeft, setScrollLeft] = useState(0);

  const [isMainMenuOpen, setisMainMenuOpen] = useState(false);
  const toggleMainMenu = () => {
    setIsMenuOpen(false);
    setisMainMenuOpen(!isMainMenuOpen);
    console.log('Menu button clicked, isMainMenuOpen:', isMainMenuOpen);
  };

  const [formData, setFormData] = useState({
    specialty: '',
    doctor: '',
    availableDay: '',
    timeSlot: '',
    title: '', // Patient name field
    description: '',
    dateTime: '', // Add dateTime field to hold date and time
    mobileNumber: ''
  });

  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const navigate = useNavigate();

  // Fetching specialties and doctors data from API
  useEffect(() => {
    axios.get('http://localhost:8084/api/doctors')
      .then(response => {
        const doctorsData = response.data;
        const uniqueSpecialties = [...new Set(doctorsData.map(doc => doc.specialties))];

        setSpecialties(uniqueSpecialties);
        setDoctors(doctorsData);
      })
      .catch(error => {
        console.error("Error fetching doctors:", error);
        alert("There was an error fetching the doctor data. Please try again later.");
      });
  }, []);

  // Fetching time slots when a doctor and day are selected
  useEffect(() => {
    if (formData.doctor && formData.availableDay) {
      const selectedDoctor = doctors.find(doc => doc.name === formData.doctor);
      if (selectedDoctor) {
        setTimeSlots([selectedDoctor.inTime, selectedDoctor.outTime]); // Directly set in-time and out-time
      }
    } else {
      setTimeSlots([]);
    }
  }, [formData.doctor, formData.availableDay]);

  // Handling input changes and form resets
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "specialty") {
      const filtered = doctors.filter(doc => doc.specialties === value);
      setFilteredDoctors(filtered);
      setFormData(prev => ({ ...prev, doctor: '', availableDay: '', timeSlot: '', title: '', description: '', dateTime: '', mobileNumber: '' }));
      setAvailableDays([]);
      setTimeSlots([]);
    }

    if (name === "doctor") {
      const selectedDoctor = doctors.find(doc => doc.name === value);
      setAvailableDays(selectedDoctor ? selectedDoctor.days : []);
      setTimeSlots([]);  // Clear time slots when doctor changes
      setFormData(prev => ({ ...prev, availableDay: '', timeSlot: '', title: '', description: '', dateTime: '', mobileNumber: '' }));
    }

    if (name === "availableDay") {
      setFormData(prev => ({ ...prev, timeSlot: '', title: '', description: '', dateTime: '', mobileNumber: '' }));
    }
  };

  // Handling form submission to create appointment
  const handleSubmit = (e) => {
    e.preventDefault();

    AppServices.createAppointment(formData)
      .then(() => {
        navigate('/');
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error("Error creating appointment:", error);
        alert("There was an error creating the appointment. Please try again later.");
      });
  };

  return (
    <header className="header">
      <div className="header-main px-4">
        <div className="logo">
          <a href="#"><img src={Maulilogo} alt="Mauli Hospital" /></a>
          <Link to="/" className='hospital-name'><div className="p-3 hospital-title">Mauli Hospital</div></Link>
        </div>

        <nav className="main-nav">

          <ul className="nav-list">
            <div className="headerspace d-flex">
              <li onClick={scrollToWhyChoose}><a href="#">Home</a></li>
              <li onClick={scrollToWhyChoose}><a href="#">About</a></li>
              <li onClick={scrollToWhyChoose}><a href="#">Contact Us</a></li>
              <li><a href="#" onClick={scollTOPackage}>Health Packages</a></li>
              <li><a href="#">Doctors</a></li>
              <li>
                <button className="appointment btn btn-success p-1 m-2" onClick={() => setIsModalOpen(true)}>
                  Appointments
                </button>
              </li>
            </div>
          </ul>
        </nav>



        <div className='mmi-container'>
          <div className="mobile-menu-icon" onClick={toggleMainMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {isMainMenuOpen && (
            <div className="mobile-menu">
              <nav className="mobile-nav">
                <ul>
                  <li onClick={scrollToWhyChoose}><a href="#">Home</a></li>
                  <li onClick={scrollToWhyChoose}><a href="#">About</a></li>
                  <li onClick={scrollToWhyChoose}><a href="#">Contact Us</a></li>
                  {/* <li><a href="#" onClick={scollTOPackage}>Health Packages</a></li> */}
                  <li><a href="#">Doctors</a></li>
                  <li className='mobile-menu-appointment-btn-list p-1'>
                    <div className="mobile-menu-appointment btn btn-success p-1 " onClick={() => setIsModalOpen(true)}>
                      Appointments
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="modal-title">Add Appointment</h2>
              <form onSubmit={handleSubmit}>

                {/* Select Specialty */}
                <div className='form-row'>
                  <div className="form-group">
                    <label htmlFor="specialty">Select Specialty</label>
                    <select id="specialty" name="specialty" value={formData.specialty} onChange={handleInputChange} required>
                      <option value="">-- Select Specialty --</option>
                      {specialties.map((specialty, index) => (
                        <option key={index} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Doctor */}
                  <div className="form-group">
                    <label htmlFor="doctor">Select Doctor</label>
                    <select id="doctor" name="doctor" value={formData.doctor} onChange={handleInputChange} required>
                      <option value="">-- Select Doctor --</option>
                      {filteredDoctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='form-row'>
                  {/* Select Available Day */}
                  <div className="form-group">
                    <label htmlFor="availableDay">Select Available Day</label>
                    <select id="availableDay" name="availableDay" value={formData.availableDay} onChange={handleInputChange} required>
                      <option value="">-- Select Available Day --</option>
                      {availableDays.map((day, index) => (
                        <option key={index} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  {/* Display Time Slots directly */}
                  {formData.availableDay && timeSlots.length > 0 && (
                    <div className="form-group">
                      <label>Available Time</label>
                      <p>{`In-Time: ${timeSlots[0]}, Out-Time: ${timeSlots[1]}`}</p>
                    </div>
                  )}
                </div>

                {/* Patient Information */}
                {formData.availableDay && timeSlots.length > 0 && (
                  <>
                    <div className="form-group">
                      <label htmlFor="title">Patient Name</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title} // Use "title" for patient name
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="mobileNumber">Mobile Number</label>
                      <input type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} required />
                    </div>

                    {/* Date and Time Picker */}
                    <div className="form-group">
                      <label htmlFor="dateTime">Select Date and Time</label>
                      <input
                        type="datetime-local"
                        id="dateTime"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;