import React from "react";

const DoctorsCardView = ({ doctors, toggleDoctorStatus }) => {
  return (
    <div className="row">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="col-md-4 my-3">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">{doctor.name}</h5>
              <p className="card-text">Specialization: {doctor.specialization}</p>
              <p className="card-text">
                Status:{" "}
                <span
                  className={`badge ${doctor.isEnabled ? "bg-success" : "bg-danger"}`}
                >
                  {doctor.isEnabled ? "Enabled" : "Disabled"}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorsCardView;
