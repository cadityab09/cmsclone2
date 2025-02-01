import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewLiveBed = () => {
  const [patientHistory, setPatientHistory] = useState([]);

  useEffect(() => {
    fetchPatientHistory();
  }, []);

  // Fetch the list of assigned patients and their history
  const fetchPatientHistory = async () => {
    try {
      const response = await axios.get("http://localhost:8084/api/beds/status");
      setPatientHistory(response.data); // Assuming response.data contains history
    } catch (error) {
      console.error("Error fetching patient history:", error);
    }
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="mb-5">
          <h3>Live Bed Status</h3>
          {patientHistory.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped m-2">
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>Bed ID</th>
                    <th>Patient Name</th>
                    <th>Disease</th>
                    <th>Mobile Number</th>
                    
                    <th>Occupied Time</th>
                    <th>Discharge Time</th>
                  </tr>
                </thead>
                <tbody>
                  {patientHistory.map((record, index) => (
                    <tr key={index}>
                      {/* <td>{index + 1}</td> */}
                      <td>{record.bedId}</td>
                      <td>{record.patientName}</td>
                      <td>{record.patientProblem}</td>
                      <td>{record.mobileNumber}</td>
                      
                      <td>{record.assignedAt}</td>
                      <td>{record.dischargeTime || "Still Occupied"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No patient history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewLiveBed;