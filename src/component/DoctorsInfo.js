import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./Doctorinfo.css"; // Add your custom styles here

const DoctorsInfo = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:8084/doctors");
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    const toggleDoctorStatus = async (id, currentStatus) => {
        try {
            const updatedStatus = !currentStatus;
            await axios.put(`http://localhost:8084/doctors/${id}`, { isEnabled: updatedStatus });

            setDoctors((prevDoctors) =>
                prevDoctors.map((doc) =>
                    doc.id === id ? { ...doc, isEnabled: updatedStatus } : doc
                )
            );
        } catch (error) {
            console.error("Error updating doctor status:", error);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="text-center">Our Doctors</h1>
            <div className="row mt-4">
                {doctors.map((doctor) => (
                    <div className="col-md-4 mb-4" key={doctor.id}>
                        <div className="card h-100">
                            <img
                                src={`http://localhost:8084/assets/${doctor.img}`}
                                className="card-img-top"
                                alt={doctor.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{doctor.name}</h5>
                                <p className="card-text">
                                    <strong>Specialties:</strong> {doctor.specialties}
                                </p>
                                <p>
                                    <strong>Availability:</strong> {doctor.days}
                                </p>
                                <p>
                                    <strong>Working Hours:</strong> {doctor.inTime} - {doctor.outTime}
                                </p>
                                <button
                                    className={`btn ${
                                        doctor.isEnabled ? "btn-success" : "btn-danger"
                                    }`}
                                    onClick={() => toggleDoctorStatus(doctor.id, doctor.isEnabled)}
                                >
                                    {doctor.isEnabled ? "Disable" : "Enable"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsInfo;
