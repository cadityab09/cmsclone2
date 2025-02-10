


import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./room.css";
import AppServices from "../services/AppServices";

const Room = ({ bed, openModal, handleDischarge }) => {
  return (
    <div className="room-card-col ">
      <div
        className={`card clinic-card ${bed.status === "AVAILABLE" ? "bg-light" : "bg-green text-white"
          }`}
      >
        <div className="card-body">
          <h5 className="card-title clinic-title">Bed {bed.bedId}</h5>
          <p className="card-text">Status: <b>{bed.status}</b></p>
          {bed.status === "UNAVAILABLE" ? (
            <>
              <p className="card-text">Patient: {bed.patientName}</p>
              <p className="card-text">Problem: {bed.patientProblem}</p>
              <p className="card-text">Mobile Number: {bed.mobileNumber}</p>
              <p className="card-text">Occupied Time: {bed.assignedAt}</p>
            </>
          ): 
          <>
            <div className="" style={{marginTop: "64px"}}>
              <i className="fa-solid fa-bed"  style={{fontSize: "100px",    color: "#d5d2fa"}}></i>
            </div>
          </>
          }
        </div>
        <div className="card-footer">
          {bed.status === "AVAILABLE" ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => openModal(bed)}
            >
              Assign Patient
            </button>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleDischarge(bed)}
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

  const fetchBeds = async () => {
    try {
      const response = await axios.get(AppServices.getUrl() + `/beds/status`, { headers: AppServices.getHeaders() });
      const data = await response.data;
      console.log(data);
      return data; // Assume the API returns a structure like { beds: [...] }
    } catch (error) {
      console.error("Error fetching beds:", error);
      return []; // Return empty array in case of error
    }
  };

  // const [beds, setBeds] = useState(
  //   Array.from({ length: 40 }, (_, index) => ({
  //     bedId: index + 1,
  //     status: "Available",
  //     patient: "",
  //     problem: "",
  //     mobileNumber: "",
  //     assignedAt: null,
  //     dischargeTime: null,
  //   }))
  // );

  const [beds, setBeds] = useState([]);

  useEffect(() => {
    // Fetch and set the data
    const getBedsData = async () => {
      const bedsData = await fetchBeds();
      setBeds(bedsData);
    };

    getBedsData();
  }, []);

  const [modalData, setModalData] = useState({
    show: false,
    bedId: null,
    patientId: null,
    patientName: "",
    patientProblem: "",
    mobileNumber: "",
    assignedAt: "",
    patientFound: false,
    patientSelected: false,
  });

  const openModal = (bed) => {
    setModalData({
      show: true,
      bedId: bed.bedId,
      patientId: null,
      patientName: "",
      patientProblem: "",
      mobileNumber: "",
      assignedAt: "", // Automatically assign the current time
    });
  };


  const searchPatient = async () => {
    // Simulate API call to search patient by ID
    try {
      const patient = await (await axios.get(AppServices.getUrl() + `/patients/${modalData.patientId}`, { headers: AppServices.getHeaders() })).data;

      console.log(patient);

      if (patient) {
        setModalData((prevData) => ({
          ...prevData,
          patientName: patient.name,
          // patientProblem: patient.patientProblem,
          patientFound: true,
        }));
      } else {
        alert("Patient not found!");
      }
    } catch (error) {
      alert("Error: " + error);
    }
  };

  const selectPatient = () => {
    setModalData((prevData) => ({
      ...prevData,
      patientSelected: true,
      patientFound: false, // Hide search section
    }));
  };

  const closeModal = () => {
    setModalData({
      show: false,
      bedId: null,
      patientName: "",
      patientProblem: "",
      mobileNumber: "",
      assignedAt: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { bedId, patientId, assignedDate, assignedAt, patientName, patientProblem } = modalData;

    console.log(modalData)
    try {
      // API call to save patient data in the database
      const response = await axios.post(AppServices.getUrl() + "/beds/assign", {
        bedId,
        patientId,
        patientName,
        assignedAt, // Send the assignedAt automatically
        patientProblem
      }, { headers: AppServices.getHeaders() });

      // Update the UI after successful API call
      console.log(response.data);
      setBeds((prevBeds) =>
        prevBeds.map((bed) =>
          bed.bedId === bedId
            ? response.data
            : bed
        )
      );
      alert("Patient assigned successfully!");
      closeModal();
    } catch (error) {
      console.error("Error assigning patient:", error);
      alert("Failed to assign patient. Please try again.");
    }
  };

  const handleDischarge = async (bed) => {
    try {
      // API call to update the bed status to available in the database
      console.log(bed);
      // Update UI after successful discharge
      const data = (await axios.post(AppServices.getUrl() + "/beds/discharge", bed, { headers: AppServices.getHeaders() })).data;
      // setBeds(data);
      setBeds((prevBeds) =>
        prevBeds.map((bed1) =>
          bed1.bedId === bed.bedId
            ? data
            : bed1
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
      <div className="px-3">
        <div className="rooms-card-list g-3">
          {beds.map((bed) => (
            <Room
              key={bed.bedId}
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
                  <p className="modal-title">Assign Patient to Bed {modalData.bedId}</p>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={handleFormSubmit}>
                  <div className="modal-body">
                    {/* Search section: Hidden after selection */}
                    {!modalData.patientSelected && (
                      <div className="mb-3">
                        <label htmlFor="patientId" className="form-label">
                          Search Patient by ID
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="patientId"
                            name="patientId"
                            value={modalData.patientId || ""}
                            onChange={handleInputChange}
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={searchPatient}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Show patient details if found */}
                    {modalData.patientFound && (
                      <div
                        className={`mb-3 p-2 border ${modalData.patientSelected ? "bg-success text-white" : "bg-light"
                          }`}
                        style={{ cursor: modalData.patientSelected ? "default" : "pointer" }}
                        onClick={!modalData.patientSelected ? selectPatient : undefined}
                      >
                        <strong>Patient Name:</strong> {modalData.patientName}
                        {!modalData.patientSelected && (
                          <button
                            type="button"
                            className="btn btn-sm btn-primary ms-3"
                            onClick={selectPatient}
                          >
                            Select
                          </button>
                        )}
                      </div>
                    )}

                    {/* Show patient details before occupied time input */}
                    {modalData.patientSelected && (
                      <div className="mb-3">
                        <div className="selected-patient-modal-card">
                          <div className="selected-patient-modal-card-body">
                            <h5 className="selected-patient-modal-card-title">Patient Details</h5>
                            <table className="selected-patient-table">
                              <tbody>
                                <tr>
                                  <td className="selected-patient-modal-card-text">
                                    <strong>Patient ID:</strong>
                                  </td>
                                  <td className="selected-patient-modal-card-text">
                                    {modalData.patientId}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="selected-patient-modal-card-text">
                                    <strong>Patient Name:</strong>
                                  </td>
                                  <td className="selected-patient-modal-card-text">
                                    {modalData.patientName}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}



                    {/* Show occupied time input after patient selection */}
                    {modalData.patientSelected && (
                      <div className="mb-3">
                        <label htmlFor="patientProblem" className="form-label">
                          Disease/Problem
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="patientProblem"
                          name="patientProblem"
                          value={modalData.patientProblem || ""}
                          onChange={handleInputChange}
                          placeholder={modalData.patientProblem || "Enter or select disease"}
                          required
                        />
                        <label htmlFor="assignedAt" className="form-label">
                          Occupied Time
                        </label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          id="assignedAt"
                          name="assignedAt"
                          value={modalData.assignedAt || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    {modalData.patientSelected && (
                      <button type="submit" className="btn btn-primary">
                        Assign Patient
                      </button>
                    )}
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
