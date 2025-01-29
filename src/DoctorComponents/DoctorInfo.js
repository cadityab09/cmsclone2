import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../DoctorCSS/DoctorInfo.css";
import AppServices from "../services/AppServices";

const DoctorsInfo = () => {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editDoctorData, setEditDoctorData] = useState({
    id: "",
    name: "",
    specialties: "",
    days: [],
    inTime: "",
    outTime: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await AppServices.getAllDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Failed to fetch doctors' information.");
      }
    };

    fetchDoctors();
  }, []);

  const enabledDoctors = doctors.filter((doctor) => doctor.isEnabled);

  const toggleDoctorStatus = (id) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.id === id ? { ...doctor, isEnabled: !doctor.isEnabled } : doctor
    );
    setDoctors(updatedDoctors);
  };

  const deleteDoctor = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await AppServices.deleteDoctor(id); // Replace with your API call to delete
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
      } catch (error) {
        console.error("Error deleting doctor:", error);
        alert("Failed to delete doctor.");
      }
    }
  };

  const openEditModal = (doctor) => {
    setEditDoctorData({
      ...doctor,
      days: Array.isArray(doctor.days) ? doctor.days : doctor.days.split(", "),
    });
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditDoctorData({
      ...editDoctorData,
      [name]: value,
    });
  };

  const handleEditFormSubmit = async () => {
    try {
      // Replace with your API call to update doctor info
      const updatedDoctor = await AppServices.updateDoctor(editDoctorData.id, {
        ...editDoctorData,
        days: editDoctorData.days,
      });

      setDoctors(
        doctors.map((doctor) =>
          doctor.id === updatedDoctor.id ? updatedDoctor : doctor
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Failed to update doctor.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center px-3 px-lg-5 pt-5">
      <div className="text-center">
        <h1 className="display-4">Our Doctors</h1>
        <p className="mt-2">
          Manage the doctors' availability and explore detailed information about them.
        </p>
      </div>

      <div className="imagescard mt-4">
        <div className="row">
          {enabledDoctors.length > 0 ? (
            enabledDoctors.map((doctor) => (
              <div className="col-lg-4 col-md-6 mb-4" key={doctor.id}>
                <div className="card h-100">
                  <img
                    src={doctor.img || "default-doctor-img.jpg"}
                    className="card-img-top"
                    alt={doctor.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{doctor.name}</h5>
                    <p className="card-text">{doctor.specialties}</p>
                    <p>
                      <strong>Availability:</strong> {doctor.days.join(", ")}
                    </p>
                    <p>
                      <strong>Working Hours:</strong> {doctor.inTime} - {doctor.outTime}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No doctors enabled.</p>
          )}
        </div>
      </div>

      <div className="doctors-table mt-5">
        <h3 className="mb-3">Doctors Information</h3>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Working Days</th>
              <th>Working Hours</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <tr key={doctor.id}>
                  <td>{index + 1}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialties}</td>
                  <td>{doctor.days.join(", ")}</td>
                  <td>
                    {doctor.inTime} - {doctor.outTime}
                  </td>
                  <td>
                    <button
                      className={`btn ${
                        doctor.isEnabled ? "btn-success" : "btn-danger"
                      } btn-sm`}
                      onClick={() => toggleDoctorStatus(doctor.id)}
                    >
                      {doctor.isEnabled ? "Disable" : "Enable"}
                    </button>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => openEditModal(doctor)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteDoctor(doctor.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No doctors available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing Doctor */}
      <Modal show={showModal} onHide={closeEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Doctor Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editDoctorData.name}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Specialty</Form.Label>
              <Form.Control
                type="text"
                name="specialties"
                value={editDoctorData.specialties}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Working Days</Form.Label>
              <Form.Control
                type="text"
                name="days"
                value={editDoctorData.days.join(", ")}
                onChange={(e) =>
                  setEditDoctorData({
                    ...editDoctorData,
                    days: e.target.value.split(", "),
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Working Hours</Form.Label>
              <Form.Control
                type="text"
                name="inTime"
                value={editDoctorData.inTime}
                onChange={handleEditFormChange}
                placeholder="Start Time"
              />
              <Form.Control
                type="text"
                name="outTime"
                className="mt-2"
                value={editDoctorData.outTime}
                onChange={handleEditFormChange}
                placeholder="End Time"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditFormSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorsInfo;
