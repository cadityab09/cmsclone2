import React, { useEffect, useState } from 'react';
import '../DoctorCSS/DashboardOverview.css';
import axios from 'axios';  // Import axios for HTTP requests

function DashboardOverview() {
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0); // New state for patients count

  useEffect(() => {
    // Fetch live appointments data when the component mounts
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/appointments");  // Update with correct endpoint
        if (response && response.data) {
          setAppointmentsCount(response.data.length);  // Update the count based on API response
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();

    // Fetch the number of patients registered
    const fetchPatientsCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/dashboard/patients-count");  // Fetch patients count
        if (response && response.data) {
          setPatientsCount(response.data);  // Update patients count
        }
      } catch (err) {
        console.error("Error fetching patients count:", err);
      }
    };

    fetchPatientsCount();  // Fetch patients count on component mount

    // New effect to fetch appointments count specifically
    const fetchAppointmentsCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/dashboard/appointments-count");  // New endpoint for appointments count
        if (response && response.data) {
          setAppointmentsCount(response.data.count);  // Assuming response has the count property
        }
      } catch (err) {
        console.error("Error fetching appointments count:", err);
      }
    };

    fetchAppointmentsCount();  // Fetch total appointments count on component mount
  }, []);  // Empty dependency array to run the effect only once after mount

  return (
    <div className="dashboard-overview">
      <h1 className="dashboard-title">Dashboard Overview</h1>
      <p className="dashboard-welcome">Welcome to the Receptionist Dashboard!</p>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2 className="stat-number">{patientsCount}</h2> {/* Display the dynamic patients count */}
          <p className="stat-label">Patients Registered</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-number">{appointmentsCount}</h2>
          <p className="stat-label">Appointments</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-number">5</h2>
          <p className="stat-label">Pending Approvals</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
