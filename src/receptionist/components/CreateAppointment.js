import React, { useState } from "react";
import "../rec-css/CreateAppointment.css";

function CreateAppointment() {
  const [isFirstAppointment, setIsFirstAppointment] = useState(false);

  const handleChange = (e) => {
    setIsFirstAppointment(e.target.value === "yes");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Appointment Scheduled!");
  };

  return (
    <div className="mt-4">
      <h1>Create Appointment</h1>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="appointment-form-labels">
          <label>
            Patient Name:
            <input type="text" placeholder="Enter patient name" required />
          </label>
          <label>
            Appointment Date:
            <input type="date" required />
          </label>
        </div>
        <div className="appointment-form-labels">
          <label>
            Time:
            <input type="time" required />
          </label>
          <label>
            Is this your first appointment?
            <select onChange={handleChange} required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </div>
        {isFirstAppointment && (
          <div className="form-row">
            <p>
            <b>*Note:</b> Since this is your first appointment, please bring all relevant
              medical history and documents.
            </p>
          </div>
        )}
        <div className="appointment-form-labels">
          
          <label>
            Description:
            <textarea
              placeholder="Enter appointment description"
              rows="4"
            />
          </label>
        </div>
        
        <button type="submit">Schedule Appointment</button>
      </form>
    </div>
  );
}

export default CreateAppointment;
