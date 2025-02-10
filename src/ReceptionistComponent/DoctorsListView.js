import React from "react";

const DoctorsListView = ({ doctors, toggleDoctorStatus, deleteDoctor }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Specialization</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor) => (
          <tr key={doctor.id}>
            <td>{doctor.name}</td>
            <td>{doctor.specialization}</td>
            <td>
              <span
                className={`badge ${doctor.isEnabled ? "bg-success" : "bg-danger"}`}
              >
                {doctor.isEnabled ? "Enabled" : "Disabled"}
              </span>
            </td>
            <td>
              {/* Toggle the doctor status */}
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => toggleDoctorStatus(doctor.id)} // Ensure this triggers the status toggle
              >
                {doctor.isEnabled ? "Disable" : "Enable"} {/* Change button text based on status */}
              </button>

              {/* Delete button */}
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteDoctor(doctor.id)} // Delete the doctor
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DoctorsListView;
