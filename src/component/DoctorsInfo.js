import React, { useEffect, useState } from "react";
import AppServices from "../services/AppServices";
import "../DoctorCSS/DoctorInfo.css";

const EnabledDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Store the selected doctor's details
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Fetch doctors from the database
  const fetchDoctors = async () => {
    try {
      const data = await AppServices.getAllDoctors(); // Fetch from the backend
      setDoctors(data.filter((doctor) => doctor.status === "ENABLED"));
    } catch (error) {
      console.error("Error fetching doctors:", error);
      alert("Failed to fetch doctors' information.");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Open modal with selected doctor's details
  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Lock scroll when modal is open
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    document.body.style.overflow = "auto"; // Restore scroll when modal is closed
  };

  return (
    <div className="enabled-doctor-view mt-4">
      <div className="enabled-doctor-card-list">
      <div className="enabled-doctor-header"> 
          <h1>Our Doctors</h1>
        <p style={{fontFamily: "ui-rounded", fontWeight: "bold"}} className="mb-0">Meet our team of highly skilled and compassionate doctors, specializing in diverse fields to provide you with personalized and exceptional care.</p>
        </div>
        <div className="imagescard">
          
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
                      <button
                        className="btn btn-primary"
                        onClick={() => handleViewDetails(doctor)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Doctors are not Available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Doctor Details */}
      {isModalOpen && selectedDoctor && (
        <div
          id="modal-overlay"
          className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75"
          style={{ zIndex: "1050" }}
        >
          <div
            id="modal-content"
            className="modal-content bg-white rounded-3 p-4 position-relative"
            style={{ maxWidth: "500px" }}
          >
            <button
              id="modal-close-btn"
              className="btn-close position-absolute top-0 end-0 mt-2 me-2"
              aria-label="Close"
              onClick={closeModal}
            ></button>

            <div className="text-center">
              <img
                src={selectedDoctor.img || "default-doctor-img.jpg"}
                alt={selectedDoctor.name}
                className="rounded-circle mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h3>{selectedDoctor.name}</h3>

              {/* Displaying dynamically all available fields */}
              {Object.entries(selectedDoctor).map(([key, value]) => {
                // Skip displaying internal/technical fields like id or img
                if (key === "id" || key === "img" || key === "status") {
                  return null;
                }

                return (
                  <p key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnabledDoctors;