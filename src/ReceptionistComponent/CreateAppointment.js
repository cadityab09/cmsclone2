import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../DoctorCSS/CreateAppointment.css";

function CreateAppointment() {
  const [isFirstAppointment, setIsFirstAppointment] = useState(false);

  const handleChange = (e) => {
    setIsFirstAppointment(e.target.value === "yes");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Create Appointment</h1>
          <form className="appointment-form">
            <label>
              Patient Name:
              <input type="text" className="form-control" placeholder="Enter patient name" required />
            </label>
            <label>
              Appointment Date:
              <input type="date" className="form-control" required />
            </label>
            <label>
              Time:
              <input type="time" className="form-control" required />
            </label>
            <label>
              Description:
              <textarea className="form-control" placeholder="Enter appointment description" rows="4"></textarea>
            </label>
            <label>
              Is this your first appointment?
              <select className="form-control" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            {isFirstAppointment && (
              <div className="alert alert-info mt-3">
                Since this is your first appointment, please bring all relevant medical history and documents.
              </div>
            )}
            <button type="submit" className="btn btn-primary w-100 mt-3">Schedule Appointment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAppointment;
