import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import "../DoctorCSS/AddPatient.css"; // Custom CSS
import axios from "axios"; // For API requests

function ViewPatientdiseage() {
  const [patients, setPatients] = useState([]); // State to hold the list of patients
  const [searchName, setSearchName] = useState(""); // State for the search input for name
  const [searchMobile, setSearchMobile] = useState(""); // State for the search input for mobile
  const [searchDisease, setSearchDisease] = useState(""); // State for the search input for disease
  const [searchPayment, setSearchPayment] = useState(""); // State for the search input for payment
  const [searchDate, setSearchDate] = useState(""); // State for the search input for date
  const [errors, setErrors] = useState({}); // State for storing errors

  // Fetch the list of patients from the backend on mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Use the correct endpoint
        const response = await axios.get("http://localhost:8084/api/patientdisease");
        console.log(response.data);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Function to validate inputs
  const validateSearch = () => {
    const newErrors = {};

    // Name validation - only alphabetic characters and spaces allowed
    if (searchName && !/^[A-Za-z\s]*$/.test(searchName)) {
      newErrors.name = "Name can only contain letters and spaces.";
    }

    // Mobile validation - must be exactly 10 digits
    if (searchMobile && !/^\d{10}$/.test(searchMobile)) {
      newErrors.mobile = "Mobile number must be 10 digits and only numbers allowed.";
    }

    // Payment validation - must be a valid number
    if (searchPayment && isNaN(searchPayment)) {
      newErrors.payment = "Payment must be a valid number.";
    }

    // Date validation - must be a valid date
    if (searchDate && isNaN(Date.parse(searchDate))) {
      newErrors.date = "Date must be a valid date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Filter patients based on the search term for name, mobile, disease, payment, and date (ignoring time)
  const filteredPatients = patients.filter((patient) => {
    const patientDate = new Date(patient.dateTime).toLocaleDateString(); // Extract only the date part
    const searchDateOnly = searchDate ? new Date(searchDate).toLocaleDateString() : ""; // Extract only the date part from search input

    return (
      // Ensure that patient.name, patient.disease are not null or undefined before calling toLowerCase()
      (patient.name && patient.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (patient.mobile && patient.mobile.includes(searchMobile)) &&
      (patient.disease && patient.disease.toLowerCase().includes(searchDisease.toLowerCase())) &&
      (patient.payment && patient.payment.toString().includes(searchPayment)) &&
      (searchDateOnly ? patientDate === searchDateOnly : true) // Only filter by date if searchDate is provided
    );
  });

  // Handle search change and validate
  const handleSearchChange = () => {
    if (validateSearch()) {
      // Proceed with filtering if validation passes
      console.log("Validation successful");
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <div className="pt-4">
      <div className="patient-list">
        <h2 className="text-center">Disease Patients List</h2>

        {/* Search Bars for Name, Mobile, Disease, Payment, Date in One Row */}
        <div className="view-patient-disease-form">
          <div className="view-disease-search">
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
                handleSearchChange(); // Validate while typing
              }}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="view-disease-search">
            <input
              type="text"
              className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
              placeholder="Search by mobile number"
              value={searchMobile}
              onChange={(e) => {
                setSearchMobile(e.target.value);
                handleSearchChange(); // Validate while typing
              }}
            />
            {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
          </div>
          <div className="view-disease-search">
            <input
              type="text"
              className="form-control"
              placeholder="Search by disease"
              value={searchDisease}
              onChange={(e) => {
                setSearchDisease(e.target.value);
                handleSearchChange(); // Validate while typing
              }}
            />
          </div>
          <div className="view-disease-search">
            <input
              type="text"
              className={`form-control ${errors.payment ? 'is-invalid' : ''}`}
              placeholder="Search by payment"
              value={searchPayment}
              onChange={(e) => {
                setSearchPayment(e.target.value);
                handleSearchChange(); // Validate while typing
              }}
            />
            {errors.payment && <div className="invalid-feedback">{errors.payment}</div>}
          </div>
          <div className="view-disease-search">
            <input
              type="date"
              className={`form-control ${errors.date ? 'is-invalid' : ''}`}
              placeholder="Search by date"
              value={searchDate}
              onChange={(e) => {
                setSearchDate(e.target.value);
                handleSearchChange(); // Validate while typing
              }}
            />
            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
          </div>
        </div>

        {filteredPatients.length === 0 ? (
          <p className="text-center">No patients found.</p>
        ) : (
          <div className="view-disease-table-container">
                      <table className="table table-bordered table-striped view-disease-table">
            <thead>
              <tr>
                <th>ID</th> {/* Added column for ID */}
                <th>Name</th>
                <th>Mobile</th>
                <th>Disease</th>
                <th>Payment</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.id}</td> {/* Render ID in the table */}
                  <td>{patient.name}</td>
                  <td>{patient.mobile}</td>
                  <td>{patient.disease}</td>
                  <td>{patient.payment}</td>
                  <td>{new Date(patient.dateTime).toLocaleString()}</td> {/* Display date and time */}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewPatientdiseage;