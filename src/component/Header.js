import React, { useState } from 'react';
import '../CSS/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import Maulilogo from '../assets/Images/mauli_logo.webp';
import AppServices from "../services/AppServices"; // Import AppServices

const Header = ({ scollTODoctor, scrollToWhyChoose, scollTOPackage, scrollToServices }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMainMenuOpen, setisMainMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', dateTime: '', description: '' });

  const navigate = useNavigate(); // Use navigate

  const toggleDropdown = (status) => setIsDropdownOpen(status);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMainMenu = () => setisMainMenuOpen(!isMainMenuOpen);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AppServices.createAppointment(formData).then(() => {
      navigate('/'); // Redirect on successful appointment creation
      closeModal(); // Close the modal
    });
  };

  return (
    <header className="header">
      {/* Existing Header Code */}
      <div className="header-main px-4">
        <div className="logo">
          <a href="#"><img src={Maulilogo} alt="Mauli Hospital" /></a>
        </div>

        <nav className="main-nav">
          <ul className="">
            <Link to="/"><div className="p-3 hospital-title">Mauli Hospital</div></Link>
            <div className="headerspace d-flex">
              <li onClick={scrollToWhyChoose}><a href="#">Home</a></li>
              <li onClick={scrollToWhyChoose}><a href="#">About</a></li>
              <li onClick={scrollToWhyChoose}><a href="#">Contact Us</a></li>
              <li><a href="#" onClick={scollTOPackage}>Health Packages</a></li>
              <li><a href="#">Doctors</a></li>
            </div>
          </ul>
        </nav>

        <button className="appointment btn btn-success p-1 m-2" onClick={openModal}>
          Appointments
        </button>

        {/* Modal for Appointment Form */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="modal-title">Add Appointment</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Name</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dateTime">Date and Time</label>
                  <input
                    type="datetime-local"
                    id="dateTime"
                    name="dateTime"
                    value={formData.dateTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
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
