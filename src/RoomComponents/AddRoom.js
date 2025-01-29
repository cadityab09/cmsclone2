import React, { useState } from "react";
import axios from "axios";

const AddRoom = () => {
  const [roomData, setRoomData] = useState({
    status: "Available",
    patient: "",
    address: "",
    problem: "",
    mobileNumber: "",
    admissionTime: null,
    occupiedTime: null,
    dischargeTime: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8084/api/beds/add", roomData);
      alert("Room added successfully!");
      setRoomData({
        status: "Available",
        patient: "",
        address: "",
        problem: "",
        mobileNumber: "",
        admissionTime: null,
        occupiedTime: null,
        dischargeTime: null,
      });
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Failed to add room. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Room</h2>
      <form onSubmit={handleFormSubmit} className="add-room-form">
        <div className="mb-3">
          <label htmlFor="patient" className="form-label">Patient Name</label>
          <input
            type="text"
            className="form-control"
            id="patient"
            name="patient"
            value={roomData.patient}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={roomData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="problem" className="form-label">Problem</label>
          <input
            type="text"
            className="form-control"
            id="problem"
            name="problem"
            value={roomData.problem}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
            name="mobileNumber"
            value={roomData.mobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;
