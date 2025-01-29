import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppServices from "../../services/AppServices";
import '../appointment/appoinmentsCSS/AppointmentUpdate.css';

const EditAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    title: "",
    dateTime: "",
    description: "",
  });

  useEffect(() => {
    AppServices.getAppointmentById(id)
      .then((response) => {
        // Format the dateTime value for the datetime-local input
        const formattedDateTime = new Date(response.dateTime).toISOString().slice(0, 16);
        setAppointment({ ...response, dateTime: formattedDateTime });
      })
      .catch((error) => {
        console.error("Error fetching appointment details:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the dateTime value back to ISO string before sending it to the API
    const updatedAppointment = {
      ...appointment,
      dateTime: new Date(appointment.dateTime).toISOString(),
    };

    AppServices.updateAppointment(id, updatedAppointment)
      .then(() => {
        navigate("/DoctorDashboard/list-appointment");
      })
      .catch((error) => {
        console.error("Error updating appointment:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Appointment</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="form-group mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={appointment.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Date and Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            className="form-control"
            value={appointment.dateTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-4">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={appointment.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Appointment
        </button>
      </form>
    </div>
  );
};

export default EditAppointment;
