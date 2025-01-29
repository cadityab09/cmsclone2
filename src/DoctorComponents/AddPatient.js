import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import "../DoctorCSS/AddPatient.css";
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom';

function AddPatient() {
  const [isMarried, setIsMarried] = useState(false);
  const [numChildren, setNumChildren] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [gender, setGender] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [wifeName, setWifeName] = useState('');

  // New state for managing alert messages
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  // State to manage form validity
  const [formValid, setFormValid] = useState(false);

  // Handle marital status change and reset number of children
  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
    setIsMarried(event.target.value === 'married');
    setNumChildren(''); // Reset number of children if marital status changes
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct patient object
    const childrenArray = numChildren ? Array(Number(numChildren)).fill('').map((_, idx) => `Child ${idx + 1}`) : []; // Placeholder for children names

    const patientData = {
      name,
      age,
      contact,
      email, // Add email to the patient data
      gender,
      fatherName,
      motherName,
      maritalStatus,
      wifeName: maritalStatus === 'married' ? wifeName : null,
      childrenNames: maritalStatus === 'married' ? childrenArray : [],  // Add children names if married
    };

    // Send data to the backend
    try {
      const response = await axios.post('http://localhost:8084/api/patients', patientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Patient added:', response.data);
      // You can add redirection or show a success message after successful addition
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  // Validation Functions
  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name); // Only alphabets
  const validateAge = (age) => /^[0-9]+$/.test(age); // Only numbers
  const validateContact = (contact) => /^[0-9]{10}$/.test(contact); // 10 digit number
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/.test(email); // Valid email format
  const validateGender = (gender) => /^[a-zA-Z\s]+$/.test(gender); // Only alphabets
  const validateChildren = (numChildren) => /^[0-9]+$/.test(numChildren); // Only numbers for children

  // Function to show alert with the error message
  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);

    // Hide alert after 2 seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  // useEffect to check form validity on any change
  useEffect(() => {
    const isValid =
      validateName(name) &&
      validateAge(age) &&
      validateContact(contact) &&
      validateEmail(email) &&
      validateGender(gender) &&
      validateName(fatherName) &&
      validateName(motherName) &&
      (maritalStatus !== 'married' || (wifeName && validateName(wifeName))) &&
      (maritalStatus !== 'married' || (numChildren && validateChildren(numChildren)));

    setFormValid(isValid);
  }, [name, age, contact, email, gender, fatherName, motherName, maritalStatus, wifeName, numChildren]);

  return (
    <div className="add-patient-container pt-4">
      <form className="add-patient-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Add Patient</h1>

        {/* Display Alert Message */}
        {alertVisible && (
          <div className="alert alert-danger text-center" role="alert">
            {alertMessage}
          </div>
        )}

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter patient name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => {
                if (!validateName(name)) {
                  showAlert("Enter a valid name (only alphabets).");
                }
              }}
            />
          </div>
          <div className="col-md-6">
            <label>Age:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter patient age"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              onBlur={() => {
                if (!validateAge(age)) {
                  showAlert("Enter a valid age (only numbers).");
                }
              }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Contact:</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter contact number"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              onBlur={() => {
                if (!validateContact(contact)) {
                  showAlert("Enter a valid contact number (10 digits).");
                }
              }}
            />
          </div>
          <div className="col-md-6">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                if (!validateEmail(email)) {
                  showAlert("Enter a valid email.");
                }
              }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Gender:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter gender"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              onBlur={() => {
                if (!validateGender(gender)) {
                  showAlert("Enter a valid gender (only alphabets).");
                }
              }}
            />
          </div>
          <div className="col-md-6">
            <label>Father's Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter father's name"
              required
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Mother's Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter mother's name"
              required
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label>Marital Status:</label>
            <select
              className="form-control"
              value={maritalStatus}
              onChange={handleMaritalStatusChange}
              required
            >
              <option value="">Select marital status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
        </div>

        {isMarried && (
          <>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Wife's Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter wife's name"
                  value={wifeName}
                  onChange={(e) => setWifeName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Number of Children:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter number of children"
                  value={numChildren}
                  onChange={(e) => setNumChildren(e.target.value)}
                  onBlur={() => {
                    if (!validateChildren(numChildren)) {
                      showAlert("Enter a valid number for children.");
                    }
                  }}
                />
              </div>
            </div>
          </>
        )}

        {/* Submit button disabled if form is invalid */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!formValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPatient;
