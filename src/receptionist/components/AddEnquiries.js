import React, { useState } from 'react';
import '../rec-css/AddEnquiries.css';

function AddEnquiry() {
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    email: '',
    contact: '',
    enquiryType: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnquiryData({
      ...enquiryData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending data to an API)
    console.log(enquiryData);
  };

  return (
    <div className="add-enquiry-form-container">
      <h1 className='mt-5'>Add Enquiry</h1>
      <form className="add-enquiry-form" onSubmit={handleSubmit}>
        <div className='add-enquiry-form-labels'>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={enquiryData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={enquiryData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </label>
        </div>

        <div className='add-enquiry-form-labels'>
          <label>
            Contact Number:
            <input
              type="tel"
              name="contact"
              value={enquiryData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
            />
          </label>
          <label>
            Enquiry Type:
            <select
              name="enquiryType"
              value={enquiryData.enquiryType}
              onChange={handleChange}
              required
            >
              <option value="">Select enquiry type</option>
              <option value="General">General</option>
              <option value="Appointment">Appointment</option>
              <option value="Feedback">Feedback</option>
              <option value="Support">Support</option>
            </select>
          </label>
        </div>




        <label>
          Message:
          <textarea
            name="message"
            value={enquiryData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="4"
            required
          />
        </label>
        <button type="submit">Submit Enquiry</button>
      </form>
    </div>
  );
}

export default AddEnquiry;
