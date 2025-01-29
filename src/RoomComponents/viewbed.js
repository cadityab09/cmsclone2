import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./room.css";

const Room = ({ bed, openModal, handleDischarge }) => {
  // Check if the bed is occupied
  const isOccupied = bed.patient && bed.patient.trim() !== ""; // Determine if patient exists for this bed

  return (
    <div className="col d-flex justify-content-center">
      <div
        className={`card clinic-card ${
          isOccupied ? "bg-danger text-white" : "bg-light"
        }`}
      >
        <div className="card-body">
          <h5 className="card-title clinic-title">Bed {bed.id}</h5>
          <p className="card-text">Status: {isOccupied ? "Occupied" : "Available"}</p>
          
          {/* Display patient details if the bed is occupied */}
          {isOccupied && (
            <>
              <p className="card-text">Patient: {bed.patient}</p>
              <p className="card-text">Address: {bed.address}</p>
              <p className="card-text">Problem: {bed.problem}</p>
              <p className="card-text">Mobile Number: {bed.mobileNumber}</p>
              <p className="card-text">Occupied Time: {bed.occupiedTime}</p>
            </>
          )}
        </div>
        <div className="card-footer">
          {/* Show "Assign Patient" button if the bed is available */}
          {!isOccupied ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => openModal(bed.id)} // Open modal to assign a patient
            >
              Assign Patient
            </button>
          ) : (
            // Show "Discharge Patient" button if the bed is occupied
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleDischarge(bed.id)} // Handle patient discharge
            >
              Discharge Patient
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
