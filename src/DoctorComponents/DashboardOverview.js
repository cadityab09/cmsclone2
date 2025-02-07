import React, { useEffect, useState } from "react";
import "../DoctorCSS/DashboardOverview.css";
import axios from "axios";
import AppServices from "../services/AppServices";

function DashboardOverview() {
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0); // State to store the count of registered patients

  useEffect(() => {
    // Fetch the total number of appointments
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          AppServices.getUrl()+"/appointments"
        , {headers: AppServices.getHeaders()}); // Update with your endpoint
        if (response && response.data) {
          setAppointmentsCount(response.data.length); // Assuming response.data is an array of appointments
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();

    // Fetch the total number of patients registered
    const fetchPatientsCount = async () => {
      try {
        const response = await axios.get(
          AppServices.getUrl()+
          "/patients",{headers: AppServices.getHeaders()}
        ); // Update with your endpoint
        if (response && Array.isArray(response.data)) {
          setPatientsCount(response.data.length); // Assuming response.data is an array of patients
        } else {
          console.error(
            "Unexpected response format for patients:",
            response.data
          );
        }
      } catch (err) {
        console.error("Error fetching patients count:", err);
      }
    };

    fetchPatientsCount();

    // WebSocket connection for real-time updates
    const socket = new WebSocket("ws://localhost:8084/live-updates");

    socket.onopen = () => {
      console.log("WebSocket connection established for live updates.");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "patientsCount") {
        setPatientsCount(data.count); // Update patients count live
      }
      if (data.type === "appointmentsCount") {
        setAppointmentsCount(data.count); // Update appointments count live
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array to run the effect only once after mount

  return (
    <div className="dashboard-overview">
      <h1 className="dashboard-title">Dashboard Overview</h1>
      <p className="dashboard-welcome">Welcome to the Receptionist Dashboard!</p>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2 className="stat-number">{patientsCount}</h2>
          <p className="stat-label">Patients Registered</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-number">{appointmentsCount}</h2>
          <p className="stat-label">Pending Appointments</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-number">0</h2>
          <p className="stat-label">Approvals</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
