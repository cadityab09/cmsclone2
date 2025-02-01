import React, { useEffect, useState } from "react";
import AppServices from "../../services/AppServices";
import { Link } from "react-router-dom";
import "./appoinmentsCSS/Appointment.css";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Fetch appointments from the server
  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AppServices.getAllAppointments();
      setAppointments(response);
      setFilteredAppointments(response);
    } catch (err) {
      setError("There was an error fetching the appointments.");
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredAppointments(
      appointments.filter((appointment) =>
        appointment.title.toLowerCase().includes(query)
      )
    );
  };

  // Delete an appointment
  const deleteAppointment = async (appointmentId) => {
    try {
      await AppServices.deleteAppointment(appointmentId);
      fetchAppointments();
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  // Update the status of an appointment
  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      await AppServices.updateAppointmentStatus(appointmentId, { status });
      // After updating the status, fetch updated appointments
      fetchAppointments();
    } catch (err) {
      console.error("Error updating appointment status:", err);
      setError("Error updating the status.");
    }
  };

  // Show modal with full appointment details
  const showDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  // Fetch the appointments on initial render
  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h1>Appointments List</h1>

      {/* Search Bar */}
      <div className="search-bar mt-4 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="form-control"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Title</th>
                  <th scope="col">DateTime</th>
                  <th scope="col">Description</th>
                  <th scope="col">Mobile Number</th>
                  <th scope="col">Doctor</th>
                  {/* <th scope="col">Status</th>
                  <th scope="col">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <th scope="row">{appointment.id}</th>
                      <td>{appointment.title}</td>
                      <td>{appointment.dateTime}</td>
                      <td>{appointment.description}</td>
                      <td>{appointment.mobileNumber}</td>
                      <td>{appointment.doctor}</td>
                      {/* <td>
                        <button
                            className="btn btn-info"
                            onClick={() => showDetails(appointment)}
                          >
                            status
                          </button>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteAppointment(appointment.id)}
                          >
                            Delete
                          </button>
                          <Link
                            className="btn btn-primary"
                            to={/edit-appointment/${appointment.id}}
                          >
                            Update
                          </Link>
                          
                        </div>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Appointment Details */}
      {showModal && selectedAppointment && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Appointment Details</h2>
            <p><strong>Title:</strong> {selectedAppointment.title}</p>
            <p><strong>DateTime:</strong> {selectedAppointment.dateTime}</p>
            <p><strong>Description:</strong> {selectedAppointment.description}</p>
            <p><strong>Mobile Number:</strong> {selectedAppointment.mobileNumber}</p>
            <p><strong>Doctor:</strong> {selectedAppointment.doctor}</p>
            <p><strong>Status:</strong> {selectedAppointment.status}</p>
            {/* Display history or other details here */}
            <h4>Appointment History:</h4>
            <ul>
              {selectedAppointment.history && selectedAppointment.history.length > 0 ? (
                selectedAppointment.history.map((entry, index) => (
                  <li key={index}>
                    <strong>{entry.date}:</strong> {entry.status} by {entry.updatedBy}
                  </li>
                ))
              ) : (
                <li>No history available.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;