import React, { useEffect, useState } from "react";
import axios from "axios";
import "../DoctorCSS/AllPatients.css";
import UserStorageService from "../services/UserStorageService";

function AllPatients() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nameQuery, setNameQuery] = useState("");
  const [contactQuery, setContactQuery] = useState("");
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8084/api/patients");
        setPatients(response.data);
        setFilteredPatients(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch patients");
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
        patient.contact.toLowerCase().includes(contactQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [nameQuery, contactQuery, patients]);

  const handleDelete = async (patientId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    
    if (confirmDelete) {
      try {
        // Make API request to delete patient from the database
        await axios.delete(`http://localhost:8084/api/patients/${patientId}`, {
          headers: {
            Authorization: `Bearer ${UserStorageService.getToken()}`,
            "Content-Type": "application/json"
          }
        });

        // Update the state to remove the deleted patient from both lists (patients and filteredPatients)
        const updatedPatients = patients.filter((patient) => patient.id !== patientId);
        setPatients(updatedPatients);
        setFilteredPatients(updatedPatients);  // Ensure both are updated
      } catch (error) {
        alert("Failed to delete patient");
      }
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient); // Set the patient to be edited
  };

  const handleUpdate = (updatedPatient) => {
    setPatients(
      patients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
    setFilteredPatients(
      filteredPatients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
    setEditingPatient(null); // Close the modal
  };

  const closeModal = () => {
    setEditingPatient(null); // Close the modal
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="all-patient-view">
      <div className="all-patients-container mt-4">
        <h1>All Patients</h1>

        <div className="search-boxes mb-3 d-flex gap-2">
          <input
            type="text"
            placeholder="Search by Name"
            className="form-control"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Contact"
            className="form-control"
            value={contactQuery}
            onChange={(e) => setContactQuery(e.target.value)}
          />
        </div>

        <div className="patients-table p-2">
          <table border="2px" className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Contact</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Marital Status</th>
                <th>Family Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.contact}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.email}</td>
                  <td>{patient.maritalStatus}</td>
                  <td>
                    {patient.wifeName ? (
                      <p>Wife: {patient.wifeName}</p>
                    ) : (
                      <p>No wife</p>
                    )}
                    {/* {Array.isArray(patient.childrenNames) && patient.childrenNames.length > 0 ? (
                      <div>
                        <p>Children:</p>
                        <ul>
                          {patient.childrenNames.map((child, index) => (
                            <li key={index}>{child}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p>No children</p>
                    )} */}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(patient)}
                      >
                        Edit
                      </button>
                      {/* <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(patient.id)}
                      >
                        Delete
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render the Patient Edit popup form if editingPatient is set */}
      {editingPatient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="close-btn">X</button>
            <h2>Edit Patient Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingPatient); // Submit the updated patient details
              }}
            >
              <div className="form-group d-flex justify-content-between">
                <div className="d-flex flex-column">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={editingPatient.name}
                    onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="d-flex flex-column">
                  <label>Age:</label>
                  <input
                    type="number"
                    value={editingPatient.age}
                    onChange={(e) => setEditingPatient({ ...editingPatient, age: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="d-flex flex-column">
                  <label>Contact:</label>
                  <input
                    type="text"
                    value={editingPatient.contact}
                    onChange={(e) => setEditingPatient({ ...editingPatient, contact: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="form-group d-flex justify-content-between">
                <div className="d-flex flex-column">
                  <label>Gender:</label>
                  <input
                    type="text"
                    value={editingPatient.gender}
                    onChange={(e) => setEditingPatient({ ...editingPatient, gender: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="d-flex flex-column">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={editingPatient.email}
                    onChange={(e) => setEditingPatient({ ...editingPatient, email: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="d-flex flex-column">
                  <label>Marital Status:</label>
                  <select
                    value={editingPatient.maritalStatus}
                    onChange={(e) => setEditingPatient({ ...editingPatient, maritalStatus: e.target.value })}
                    className="form-control"
                    required
                  >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Wife's Name (if married):</label>
                <input
                  type="text"
                  value={editingPatient.wifeName || ""}
                  onChange={(e) => setEditingPatient({ ...editingPatient, wifeName: e.target.value })}
                  className="form-control"
                  disabled={editingPatient.maritalStatus !== "married"}
                />
              </div>

              <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPatients;