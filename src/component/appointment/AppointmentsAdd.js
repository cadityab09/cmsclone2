import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../appointment/appoinmentsCSS/AppoinmentAdd.css"; // Custom styles

const AppointmentsAdd = () => {
  const [formData, setFormData] = useState({
    title: "",
    dateTime: "",
    description: "",
    mobileNumber: "",
    doctor: "",
  });

  const [doctorsList, setDoctorsList] = useState([]);
  const navigate = useNavigate();

  // Dummy doctor data
  useEffect(() => {
    const dummyDoctors = [
      { id: 1, name: "Dr. John Doe", specialties: "Cardiology" },
      { id: 2, name: "Dr. Jane Smith", specialties: "Dermatology" },
      { id: 3, name: "Dr. Mark Lee", specialties: "Neurology" },
      { id: 4, name: "Dr. Emily Davis", specialties: "Pediatrics" },
      { id: 5, name: "Dr. Robert Brown", specialties: "Orthopedics" },
    ];
    setDoctorsList(dummyDoctors);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveAppointment = async (e) => {
    e.preventDefault();

    // Assuming your backend API endpoint is as follows:
    const apiUrl = "http://localhost:8084/api/appointments";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Appointment saved successfully:", result);
        navigate("/DoctorDashboard"); // Redirect after successful submission
      } else {
        console.error("Failed to save appointment:", response.statusText);
        alert("Error: Could not save appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("Error: Could not connect to the server. Please try again later.");
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5">Add Appointment</h1>
      <div className="appointments-add-container">
        <div className="card-container">
          <div className="form-card-body">
            <form className="appointments-add-form" onSubmit={saveAppointment}>
              {/* Name Input */}
              <div className="form-group mb-3">
                <label htmlFor="title" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  placeholder="Enter patient name"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Date and Time Input */}
              <div className="form-group mb-3">
                <label htmlFor="dateTime" className="form-label">
                  Date and Time:
                </label>
                <input
                  type="datetime-local"
                  id="dateTime"
                  name="dateTime"
                  className="form-control"
                  value={formData.dateTime}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Description Input */}
              <div className="form-group mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Enter reason for the appointment"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* Mobile Number Input */}
              <div className="form-group mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                  Mobile Number:
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="form-control"
                  placeholder="Enter contact number"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Doctor Selection */}
              <div className="form-group mb-3">
                <label htmlFor="doctor" className="form-label">
                  Select Doctor:
                </label>
                <select
                  id="doctor"
                  name="doctor"
                  className="form-control"
                  value={formData.doctor}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select Doctor --</option>
                  {doctorsList.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name} ({doctor.specialties})
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <Link to="/DoctorDashboard" className="btn btn-danger">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsAdd;