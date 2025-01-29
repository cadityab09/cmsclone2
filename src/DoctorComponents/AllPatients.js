import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientEdit from "./PatientEdit"; // Import PatientEdit
import "../DoctorCSS/AllPatients.css";

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
    try {
      await axios.delete(`http://localhost:8084/api/patients/${patientId}`);
      setPatients(patients.filter((patient) => patient.id !== patientId));
      setFilteredPatients(filteredPatients.filter((patient) => patient.id !== patientId));
    } catch (error) {
      alert("Failed to delete patient");
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
                    {Array.isArray(patient.childrenNames) && patient.childrenNames.length > 0 ? (
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
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(patient)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(patient.id)}
                      >
                        Delete
                      </button>
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

      {/* Render the PatientEdit modal outside the table */}
      {editingPatient && (
        <PatientEdit
          patient={editingPatient}
          onClose={closeModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default AllPatients;
