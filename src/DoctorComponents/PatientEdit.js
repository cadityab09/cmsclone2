import React, { useState, useEffect } from "react";
import '../DoctorCSS/PatientEdit.css'

function PatientEdit({ patient, onClose, onUpdate }) {
  const [editedPatient, setEditedPatient] = useState({ ...patient });

  useEffect(() => {
    setEditedPatient({ ...patient });
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedPatient);
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>Edit Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-header patient-edit-form-content">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedPatient.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modal-body">
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={editedPatient.age}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modal-body">
            <label>
              Contact:
              <input
                type="text"
                name="contact"
                value={editedPatient.contact}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modal-body">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editedPatient.email}
                onChange={handleChange}
              />
            </label>
          </div>
          {/* Add other fields as necessary */}
          <div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientEdit;
