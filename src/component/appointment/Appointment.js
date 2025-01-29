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

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AppServices.getAllAppointments();
      setAppointments(response);
      setFilteredAppointments(response); // Initialize filtered appointments
    } catch (err) {
      setError("There was an error fetching the appointments.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredAppointments(
      appointments.filter((appointment) =>
        appointment.title.toLowerCase().includes(query)
      )
    );
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      await AppServices.deleteAppointment(appointmentId);
      fetchAppointments(); // Refresh the list after deletion
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

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
          placeholder="Search by name..."
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
                  <th scope="col">Actions</th>
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
                            to={`/edit-appointment/${appointment.id}`}
                          >
                            Update
                          </Link>
                          <Link
                            className="btn btn-secondary"
                            to={`/view-appointment/${appointment.id}`}
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
