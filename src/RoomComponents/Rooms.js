import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./room.css";

const Room = ({ bed, openModal, handleDischarge }) => {
  const isOccupied = bed.patient && bed.patient.trim() !== ""; // Updated check for status

  // const [bed, setBe]

  return (
    <div className="room-card-col">
      <div
        className={`card clinic-card ${
          isOccupied ? "bg-danger text-white" : "bg-light"
        }`}
      >
        <div className="card-body">
          <h5 className="card-title clinic-title">Bed {bed.id}</h5>
          <p className="card-text">Status: {isOccupied ? "Occupied" : "Available"}</p>
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
          {!isOccupied ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => openModal(bed.id)}
            >
              Assign Patient
            </button>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleDischarge(bed.id)}
            >
              Discharge Patient
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ClinicRoomManagement = () => {
  const [beds, setBeds] = useState([]);
  const [modalData, setModalData] = useState({
    show: false,
    id: null,
    patientName: "",
    patientAddress: "",
    patientProblem: "",
    mobileNumber: "",
  });

  // Fetch bed data from the database
  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const response = await axios.get("http://localhost:8084/api/beds");
        const updatedBeds = response.data.map((bed) => ({
          ...bed,
          status: bed.patient && bed.patient.trim() !== "" ? "Occupied" : "Available",
        }));
        setBeds(updatedBeds);
      } catch (error) {
        console.error("Error fetching bed data:", error);
        alert("Failed to load bed data.");
      }
    };

    fetchBeds();
  }, []);

  const openModal = (id) => {
    setModalData({
      show: true,
      id,
      patientName: "",
      patientAddress: "",
      patientProblem: "",
      mobileNumber: "",
    });
  };

  const closeModal = () => {
    setModalData({
      show: false,
      id: null,
      patientName: "",
      patientAddress: "",
      patientProblem: "",
      mobileNumber: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { id, patientName, patientAddress, patientProblem, mobileNumber } =
      modalData;

    if (patientName && patientAddress && patientProblem && mobileNumber) {
      try {
        const response = await axios.post("http://localhost:8084/api/beds/assign", {
          id,
          patientName,
          patientAddress,
          patientProblem,
          mobileNumber,
        });

        setBeds((prevBeds) =>
          prevBeds.map((bed) =>
            bed.id === id
              ? {
                  ...bed,
                  status: "Occupied",
                  patient: patientName,
                  address: patientAddress,
                  problem: patientProblem,
                  mobileNumber,
                  occupiedTime: response.data.occupiedTime,
                }
              : bed
          )
        );
        alert("Patient assigned successfully!");
      } catch (error) {
        console.error("Error assigning patient:", error);
        alert("Failed to assign patient. Please try again.");
      }
      closeModal();
    }
  };

  const handleDischarge = async (id) => {
    try {
      await axios.post("http://localhost:8084/api/beds/discharge", { id });
      setBeds((prevBeds) =>
        prevBeds.map((bed) =>
          bed.id === id
            ? {
                ...bed,
                status: "Available",
                patient: "",
                address: "",
                problem: "",
                mobileNumber: "",
                dischargeTime: new Date().toLocaleString(),
              }
            : bed
        )
      );
      alert("Patient discharged successfully!");
    } catch (error) {
      console.error("Error discharging patient:", error);
      alert("Failed to discharge patient. Please try again.");
    }
  };

  return (
    <div className="py-5">
      <div className="container px-3">
        <div className="rooms-card-list g-3">
          {beds.map((bed) => (
            <Room
              key={bed.id}
              bed={bed}
              openModal={openModal}
              handleDischarge={handleDischarge}
            />
          ))}
        </div>

        {modalData.show && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Assign Patient to Bed {modalData.id}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={handleFormSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="patientName" className="form-label">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="patientName"
                        name="patientName"
                        value={modalData.patientName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="patientAddress" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="patientAddress"
                        name="patientAddress"
                        value={modalData.patientAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="patientProblem" className="form-label">
                        Problem
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="patientProblem"
                        name="patientProblem"
                        value={modalData.patientProblem}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobileNumber" className="form-label">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={modalData.mobileNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicRoomManagement;
