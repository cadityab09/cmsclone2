import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import AppServices from "../services/AppServices";

import "../DoctorCSS/EnabledDoctors.css"

const EnabledDoctors = () => {
  const [doctors, setDoctors] = useState([]);
    const [viewMode, setViewMode] = useState("card"); // "card" or "list"
  
    // Fetch doctors from the database
    const fetchDoctors = async () => {
      try {
        const data = await AppServices.getAllDoctors(); // Fetch from the backend
        setDoctors(data.filter((doctor)=>doctor.status=="ENABLED"));
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Failed to fetch doctors' information.");
      }
    };
  
    useEffect(() => {
      fetchDoctors();
    }, []);
  
    return (
      <div className="enabled-doctor-view">
        <div className="enabled-doctor-card-list">
          <h1>Our Doctors</h1>
      <div className="imagescard mt-4">
        <div className="enabled-doctor-list-container">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div className="enabled-doctor-list-item" key={doctor.id}>
                <div className="enabled-doctor-list-item-card">
                  <img
                    src={doctor.img || "default-doctor-img.jpg"}
                    className="card-img-top"
                    alt={doctor.name}
                  />
                  <div className="enabled-doctor-card-body">
                    <h5 className="card-title">{doctor.name}</h5>
                    <p className="card-text">( {doctor.specialties} )</p>
                    <a>view details</a>

                  </div>
                  <div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No Doctors Available.</p>
          )}
        </div>
      </div>
      </div>
      </div>
    );
};

export default EnabledDoctors;