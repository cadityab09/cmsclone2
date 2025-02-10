import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import "../DoctorCSS/AddPatient.css"; // Custom CSS
import axios from 'axios'; // For API requests
import AppServices from '../services/AppServices';

function AddPatientDisease() {
  const [patients, setPatients] = useState([]); // State to hold the patients
  const [filteredPatients, setFilteredPatients] = useState([]); // Filtered patients based on search
  const [selectedPatientId, setSelectedPatientId] = useState(''); // Selected patient ID
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [disease, setDisease] = useState('');
  const [payment, setPayment] = useState('');
  const [dateTime, setDateTime] = useState('');

  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [formValid, setFormValid] = useState(false);

  // Validation functions
  const validateDisease = (disease) => /^[a-zA-Z\s]+$/.test(disease);
  const validatePayment = (payment) => /^[0-9]+$/.test(payment);
  const validateDateTime = (dateTime) => !isNaN(Date.parse(dateTime));

  // Function to show alert with an error message
  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);

    // Hide alert after 2 seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  // Fetch patients from the database when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(AppServices.getUrl()+'/patients', {headers: AppServices.getHeaders()});
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  // Filter patients by name as the user types
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setName(query); // Update the search input

    if (query) {
      const filtered = patients.filter((patient) =>
        patient.name.toLowerCase().includes(query)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients([]); // Clear filtered list when input is empty
    }
  };

  // Auto-select patient and fill in their details when an option is selected
  const handleSelectPatient = (patient) => {
    setSelectedPatientId(patient.id);
    setName(patient.name); // Auto-fill name field
    setMobile(patient.contact || patient.mobile); // Auto-fill mobile field
    setFilteredPatients([]); // Clear the suggestion list

    // Re-run validation to prevent errors after selection
    setFormValid(
      patient.id &&
      validateDisease(disease) &&
      validatePayment(payment) &&
      validateDateTime(dateTime)
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the required data is present
    if (!selectedPatientId || !disease || !payment || !dateTime) {
      showAlert('Please fill out all the fields before submitting.');
      return;
    }

    const patientData = {
      patientId: selectedPatientId,
      disease,
      payment: Number(payment),
      dateTime: new Date(dateTime).toISOString(), // Ensure correct date format
      name: name, // Add name
      mobile: mobile, // Add mobile
    };

    console.log("Patient Data Being Sent:", patientData); // Debugging log

    try {
      const response = await axios.post(AppServices.getUrl()+'/patientdisease', patientData,  {headers: AppServices.getHeaders()});

      console.log('Patient disease added:', response.data);
      setAlertMessage('Patient disease added successfully!');
      setAlertVisible(true);
    } catch (error) {
      console.error('Error adding patient disease:', error);
      showAlert('Error adding patient disease.');
    }
  };

  // Check form validity
  useEffect(() => {
    const isValid =
      selectedPatientId &&
      validateDisease(disease) &&
      validatePayment(payment) &&
      validateDateTime(dateTime);

    setFormValid(isValid);
  }, [selectedPatientId, disease, payment, dateTime]);

  return (
    <div className="add-patient-container pt-4">
      <form className="add-patient-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Add Patient Disease</h1>

        {/* Alert Message */}
        {alertVisible && (
          <div className="alert alert-danger text-center" role="alert">
            {alertMessage}
          </div>
        )}

        {/* Search and Select Patient */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Enter Name & select patient:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search patient by name"
              value={name}
              onChange={handleSearch}
            />
            {/* Show filtered patients as a dropdown */}
            {filteredPatients.length > 0 ? (
              <div className="dropdown-menu show mt-2 w-100">
                {filteredPatients.map((patient) => (
                  <span
                    key={patient.id}
                    className="dropdown-item"
                    onClick={() => handleSelectPatient(patient)}
                  >
                    {patient.name} (ID: {patient.id})
                  </span>
                ))}
              </div>
            ) : name && !selectedPatientId && (
              <div className="dropdown-menu show mt-2 w-100">
                <p className="dropdown-item">No patients found</p>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <label>Mobile:</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Mobile number"
              value={mobile}
              readOnly
            />
          </div>
        </div>

        {/* Disease and Payment */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Disease:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter disease"
              required
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              onBlur={() => {
                if (!validateDisease(disease)) {
                  showAlert('Enter a valid disease (only alphabets).');
                }
              }}
            />
          </div>
          <div className="col-md-6">
            <label>Payment:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter payment amount"
              required
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              onBlur={() => {
                if (!validatePayment(payment)) {
                  showAlert('Enter a valid payment amount (only numbers).');
                }
              }}
            />
          </div>
        </div>

        {/* Date and Time */}
        <div className="row mb-3">
          <div className="col-md-12">
            <label>Date and Time:</label>
            <input
              type="datetime-local"
              className="form-control"
              required
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              onBlur={() => {
                if (!validateDateTime(dateTime)) {
                  showAlert('Enter a valid date and time.');
                }
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
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

export default AddPatientDisease;