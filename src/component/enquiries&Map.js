import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles

// Container style for Google Map
const containerStyle = {
  width: '100%',
  height: '400px',
};

// Default center for the map (New York City)
const center = {
  lat: 40.712776,  // New York City Latitude
  lng: -74.005974, // New York City Longitude
};

function EnquiriesFormAndMap() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    doctor: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  
  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Simple validations
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required.";
    if (!formData.doctor) newErrors.doctor = "Please select a doctor.";
    if (!formData.message) newErrors.message = "Message cannot be empty.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data submitted:', formData);
    }
  };

  return (
    <div className="container pt-4">
      <div className="row">
        {/* Left Side: Enquiries Form */}
        <div className="col-md-6">
          <h3>Enquiries Form</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">Contact Number</label>
              <input
                type="text"
                className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="doctor" className="form-label">Select Doctor</label>
              <select
                className={`form-select ${errors.doctor ? 'is-invalid' : ''}`}
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
              >
                <option value="">Select a doctor</option>
                <option value="doctor1">Dr. John Doe</option>
                <option value="doctor2">Dr. Jane Smith</option>
                <option value="doctor3">Dr. Alice Brown</option>
              </select>
              {errors.doctor && <div className="invalid-feedback">{errors.doctor}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <div className="invalid-feedback">{errors.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>

        
      </div>
    </div>
  );
}

export default EnquiriesFormAndMap;
