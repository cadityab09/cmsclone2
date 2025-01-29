import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppServices from "../../services/AppServices";
import '../appointment/appoinmentsCSS/AppointmentViewById.css'; // Custom CSS for better control

const AppointmentViewById = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    AppServices.getAppointmentById(id)
      .then((response) => {
        setTitle(response.title);
        setDateTime(response.dateTime);
        setDescription(response.description);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <h1 className="text-center mt-5">Appointment View</h1>
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="card col-md-6 col-lg-4 col-12">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label className="form-label">Id:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={id}
                    disabled
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="dateTime" className="form-label">
                    Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="dateTime"
                    value={dateTime}
                    disabled
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Description:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    disabled
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <Link to="/DoctorDashboard/list-appointment" className="btn btn-danger">
                    Back to List
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentViewById;
